import AuthorAndDate from "../../shared/AuthorAndDate";
import Ads from "../../shared/Ads";
import PostCard from "./PostCard";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useBlogs from "../../hooks/useBlogs";

const PostDetails = () => {
  const { blogs, loading, error } = useBlogs();
  const { id } = useParams();
  const singleBlog = blogs?.filter((blog) => blog.id === id);

  return (
    <div className="pb-10">
      {singleBlog?.map((blog) => (
        <div key={blog?.id}>
          <div className="bg-black">
            <p className="text-ash text-xs py-2 px-4">
              <Link to="/">Home</Link> {">"} <Link>{blog?.category}</Link> {">"}{" "}
              <span>{blog?.title}</span>
            </p>
          </div>
          <h1 className="my-5">{blog?.title}</h1>
          <div className="pb-5 border-b">
            <AuthorAndDate
              author={blog?.author}
              date={blog?.timesTamp?.toDate().toDateString()}
            />
          </div>
          <Ads />
          <div className=" my-10">
            <img src={blog?.imageUrl} alt="image" />
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: blog?.description,
            }}
          />

          <Ads />
          <div className="flex flex-wrap items-center gap-2 pb-5 border-b">
            {blog?.tags?.map((tag) => (
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
      ))}
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
        <div className="cursor-pointer">
          <span className="text-xs text-ash">{"<"} older</span>
          <p className="text-xs"> Modern and colorful ...</p>
        </div>
        <div className="cursor-pointer">
          <span className="text-xs text-ash"> newer {">"}</span>
          <p className="text-xs"> Modern and colorful ...</p>
        </div>
      </div>
      <div className="bg-black p-5 flex gap-5">
        <img className="w-20" src="/images/1.jpg" alt="profile" />
        <div>
          <h3 className="text-ash">
            Posted By{" "}
            <Link
              to={`/?author=${singleBlog.map((blog) => blog?.author)}`}
              className="text-primary hover:text-primary/70 transition-all duration-200"
            >
              {singleBlog.map((blog) => blog?.author)}
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
                ?.map((data) => (
                  <PostCard key={data?.id} data={data} text="sm" />
                ))
            : blogs?.map((data) => (
                <PostCard key={data?.id} data={data} text="sm" />
              ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
