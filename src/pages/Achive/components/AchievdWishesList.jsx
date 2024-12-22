import { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { deleteWish, getAchievedWishList } from "../store/dataSlice";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import GeometrySkeleton from "../../../utils/Skeleton";
import Empty from "../../../utils/Empty";
import BaseService from "../../../services/BaseService";
const backendURL = BaseService.defaults.baseURL;
const AchievdWishesList = () => {
  const role = localStorage.getItem("role") || "guest";
  const token = localStorage.getItem("token");
  // const data = useSelector((state) => state.wish?.data?.achievedWishList?.data);
  const data = useSelector(
    (state) => state.achievedWish?.data?.achievedWishList?.data
  );
  const { isLoading } = useSelector((state) => ({
    isLoading: state.achievedWish?.data?.loading,
  }));
  console.log(data);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [openDialog, setOpenDialog] = useState(false); // State for controlling dialog visibility
  const [selectedWish, setSelectedWish] = useState(null); // State to hold the selected wish for deletion
  const [popupWish, setPopupWish] = useState(null); // For the popup

  const [deletingId, setDeletingId] = useState(null);
  // const oneWish = useSelector((state) => state.wish?.data?.oneWish?.data);
  useEffect(() => {
    if (role) {
      dispatch(getAchievedWishList()); // Dispatch the getWishList action with userID and role
    } else {
      console.warn("User ID or Role is missing.");
    }
  }, [dispatch, role]);

  const handleDeleteConfirmation = (item) => {
    setSelectedWish(item); // Set the selected wish to be deleted
    setOpenDialog(true); // Open the dialog
  };

  const handleDelete = async () => {
    try {
      setDeletingId(selectedWish._id);
      await dispatch(deleteWish({ id: selectedWish._id, role })).unwrap();
      setSnackbar({
        open: true,
        message: "Wish deleted successfully!",
        severity: "success",
      });

      dispatch(getAchievedWishList()); // Refresh the wish list
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
      console.log("Fetched Wish:", fetchedWish);
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

  return (
    <div className="max-w-md mx-auto bg-white shadow-sm rounded-lg">
      {isLoading ? (
        // Render skeleton loaders while data is loading
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
              <div className="flex-shrink-0 w-10 h-10 bg-green-200 text-gray-600 rounded-full flex items-center justify-center font-bold text-base">
                {item.role}
              </div>
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
                <div className="flex text-xs">
                  <p className="text-green-700 mr-1 font-bold">Achieved On:</p>
                  <p className="text-green-500">
                    {new Date(item.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDeleteConfirmation(item)}
                  className="text-red-500 hover:text-red-700"
                >
                  <CiTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Empty message="No achieved wishes available." />
      )}

      {/* Snackbar */}
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

      {/* Popup */}
      {popupWish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
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

      {/* Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this wish?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
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
  );
};

export default AchievdWishesList;
