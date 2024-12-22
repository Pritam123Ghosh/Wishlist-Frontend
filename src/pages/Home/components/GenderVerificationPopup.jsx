/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Male from "../../../assets/malelogo-Photoroom.png";
import female from "../../../assets/femalelogo-Photoroom.png";

const GenderVerificationPopup = ({ onRoleSelect }) => {
  const [open, setOpen] = useState(true);

  const handleRoleSelection = (role) => {
    // Save the role in localStorage
    localStorage.setItem("role", role);
    // Close the dialog
    onRoleSelect(role);
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    Who are you in this Relationship?
                  </DialogTitle>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex flex sm:flex-row-reverse sm:px-6 justify-around">
              {/* Option for 'He' */}
              <div
                onClick={() => handleRoleSelection("he")}
                className="cursor-pointer"
              >
                <img src={Male} alt="Male" className="w-10 h-10" />
                <p className="text-center mt-1">He</p>
              </div>
              {/* Option for 'She' */}
              <div
                onClick={() => handleRoleSelection("she")}
                className="cursor-pointer"
              >
                <img src={female} alt="Female" className="w-10 h-10" />
                <p className="text-center mt-1">She</p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default GenderVerificationPopup;
