import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const AdminSidebar = () => {

return (
    <div className="flex min-h-screen">
      <div className="w-1/5 bg-gray-800 text-white p-4">
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
          <Link to="/admin/customers" className="hover:bg-gray-700 p-2 rounded">Customers</Link>
          {/* <Link to="/admin/orders" className="hover:bg-gray-700 p-2 rounded">Orders</Link> */}
          <Link to="/admin/create-product" className="hover:bg-gray-700 p-2 rounded">Create Product</Link>
          <Link to="/admin/create-category" className="hover:bg-gray-700 p-2 rounded">Create Category</Link>
        </nav>
      </div>
      <div className="flex-grow bg-gray-100 p-4">
        <Outlet />
      </div>
    </div>
  );
}
