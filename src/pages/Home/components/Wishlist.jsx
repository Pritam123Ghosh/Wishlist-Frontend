/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  achieveWish,
  deleteWish,
  getWishList,
  reactWish,
  updateWish,
} from "../store/dataSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Empty from "../../../utils/Empty";
import GeometrySkeleton from "../../../utils/Skeleton";
import BaseService from "../../../services/BaseService";
import { motion } from "framer-motion";
import LoveButton from "./LoveButton";
const backendURL = BaseService.defaults.baseURL;
const WishList = ({ refreshTrigger }) => {
  const dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") || "guest";

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [openDialog, setOpenDialog] = useState(false); // State for controlling dialog visibility
  const [selectedWish, setSelectedWish] = useState(null); // State to hold the selected wish for deletion
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [popupWish, setPopupWish] = useState(null); // For the popup
  const [updatedText, setUpdatedText] = useState("");
  const [updatingId, setUpdatingId] = useState(null); // ID of wish being updated
  const [deletingId, setDeletingId] = useState(null); // ID of wish being deleted
  const data = useSelector((state) => state.wish?.data?.wishList?.data);
  const { isLoading } = useSelector((state) => ({
    isLoading: state.wish?.data?.loading,
  }));

  useEffect(() => {
    if (userID && role) {
      dispatch(getWishList({ userID })); // Dispatch the getWishList action with userID and role
    } else {
      console.warn("User ID or Role is missing.");
    }
  }, [dispatch, userID, role, refreshTrigger]);

  const handleEdit = (item) => {
    setSelectedWish(item); // Set the wish to be edited
    setUpdatedText(item.text); // Populate the form with the current text
    setOpenEditDialog(true); // Open the edit dialog
  };

  const handleUpdate = async () => {
    try {
      setUpdatingId(selectedWish._id);
      await dispatch(
        updateWish({ id: selectedWish._id, text: updatedText, role })
      ).unwrap();
      setSnackbar({
        open: true,
        message: "Wish updated successfully!",
        severity: "success",
      });
      dispatch(getWishList({ userID })); // Refresh the wish list
      setOpenEditDialog(false); // Close the edit dialog
    } catch (error) {
      console.error("Failed to delete wish:", error);

      // Check for 403 error code
      if (error.message === "Request failed with status code 403") {
        const message = "You are not authorized to edit this wish.";
        setOpenEditDialog(false);
        setSnackbar({
          open: true,
          message: message,
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: error.message || "Failed to edit wish. Please try again.",
          severity: "error",
        });
      }
    } finally {
      setUpdatingId(null); // Reset updating ID
    }
  };

  const handleAchieve = async (item) => {
    try {
      await dispatch(achieveWish({ id: item._id, isAchieved: true })).unwrap();
      setSnackbar({
        open: true,
        message: "Wish marked as achieved!",
        severity: "success",
      });
      dispatch(getWishList({ userID })); // Refresh the wish list
    } catch (error) {
      console.error("Failed to mark wish as achieved:", error);

      setSnackbar({
        open: true,
        message:
          error.message || "Failed to mark as achieved. Please try again.",
        severity: "error",
      });
    }
  };

  const handleDeleteConfirmation = (item) => {
    setSelectedWish(item); // Set the selected wish to be deleted
    setOpenDialog(true); // Open the dialog
  };

  const handleDelete = async () => {
    try {
      setDeletingId(selectedWish._id); // Set the deleting ID
      await dispatch(deleteWish({ id: selectedWish._id, role })).unwrap();
      setSnackbar({
        open: true,
        message: "Wish deleted successfully!",
        severity: "success",
      });

      dispatch(getWishList({ userID })); // Refresh the wish list
      setOpenDialog(false); // Close the dialog
    } catch (error) {
      console.error("Failed to delete wish:", error);

      // Check for 403 error code
      if (error.message === "Request failed with status code 403") {
        const message = "You are not authorized to delete this wish.";
        setOpenDialog(false);
        setSnackbar({
          open: true,
          message: message,
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: error.message || "Failed to delete wish. Please try again.",
          severity: "error",
        });
      }
    } finally {
      setDeletingId(null); // Reset deleting ID
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without doing anything
  };

  // const handleShowWish = async (id) => {
  //   try {
  //     const fetchedWish = await dispatch(getOneWish(id)).unwrap(); // Get the fetched wish directly
  //     setPopupWish(fetchedWish?.data); // Set the fetched wish to the popup state

  //   } catch (error) {
  //     console.error("Failed to fetch wish:", error);
  //     setSnackbar({
  //       open: true,
  //       message: "Failed to fetch wish. Try again.",
  //       severity: "error",
  //     });
  //   }
  // };
  const handleShowWish = async (id) => {
    try {
      const response = await fetch(
        `${backendURL}/api/messages/getMessage/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch wish: ${response.statusText}`);
      }

      const fetchedWish = await response.json(); // Parse the JSON response
      setPopupWish(fetchedWish.data); // Set the fetched data to the popup state
    } catch (error) {
      console.error("Error fetching wish:", error);
      setSnackbar({
        open: true,
        message: error.message || "Failed to fetch wish. Try again.",
        severity: "error",
      });
    }
  };

  const handleClosePopup = () => {
    setPopupWish(null); // Close the popup
  };

  const handleReact = async (wishId, isReacted) => {
    try {
      await dispatch(reactWish({ id: wishId, isReacted })).unwrap();
    } catch (error) {
      console.error("Failed to react to wish:", error);
      setSnackbar({
        open: true,
        message: error.message || "Failed to react to wish. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -20,
        },

        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 1, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-md sm:mx-auto rounded-lg mx-2">
        {isLoading ? (
          // Render skeletons while loading
          <ul className="divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
              <li key={index} className="p-4">
                <GeometrySkeleton />
              </li>
            ))}
          </ul>
        ) : data && data.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {data.map((item) => (
              <li key={item._id} className="flex items-center p-4 space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 bg-blue-200 text-gray-600 rounded-full flex items-center justify-center font-bold text-base">
                  {item.role}
                </div>

                {/* Content */}
                <div
                  className="flex-grow cursor-pointer"
                  onClick={() => handleShowWish(item._id)}
                >
                  <h4 className="text-sm font-semibold text-gray-800">
                    {item.text.split(" ").length > 4
                      ? item.text.split(" ").slice(0, 4).join(" ") + "..."
                      : item.text}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button>
                    <LoveButton
                      initiallyLiked={item.isReacted}
                      onClick={(liked) => handleReact(item._id, liked)}
                    />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <CiEdit />
                  </button>
                  <button
                    onClick={() => handleAchieve(item)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <GoChecklist />
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(item)} // Trigger delete confirmation
                    className="text-red-500 hover:text-red-700"
                  >
                    <CiTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Empty description="No wishes available" />
        )}
        {popupWish && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
              {/* Close Icon */}
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                onClick={handleClosePopup}
                aria-label="Close"
              >
                ✖
              </button>

              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Wish Details
              </h2>
              <p className="text-sm text-gray-600">{popupWish?.text}</p>
            </div>
          </div>
        )}
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
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
            openEditDialog ? "block" : "hidden"
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
            {/* Dialog Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Wish
            </h2>

            {/* Dialog Content */}
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
              rows={2}
            ></textarea>

            {/* Dialog Actions */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setOpenEditDialog(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updatingId === selectedWish?._id}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                {updatingId === selectedWish?._id ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
        {/* Confirmation Dialog */}
        {openDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
              {/* Dialog Title */}
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Deletion
              </h2>

              {/* Dialog Content */}
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this wish?
              </p>

              {/* Dialog Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deletingId === selectedWish?._id}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  {deletingId === selectedWish?._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WishList;
