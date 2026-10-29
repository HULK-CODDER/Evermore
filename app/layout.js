
import "./globals.css";
import Navbar from "./components/navigation/Navbar";

export const metadata = {
  title: "Evermore — A Birthday Experience Beyond the Ordinary",
  description:
    "A little world of elegance, heartfelt words, golden letters, and blooming flowers—created to make a birthday feel truly unforgettable.",
  applicationName: "Evermore",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
