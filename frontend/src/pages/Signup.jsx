import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  console.log(signup);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password Dont Match!");
    }
    if (email === "" && password === "" && userName === "")
      toast.error("All field requied");
    try {
      setError(false);
      setLoading(true);
      await signup(email, password, userName);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="flex w-full items-center justify-center mt-16">
      <div className="w-[400px] md:w-[500px] lg:w-[700px] py-10 px-7 border border-cream rounded-md bg-secondry">
        <h1 className="text-center text-2xl">Sign Up</h1>
        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="text"
            className="border outline-none rounded-md w-full py-3 px-4"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            className="border mt-4 outline-none rounded-md w-full py-3 px-4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border mt-4 outline-none rounded-md w-full py-3 px-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="border mt-4 outline-none rounded-md w-full py-3 px-4"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfrimPassword(e.target.value)}
          />
          <div className="flex items-center justify-center mt-5">
            <button
              type="submit"
              className={`text-white  py-2 px-4 rounded-md hover:bg-primary/90 transition-all duration-200  ${
                loading ? "bg-primary/40" : "bg-primary"
              }`}
              disabled={loading}
            >
              Sign up
            </button>
          </div>
          <p className="text-center mt-3">
            Already have account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
