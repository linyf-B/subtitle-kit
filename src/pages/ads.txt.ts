import type { APIRoute } from "astro";
import { adsTxtBody, getAdConfig } from "../lib/ads";

export const GET: APIRoute = () => {
  return new Response(adsTxtBody(getAdConfig()), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
