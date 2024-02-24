import Post from "./Post";
import useBlogs from "../../hooks/useBlogs";
import { useLocation } from "react-router-dom";

const Posts = () => {
  const { blogs, loading } = useBlogs();
  const location = useLocation();

  //tag params
  const queryParams = new URLSearchParams(location.search);
  const tag = queryParams.get("tag");

  //category params
  const categoryParams = new URLSearchParams(location.search);
  const category = categoryParams.get("category");

  //author params
  const authorParams = new URLSearchParams(location.search);
  const author = authorParams.get("author");

  return (
    <div className="">
      {loading && (
        <h1 className="flex items-center justify-center h-[60vh] text-primary text-2xl text-center animate-pulse font-bold">
          Loading...
        </h1>
      )}
      {blogs
        ?.filter((item) => (tag ? item?.tags?.includes(tag) && item : true))
        ?.filter((item) =>
          category
            ? item?.category?.toLowerCase().includes(category.toLowerCase()) &&
              item
            : true
        )
        ?.filter((item) =>
          author
            ? item?.author?.toLowerCase().includes(author.toLowerCase()) && item
            : true
        )
        .map((blog) => (
          <Post loading={loading} key={blog?.id} data={blog} />
        ))}
      <div className="flex items-center mt-10 mb-5 justify-center">
        <button className="btn text-white py-2 px-3 rounded-md">
          Load More
        </button>
      </div>
    </div>
  );
};

export default Posts;
