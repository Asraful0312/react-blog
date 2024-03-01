import AuthorAndDate from "../../shared/AuthorAndDate";
import Ads from "../../shared/Ads";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useBlogs from "../../hooks/useBlogs";
import { useState } from "react";
import { useEffect } from "react";
import Comments from "../comments";

const PostDetails = () => {
  const { blogs, loading, error } = useBlogs();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();
  const index = blogs?.findIndex((item) => item?.id === id);

  useEffect(() => {
    if (index === -1) {
      console.log("no blog found");
    }
    setCurrentIndex(index);
  }, [id, index]);

  // get blog data
  const currentBlog = blogs[currentIndex];
  const {
    title,
    description,
    imageUrl,
    author,
    timesTamp,
    tags,
    category,
    id: blogId,
  } = currentBlog || {};

  // show blog from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  const handleDecrement = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleIncrement = () => {
    if (currentIndex < blogs.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="pb-10">
      <div key={id}>
        <div className="bg-black">
          <p className="text-ash text-xs py-2 px-4">
            <Link to="/">Home</Link> {">"} <Link>{category}</Link> {">"}{" "}
            <span>{title}</span>
          </p>
        </div>
        <h1 className="my-5">{title}</h1>
        <div className="pb-5 border-b">
          <AuthorAndDate
            author={author}
            date={timesTamp?.toDate().toDateString()}
          />
        </div>
        <Ads />
        <div className=" my-10">
          <img src={imageUrl} alt="image" />
        </div>
        <div
          className="flex flex-col gap-5"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />

        <Ads />
        <div className="flex flex-wrap items-center gap-2 pb-5 border-b">
          {tags?.map((tag) => (
            <Link
              to={`/?tag=${tag}`}
              key={tag}
              className="py-1 px-3 rounded-sm bg-white text-black border hover:bg-primary hover:text-white transition-all duration-200"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <ul className="flex pt-4 pb-10 items-center flex-wrap gap-2">
        <li>
          <a href="">
            <img
              className="w-7 h-7"
              src="/images/social/facebook.png"
              alt="social"
            />
          </a>
        </li>
        <li>
          <a href="">
            <img
              className="w-7 h-7"
              src="/images/social/whatsapp.png"
              alt="social"
            />
          </a>
        </li>
        <li>
          <a href="">
            <img
              className="w-7 h-7"
              src="/images/social/youtube.png"
              alt="social"
            />
          </a>
        </li>
        <li>
          <a href="">
            <img
              className="w-7 h-7"
              src="/images/social/linkedin.png"
              alt="social"
            />
          </a>
        </li>
        <li>
          <a href="">
            <img
              className="w-7 h-7"
              src="/images/social/reddit.png"
              alt="social"
            />
          </a>
        </li>
        <li>
          <a href="">
            <img
              className="w-7 h-7"
              src="/images/social/whatsapp.png"
              alt="social"
            />
          </a>
        </li>
      </ul>
      <div className="flex items-center justify-between mb-10">
        <div onClick={handleDecrement} className="cursor-pointer">
          <span className="text-xs text-ash">{"<"} older</span>
          <p className="text-xs">
            {" "}
            {blogs[currentIndex - 1]?.title
              ? blogs[currentIndex - 1]?.title.slice(0, 10)
              : "Don't Any Old Blog"}{" "}
            ...
          </p>
        </div>
        <div onClick={handleIncrement} className="cursor-pointer">
          <span className="text-xs text-ash"> newer {">"}</span>
          <p className="text-xs">
            {" "}
            {blogs[currentIndex + 1]?.title
              ? blogs[currentIndex + 1]?.title.slice(0, 10)
              : "See Older Blogs"}
            ...
          </p>
        </div>
      </div>
      <div className="bg-black p-5 flex gap-5">
        <img className="w-20" src="/images/1.jpg" alt="profile" />
        <div>
          <h3 className="text-ash">
            Posted By{" "}
            <Link
              to={`/?author=${author}`}
              className="text-primary hover:text-primary/70 transition-all duration-200"
            >
              {author}
            </Link>
          </h3>
          <p className="text-white text-xs">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,
            magnam!
          </p>
        </div>
      </div>
      <div className="mt-10">
        <div className="bg-black py-2 px-4">
          <p className="text-white text-sm font-semibold">You may like</p>
        </div>
        <div className="flex items-center flex-wrap">
          {error && (
            <h1 className="flex items-center justify-center text-primary text-2xl text-center font-bold">
              There was an error !
            </h1>
          )}
          {!error && loading && (
            <h1 className="flex items-center justify-center h-[60vh] text-primary text-2xl text-center animate-pulse font-bold">
              Loading...
            </h1>
          )}
          {blogs?.length > 3
            ? blogs
                .slice(0, 2)
                ?.filter((blog) => blog?.id !== id)
                .map((data) => (
                  <PostCard key={data?.id} data={data} text="sm" />
                ))
            : blogs?.map((data) => (
                <PostCard key={data?.id} data={data} text="sm" />
              ))}
        </div>
      </div>
      {/* comments */}
      <Comments blogId={blogId} />
    </div>
  );
};

export default PostDetails;
