import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./shared/Header";
import { Layout } from "./shared/Layout";
import Footer from "./shared/footer";
import PostDetails from "./components/posts/PostDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTopOnPageChange from "./shared/ScrollToTopOnPageChange";

function App() {
  return (
    <>
      <Header />
      <ScrollToTopOnPageChange />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
