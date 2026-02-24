import { Oswald, Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { Providers } from "./providers";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "DIVAS | Beauty & Hair",
  description: "Stir the beauty you desire. Premium wigs, salon services, and expert styling.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${montserrat.variable} font-sans antialiased`}>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
