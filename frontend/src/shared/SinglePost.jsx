import AuthorAndDate from "./AuthorAndDate";
import { Link } from "react-router-dom";

const SinglePost = ({ text, data }) => {
  const { title, imageUrl, author, timesTamp, id } = data || {};

  return (
    <div className="flex items-center gap-2 py-3">
      <Link to={`/post/${id}`} className="w-[86px] h-[50px]">
        <img className="w-full h-full rounded-sm" src={imageUrl} alt="image" />
      </Link>
      <div>
        <Link to={`/post/${id}`}>
          <p
            className={`mb-1 hover:text-primary transition-all duration-200 ${
              text === "sm" ? "text-sm" : "text-base"
            }`}
          >
            {title}
          </p>
        </Link>
        <AuthorAndDate
          author={author}
          date={timesTamp?.toDate().toDateString()}
        />
      </div>
    </div>
  );
};

export default SinglePost;
