

import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import React from 'react'
import { Route, Routes } from 'react-router-dom';



const MainRoutes = () => {
    return (

        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default MainRoutes;

