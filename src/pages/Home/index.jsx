import { useState, useEffect } from "react";
import CreateWish from "./components/CreateWish";
import GenderVerificationPopup from "./components/GenderVerificationPopup";
import WishList from "./components/Wishlist";
import Wishreducer from "./store";
import { injectReducer } from "../../store";

injectReducer("wish", Wishreducer);

export const TextRevealTW = () => {
  const text = "Happy Birthday Juthika 💫❤️";

  return (
    <h1 className="overflow-hidden text-2xl font-bold leading-6 text-blue-100">
      {text.match(/./gu)?.map((char, index) => (
        <span
          className="animate-text-reveal inline-block [animation-fill-mode:backwards]"
          key={`${char}-${index}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [refreshWishList, setRefreshWishList] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [showTextReveal, setShowTextReveal] = useState(false);

  useEffect(() => {
    // Show the popup only if no role exists in localStorage
    if (!role) {
      setShowPopup(true);
    }
  }, [role]);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole); // Update role in state
    localStorage.setItem("role", selectedRole); // Persist role in localStorage
    setShowPopup(false); // Close the popup

    if (selectedRole === "she") {
      // Trigger the animation
      setShowTextReveal(true);

      // Hide animation after 3 seconds
      setTimeout(() => {
        setShowTextReveal(false);
      }, 8000);
    }
  };

  const handleWishCreated = () => {
    setRefreshWishList((prev) => !prev);
  };

  return (
    <>
      {showTextReveal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <TextRevealTW />
        </div>
      )}
      {!showTextReveal && (
        <>
          {showPopup && (
            <GenderVerificationPopup onRoleSelect={handleRoleSelection} />
          )}
          <CreateWish onWishCreated={handleWishCreated} />
          <br />
          <WishList refreshTrigger={refreshWishList} />
        </>
      )}
    </>
  );
};

export default Home;
