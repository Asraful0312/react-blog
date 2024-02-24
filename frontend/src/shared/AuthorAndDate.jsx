import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const AuthorAndDate = ({ author, date }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <p className="font-medium text-gray-700 text-xs">
        By{" "}
        <Link
          to={`/?author=${author}`}
          className="font-normal text-ash hover:text-primary transition-colors duration-200"
        >
          {author}
        </Link>
      </p>
      <div className="flex items-center gap-1 cursor-pointer">
        <SlCalender className="text-gray-700" />
        <p className="text-xs text-ash ">{date}</p>
      </div>
    </div>
  );
};

export default AuthorAndDate;
