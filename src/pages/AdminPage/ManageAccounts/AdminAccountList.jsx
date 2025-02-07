import React, { useState } from "react";

const AdminAccountList = ({ accounts, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const mapUserTypeToRole = (userType) => {
    switch (userType) {
      case "1":
        return "Người dùng";
      case "2":
        return "Hướng dẫn viên";
      case "3":
        return "Nhân viên";
      default:
        return "Không xác định";
    }
  };

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.firstName.toLowerCase().includes(search.toLowerCase()) ||
      acc.email.toLowerCase().includes(search.toLowerCase()) ||
      mapUserTypeToRole(acc.userType).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded-md"
      />
      <div className="max-h-60 overflow-y-auto rounded-lg shadow-md border border-gray-300">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left">Tên Tài Khoản</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Vai trò</th>
              <th className="py-3 px-4 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account) => (
                <tr key={account.id} className="border-b">
                  <td className="py-3 px-4">{account.lastName} {account.firstName}</td>
                  <td className="py-3 px-4">{account.email}</td>
                  <td className="py-3 px-4">{mapUserTypeToRole(account.userType)}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                  Không có tài khoản nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminAccountList;
