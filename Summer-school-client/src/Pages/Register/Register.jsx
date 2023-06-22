//TODO gender, phone, address

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import loginbg from "../../assets/login/loginbg.png";
import regimg from "../../assets/login/register.png";
import { useAuth } from "../../Hooks/useAuth";
import axios from "axios";
const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const[showError, setError] = useState("");
  const {signUp, logOut, updateUser} = useAuth();
  const navigate = useNavigate();
  const {register,handleSubmit,formState: { errors },} = useForm();
  const onSubmit = (formData) => {
    console.log(formData);
    if(formData.password !== formData.confirmPass){
      setError("Password did not match")
    }
    else{
      setError("");
      signUp(formData.email, formData.password)
      .then(result => {
        logOut()
        .then(() => {})
        .catch((err) => {});
        navigate('/login')
        updateUser(formData.name, formData.photo)
        .then(updateInfo => {})
        .catch(err => console.log(err.message))

        //add user to database
        const user ={
          name: formData.name,
          email: formData.email,
          photo: formData.photo,
          role: "student"
        };

        axios.put(`https://couturier-server.vercel.app/users/${formData.email}`, user)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.message);
        })
        
      })
      .catch(error => {
        console.log(error);
        if (error.message.includes("weak-password")){
          setError("Password must be 6 characters")
        }
        else if(error.message.includes('email-already-in-use')){
          setError("Email is already registered")
        }
      })
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${loginbg})` }}
      className="min-h-[calc(100vh+200px)] flex justify-center items-center"
    >
      <div className=" bg-base-100 lg:flex items-center gap-4 px-4 py-6 rounded-xl shadow-lg">
        <div className="w-1/2 hidden lg:block">
          <img src={regimg} alt="" className=""/>
        </div>
        <div className="w-full lg:w-1/2 px-4 lg:px-8 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name*</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name", { required: true, maxLength: 80 })}
              />
              {errors.name && <p className="text-red-500 text-xs" role="alert">Name is required</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL*</span>
              </label>
              <input
                type="url"
                placeholder="photo url"
                className="input input-bordered"
                {...register("photo")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email*</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                  minLength: 6,
                })}
                />
                {errors.email && <p className="text-red-500 text-xs" role="alert">Email is required</p>}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPass?"text":"password"}
                placeholder="password"
                {...register("password", { required: true, minLength: 6, pattern:/^(?=.*[A-Z])(?=.*[.,+-_^!@#$%^&*])(?=.{6,})/})}
                className="input input-bordered"
              />
              {errors.password?.type==='required' && <p className="text-red-500 text-xs" role="alert">Password is required</p>}
              {errors.password?.type==='minLength' && <p className="text-red-500 text-xs" role="alert">minimum 6 characters</p>}
              {errors.password?.type === 'pattern' && <p className="text-red-500 text-xs" role="alert">Password must have at least one capital letter & special character</p>}
              <span onClick={()=>setShowPass(!showPass)} className="absolute top-1/2 right-0 -translate-x-2 translate-y-2 text-[#F9858F]">
                {
                    !showPass? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>
                }
              </span>
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("confirmPass", { required: true, minLength: 6})}
                className="input input-bordered"
              />
            </div>
            {<p className="text-xs text-red-600">{showError}</p>}
            <div className="form-control">
              <input
                type="submit"
                value={"Register"}
                className={`btn-pink mt-4`}
              />
            </div>
          </form>
          <div className="divider text-ui-pink">Or</div>
          <Link to="/login">
            <p className="text-center mt-4 text-ui-pink font-semibold hover:underline">
              Already Registered? Please Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
