import Heading from "../../shared/Heading";
import SinglePost from "../../shared/SinglePost";
import useBlogs from "../../hooks/useBlogs";

const PopularPost = () => {
  const { blogs, loading, error } = useBlogs();

  return (
    <div className="py-6 px-5 bg-secondry border border-secondry2 rounded-lg">
      <Heading text="Most Popular" />
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
            .slice(0, 3)
            ?.map((data) => <SinglePost key={data?.id} data={data} text="sm" />)
        : blogs?.map((data) => (
            <SinglePost key={data?.id} data={data} text="sm" />
          ))}
    </div>
  );
};

export default PopularPost;
