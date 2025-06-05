
import "./globals.css";
import { Poppins } from 'next/font/google'
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ['latin'],
  weight : ['200','400','700']
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <header>
          <Navigation />
        </header>
        <main>
           <Toaster position="top-center" />
          {children}
        </main>
       <Footer />
      </body>
    </html>
  );
}
