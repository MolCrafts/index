/**
 * Build-time environment exposed to the client.
 *
 * rsbuild only inlines variables prefixed `PUBLIC_`, which is the guard that keeps a
 * secret from reaching the bundle by accident. Anything declared here is public by
 * definition — never add a key that should stay on the server.
 */
interface ImportMetaEnv {
  /** Google Analytics 4 measurement ID, e.g. `G-XXXXXXXXXX`. Unset disables tracking. */
  readonly PUBLIC_GA_ID?: string;
  /** Motion always runs; `"false"` makes the build follow the OS reduced-motion setting instead. */
  readonly PUBLIC_FORCE_FULL_MOTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
