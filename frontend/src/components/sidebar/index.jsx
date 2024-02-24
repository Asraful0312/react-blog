import SocialWidget from "./SocialWidget";
import YoutubeWidget from "./YoutubeWidget";
import PopularPost from "./PopularPost";
import FaceBook from "./Facebook";
import Tags from "./Tags";
import Categories from "./Categories";

const SideBar = () => {
  return (
    <div className=" flex flex-col gap-8">
      <SocialWidget />
      <YoutubeWidget />
      <PopularPost />
      <FaceBook />
      <Tags />
      <Categories />
    </div>
  );
};

export default SideBar;
