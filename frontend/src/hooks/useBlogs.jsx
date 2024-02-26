import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);

  //get blogs from firebase firestore
  useEffect(() => {
    const unSub = onSnapshot(
      query(collection(db, "blogs"), orderBy("timesTamp", "desc")),
      (snapshot) => {
        let list = [];
        setError(false);
        setLoading(true);
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        console.log(error);
        setError(true);
      }
    );

    return () => unSub();
  }, []);
  return {
    error,
    blogs,
    loading,
  };
};

export default useBlogs;
