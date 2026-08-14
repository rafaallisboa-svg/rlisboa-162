export const SITE_LIVE = process.env.NEXT_PUBLIC_SITE_LIVE === "true";
export const IS_DEV = process.env.NODE_ENV === "development";

/** Metadata de robots para o layout. Só libera indexação quando ao vivo. */
export const robotsMeta = SITE_LIVE
  ? { index: true, follow: true }
  : { index: false, follow: false, nocache: true };
