import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { IoHelpBuoySharp } from "react-icons/io5";
import { links } from ".";

const MobileMenu = ({ setShow, active }) => {
  console.log(active);
  const handleLink = (link) => {
    setShow(false)
  }

  return (
    <div className="w-full absolute inset-0 top-[88px] bg-white flex flex-col items-center justify-center md:hidden z-50">
      <div className="w-full flex items-center flex-col">
        <div className="flex items-center gap-3 pb-5 mt-[-180px]">
          <Link to="/" className="text-primary text-3xl">
            Dashboard
          </Link>
        </div>
        <ul className="">
          {links?.map((link) => (
            <li
              key={link?.text}
              onClick={() => handleLink(link?.text)}
              className="flex items-center gap-[14px] pb-6"
            >
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
        <ul className="pl-2 pt-2 border-t">
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
    </div>
  );
};

export default MobileMenu;
