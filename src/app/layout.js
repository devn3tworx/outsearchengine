import { Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Meeting Machine™ - Automate Your Outreach & Generate Meetings",
  description: "Transform your B2B sales with automated lead discovery, cold email campaigns, LinkedIn outreach, and meeting booking. Powered by N3tworx.",
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
