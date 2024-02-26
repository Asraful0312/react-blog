import SinglePost from "../SinglePost";
import SmallBtn from "../SmallBtn";
import AuthorAndDate from "../AuthorAndDate";
import useBlogs from "../../hooks/useBlogs";
import { Link } from "react-router-dom";
import Loading from "../../shared/Loading";

const FooterTop = () => {
  const { blogs, loading, error } = useBlogs();
  let featuredBlog = blogs?.filter((blog) => blog?.featured);
  const newBlogs = [...blogs];

  function getRandomItemsFromArray(arr, numItems) {
    const shuffled = arr.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, numItems); // Get the first numItems elements
  }

  const randomBlogs = getRandomItemsFromArray(newBlogs, 3);

  return (
    <div className="bg-secondry">
      <div className="container ">
        <div className="flex items-center flex-wrap gap-5 justify-center lg:justify-between w-full border-b py-7">
          <div className="flex items-center gap-5">
            <img className="w-40" src="/images/logo.png" alt="" />
          </div>
          <p className="text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
          </p>
          <div className="flex items-center gap-3">
            <ul className="flex items-center flex-wrap gap-2">
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
          </div>
        </div>
        <div className="py-7">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className=" p-2">
              <h3 className="mb-4 font-bold text-base">Random Posts</h3>
              {error && (
                <h1 className="flex items-center justify-center text-primary text-2xl text-center font-bold">
                  There was an error !
                </h1>
              )}
              {!error && loading && <Loading />}
              {randomBlogs?.map((data) => (
                <SinglePost key={data?.id} data={data} />
              ))}
            </div>
            <div className=" p-2">
              <h3 className="mb-4 font-bold text-base">Featured Post</h3>
              {!error && loading && <Loading />}
              {!loading &&
                featuredBlog?.slice(0, 1).map((blog) => (
                  <div key={blog?.id}>
                    <div className="overflow-hidden rounded-lg relative">
                      <Link to={`/post/${blog?.id}`}>
                        <img
                          className="w-full object-cover h-[200px] hover:scale-110 transition-all duration-300"
                          src={blog?.imageUrl}
                          alt=""
                        />
                        <div className="absolute top-2 left-2">
                          <SmallBtn text={blog?.category} />
                        </div>
                      </Link>
                    </div>
                    <Link to={`/post/${blog?.id}`}>
                      <h1 className="text-lg py-2">{blog?.title}</h1>
                    </Link>
                    <AuthorAndDate
                      author={blog?.author}
                      date={blog?.timesTamp.toDate().toDateString()}
                    />
                  </div>
                ))}
            </div>
            <div className=" p-2">
              <div className=" p-2">
                <h3 className="mb-4 font-bold text-base">Popuar Posts</h3>
                {error && (
                  <h1 className="flex items-center justify-center text-primary text-2xl text-center font-bold">
                    There was an error !
                  </h1>
                )}
                {!error && loading && <Loading />}
                {blogs?.length > 3
                  ? blogs
                      .slice(0, 3)
                      ?.map((data) => (
                        <SinglePost key={data?.id} data={data} text="sm" />
                      ))
                  : blogs?.map((data) => (
                      <SinglePost key={data?.id} data={data} text="sm" />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
