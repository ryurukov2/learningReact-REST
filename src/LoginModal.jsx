import React, { useState } from "react";

export function LoginModal({ setLoginModalClicked, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [formType, setFormType] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const loginFetch = (fetchData) => {
    fetch("https://radoslavy.pythonanywhere.com/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchData),
    })
      .then((r) => {
        // console.log(r.headers)
        return r.json()})
      .then((data) => {
        if (data.status === 200) {
          // console.log(data.data.Token);
          localStorage.setItem("authorizationToken", data.data.Token);
          setIsLoggedIn(true);
          setLoginModalClicked(false);
        } else {
          setErrorMessage(data.message);
          console.log(errorMessage);
          throw Error(
            `Login failed. Status - ${data.status}. Error - ${data.message}`
          );
        }
      })
      .catch((e) => console.error(e));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    let fetchData = {
      username: username,
      password: password,
    };
    loginFetch(fetchData);
  };
  const handleSignupSubmit = (event) => {
    event.preventDefault();
    if (!(signupUsername && signupEmail && signupPassword)) {
      return;
    }
    let fetchData = {
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
    };
    fetch("https://radoslavy.pythonanywhere.com/auth/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchData),
    })
      .then((r) => {
        if (r.status === 201) {
          const loginFetchData = {
            username: signupUsername,
            password: signupPassword,
          };
          loginFetch(loginFetchData);
        } else {
          setSignupErrorMessage("Sign up unsuccessfufl.");
        }
      })
      .then((r) => r.json())
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-80 flex items-center justify-center"
        onClick={() => setLoginModalClicked(false)}
      >
        <div
          className="relative rounded-2xl w-80 p-10 h-fit border-2 bg-gray-700 flex bg-opacity-100 justify-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {" "}
          <div className="flex w-fit ">
            <div
              className={`transform transition-transform duration-500 ease-in-out ${
                formType === "signup" ? "-translate-x-full" : "translate-x-full"
              } mr-20`}
            >
              <form
                onSubmit={handleLoginSubmit}
                className="w-36 justify-center text-center"
              >
                <label>
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </label>{" "}
                <label>
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </label>
                {errorMessage ? (
                  <div className="text-red-400">{errorMessage}</div>
                ) : null}
                <button
                  type="submit"
                  className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log In
                </button>
                <p className="mt-2 text-sm">
                  Don't have an account yet?{" "}
                  <span
                    className="text-indigo-500 cursor-pointer"
                    onClick={() => setFormType("signup")}
                  >
                    Sign Up
                  </span>
                </p>
              </form>
            </div>

            <div
              className={`transform transition-transform duration-500 ease-in-out ${
                formType === "signup" ? "-translate-x-full" : "translate-x-full"
              } ml-16`}
            >
              <form
                onSubmit={handleSignupSubmit}
                className="w-36 justify-center text-center"
              >
                <label>
                  Username:
                  <input
                    type="text"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </label>{" "}
                <label>
                  Email:
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </label>{" "}
                <label>
                  Password:
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </label>
                {signupErrorMessage !== "" ? (
                  <div className="text-red-400">{signupErrorMessage}</div>
                ) : null}
                <button
                  type="submit"
                  className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
                <p className="mt-2 text-sm">
                  Already have an account?{" "}
                  <span
                    className="text-indigo-500 cursor-pointer"
                    onClick={() => setFormType("login")}
                  >
                    Log In
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
