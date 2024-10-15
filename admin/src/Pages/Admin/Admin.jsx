import React from 'react'
import Sidebar from '../../Components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct'
import ListProduct from '../../Components/ListProduct'
import SupportData from '../../Components/SupportData'
import RegistrationData from '../../Components/RegistrationData'
import ProductQuantity from '../../Components/ProductQuantity'

const Admin = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-grow p-4">
        <Routes>
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/listproduct' element={<ListProduct />} />
          <Route path='/supportdata' element={<SupportData />} />
          <Route path='/registrationdata' element={<RegistrationData />}/>
          <Route path='/productquantity' element={<ProductQuantity />}/>
        </Routes>
      </div>
    </div>
  )
}

export default Admin
