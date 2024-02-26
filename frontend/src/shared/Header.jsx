import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import useBlogs from "../hooks/useBlogs";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { blogs } = useBlogs();
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const { currentUser } = auth;

  useEffect(() => {
    setSearch(false);
    setSearchValue("");
  }, [pathname]);

  const handleClose = () => {
    setSearch(false);
    setSearchValue("");
  };

  return (
    <header className="bg-white shadow-md mb-10 px-4">
      <div className="container py-2 flex items-center justify-between">
        <Link to="/">
          <img className="w-40" src="/images/logo.png" alt="" />
        </Link>
        <div className="flex items-center gap-3">
          <FiSearch onClick={() => setSearch(true)} className="text-lg" />
          {currentUser ? (
            <Link
              to="/login"
              onClick={logout}
              className="text-black hover:text-primary transition-all duration-200"
            >
              LogOut
            </Link>
          ) : (
            <Link
              to="/signup"
              className="text-black hover:text-primary transition-all duration-200"
            >
              Signup
            </Link>
          )}
        </div>
      </div>

      <div
        className={`container  bg-white absolute h-[60px] transition-all duration-300 right-0 left-0 z-50 ${
          search ? "top-0" : "-top-16"
        }`}
      >
        <div className="flex items-center px-4 pt-4 justify-between ">
          <div className="w-full">
            <input
              className="w-full outline-none border-none "
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search this blog"
            />
          </div>
          <button>
            <RxCross2 onClick={handleClose} className="text-lg mr-3" />
          </button>
        </div>
        {searchValue && (
          <div className="mt-2 bg-white w-full px-4 py-3 flex flex-col gap-2">
            {blogs
              ?.filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((blog) => (
                <Link
                  className="hover:text-primary transition-all duration-200"
                  key={blog?.id}
                  to={`/post/${blog?.id}`}
                >
                  {blog?.title}
                </Link>
              ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
