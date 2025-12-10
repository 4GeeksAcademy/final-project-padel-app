import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <main className="container mt-4">
        <Outlet />
      </main>
      <Footer />
    </ScrollToTop>
  );
};
