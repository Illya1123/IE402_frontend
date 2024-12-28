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
        const response = await axios.get("https://ie402-backend.onrender.com/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data);

        const users = response.data?.data?.rows || [];
        setAccounts(users);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setAccounts([]);
      }
    };

    fetchAccounts();
  }, []);

  const addOrUpdateAccount = (account) => {
    if (accountToEdit) {
      setAccounts(
        accounts.map((acc) =>
          acc.id === accountToEdit.id ? { ...acc, ...account } : acc
        )
      );
    } else {
      setAccounts([
        ...accounts,
        { ...account, id: Math.random().toString(36).substr(2, 9) },
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
