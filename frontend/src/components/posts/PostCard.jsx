import AuthorAndDate from "../../shared/AuthorAndDate";
import SmallBtn from "../../shared/SmallBtn";
import { Link } from "react-router-dom";

const PostCard = ({ data }) => {
  const { title, imageUrl, author, timesTamp, id, category } = data || {};
  return (
    <div className=" mt-5 p-2 w-[300px]">
      <div className="overflow-hidden rounded-lg relative">
        <Link to={`/post/${id}`}>
          <img
            className="w-full object-cover h-[200px] hover:scale-110 transition-all duration-300"
            src={imageUrl}
            alt=""
          />
        </Link>
        <div className="absolute top-2 left-2">
          <SmallBtn text={category} />
        </div>
      </div>
      <Link to={`/post/${id}`}>
        <h1 className="text-lg py-2 hover:text-primary transition-all duration-200">
          {title}
        </h1>
      </Link>
      <AuthorAndDate
        author={author}
        date={timesTamp?.toDate().toDateString()}
      />
    </div>
  );
};

export default PostCard;
