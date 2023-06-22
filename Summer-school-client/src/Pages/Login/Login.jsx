import React, { useState } from "react";
import { useForm } from "react-hook-form";
import loginbg from "../../assets/login/loginbg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../../Components/Login/SocialLogin";
import { useAuth } from "../../Hooks/useAuth";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const {login} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data.email, data.password)
    .then(res => {
      navigate(from, {replace:true})
    })
    .catch(err => {
      if(err.message.includes('wrong-password')){
        setError("Wrong Password")
      }
      else if(err.message.includes('user-not-found')){
        setError("Unregistered user. Please register!")
      }
      else(setError(""))
      console.log(err.message);
    })
  }


  return (
    <div style={{ backgroundImage: `url(${loginbg})` }} className="h-screen">
      <div className="w-full flex justify-center items-center h-full px-4">
        <div className="w-full lg:w-1/4 bg-base-100 px-6 py-8 rounded-lg shadow-lg">

        {/* form starts */}

          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email?.type==='required' && <p className="text-red-500 text-xs" role="alert">Email is required</p>}
              {errors.email?.type==='pattern' && <p className="text-red-500 text-xs" role="alert">Please Provide a valid email</p>}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPass?"text":"password"}
                placeholder="password"
                {...register("password", { required: true, minLength: 6})}
                className="input input-bordered"
              />
              {errors.password?.type==='required' && <p className="text-red-500 text-xs" role="alert">Password is required</p>}
              {errors.password?.type==='minLength' && <p className="text-red-500 text-xs" role="alert">minimum 6 characters</p>}
              <span onClick={()=>setShowPass(!showPass)} className="absolute top-1/2 right-0 -translate-x-2 translate-y-2 text-[#F9858F]">
                {
                    !showPass? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                }
              </span>
            </div>
            <p className="text-xs text-red-600 mt-2">{error}</p>
            <div className="form-control mt-6">
              <input
              type="submit"
              value='Login'
              className="btn-pink"
              />
            </div>
          </form>
        <div className="divider">Or</div>
        <SocialLogin></SocialLogin>
        <Link to="/register">
            <p className="text-center mt-4 text-ui-pink font-semibold hover:underline">
              New Here? Please Register
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
