const Modal = ({ modal, setModal, handleYes, handleNo, isLoading }) => {
  return (
    <div
      onClick={() => setModal(false)}
      className={`flex items-center justify-center fixed inset-0 bg-black/30 transition-all duration-200 h-screen ${
        !modal ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[400px] rounded-md p-5"
      >
        <h1 className="text-xl font-bold">
          Are you sure you want to delete this Blog?
        </h1>
        <div className="flex items-center justify-between mt-7">
          <button
            disabled={isLoading}
            onClick={handleNo}
            className={`rounded-sm py-2 px-5 text-white font-semibold ${
              isLoading ? "bg-green-500/45" : "bg-green-500"
            }`}
          >
            No
          </button>
          <button
            disabled={isLoading}
            onClick={handleYes}
            className={`rounded-sm py-2 px-5 text-white font-semibold ${
              isLoading ? "bg-red-500/45" : "bg-red-500"
            }`}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
