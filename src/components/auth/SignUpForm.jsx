import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "./auth.css";
import { signup } from "../../api";
import { useState } from "react";

const SignupForm = () => {
  const [avatar, setAvatar] = useState(null); // State to hold avatar file

  const formik = useFormik({
    initialValues: {
      email: "",
      sdt: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      address: "",
      avatar: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("Bắt buộc")
        .min(1, "Bắt buộc phải trên 1 ký tự"),
      lastName: Yup.string()
        .required("Bắt buộc")
        .min(1, "Bắt buộc phải trên 1 ký tự"),
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Hãy nhập đúng định dạng email"
        ),
      sdt: Yup.string()
        .matches(/^\d{10}$/, "Số điện thoại phải là 10 ký tự số"),
      password: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,19}$/,
          "Mật khẩu phải chứa ít nhất 8 ký tự, một chữ cái, một số và một ký tự đặc biệt"
        ),
      confirmPassword: Yup.string()
        .required("Bắt buộc")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
      birthdate: Yup.string().required("Bắt buộc"),
      address: Yup.string().required("Bắt buộc"),
    }),
    onSubmit: async (values) => {
      try {
        let avatarUrl = null;

        // Step 1: Upload the avatar first, if available
        if (avatar) {
          const avatarData = new FormData();
          avatarData.append("avatar", avatar);

          const avatarResponse = await fetch("http://localhost:5000/upload-avatar", {
            method: "POST",
            body: avatarData,
          });
          const avatarResult = await avatarResponse.json();

          if (avatarResult.avatarUrl) {
            avatarUrl = avatarResult.avatarUrl;
          } else {
            throw new Error("Avatar upload failed");
          }
        }

        // Step 2: Create data object for signup
        const data = {
          userType: "1", // Customer type
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          sdt: values.sdt,
          password: values.password,
          confirmPassword: values.confirmPassword,
          birthdate: values.birthdate,
          address: values.address,
          avatar: avatarUrl, // Include avatar URL if uploaded
        };

        // Step 3: Submit the signup data
        const response = await signup(data);

        if (response.status === "success") {
          Swal.fire({
            title: "Success!",
            text: "You have successfully registered!",
            icon: "success",
            confirmButtonText: "OK",
          });
          formik.resetForm();
          setAvatar(null); // Reset avatar after successful registration
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]); // Update avatar file when user selects a file
  };

  return (
    <div className="form-container">
      <form className="infoform" onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <h1>Đăng ký</h1>

        <label>Tên</label>
        <input
          type="text"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          placeholder="Enter your first name"
        />
        {formik.errors.firstName && <p className="errorMsg">{formik.errors.firstName}</p>}

        <label>Họ và tên đệm</label>
        <input
          type="text"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          placeholder="Enter your last name"
        />
        {formik.errors.lastName && <p className="errorMsg">{formik.errors.lastName}</p>}

        <label>Địa chỉ email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email"
        />
        {formik.errors.email && <p className="errorMsg">{formik.errors.email}</p>}

        <label>Số điện thoại</label>
        <input
          type="text"
          name="sdt"
          value={formik.values.sdt}
          onChange={formik.handleChange}
          placeholder="Enter your phone number"
        />
        {formik.errors.sdt && <p className="errorMsg">{formik.errors.sdt}</p>}

        <label>Ngày sinh</label>
        <input
          type="date"
          name="birthdate"
          value={formik.values.birthdate}
          onChange={formik.handleChange}
        />
        {formik.errors.birthdate && <p className="errorMsg">{formik.errors.birthdate}</p>}

        <label>Địa chỉ</label>
        <input
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          placeholder="Enter your address"
        />
        {formik.errors.address && <p className="errorMsg">{formik.errors.address}</p>}

        <label>Mật khẩu</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
        />
        {formik.errors.password && <p className="errorMsg">{formik.errors.password}</p>}

        <label>Xác nhận mật khẩu</label>
        <input
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          placeholder="Confirm your password"
        />
        {formik.errors.confirmPassword && <p className="errorMsg">{formik.errors.confirmPassword}</p>}

        <label>Ảnh đại diện</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
        />

        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className={`submit-button ${formik.isValid && formik.dirty ? "active" : ""}`}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
