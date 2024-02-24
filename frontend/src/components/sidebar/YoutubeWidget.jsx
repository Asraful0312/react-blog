import Heading from "../../shared/Heading";

const YoutubeWidget = () => {
  return (
    <div className="py-6 px-5 bg-secondry border border-secondry2 rounded-lg">
      <Heading text="Subscribe Us" />
      <div>
        <iframe
          width="100%"
          height="200px"
          src="https://www.youtube.com/embed/JDEhWwRot6E?si=NDRIKR7SEV3aDToj"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeWidget;
