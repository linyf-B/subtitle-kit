import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? "https://subtitle-kit.pages.dev";
  const body = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
