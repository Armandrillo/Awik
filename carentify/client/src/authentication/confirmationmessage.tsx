import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <p className="text-center text-sm text-gray-600">
        A password reset link has been sent to your email. Please check your
        inbox.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Back to Login
      </button>
    </div>
  );
};

export default ConfirmationMessage;
