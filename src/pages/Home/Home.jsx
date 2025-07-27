import React, { useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import LeftLoginRegisterForm from "../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";
import Navbar from "../../components/NavBar/NavBar";
const Home = () => {

    // const navigate = useNavigate();
    // const handleClose = async () => {
    //     navigate("/");
    // }

    return (
        <div>
            <Navbar/>
        </div>
    );
};

export default Home;
