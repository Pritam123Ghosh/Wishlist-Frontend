/* eslint-disable react/prop-types */
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { motion, AnimatePresence } from "framer-motion";

const LoveButton = ({ onClick, initiallyLiked }) => {
  const [liked, setLiked] = useState(initiallyLiked);

  const handleToggle = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    if (onClick) {
      onClick(newLikedState);
    }
  };

  return (
    <IconButton
      onClick={handleToggle}
      aria-label={liked ? "Unlike" : "Like"}
      size="small"
    >
      <AnimatePresence mode="wait">
        {liked ? (
          <motion.span
            key="liked"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1.4, 0.9, 1], opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <FavoriteIcon style={{ color: "#E0245E", fontSize: "1rem" }} />
          </motion.span>
        ) : (
          <motion.span
            key="unliked"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FavoriteBorderIcon style={{ fontSize: "1rem" }} />
          </motion.span>
        )}
      </AnimatePresence>
    </IconButton>
  );
};

export default LoveButton;
