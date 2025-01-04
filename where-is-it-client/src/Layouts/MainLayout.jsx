import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HelmetProvider } from "react-helmet-async";

const MainLayout = () => {
    return (
        <HelmetProvider>
            <div className="font-montserrat">
                <Navbar />
                <div className="min-h-[calc(100vh-396px)]">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </HelmetProvider>
    );
};

export default MainLayout;