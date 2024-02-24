import useBlogs from "../hooks/useBlogs";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { useState } from "react";
import Modal from "../components/shared/Modal";
import { collection, deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const { currentUser } = useAuth();
  const [isLoading, setIsloading] = useState();
  const { blogs, loading, error } = useBlogs();
  const [modal, setModal] = useState(false);

  const userBlogs = blogs?.filter((blog) => blog.userId === currentUser.uid);

  console.log(userBlogs);
  console.log(currentUser.uid);

  const handleDelete = (id) => {
    setModal(id);
  };

  const handleYes = async () => {
    try {
      setIsloading(true);
      await deleteDoc(doc(db, "blogs", modal));
      setIsloading(false);
      toast.success("Blog Deleted Successfully");
    } catch (error) {
      setIsloading(false);
      console.log(error);
      toast.error("Somthing went wrong");
    }
    setModal(false);
  };
  const handleNo = () => {
    setWillDelete(false);
    setModal(false);
  };

  console.log(loading);

  return (
    <>
      {error && (
        <h1 className="text-red-500 text-center">There was an Error!</h1>
      )}
      {!error && loading && (
        <div className="animate-pulse text-3xl text-primary font-bold flex items-center justify-center h-[70vh]">
          Loading ...
        </div>
      )}
      {userBlogs?.length === 0 && (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-center w-full text-2xl font-bold text-ash">
            No Blog Found!
          </h1>
        </div>
      )}
      {userBlogs?.length > 0 && (
        <section
          className={`transition-all duration-500 ${
            loading ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
        >
          <table className="table-auto w-full">
            <thead className="bg-white border-b">
              <tr>
                <th className="px-4 py-5 text-start text-black whitespace-nowrap">
                  Author
                </th>
                <th className="px-4 py-5 text-start text-black whitespace-nowrap">
                  Title
                </th>
                <th className="px-4 py-5 text-start text-black whitespace-nowrap">
                  Delete
                </th>
                <th className="px-4 py-5 text-start text-black whitespace-nowrap">
                  Edit
                </th>
              </tr>
            </thead>

            <tbody>
              {blogs &&
                blogs
                  ?.filter((blog) => blog?.userId === currentUser.uid)
                  .map((item) => (
                    <tr key={item?.id} className={`bg-white  border-b-2`}>
                      <td className="px-4 py-10 text-start">
                        <h1>{item?.author}</h1>
                      </td>
                      <td className="px-4 py-10 text-start">
                        <p className="">{item?.title.slice(0, 150)}</p>
                      </td>
                      <td className="px-4 text-start py-10">
                        <button
                          onClick={() => handleDelete(item?.id)}
                          className="bg-red-500 py-2 px-4 rounded-md text-white"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-4 py-10 text-start">
                        <Link to={`/update/${item?.id}`}>
                          <button className="bg-blue-500 py-2 px-4 rounded-md text-white">
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <Modal
            isLoading={isLoading}
            modal={modal}
            setModal={setModal}
            handleYes={handleYes}
            handleNo={handleNo}
          />
        </section>
      )}
    </>
  );
};

export default Posts;
