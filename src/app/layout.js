import { Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Outreach Engine™ - AI Voice Agents for Automated Lead Qualification",
  description: "Transform cold databases into qualified appointments with AI voice agents. Automated calling, intelligent qualification, and direct calendar booking - handling 100+ prospects daily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
