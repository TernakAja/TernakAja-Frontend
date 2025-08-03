import { Outlet } from "react-router-dom"; // Outlet untuk menampilkan halaman yang aktif

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      {/* Wrapper Layout */}

      <div className="flex flex-col min-h-screen mt-19">
        <Navbar />

        <main className="flex-1 container min-w-screen">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
