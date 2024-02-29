import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import useBlogs from "../hooks/useBlogs";
import AuthorAndDate from "../shared/AuthorAndDate";
import Loading from "../shared/Loading";

const Hero = () => {
  const { blogs, loading } = useBlogs();
  let featuredBlog = blogs?.filter((blog) => blog?.featured);

  console.log(featuredBlog);

  return (
    <>
      {featuredBlog?.length > 0 && (
        <div className="w-full">
          {loading && <Loading />}
          <div
            className={`container shadow-xl flex flex-col md:flex-row items-center gap-5 transition-all duration-500 ${
              loading ? "opacity-0 invisible" : "opacity-100 visible"
            }`}
          >
            {!loading &&
              featuredBlog?.slice(0, 1).map((blog) => (
                <div
                  key={blog?.id}
                  className="relative w-full lg:w-[50%]  rounded-xl overflow-hidden"
                >
                  <Link to={`/post/${blog?.id}`}>
                    <div className="">
                      <img
                        loading="lazy"
                        className="w-full hover:scale-110 transition-all duration-200"
                        src={blog.imageUrl}
                        alt="banner"
                      />
                    </div>
                  </Link>
                  <div className="absolute z-40 left-0 right-0 bottom-0 flex items-end rounded-b-xl p-5">
                    <div className="">
                      <Link className="bg-primary text-white text-xs py-1 px-2 rounded-sm mt-2">
                        {blog?.category}
                      </Link>
                      <Link to={`/post/${blog?.id}`}>
                        <h1 className="text-white leading-8 text-2xl my-2">
                          {blog?.title}
                        </h1>
                      </Link>
                      <AuthorAndDate
                        author={blog?.author}
                        date={blog?.timesTamp.toDate().toDateString()}
                      />
                    </div>
                  </div>
                  <div className="bg-black absolute bottom-0 left-0 right-0 w-full h-20 -mt-40 blur-lg opacity-40"></div>
                </div>
              ))}

            <div className="w-full lg:w-[40%] px-5 py-3">
              {!loading && featuredBlog?.length > 3
                ? featuredBlog.slice(1, 4).map((blog) => (
                    <div key={blog?.id} className="pb-5">
                      <div>
                        <Link to={`/post/${blog?.id}`}>
                          <h3 className="text-xs text-primary">
                            {blog?.category}
                          </h3>
                        </Link>
                        <Link to={`/post/${blog?.id}`}>
                          <h2 className=" font-semibold hover:text-primary transition-all duration-200">
                            {blog?.title}
                          </h2>
                        </Link>
                        <AuthorAndDate
                          author={blog?.author}
                          date={blog?.timesTamp.toDate().toDateString()}
                        />
                      </div>
                    </div>
                  ))
                : featuredBlog?.map((blog) => (
                    <div key={blog?.id} className="pb-5">
                      <div>
                        <Link to={`/post/${blog?.id}`}>
                          <h3 className="text-xs text-primary">
                            {blog?.category}
                          </h3>
                        </Link>
                        <Link to={`/post/${blog?.id}`}>
                          <h2 className=" font-semibold hover:text-primary transition-all duration-200">
                            {blog?.title}
                          </h2>
                        </Link>
                        <AuthorAndDate
                          author={blog?.author}
                          date={blog?.timesTamp.toDate().toDateString()}
                        />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
