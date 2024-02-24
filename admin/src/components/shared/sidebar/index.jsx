import { TiHome } from "react-icons/ti";
import { ImSpoonKnife } from "react-icons/im";
import { IoBagRemoveSharp } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { IoGift } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { IoHelpBuoySharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const links = [
  {
    to: "/",
    text: "Home",
    Icon: TiHome,
  },
  {
    to: "/Create",
    text: "Create",
    Icon: IoCreateOutline,
  },
  {
    to: "/Posts",
    text: "Posts",
    Icon: BsFillFileEarmarkPostFill,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("Home");

  useEffect(() => {
    setActive(location.pathname === "/" ? "Home" : location.pathname.slice(1));
  }, [location.pathname]);

  return (
    <aside className="px-5 hidden shadow-md md:block pt-6 min-h-screen bg-white">
      <div className="w-[200px]">
        <div className="flex items-center gap-3 pb-[55px]">
          <Link to="/" className="text-primary text-3xl">
            Dashboard
          </Link>
        </div>
        <ul>
          {links?.map((link) => (
            <li key={link?.text} className="flex items-center gap-[14px] pb-6">
              <Link to={link?.to} className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    link?.text === active ? "bg-primary/10" : "bg-transparent"
                  }`}
                >
                  <link.Icon
                    className={`text-xl  ${
                      link?.text === active ? "text-primary" : "text-icon"
                    }`}
                  />
                </div>
                <h1
                  className={`text-base font-medium ${
                    link?.text === active ? "text-primary" : "text-icon"
                  }`}
                >
                  {link?.text}
                </h1>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="pl-2 mt-28 pt-2 border-t">
          <li className="flex items-center gap-[14px] pb-6 hover:text-primary">
            <IoMdSettings className="text-xl text-icon" />
            <Link
              className={`text-base font-medium text-icon
            }`}
            >
              Settings
            </Link>
          </li>
          <li className="flex items-center gap-[14px] pb-6 hover:text-primary">
            <IoHelpBuoySharp className="text-xl text-icon" />
            <Link
              className={`text-base font-medium text-icon
            }`}
            >
              Help
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
