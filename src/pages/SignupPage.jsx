import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useChatContext } from "../context/ChatContext";

function SignupPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState("boy");
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useChatContext();

  async function signupHandler() {
    setLoading(true);
    try {
      const data = await axios.post("/api/users/signup", {
        username,
        email,
        password,
        gender,
      });
      if (data.error) {
        setError(data.error);
        console.log(data);
      } else {
        console.log(data);
        setError("");
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        setUser(data.data);
      }
    } catch (error) {
      setError("Check the console");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function submitHandler(event) {
    event.preventDefault();
    let valid = true;
    let error = "";
    if (!username) {
      valid = false;
      error += "Username cannot be empty \n";
    }
    if (!email) {
      valid = false;
      error += "\n Email cannot be empty \n";
    }
    if (!gender) {
      valid = false;
      error += "\n Select a gender \n";
    }
    if (!password) {
      valid = false;
      error += "\n Password cannot be empty \n";
    }
    if (valid) {
      signupHandler();
    } else {
      setError(error);
    }
  }

  return (
    <>
      <div className={`toast toast-top toast-center ${error ? "" : "hidden"}`}>
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
      <form
        className="bg-violet-600 p-4 rounded-lg min-w-96 text-center"
        onSubmit={submitHandler}
      >
        <h2 className="text-purple-100 w-full p-2 text-lg font-bold border-b-2 border-violet-300">
          Signup
        </h2>
        <label className="input input-bordered flex items-center gap-2 mt-4 bg-violet-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-4 bg-violet-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="daisy@site.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-4 bg-violet-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            className="grow"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <div className="flex mt-4 w-full justify-center">
          <select
            className="select select-bordered w-full  bg-violet-100"
            value={gender}
            onChange={(event) => {
              setGender(event.target.value);
            }}
          >
            <option value={"boy"}>Male</option>
            <option value={"girl"}>Female</option>
          </select>
        </div>
        <Link
          to={"/login"}
          className="text-sm text-purple-200 block mt-2 text-left ml-2 hover:text-purple-100"
        >
          Account already exists?
        </Link>
        <button
          className="mt-4 btn bg-violet-800 border-0 hover:bg-violet-700 w-full shadow-md text-purple-200"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Signup"
          )}
        </button>
      </form>
    </>
  );
}

export default SignupPage;
