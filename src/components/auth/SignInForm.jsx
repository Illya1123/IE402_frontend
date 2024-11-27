import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import "./auth.css";
import { useDispatch } from 'react-redux';
import { setCurrentUserAction} from '../../store/actions/index'
import { signin } from "../../api";

const SignInForm = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: Yup.object({
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
          }),
          onSubmit: async (values) => {
            try {
              const response = await signin(values);
              if (response.status === "success") {
                Swal.fire({
                  title: "Success!",
                  text: "You have successfully sign in!",
                  icon: "success",
                  confirmButtonText: "OK",
                });
                dispatch(setCurrentUserAction(response.token));
                formik.resetForm();
              }
            } catch (error) {
              Swal.fire({
                title: "Error!",
                text: error.response?.data?.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          },
        });
    return (
        <div className="form-container">
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <h1>Đăng nhập</h1>
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

export default SignInForm;