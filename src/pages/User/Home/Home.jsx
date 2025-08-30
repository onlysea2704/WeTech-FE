import React from "react";
import "./Home.css";
// import { Link, useNavigate } from "react-router-dom";
// import LeftLoginRegisterForm from "../../../components/LeftLoginRegisterForm/LeftLoginRegisterForm";
import Navbar from "../../../components/NavBar/NavBar";
import Hero from "../../../components/Hero/Hero";
import TopProcedures from "../../../components/TopProcedures/TopProcedures";
import About from "../../../components/About/About";
import Services from "../../../components/Services/Services";
import Customers from "../../../components/Customers/Customers";
import Footer from "../../../components/Footer/Footer";
// import imageRegister from "../../../assets/image-register-home.jpg";

const Home = () => {

    // const navigate = useNavigate();
    // const handleClose = async () => {
    //     navigate("/");
    // }

    return (
        <div>
            <Navbar />
            <Hero />
            <TopProcedures />
            <About />
            <Services />
            <Customers />
            <div className="register-section">
                <p>Learn more about our listing process, as well as our additional staging and design work.</p>
                <button>Đăng ký ngay</button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
