import Heading from "../../shared/Heading";
import { Link } from "react-router-dom";

const Tags = () => {
  return (
    <div className="py-6 px-5 bg-secondry border border-secondry2 rounded-lg">
      <Heading text="Tags" />
      <div className="flex flex-wrap items-center gap-2">
        <Link
          to="/?tag=Business"
          className="py-1 px-3 rounded-sm bg-white text-black border hover:bg-primary hover:text-white transition-all duration-200"
        >
          Business
        </Link>
        <Link
          to="/?tag=Fashion"
          className="py-1 px-3 rounded-sm bg-white text-black border hover:bg-primary hover:text-white transition-all duration-200"
        >
          Fashion
        </Link>
        <Link
          to="/?tag=Health"
          className="py-1 px-3 rounded-sm bg-white text-black border hover:bg-primary hover:text-white transition-all duration-200"
        >
          Health
        </Link>
        <Link
          to="/?tag=Tech"
          className="py-1 px-3 rounded-sm bg-white text-black border hover:bg-primary hover:text-white transition-all duration-200"
        >
          Tech
        </Link>
        <Link
          to="/?tag=Music"
          className="py-1 px-3 rounded-sm bg-white text-black border hover:bg-primary hover:text-white transition-all duration-200"
        >
          Music
        </Link>
      </div>
    </div>
  );
};

export default Tags;
