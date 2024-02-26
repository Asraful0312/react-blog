import Heading from "../../shared/Heading";
import { Link } from "react-router-dom";
import useBlogs from "../../hooks/useBlogs";
import Loading from "../../shared/Loading";

const Categories = () => {
  const { blogs, loading, error } = useBlogs();
  const getCategoryies = (arr) => {
    return arr.map((item) => item.category);
  };

  const categories = getCategoryies(blogs);
  const uniqueCategory = new Set([...categories]);

  const categoryCount = (arr) => {
    const counts = {};
    arr.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    return counts;
  };

  const counts = categoryCount(categories);

  return (
    <div className="py-6 px-5 bg-secondry border border-secondry2 rounded-lg">
      <Heading text="Categories" />
      {error && (
        <h1 className="flex items-center justify-center text-primary text-2xl text-center font-bold">
          There was an error !
        </h1>
      )}
      {!error && loading && <Loading />}
      {[...uniqueCategory]?.map((c) => (
        <div
          key={c}
          className="flex items-center pb-3 justify-between hover:text-primary transition-all duration-200"
        >
          <Link to={`/?category=${c}`} className="">
            {">"} {c}
          </Link>
          <p>{counts[c]}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
