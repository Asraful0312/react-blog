import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./shared/Header";
import { Layout } from "./shared/Layout";
import Footer from "./shared/footer";
import PostDetails from "./components/posts/PostDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTopOnPageChange from "./shared/ScrollToTopOnPageChange";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Toaster />
        <ScrollToTopOnPageChange />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
