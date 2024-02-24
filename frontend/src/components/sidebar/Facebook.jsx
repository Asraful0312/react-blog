import Heading from "../../shared/Heading";

const FaceBook = () => {
  return (
    <div className="py-6 px-5 bg-secondry border border-secondry2 rounded-lg">
      <Heading text="FaceBook" />
      <div>
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FFastLearnENG%2Fvideos%2F770947061048774%2F&show_text=false&width=560&t=0"
          width="100%"
          height="200px"
          style={{ border: "none", overflow: "hidden" }}
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
};

export default FaceBook;
