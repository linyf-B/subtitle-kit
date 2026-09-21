/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ADSENSE_CLIENT?: string;
  readonly PUBLIC_ADSENSE_SLOT?: string;
  readonly PUBLIC_MONETAG_ZONE?: string;
  readonly PUBLIC_MONETAG_SCRIPT?: string;
  readonly PUBLIC_PROPELLER_ZONE?: string;
  readonly PUBLIC_ADSTERRA_KEY?: string;
  readonly PUBLIC_ADS_TXT_EXTRA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
