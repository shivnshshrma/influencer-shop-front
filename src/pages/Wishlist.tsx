
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WishlistPage from "../components/WishlistPage";

const Wishlist = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <WishlistPage />
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
