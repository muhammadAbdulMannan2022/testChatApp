import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { DbContext } from "../../Providers/Functions";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { whiteUserDataInDb } = useContext(DbContext);
  const navigate = useNavigate();
  const { setLoading, loginWithGoogle, loginWithEmailPassword } =
    useContext(AuthContext);

  // for login and signin
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((userRef) => {
        setLoading(false);
        const { uid, displayName, email, photoURL } = userRef.user;
        whiteUserDataInDb(uid, displayName, email, photoURL);
        navigate("/");
      })
      .catch((err) => {
        console.log(err, "in google login");
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    console.log(email.value, password.value);
    loginWithEmailPassword(email.value, password.value)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex  flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-blue-200 p-0 sm:p-4"
      >
        <h1 className="text-4xl text-center mb-4">Sign In</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            placeholder="Email"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            placeholder="Password"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <span
            className="inline-block align-baseline font-bold text-sm text-gray-500"
            href="#"
          >
            Don't have an account?{" "}
            <Link className="hover:text-blue-800 text-blue-500" to="/signup">
              sign in
            </Link>
          </span>
        </div>
        <div className="flex items-center justify-center flex-col border-gray-300 pt-8">
          <hr
            style={{ height: "3px" }}
            className="w-2/3 bg-black rounded mb-4"
          />
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="bg-white flex items-center justify-center gap-2 border border-gray-400 rounded py-2 px-4 text-gray-700 hover:bg-gray-100"
          >
            <FaGoogle className="text-blue-500" /> Login with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
