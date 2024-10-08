import localFont from "next/font/local";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GlobalProvider } from "./(context)/GlobalState";
import Header from "./(components)/Header";
import Footer from "./(components)/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalProvider>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_API_TOKEN}>
            <Header />
            <div className="max-w-screen-xl mx-auto lg:px-0 md:p-4 md:py-8">
              {children}
            </div>
            <Footer />
          </GoogleOAuthProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
