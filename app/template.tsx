// Re-mounts on every navigation. The fade is pure CSS (.page-in in globals.css),
// so the first page load paints immediately instead of waiting for JavaScript.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
