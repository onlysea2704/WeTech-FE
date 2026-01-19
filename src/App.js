import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/User/LoginForm/LoginForm";
import RegisterForm from "./pages/User/RegisterForm/RegisterForm";
import ForgotPassword from "./pages/User/ForgotPassword/ForgotPassword";
import UpdatePassword from "./pages/User/UpdatePassword/UpdatePassword";
import Home from "./pages/User/Home/Home";
import ListCourses from "./pages/User/ListCourses/ListCourses";
import CourseFilter from "./pages/User/CourseFilter/CourseFilter";
import DetailCourse from "./pages/User/DetailCourse/DetailCourse";
import ListProcedures from "./pages/User/ListProcedures/ListProcedures";
import ContactUs from "./pages/User/ContactUs/ContactUs";
import Profile from "./pages/User/Profile/Profile";
import NotFoundPage from "./pages/User/NotFoundPage/NotFoundPage";
import FaqPage from "./pages/User/FaqPage/FaqPage";
import ProcessProcedure from "./pages/User/ProcessProcedure/ProcessProcedure";
import RegisterPayment from "./pages/User/RegisterPayment/RegisterPayment";
import ScanQR from "./pages/User/ScanQR/ScanQR";
import DashBoard from "./pages/Admin/DashBoard/DashBoard";
import ListCustomer from "./pages/Admin/ListCustomer/ListCustomer";
import Transactions from "./pages/Admin/Transactions/Transactions";
import ListCourse from "./pages/Admin/ListCourse/ListCourse";
import CourseManager from "./pages/Admin/CourseManager/CourseManager";
import MyCourses from "./pages/User/MyCourses/MyCourses";
import ChangePassword from "./pages/User/ChangePassword/ChangePassword";
import CartPage from "./pages/User/CartPage/CartPage";
import ChatWidget from "./components/ChatWidget/ChatWidget";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/list-courses" element={<ListCourses />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/course-filter/:category" element={<CourseFilter />} />
                <Route path="/detail-course/:courseId" element={<DetailCourse />} />
                <Route path="/list-procedures/:typeProcedure" element={<ListProcedures />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/not-found" element={<NotFoundPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/register-payment/:idTransaction" element={<RegisterPayment />} />
                <Route path="/process-procedure/:id_procedure" element={<ProcessProcedure />} />
                <Route path="/scan-qr/:idTransaction" element={<ScanQR />} />

                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/list-customer" element={<ListCustomer />} />
                <Route path="/sales" element={<Transactions />} />
                <Route path="/list-course" element={<ListCourse />} />
                <Route path="/manage-course/:courseId" element={<CourseManager />} />
                <Route path="/cart" element={<CartPage />} />

                {/* <Route path="/coursedetail">
          <Route path=":id_course" element={<CourseDetail />} />
          <Route path=":id_course/lesson/:id_lesson" element={<Lesson />} />
        </Route>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/progress/:id_course" element={<Progress />} /> */}

                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ChatWidget />
        </Router>
    );
}

export default App;
