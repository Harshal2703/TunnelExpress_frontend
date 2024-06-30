import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TunnelExpress",
  description: "TunnelExpress is an http tunneling app which allows users to expose their ports on internet so that they can host any service on their local machine.",
};

const inlineStyles = {
  backgroundImage: 'repeating-conic-gradient(#000000 0% 25%, #1a1414 0% 50%)',
  backgroundPosition: '0 0, 32px 32px',
  backgroundSize: '35px 35px',
  backgroundColor: '#1a1414',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}  style={inlineStyles}>{children}</body>
    </html>
  );
}
