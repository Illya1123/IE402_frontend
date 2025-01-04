import axios from 'axios';

// online: https://ie402-backend.onrender.com
// local: http://localhost:5000
const baseUrl = `http://localhost:5000`

const signup = async (param) => {
  // Tạo object data với các trường bắt buộc
  const data = {
    userType: param.userType,
    firstName: param.firstName,
    lastName: param.lastName,
    email: param.email,
    sdt: param.sdt,
    password: param.password,
    confirmPassword: param.confirmPassword,
    birthdate: param.birthdate,
    address: param.address,
  };

  // Kiểm tra xem có avatar không, nếu có thì thêm vào data
  if (param.avatar) {
    data.avatar = param.avatar;
  }
  else {
    data.avatar = null;
  }

  try {
    const response = await axios.post(`${baseUrl}/auth/signup/`, data);
    console.log("Signup successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response ? error.response.data : error.message);
    throw error;
  }
};


  const signin = async (param) => {
    const data = {
      email: param.email,
      password: param.password,
    };
  
    try {
      const response = await axios.post(`${baseUrl}/auth/login/`, data);
      console.log("Signin successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Signin failed:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

export { baseUrl, signup, signin };