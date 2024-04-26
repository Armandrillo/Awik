import React from "react";
import AuthForm from "./authform";

const SignupPage: React.FC = () => {
  return (
    <div className="text-stone-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-medium text-stone-800 mb-7">
          Admin Sign-up
        </h2>
        <div className="mt-8">
          <AuthForm formType="signup" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
