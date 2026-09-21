export type AdConfig = {
  adsenseClient: string;
  adsenseSlot: string;
  monetagZone: string;
  monetagScript: string;
  propellerZone: string;
  adsterraKey: string;
  adsTxtExtra: string;
};

function env(name: string): string {
  const value = import.meta.env[name];
  return typeof value === "string" ? value.trim() : "";
}

/** Accept `ca-pub-…` or `pub-…`. */
export function adsenseClientId(raw: string): string {
  if (!raw) return "";
  const id = raw.replace(/^ca-/, "");
  return id.startsWith("pub-") ? `ca-${id}` : raw;
}

export function adsensePubId(client: string): string {
  return adsenseClientId(client).replace(/^ca-/, "");
}

export function getAdConfig(): AdConfig {
  return {
    adsenseClient: adsenseClientId(env("PUBLIC_ADSENSE_CLIENT")),
    adsenseSlot: env("PUBLIC_ADSENSE_SLOT"),
    monetagZone: env("PUBLIC_MONETAG_ZONE"),
    monetagScript: env("PUBLIC_MONETAG_SCRIPT"),
    propellerZone: env("PUBLIC_PROPELLER_ZONE"),
    adsterraKey: env("PUBLIC_ADSTERRA_KEY"),
    adsTxtExtra: env("PUBLIC_ADS_TXT_EXTRA"),
  };
}

export function hasDisplayAds(config: AdConfig): boolean {
  return Boolean(
    (config.adsenseClient && config.adsenseSlot) ||
      config.monetagScript ||
      config.propellerZone ||
      config.adsterraKey,
  );
}

export function hasAnyAds(config: AdConfig): boolean {
  return Boolean(config.adsenseClient) || hasDisplayAds(config);
}

export function adsTxtBody(config: AdConfig): string {
  const lines: string[] = [];
  const pub = adsensePubId(config.adsenseClient);
  if (pub) {
    lines.push(`google.com, ${pub}, DIRECT, f08c47fec0942fa0`);
  }
  if (config.adsTxtExtra) {
    for (const line of config.adsTxtExtra.split("|")) {
      const trimmed = line.trim();
      if (trimmed) lines.push(trimmed);
    }
  }
  if (!lines.length) {
    return "# No authorized sellers configured. Set PUBLIC_ADSENSE_CLIENT and/or PUBLIC_ADS_TXT_EXTRA.\n";
  }
  return `${lines.join("\n")}\n`;
}
