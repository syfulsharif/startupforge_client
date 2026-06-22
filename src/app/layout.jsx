import "../index.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "StartupForge - Build Co-founding Dream Teams",
  description: "StartupForge is the match platform connecting visionary entrepreneurs with specialized developers, designers, and growth experts to assemble co-founding dream teams.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
