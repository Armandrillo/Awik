import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type FormType = "login" | "signup" | "forgotPassword";

interface AuthFormProps {
  formType: FormType;
}

export type Account = {
  accountId: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const AuthForm: React.FC<AuthFormProps> = ({ formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const baseUrl = `http://localhost:3000/api/account`;
    let postData = {
      email,
      password,
      ...(formType === "signup" && { firstName, lastName }),
    };
    let url = `${baseUrl}/${formType}`;

    axios
      .post(url, postData)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/admin");
        } else {
          console.log("Authenticated, but no token received");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-stone-700"
        >
          Email address
        </label>
        <input
          type="email"
          required
          className="mt-1 block w-full p-3 rounded-md border border-stone-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {formType !== "forgotPassword" && (
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-stone-700"
          >
            Password
          </label>
          <input
            type="password"
            required
            className="mt-1 block w-full p-3 rounded-md border border-stone-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formType === "login" && (
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="underline text-sm font-medium text-stone-600 self-end"
              >
                Forgot Password?
              </button>
            </div>
          )}
        </div>
      )}

      {formType === "signup" && (
        <>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-stone-700"
            >
              First Name
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full p-3 rounded-md border border-stone-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-stone-700"
            >
              Last Name
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full p-3 rounded-md border border-stone-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="flex flex-col space-y-3">
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {formType === "login"
            ? "Login"
            : formType === "signup"
            ? "Sign-up"
            : "Reset Password"}
        </button>
        {formType !== "forgotPassword" && (
          <button
            type="button"
            onClick={() =>
              navigate(formType === "login" ? "/signup" : "/login")
            }
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {formType === "login" ? "Sign-up" : "Login"}
          </button>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
