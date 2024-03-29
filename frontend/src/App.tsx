import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import {Alert} from "@mui/material";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/*' element={<Alert severity='info'>Такой страницы не существует</Alert>}/>
    </Routes>
  );
}

export default App;
