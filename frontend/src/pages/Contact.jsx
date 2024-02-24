const Contact = () => {
  return (
    <form action="">
      <h3 className="pb-5 border-b text-2xl">Conatct</h3>
      <div className="flex items-center gap-3 ">
        <input
          className="w-full border py-2 px-4 rounded"
          placeholder="Name"
          type="text"
        />
        <input
          className="w-full border py-2 px-4 rounded"
          placeholder="Email*"
          type="text"
        />
      </div>
      <textarea
        className="border w-full my-4 rounded"
        name=""
        id=""
        cols="20"
        rows="10"
      ></textarea>
      <button
        className="w-full text-center bg-primary py-2 text-lg text-white rounded"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Contact;
