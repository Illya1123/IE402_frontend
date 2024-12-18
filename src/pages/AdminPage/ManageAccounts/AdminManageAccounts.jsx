import React, { useState, useEffect } from "react";
import axios from "axios";

import AdminPanel from "../AdminPanel";
import AdminAccountList from "./AdminAccountList";
import AdminAccountForm from "./AdminAccountForm";

const AdminManageAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [accountToEdit, setAccountToEdit] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Log API response for debugging
        console.log("API Response:", response.data);

        // Extract rows safely
        const users = response.data?.data?.rows || []; // Default to an empty array if not found
        setAccounts(users);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setAccounts([]); // Default to an empty array in case of an error
      }
    };

    fetchAccounts();
  }, []);

  const addOrUpdateAccount = (account) => {
    if (accountToEdit) {
      // Update an existing account
      setAccounts(
        accounts.map((acc) =>
          acc.id === accountToEdit.id ? { ...acc, ...account } : acc
        )
      );
    } else {
      // Add a new account
      setAccounts([
        ...accounts,
        { ...account, id: Math.random().toString(36).substr(2, 9) }, // Generate random ID for new account
      ]);
    }
    setAccountToEdit(null);
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  const editAccount = (account) => {
    setAccountToEdit(account);
  };

  return (
    <div className="flex h-[1000px]">
      <div className="h-screen w-1/4">
        <AdminPanel />
      </div>
      <div className="w-3/4 h-screen flex-1 text-start text-xl space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý tài khoản</h1>
        <AdminAccountForm
          onSubmit={addOrUpdateAccount}
          accountToEdit={accountToEdit}
          clearEdit={() => setAccountToEdit(null)}
        />
        <AdminAccountList
          accounts={accounts}
          onEdit={editAccount}
          onDelete={deleteAccount}
        />
      </div>
    </div>
  );
};

export default AdminManageAccounts;
