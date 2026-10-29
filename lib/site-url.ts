/** Use the deployment's own origin for preview OGP; a chosen SITE_URL wins. */
export function resolveSiteUrl(
  env: Record<string, string | undefined> = process.env,
): URL {
  return new URL(
    env.SITE_URL ||
      env.DEPLOY_PRIME_URL ||
      env.URL ||
      (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "http://localhost:3000"),
  );
}
