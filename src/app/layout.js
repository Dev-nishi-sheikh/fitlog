import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { FitlogProvider } from "./context/FitlogContext";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitlogProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />

          <Toast />
        </FitlogProvider>
      </body>
    </html>
  );
}
