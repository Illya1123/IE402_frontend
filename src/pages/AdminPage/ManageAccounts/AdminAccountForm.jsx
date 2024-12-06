import React, { useState, useEffect } from "react";

const AdminAccountForm = ({ onSubmit, accountToEdit, clearEdit }) => {
  const [account, setAccount] = useState({ id: "", name: "", email: "" });

  useEffect(() => {
    if (accountToEdit) {
      setAccount(accountToEdit);
    }
  }, [accountToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(account);
    setAccount({ id: "", name: "", email: "" });
    if (clearEdit) clearEdit();
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className="max-w-2xl relative grid gap-4 bg-gray-100 p-8 m-4 rounded-lg shadow-lg border-t border-l border-r border-b border-gray-200"
    >
      <input
        type="text"
        name="name"
        placeholder="Họ và tên"
        value={account.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Địa chỉ Email"
        value={account.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={account.password}
        onChange={handleChange}
        required
      />
      <label htmlFor="role">Chọn vai trò:</label>
      <select name="role" value={account.role} onChange={handleChange}>
        <option value="customer">Khách hàng</option>
        <option value="guide">Hướng dẫn viên</option>
        <option value="employee">Nhân viên</option>
        <option value="admin">Quản lý</option>
      </select>
      <button 
        type="submit"
        className="bg-slate-950 px-2.5 py-1.5 border-2 border-solid border-transparent focus:outline-none transition-shadow duration-300 ease-[cubic-bezier(0.075,_0.82,_0.165,_1)]"
      >{accountToEdit ? "Cập nhật" : "Thêm"} Tài Khoản</button>
    </form>
  );
};

export default AdminAccountForm;
