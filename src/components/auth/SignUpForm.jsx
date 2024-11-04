import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "./signup.css";
import { signup } from "../../api";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
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
      password: Yup.string()
        .required("Bắt buộc")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,19}$/,
          "Mật khẩu phải chứa ít nhất 8 ký tự, một chữ cái, một số và một ký tự đặc biệt"
        ),
      confirmPassword: Yup.string()
        .required("Bắt buộc")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await signup(values);
        if (response.status === "success") {
          Swal.fire({
            title: "Success!",
            text: "You have successfully registered!",
            icon: "success",
            confirmButtonText: "OK",
          });
          formik.resetForm();
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Registration failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  return (
    <div className="form-container">
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <h1>Đăng ký</h1>
        <label> Tên </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          placeholder="Enter your first name"
        />
        {formik.errors.firstName && (
          <p className="errorMsg"> {formik.errors.firstName} </p>
        )}
        <label> Họ và tên đệm </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          placeholder="Enter your last name"
        />
        {formik.errors.lastName && (
          <p className="errorMsg"> {formik.errors.lastName} </p>
        )}
        <label> Địa chỉ email </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email"
        />
        {formik.errors.email && (
          <p className="errorMsg"> {formik.errors.email} </p>
        )}
        <label> Mật khẩu </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
        />
        {formik.errors.password && (
          <p className="errorMsg"> {formik.errors.password} </p>
        )}
        <label> Xác nhận mật khẩu </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          placeholder="Confirm your password"
        />
        {formik.errors.confirmPassword && (
          <p className="errorMsg"> {formik.errors.confirmPassword} </p>
        )}
        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className={`submit-button ${
            formik.isValid && formik.dirty ? "active" : ""
          }`}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
