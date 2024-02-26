import SideBar from "../components/sidebar";
import Hero from "../components/Hero";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }) => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="bg-white w-full h-full">
      {location.pathname === "/" && (
        <div className="mb-10">
          <Hero />
        </div>
      )}

      <div className="flex flex-col lg:flex-row w-full gap-10 container">
        <div
          className={`w-full mb-10 ${
            location.pathname !== "/signup" && location.pathname !== "/login"
              ? "lg:w-[70%]"
              : "lg:w-full"
          }`}
        >
          {children}
        </div>
        {location.pathname !== "/signup" && location.pathname !== "/login" && (
          <div className="w-full lg:w-[30%] mb-10">
            <SideBar />
          </div>
        )}
      </div>
    </div>
  );
};
