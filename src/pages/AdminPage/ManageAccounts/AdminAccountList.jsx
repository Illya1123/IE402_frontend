import React, { useState } from "react";

const AdminAccountList = ({ accounts, onEdit, onDelete }) => {
    const [search, setSearch] = useState("");

    const filteredAccounts = accounts.filter(
      (acc) =>
        acc.name.toLowerCase().includes(search.toLowerCase()) ||
        acc.email.toLowerCase().includes(search.toLowerCase()) ||
        acc.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <input
                type="text"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
                <thead>
                <tr className="bg-gray-200">
                    <th className="py-3 px-4 text-left">Tên Tài Khoản</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Mật khẩu</th>
                    <th className="py-3 px-4 text-left">Vai trò</th>
                    <th className="py-3 px-4 text-center">Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {filteredAccounts.map((account) => (
                    <tr key={account.id} className="border-b">
                    <td className="py-3 px-4">{account.name}</td>
                    <td className="py-3 px-4">{account.email}</td>
                    <td className="py-3 px-4">{account.password}</td>
                    <td className="py-3 px-4">{account.role}</td>
                    <td className="py-3 px-4 text-center">
                        <button
                            onClick={() => onEdit(account)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                        >
                        Cập Nhật
                        </button>
                        <button
                            onClick={() => onDelete(account.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                        >
                        Xóa
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default AdminAccountList