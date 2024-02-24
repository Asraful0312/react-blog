import Posts from "../components/posts";

const Home = () => {
  return (
    <div className="bg-white w-full">
      <div className="flex flex-col lg:flex-row gap-7 container my-10">
        <Posts />
      </div>
    </div>
  );
};

export default Home;
