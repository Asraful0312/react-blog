import { Link } from "react-router-dom";

const FooterBottom = () => {
  return (
    <div className="bg-cream py-5">
      <div className="container flex flex-wrap px-3 items-center justify-between">
        <p>
          Created By <span className="text-primary">Asraful Islam</span>
        </p>
        <ul className="flex items-center gap-4 text-sm">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterBottom;
