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
      mapUserTypeToRole(acc.userType)
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-md border p-2"
      />
      <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-300 shadow-md">
        <table className="min-w-full table-auto bg-white">
          <thead className="sticky top-0 z-10 bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Tên Tài Khoản</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Vai trò</th>
              <th className="px-4 py-3 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account) => (
                <tr key={account.id} className="border-b">
                  <td className="px-4 py-3">
                    {account.lastName} {account.firstName}
                  </td>
                  <td className="px-4 py-3">{account.email}</td>
                  <td className="px-4 py-3">
                    {mapUserTypeToRole(account.userType)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => onEdit(account)}
                      className="rounded-md bg-yellow-500 px-4 py-2 text-white"
                    >
                      Cập Nhật
                    </button>
                    <button
                      onClick={() => onDelete(account.id)}
                      className="ml-2 rounded-md bg-red-500 px-4 py-2 text-white"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
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
