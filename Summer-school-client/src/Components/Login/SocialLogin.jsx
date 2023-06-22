import React, { useContext } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import { addUser } from "../../api/manageUsers";

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        const user = res.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "student",
        };

        axios
          .put(`https://couturier-server.vercel.app/users/${user.email}`, userData)
          .then((res) => {
          })
          .catch((err) => {
            console.log(err.message);
          });

        navigate(from, { replace: true });
        // addUser(userData)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="text-center mt-2 flex justify-center gap-4">
      <button
        onClick={handleGoogleLogin}
        className="bg-gray-200 h-12 w-12 text-2xl rounded-full pb-1"
      >
        <FcGoogle className="inline-flex"></FcGoogle>
      </button>
      <button className="bg-gray-200 h-12 w-12 text-2xl rounded-full pb-1 text-blue-800">
        <FaFacebook className="inline-flex"></FaFacebook>
      </button>
    </div>
  );
};

export default SocialLogin;
