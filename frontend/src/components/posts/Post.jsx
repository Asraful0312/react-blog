import SmallBtn from "../../shared/SmallBtn";
import { Link } from "react-router-dom";
import AuthorAndDate from "../../shared/AuthorAndDate";

const Post = ({ data, loading }) => {
  const { title, description, imageUrl, author, timesTamp, id } = data || {};
  const tempElement = document.createElement("div");
  tempElement.innerHTML = description;
  const textFromHTML = tempElement.textContent;

  return (
    <div
      className={`py-5 flex px-5 md:px-0 flex-col md:flex-row gap-4 border-b transition-all duration-500 ${
        loading ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
    >
      <Link
        to={`/post/${id}`}
        className="overflow-hidden cursor-pointer relative md:w-1/3 h-0 shadow-lg rounded-xl"
        style={{ paddingTop: "33.25%" }}
      >
        <img
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-300"
          src={imageUrl}
          alt="post image"
        />
      </Link>

      <div className="md:w-1/2">
        <SmallBtn text="TECH" />
        <Link to={`/post/${id}`}>
          <h1 className="py-2 hover:text-primary cursor-pointer transition-all duration-300 ">
            {title}
          </h1>
        </Link>
        <div className="flex items-center gap-2 mb-2 cursor-pointer">
          <div className="flex items-center gap-1 cursor-pointer">
            <AuthorAndDate
              author={author}
              date={timesTamp.toDate().toDateString()}
            />
          </div>
        </div>
        <p>{textFromHTML.substring(0, 150)}</p>
        <Link to={`/post/${id}`} className="flex items-center justify-end mt-7">
          <button className="btn text-white py-2 px-3 rounded-md">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Post;
