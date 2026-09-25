import "./globals.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

import { FitlogProvider } from "./context/FitlogContext";

export const metadata = {
  title: "FitLog",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitlogProvider>
          <Navbar />

          <Toast />

          <main>{children}</main>

          <Footer />
        </FitlogProvider>
      </body>
    </html>
  );
}