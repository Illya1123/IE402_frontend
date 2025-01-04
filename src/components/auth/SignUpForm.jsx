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

        if (avatar) {
          const avatarData = new FormData();
          avatarData.append("avatar", avatar);

          const avatarResponse = await fetch("https://ie402-backend.onrender.com/upload-avatar", {
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
          avatar: avatarUrl,
        };

        const response = await signup(data);

        if (response.status === "success") {
          Swal.fire({
            title: "Success!",
            text: "You have successfully registered!",
            icon: "success",
            confirmButtonText: "OK",
          });
          formik.resetForm();
          setAvatar(null);
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
    setAvatar(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <form className="infoform" onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <h1 className="text-xl font-bold text-center mb-4">Đăng ký</h1>

        <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
            <label>Họ và tên đệm</label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              placeholder="Enter your last name"
              className="input-field"
            />
            {formik.errors.lastName && <p className="errorMsg">{formik.errors.lastName}</p>}
          </div>

          <div className="w-1/2">
            <label>Tên</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              placeholder="Enter your first name"
              className="input-field"
            />
            {formik.errors.firstName && <p className="errorMsg">{formik.errors.firstName}</p>}
          </div>
        </div>

        <label>Địa chỉ email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email"
        />
        {formik.errors.email && <p className="errorMsg">{formik.errors.email}</p>}

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label>Số điện thoại</label>
            <input
              type="text"
              name="sdt"
              value={formik.values.sdt}
              onChange={formik.handleChange}
              placeholder="Enter your phone number"
              className="input-field"
            />
            {formik.errors.sdt && <p className="errorMsg">{formik.errors.sdt}</p>}
          </div>
          <div className="w-1/2">
            <label>Ngày sinh</label>
            <input
              type="date"
              name="birthdate"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              className="input-field"
            />
            {formik.errors.birthdate && <p className="errorMsg">{formik.errors.birthdate}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label>Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder="Enter your address"
            className="input-field"
          />
          {formik.errors.address && <p className="errorMsg">{formik.errors.address}</p>}
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Enter your password"
              className="input-field"
            />
            {formik.errors.password && <p className="errorMsg">{formik.errors.password}</p>}
          </div>
          <div className="w-1/2">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              placeholder="Confirm your password"
              className="input-field"
            />
            {formik.errors.confirmPassword && <p className="errorMsg">{formik.errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label>Ảnh đại diện</label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="input-field"
          />
        </div>

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
