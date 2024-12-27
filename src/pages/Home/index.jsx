import { useState, useEffect } from "react";
import CreateWish from "./components/CreateWish";
import GenderVerificationPopup from "./components/GenderVerificationPopup";
import WishList from "./components/Wishlist";
import Wishreducer from "./store";
import { injectReducer } from "../../store";

injectReducer("wish", Wishreducer);

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [refreshWishList, setRefreshWishList] = useState(false); // State to trigger refresh
  const [role] = useState(localStorage.getItem("role")); // Get user role from localStorage

  useEffect(() => {
    if (!role) {
      setShowPopup(true); // Show popup if no role is found
    }
  }, [role]);

  const handleWishCreated = () => {
    setRefreshWishList((prev) => !prev); // Toggle state to trigger refresh
  };

  return (
    <>
      {showPopup && <GenderVerificationPopup />}
      <CreateWish onWishCreated={handleWishCreated} />
      <br />
      <WishList refreshTrigger={refreshWishList} />
    </>
  );
};

export default Home;
