import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { PaymentTestModeBanner } from "./PaymentTestModeBanner";
import SiteSparkles from "./SiteSparkles";
import StarlitFaerie from "./StarlitFaerie";
import StarlitHelp from "./StarlitHelp";

const Layout = () => (
  <div className="relative flex min-h-screen flex-col">
    <SiteSparkles />
    <PaymentTestModeBanner />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <StarlitFaerie />
    <StarlitHelp />
  </div>
);

export default Layout;
