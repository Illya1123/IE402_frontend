import React, { useState } from "react"

import AdminPanel from '../AdminPanel';
import AdminAccountList from "./AdminAccountList";
import AdminAccountForm from "./AdminAccountForm";

const AdminManageAccounts = () => {
    const [accounts, setAccounts] = useState([
        { id: 1, name: "Nguyễn Văn A", email: "nguyena@gmail.com", password: "hidden", role: "Nhân viên" }, 
        { id: 2, name: "Trần Thị B", email: "tranb@gmail.com", password: "hidden", role: "Khách hàng" },
        { id: 3, name: "Lê Minh C", email: "lec@gmail.com", password: "hidden", role: "Hướng dẫn viên" },
        { id: 4, name: "Đỗ Đức Phú", email: "phu@gmail.com", password: "hidden", role: "Quản lý" },
      ]);
      const [accountToEdit, setAccountToEdit] = useState(null);

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
    )
}

export default AdminManageAccounts