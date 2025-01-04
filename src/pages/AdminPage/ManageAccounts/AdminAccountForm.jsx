import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "../../../components/auth/auth.css";
import { baseUrl, signup } from "../../../api";
import { useState, useEffect } from "react";

const AdminAccountForm = ({ onSubmit, accountToEdit, clearEdit }) => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (accountToEdit) {
      formik.setValues({
        userType: accountToEdit.userType || "customer",
        email: accountToEdit.email || "",
        firstName: accountToEdit.firstName || "",
        lastName: accountToEdit.lastName || "",
        sdt: accountToEdit.sdt || "",
        password: "",
        confirmPassword: "",
        avatar: null,
        birthdate: accountToEdit.birthdate || "",
        address: accountToEdit.address || "",
        language: accountToEdit.language || "",
        role: accountToEdit.role || "1",
      });
    }
  }, [accountToEdit]);

  const formik = useFormik({
    initialValues: {
      userType: "1",
      email: "",
      firstName: "",
      lastName: "",
      sdt: "",
      password: "",
      confirmPassword: "",
      avatar: null,
      birthdate: "",
      address: "",
      language: "",
    },
    validationSchema: Yup.object({
      userType: Yup.string().required("Bắt buộc"),
      email: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Hãy nhập đúng định dạng email"
        ),
      firstName: Yup.string().required("Bắt buộc"),
      lastName: Yup.string().required("Bắt buộc"),
      sdt: Yup.string()
        .required("Bắt buộc")
        .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
      password: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,19}$/,
          "Mật khẩu phải chứa ít nhất 8 ký tự, một chữ cái, một số và một ký tự đặc biệt"
        ),
      confirmPassword: Yup.string()
        .required("Bắt buộc")
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp"),
      birthdate: Yup.date().required("Bắt buộc"),
      address: Yup.string().required("Bắt buộc"),
      language: Yup.string().required("Bắt buộc"),
    }),
    onSubmit: async (values) => {
      try {
        let avatarUrl = null;

        if (avatar) {
          const avatarData = new FormData();
          avatarData.append("avatar", avatar);

          const avatarResponse = await fetch(
            `${baseUrl}/upload-avatar`,
            {
              method: "POST",
              body: avatarData,
            }
          );
          const avatarResult = await avatarResponse.json();

          if (avatarResult.avatarUrl) {
            avatarUrl = avatarResult.avatarUrl;
          } else {
            throw new Error("Avatar upload failed");
          }
        }

        const data = {
          ...values,
          avatar: avatarUrl,
        };

        await signup(data);

        Swal.fire({
          title: "Thành công!",
          text: "Tài khoản đã được thêm thành công!",
          icon: "success",
          confirmButtonText: "OK",
        });

        formik.resetForm();
        setAvatar(null);
        if (clearEdit) clearEdit();
      } catch (error) {
        Swal.fire({
          title: "Lỗi!",
          text:
            error.response?.data?.message || "Đã xảy ra lỗi khi thêm tài khoản.",
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
      <form
        className="infoform"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <h1 className="text-xl font-bold text-center">{accountToEdit ? "Cập nhật Tài Khoản" : "Thêm Tài Khoản"}</h1>

        <label>Loại Người Dùng</label>
        <select
          name="userType"
          value={formik.values.userType}
          onChange={formik.handleChange}
        >
          <option value="1">Khách hàng</option>
          <option value="2">Hướng dẫn viên</option>
          <option value="0">Nhân viên</option>
          <option value="0">Admin</option>
        </select>
        {formik.errors.userType && (
          <p className="errorMsg">{formik.errors.userType}</p>
        )}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Nhập địa chỉ email"
        />
        {formik.errors.email && (
          <p className="errorMsg">{formik.errors.email}</p>
        )}

        <div className="name-fields">
          <div className="name-field">
            <label>Họ</label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              placeholder="Nhập họ"
            />
            {formik.errors.lastName && (
              <p className="errorMsg">{formik.errors.lastName}</p>
            )}
          </div>

          <div className="name-field">
            <label>Tên</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              placeholder="Nhập tên"
            />
            {formik.errors.firstName && (
              <p className="errorMsg">{formik.errors.firstName}</p>
            )}
          </div>
        </div>

        <div className="password-fields">
          <div className="password-field">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Nhập mật khẩu"
            />
            {formik.errors.password && (
              <p className="errorMsg">{formik.errors.password}</p>
            )}
          </div>

          <div className="password-field">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              placeholder="Xác nhận mật khẩu"
            />
            {formik.errors.confirmPassword && (
              <p className="errorMsg">{formik.errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-full">
            <label>Ngày sinh</label>
            <input
              type="date"
              name="birthdate"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              className="w-full"
            />
            {formik.errors.birthdate && (
              <p className="errorMsg">{formik.errors.birthdate}</p>
            )}
          </div>

          <div className="w-full">
            <label>Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder="Nhập địa chỉ"
              className="w-full"
            />
            {formik.errors.address && (
              <p className="errorMsg">{formik.errors.address}</p>
            )}
          </div>
        </div>

        <label>Số điện thoại</label>
        <input
          type="text"
          name="sdt"
          value={formik.values.sdt}
          onChange={formik.handleChange}
          placeholder="Nhập số điện thoại"
        />
        {formik.errors.sdt && <p className="errorMsg">{formik.errors.sdt}</p>}

        <label>Ngôn ngữ</label>
        <input
          type="text"
          name="language"
          value={formik.values.language}
          onChange={formik.handleChange}
          placeholder="Nhập ngôn ngữ"
        />
        {formik.errors.language && (
          <p className="errorMsg">{formik.errors.language}</p>
        )}

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
          {accountToEdit ? "Cập nhật" : "Thêm"} Tài Khoản
        </button>
      </form>
    </div>
  );
};

export default AdminAccountForm;
