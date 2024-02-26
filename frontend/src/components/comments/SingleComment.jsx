import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import { serverTimestamp, doc, updateDoc, getDoc } from "firebase/firestore";
import { auth } from "../../firebase";

const SingleComment = ({ data, handleDelete }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [replyLoading, setReplayLoading] = useState(false);
  const { comment, timesTamp, author, id, replies, userId } = data || {};
  const { currentUser } = auth;

  const handleReply = async (e) => {
    e.preventDefault();

    if (replyLoading) {
      console.log(replyLoading);
      return;
    }

    if (replyInput === "") {
      toast.error("Please add a reply");
      return;
    }

    setReplayLoading(true);
    try {
      // Fetch current replies array
      const docRef = doc(db, "comments", id);
      const docSnap = await getDoc(docRef);
      const currentReplies = docSnap.data().replies || [];

      // Append new reply to current replies array
      const newReply = {
        reply: replyInput,
        author: currentUser?.displayName,
        commentId: id,
      };
      const updatedReplies = [...currentReplies, newReply];

      // Update document with updated replies array
      await updateDoc(docRef, {
        timesTamp: serverTimestamp(),
        replies: updatedReplies,
      });

      toast.success("Replied successfully");
      setReplyInput("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to reply");
    } finally {
      setReplayLoading(false);
    }
  };

  // const handleReply = async (e) => {
  //   e.preventDefault();

  //   if (loading) {
  //     console.log(loading);
  //     return;
  //   }

  //   if (replyInput === "") {
  //     toast.error("Please add a reply");
  //     return; // Return early if replyInput is empty
  //   }

  //   setLoading(true); // Set loading state before asynchronous operation

  //   try {
  //     await addDoc(collection(db, "replies"), {
  //       timesTamp: serverTimestamp(),
  //       reply: replyInput,
  //       commentId: id,
  //       author,
  //       user: currentUser.displayName,
  //     });

  //     toast.success("Replied successfully");
  //     setReplyInput("");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to reply"); // Notify user of error
  //   } finally {
  //     setLoading(false); // Set loading state to false after asynchronous operation completes
  //   }
  // };

  //get comments
  // useEffect(() => {
  //   if (id) {
  //     const repliesRef = collection(db, "replies");
  //     const repliesQuery = query(
  //       repliesRef,
  //       where("commentId", "==", id),
  //       orderBy("timesTamp", "asc")
  //     );

  //     const unsubscribe = onSnapshot(repliesQuery, (snapshot) => {
  //       const updatedReplis = [];
  //       snapshot.forEach((doc) => {
  //         updatedReplis.push({ id: doc.id, ...doc.data() });
  //       });
  //       setReplies(updatedReplis);
  //     });

  //     // Unsubscribe from the listener when component unmounts or when blogId changes
  //     return () => unsubscribe();
  //   }
  // }, [id]);

  const handleShowReply = () => {
    setShowReply(!showReply);
  };

  return (
    <div className="mb-5">
      <div className="flex gap-4">
        <img
          className="w-10 h-10 rounded-full"
          src="/images/1.jpg"
          alt="user"
        />
        <div>
          <p>{author}</p>
          <p className="text-xs text-gray-400 italic mb-4">
            {timesTamp?.toDate().toDateString()}
          </p>
          <p className="text-sm mb-2">{comment}</p>
          <div className="flex items-center gap-2 mb-5">
            <button
              onClick={handleShowReply}
              className="text-xs py-1 px-2 text-black bg-gray-100 border hover:bg-primary hover:text-white transition-all duration-200"
            >
              Replies
            </button>
            {userId === currentUser?.uid && (
              <button
                onClick={() => handleDelete(id, userId)}
                className="text-xs py-1 px-2 text-black bg-gray-100 border hover:bg-primary hover:text-white transition-all duration-200"
              >
                Delete
              </button>
            )}
          </div>

          {/* replay */}
          {showReply && (
            <div>
              <form
                onSubmit={handleReply}
                className="flex items-center gap-3 border outline-none my-5 py-2 px-4"
              >
                <input
                  onChange={(e) => setReplyInput(e.target.value)}
                  value={replyInput}
                  type="text"
                  className="w-full outline-none"
                  placeholder="replay"
                />
                {replyLoading ? (
                  <span className="loader"></span>
                ) : (
                  <button type="submit">
                    <IoMdSend />
                  </button>
                )}
              </form>
              {replies?.map((reply) => (
                <div key={reply?.id}>
                  <div className="flex gap-4 mt-5">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="/images/1.jpg"
                      alt="user"
                    />

                    <div>
                      <p>{reply?.author}</p>
                      <p className="text-xs text-gray-400 italic mb-4">
                        {timesTamp?.toDate().toDateString()}
                      </p>
                      <p className="text-sm mb-2">
                        {" "}
                        <span className="text-sm font-bold italic">{`@${author}`}</span>{" "}
                        {reply?.reply}
                      </p>
                      {/* <div className="flex items-center gap-2">
                        <button
                          onClick={() => deleteReply(index)}
                          className="text-xs py-1 px-2 text-black bg-gray-100 border hover:bg-primary hover:text-white transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
