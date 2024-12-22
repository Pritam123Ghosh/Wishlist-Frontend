/* eslint-disable react/prop-types */
import { useState } from "react";
import { createWish } from "../store/dataSlice";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CreateWish = ({ onWishCreated }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const dispatch = useDispatch();

  const handleAddTask = async () => {
    const role = localStorage.getItem("role"); // Retrieve the role from localStorage

    if (task.trim() && role) {
      const newWish = {
        text: task,
        role,
      };

      setLoading(true); // Set loading state to true

      try {
        await dispatch(createWish(newWish)).unwrap();

        if (onWishCreated) {
          onWishCreated(); // Notify parent to refresh WishList
        }

        // Show success snackbar
        setSnackbar({
          open: true,
          message: "Wish created successfully!",
          severity: "success",
        });

        setTask(""); // Reset the input field
      } catch (error) {
        // Show error snackbar if creation fails
        setSnackbar({
          open: true,
          message: error.message || "Failed to create wish. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      console.error("Task or role is missing!");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center rounded-full bg-gray-100 px-4 py-2 shadow-md w-11/12 sm:w-full max-w-2xl">
        <textarea
          className="flex-grow bg-gray-100 border-none outline-none resize-none text-sm text-gray-500"
          rows={1}
          placeholder="Make a Wish..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          disabled={loading} // Disable input while loading
        />
        <button
          className={`ml-4 text-white text-sm font-medium px-4 py-2 rounded-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#147fdc] hover:bg-blue-600 transition-colors"
          }`}
          onClick={handleAddTask}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateWish;
