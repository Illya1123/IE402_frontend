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

export { api, signup };