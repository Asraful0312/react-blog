import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === "" && password === "") {
      toast.error("All field requied");
    }
    try {
      setError(false);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full items-center justify-center mt-16">
      <div className="w-[400px] md:w-[500px] lg:w-[700px] py-10 px-7 border border-cream rounded-md bg-secondry">
        <h1 className="text-center text-2xl">Login</h1>
        <form onSubmit={handleSubmit} className="mt-5">
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
          <div className="flex items-center justify-center mt-5">
            <input
              type="submit"
              className={`text-white  py-2 px-4 rounded-md hover:bg-primary/90 transition-all duration-200 bg-primary`}
              value="Login"
            />
          </div>

          {error && (
            <p className="text-red-500 text-center">There is an Error!</p>
          )}
          <p className="text-center mt-3">
            Don't have account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
