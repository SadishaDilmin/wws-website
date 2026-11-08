// Used only for the static GitHub Pages preview (see next.config.ts).
// Serves the original image from /public under the site's sub-path.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
}
