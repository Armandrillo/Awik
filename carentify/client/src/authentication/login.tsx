import React, { useState } from "react";
import AuthForm from "./authform";

const LoginPage: React.FC = () => {
  return (
    <div className="bg-stone-800 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-stone-100 p-10 rounded-md">
        <h2 className="text-center text-2xl font-medium text-stone-800 mb-7">
          Admin Login
        </h2>
        <div className="mt">
          <AuthForm formType="login" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
