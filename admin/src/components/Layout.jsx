import Sidebar from "./shared/sidebar";
import Header from "./shared/Header";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    console.log(window.location.href);
  }, [location.pathname]);

  return (
    <main className="flex">
      {location.pathname.slice(1) !== "login" &&
        location.pathname.slice(1) !== "signup" && <Sidebar />}
      <div className="w-screen md:main-content">
        <Header />
        <div className="px-5 md:px-11">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
