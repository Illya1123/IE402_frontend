import axios from 'axios';

const api = `http://localhost:5000/`

const signup = async (param) => {
    const data = {
      userType: "1",
      firstName: param.firstName,
      lastName: param.lastName,
      email: param.email,
      password: param.password,
      confirmPassword: param.confirmPassword,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/auth/signup/', data);
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
      const response = await axios.post('http://localhost:5000/auth/login/', data);
      console.log("Signin successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Signin failed:", error.response ? error.response.data : error.message);
      throw error;
    }
  };

export { api, signup, signin };