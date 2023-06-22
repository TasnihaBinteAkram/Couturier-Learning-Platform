import { toast } from "react-hot-toast";

export const Toast = (text) =>{
    return toast.success(text, {
        style: {
          border: "1px solid #F9858F",
          padding: "16px",
          color: "#F9858F",
        },
        iconTheme: {
          primary: "#F9858F",
          secondary: "#ffd9f1",
        },
      });
}