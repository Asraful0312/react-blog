import SingleComment from "./SingleComment";
import { IoMdSend } from "react-icons/io";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Comments = ({ blogId }) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = auth;

  //post comments
  const handleCommentSumbit = async (e) => {
    if (loading) {
      console.log("loading");
      return;
    }
    e.preventDefault();
    if (!currentUser) {
      toast.error("Login To Comment");
      navigate("/login");
    }
    if (commentInput === "") {
      toast.error("Please Write Somthing");
    }
    try {
      setLoading(true);
      await addDoc(collection(db, "comments"), {
        timesTamp: serverTimestamp(),
        userId: currentUser.uid,
        author: currentUser.displayName,
        comment: commentInput,
        blogId,
      });
      setCommentInput("");
      toast.success("commented");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  //get comments
  useEffect(() => {
    if (blogId) {
      const commentsRef = collection(db, "comments");
      const commentsQuery = query(commentsRef, where("blogId", "==", blogId));

      const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
        const updatedComments = [];
        snapshot.forEach((doc) => {
          updatedComments.push({ id: doc.id, ...doc.data() });
        });
        setComments(updatedComments);
      });

      return () => unsubscribe();
    }
  }, [blogId]);

  // delete comment
  const handleDelete = async (commentId, userId) => {
    if (userId === currentUser.uid) {
      try {
        await deleteDoc(doc(db, "comments", commentId));
        toast.success("Comment Deleted Successfully");
      } catch (error) {
        console.log(error);
        toast.error("Somthing went wrong");
      }
    }
  };

  return (
    <section className="my-10">
      <div className="bg-black py-2 px-3">
        <p className="text-white font-bold text-sm">Post a comment</p>
      </div>
      <p className="text-sm my-3 italic">{comments?.length} comments</p>
      {!currentUser && (
        <Link
          to="/login"
          className="text-sm my-2 bg-blue-500 hover:bg-blue-400 transition-all duration-200 py-2 px-4 rounded text-white"
        >
          Loin to comment
        </Link>
      )}
      <form
        onSubmit={handleCommentSumbit}
        className="flex items-center gap-3 border outline-none my-5 py-2 px-4"
      >
        <input
          type="text"
          onChange={(e) => setCommentInput(e.target.value)}
          value={commentInput}
          className="w-full outline-none"
          placeholder="Comment here"
        />
        {loading ? (
          <span className="loader"></span>
        ) : (
          <button type="submit">
            <IoMdSend />
          </button>
        )}
      </form>

      {comments?.map((data) => (
        <SingleComment key={data?.id} data={data} handleDelete={handleDelete} />
      ))}
    </section>
  );
};

export default Comments;
