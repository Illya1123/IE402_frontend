// api/customer.js
import axios from "axios";

const getUserById = async(id) => {
    try {
        // Get token from local storage
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
      } catch (error) {
        console.error(
          "Fetch failed:",
          error.response ? error.response.data : error.message,
        );
        throw error;
      }
};

const getCustomerById = async(id) => {
    try {
        // Get token from local storage
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/customers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
      } catch (error) {
        console.error(
          "Fetch failed:",
          error.response ? error.response.data : error.message,
        );
        throw error;
      }
};

export { getUserById, getCustomerById };