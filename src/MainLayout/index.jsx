import Navbar from "./Navbar/Navbar";
import Footer from "./footer/Footer";

const withLayout = (Page) => {
  return () => (
    <div>
      <Navbar />
      <Page />
      <Footer />
    </div>
  );
};

export default withLayout;
