import React, { useState } from "react";
import SectionTitle from "../../Shared/SectionTitle";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import axios from "axios";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Toast } from "../../utils/Toast";

const imgHostingToken = import.meta.env.VITE_IMAGE_API;
const AddClass = () => {
  const [axiosSecure] = useAxiosSecure();  
  const imgHostingURL = `https://api.imgbb.com/1/upload?key=${imgHostingToken}`; 
  const { user } = useAuth();
//   const [buttonText, setButtonText] = useState("Upload Image");
  const {register, handleSubmit, formState: { errors },} = useForm();

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('image', data.image[0]);

    axios.post(imgHostingURL, formData)
    .then(res => {
        if(res.data.success){
            const imgURL = res?.data?.data?.display_url;
            const {courseName, instructorName, instructorEmail, availableSeats, price } = data;
            const newClass = {courseName, instructorName, instructorEmail, availableSeats: parseInt(availableSeats), price: parseFloat(price), enrolled:0, status: "pending", image:imgURL};
            console.log(newClass);
            axiosSecure.post('/classes', newClass)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
                    Toast("Class added! Wait for approval.")
                }
            })
        }
    })
  };

  //handle image upload
//   const handleImage = (event) => {
//     const imgTitle = event.target.files[0].name;
//     setButtonText(imgTitle.slice(0, 12) + "..." + imgTitle.slice(-6));
//     console.log(imgTitle);
//   };

  return (
    <div>
      <SectionTitle
        title={"Add a Class"}
        sub={"Share your knowledge across the world & help people to grow"}
      ></SectionTitle>
      <div className="flex justify-center items-center my-12">
        <div className="bg-ui-pink bg-opacity-30 rounded-lg px-6 py-4 lg:w-2/3 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Class Name*</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  {...register("courseName", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500" role="alert">
                    Required Field
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Instructor</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered"
                  {...register("instructorName")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered"
                  {...register("instructorEmail")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="price"
                  className="input input-bordered"
                  {...register("price", { required: true, min: 0 })}
                />
                {errors.price?.type === "required" && (
                  <p className="text-red-500" role="alert">
                    Required field
                  </p>
                )}
                {errors.price?.type === "min" && (
                  <p className="text-red-500" role="alert">
                    Minimum price should be 0
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Available seats* </span>
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="available seats"
                  className="input input-bordered"
                  {...register("availableSeats", { required: true })}
                />
              </div>
              {/* <div className="form-control">
                <label className="mt-4">
                  <p className="label-text">Photo URL*</p>
                  <input
                    {...register("image", { required: true })}
                    onChange={handleImage}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="cursor-pointer border-2 border-ui-pink text-black bg-white font-medium px-4 py-1.5 rounded-lg hover:shadow-lg">{buttonText}</div>
                </label>
              </div> */}
              <div className="form-control">
              <label className="mt-4">
                  <p className="label-text">Photo URL*</p>
                  </label>
              <input type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered file-input-primary text-ui-pink text-center w-full" />
              </div>
            </div>
            <div className="text-center my-4 form-control">
              <input type="submit" value={"Add Class"} className="btn-pink" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
