import Heading from "../../shared/Heading";

const SocialWidget = () => {
  return (
    <div className="py-6 px-5 bg-secondry border border-secondry2 rounded-lg">
      <Heading text="Social Links" />
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
  );
};

export default SocialWidget;
