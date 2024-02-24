import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);

  //get blogs from firebase firestore
  useEffect(() => {
    setLoading(true);
    const unSub = onSnapshot(collection(db, "blogs"), (snapshot) => {
      let list = [];
      setError(false);
      // setLoading(!blogs && false);
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        setBlogs(list);
      }),
        (error) => {
          setLoading(false);
          console.log(error);
          setError(true);
        };
      setLoading(false);
    });

    return () => unSub();
  }, []);
  console.log("l", loading);

  return {
    error,
    blogs,
    loading,
  };
};

export default useBlogs;
