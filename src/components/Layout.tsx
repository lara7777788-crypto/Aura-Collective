import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PaymentTestModeBanner } from "./PaymentTestModeBanner";

const Layout = () => (
  <div className="flex min-h-screen flex-col">
    <PaymentTestModeBanner />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
