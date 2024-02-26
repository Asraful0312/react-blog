import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import { FiInbox } from "react-icons/fi";
import ProgressBar from "@ramonak/react-progress-bar";
import { db, storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

const categories = ["Fashion", "Bussiness", "Sports"];

const Create = () => {
  const [tagInputValue, setTagInputValue] = useState("");
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [progress, setProgress] = useState(null);
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(null);
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(false);

  const handletagsubmit = (e) => {
    e.preventDefault();
    if (tags?.length >= 5) {
      toast.error("Maximun 5 tags");
    } else if (tags.some((tag) => tag === tagInputValue)) {
      toast.error("Can't add duplicate tag");
    } else if (tagInputValue === "") {
      toast.error("Can't add empty tag");
    } else {
      setTags((prev) => [tagInputValue, ...prev]);
      setTagInputValue("");
    }
  };

  const handleCategoryAdd = (e) => {
    e.preventDefault();
    console.log(e);

    if (categories.some((c) => c === categoryInputValue)) {
      toast.error("Can't add duplicate Category");
    } else if (!categoryInputValue) {
      console.log("empty");
      toast.error("Can't add Empty Category");
    } else {
      console.log("no");
      toast.success("Added 😊");
      categories.unshift(categoryInputValue);
      setCategoryInputValue("");
    }
  };

  const handleDeleteTag = (name) => {
    const newtags = tags.filter((tag) => tag !== name);
    setTags(newtags);
  };

  const handlePost = async () => {
    if (selectedCategory && tags && title && description && image) {
      if (!id) {
        try {
          setLoading(true);
          await addDoc(collection(db, "blogs"), {
            timesTamp: serverTimestamp(),
            userId: currentUser.uid,
            author: currentUser.displayName,
            title,
            description,
            featured,
            imageUrl: image,
            tags,
            category: selectedCategory,
          });
          setLoading(false);
          toast.success("Blog Created Successfully");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          setLoading(true);
          await updateDoc(doc(db, "blogs", id), {
            timesTamp: serverTimestamp(),
            userId: currentUser.uid,
            author: currentUser.displayName,
            title,
            description,
            featured,
            category: selectedCategory,
          });
          setLoading(false);
          toast.success("Blog Updated Successfully");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.error("All field requied");
    }
  };

  useEffect(() => {
    id && getSingleBlog();
  }, [id]);

  const getSingleBlog = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const blogData = snapshot.data();
      const { title, description, featured, imageUrl, tags, category } =
        blogData || {};

      setTitle(title);
      setTags(tags);
      setDescription(description);
      setFeatured(featured);
      setImage(imageUrl);
      setSelectedCategory(category);
    }
  };

  //image upload
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, get the download URL
          setImage(null);
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadUrl) => {
              console.log("img", downloadUrl);
              toast.success("Image uploaded Successfully");
              setImage(downloadUrl);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    };
    image && typeof image === "object" && uploadFile();
  }, [image]);

  return (
    <section className="w-4/5 mx-auto shadow-lg mt-10 border px-5 py-7">
      {/* title and description */}
      <form>
        <label htmlFor="title">{id ? "Update" : "Create"}</label>
        <input
          id="title"
          type="text"
          className="w-full border p-2 px-4 mt-3 mb-8"
          placeholder="blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <Editor
          apiKey="lcu6mkoot2giuuo4905u21u1qi988cyp0k628owp6avycspm"
          value={description}
          onEditorChange={(newValue, editor) => setDescription(newValue)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; margin-top: 12px; }",
          }}
        />

        {/* upolad image */}
        <div className="mt-5">
          <h1>Image</h1>
          <div className="bg-white w-full rounded-lg mt-3">
            <input
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="file"
              accept=".jpg, .jpeg, .png"
            />
            <label
              htmlFor="file"
              className="border border-[#D9D9D9] bg-[#FAFAFA] flex items-center justify-center flex-col h-48"
            >
              <FiInbox className="text-primary text-4xl mb-5" />
              <p>Click or drag file to this area to upload</p>
              <span className="text-icon text-sm mb-2">
                Support for a single upload
              </span>
              {!image && progress !== null && (
                <ProgressBar
                  width="300px"
                  completed={progress}
                  height="15px"
                  bgColor="#53e960"
                  labelColor="#f4f3f3"
                />
              )}
            </label>
          </div>
        </div>

        <h1 className="mt-7">Featured?</h1>
        <div className="flex items-center gap-5">
          <div>
            <label htmlFor="featured">{featured ? "Yes" : "No"}</label>
            <input
              type="checkbox"
              checked={featured}
              onChange={() => setFeatured(!featured)}
              className="ml-2"
              id="featured"
            />
          </div>
        </div>

        <div className="my-5">
          <h1 className="mb-3">Category</h1>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-3 rounded-md px-4"
          >
            <option>Select a Category</option>
            {categories?.map((item) => (
              <option
                selected={item === selectedCategory}
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </form>
      {/* add categories */}
      <div className="mt-4">
        <label htmlFor="categories">Add Categories</label>
        <form
          onSubmit={handleCategoryAdd}
          className="flex items-center gap-3 mt-3"
        >
          <input
            type="text"
            id="categories"
            value={categoryInputValue}
            onChange={(e) => setCategoryInputValue(e.target.value)}
            className="w-full border p-2 px-4"
            placeholder="add categories"
          />
          <input
            type="submit"
            className="bg-green-500 text-white py-1 px-3 rounded"
            value="Add"
          />
        </form>
      </div>
      {/* add tags */}
      <div className="mt-7">
        <label htmlFor="tags ">Tags</label>
        <div className="flex flex-wrap gap-3 mt-3 mb-4 items-center">
          {tags?.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-3 cursor-pointer border py-1 px-3 rounded text-ash bg-gray-100 "
            >
              <h1 className="text-sm">{tag}</h1>
              <h1 className="text-lg" onClick={() => handleDeleteTag(tag)}>
                x
              </h1>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handletagsubmit} className="flex items-center gap-3">
        <input
          type="text"
          id="tags"
          value={tagInputValue}
          onChange={(e) => setTagInputValue(e.target.value)}
          className="w-full border p-2 px-4"
          placeholder="add tag"
        />
        <input
          type="submit"
          className="bg-green-500 text-white py-1 px-3 rounded"
          value="Add"
        />
      </form>
      {/* post to the database */}
      {id ? (
        <div className="flex justify-end mt-8">
          <button
            onClick={handlePost} // Move onClick to button element
            disabled={loading}
            className={`text-white py-1 px-7 rounded ${
              loading ? "bg-green-500/50" : "bg-green-500"
            }`}
            type="submit"
          >
            Update
          </button>
        </div>
      ) : (
        <div className="flex justify-end mt-8">
          <button
            onClick={handlePost} // Move onClick to button element
            disabled={loading || !image}
            className={`text-white py-1 px-7 rounded ${
              loading || !image ? "bg-green-500/50" : "bg-green-500"
            }`}
            type="submit"
          >
            Create
          </button>
        </div>
      )}
    </section>
  );
};

export default Create;
