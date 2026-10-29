// Minimal root layout. If you drop the lipsy folder into an existing project,
// you do NOT need this file or app/page.js: keep your own.
export const metadata = {
  title: "Lipsy's Birthday Sky",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0a0920' }}>{children}</body>
    </html>
  );
}
