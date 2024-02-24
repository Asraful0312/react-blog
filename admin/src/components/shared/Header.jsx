import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenu from "./sidebar/MobileMenu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaUserCircle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { VscSignIn } from "react-icons/vsc";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [active, setActive] = useState("Home");

  useEffect(() => {
    setActive(location.pathname === "/" ? "Home" : location.pathname.slice(1));
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setShowProfile(false);
  };

  return (
    <header className="px-11 border-b py-6 w-full bg-white">
      <div className="flex items-center justify-between ">
          <GiHamburgerMenu
            onClick={() => setShow(!show)}
            className="flex text-2xl md:hidden"
          />
        <Link to="/" className="flex items-center gap-5">
          <span className="text-primary py-2 px-3 bg-primary/10 font-medium text-sm rounded-3xl">
            Home
          </span>
        </Link>
        <div className="relative">
          <FaUserCircle
            className="text-2xl"
            onClick={() => setShowProfile(!showProfile)}
          />
          {showProfile && (
            <div className=" p-4 w-[200px] bg-secondry rounded right-0 absolute flex flex-col gap-2">
              {currentUser && (
                <Link
                  to="/"
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-2 hover:text-primary transition-all duration-200"
                >
                  <FaUserCircle className="text-xl" />
                  <p className="text-lg">
                    {currentUser && currentUser?.displayName}
                  </p>
                </Link>
              )}

              {currentUser ? (
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="flex items-center gap-2  hover:text-primary transition-all duration-200 cursor-pointer"
                >
                  <IoMdLogOut />

                  <p className="text-lg">Logout</p>
                </Link>
              ) : (
                <>
                  <Link
                    className="text-lg hover:text-primary transition-all duration-200 text-black flex items-center gap-2"
                    to="/login"
                    onClick={() => setShowProfile(false)}
                  >
                    <CiLogin />
                    <p>Login</p>
                  </Link>
                  <Link
                    className="text-lg hover:text-primary transition-all duration-200 text-black flex items-center gap-2"
                    to="/signup"
                    onClick={() => setShowProfile(false)}
                  >
                    <VscSignIn />
                    <p>Sign up</p>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {show && (
        <MobileMenu
          show={show}
          setActive={setActive}
          active={active}
          setShow={setShow}
        />
      )}
    </header>
  );
};

export default Header;
