import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/NavBar/NavBar";
import LoginForm from "./pages/LoginForm/LoginForm";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import Home from "./pages/Home/Home";
import Courses from "./pages/Course/Course";
import CourseFilter from "./pages/CourseFilter/CourseFilter";
import DetailCourse from "./pages/DetailCourse/DetailCourse";
import ListProcedures from "./pages/ListProcedures/ListProcedures";
import ContactUs from "./pages/ContactUs/ContactUs";
// import CategoryCourse from "./Pages/CategoryCourse/CategoryCourse";
// import CourseDetail from "./Pages/CourseDetail/CourseDetail";
// import Home from "./Pages/Home/Home";
// import Lesson from "./Pages/Lesson/Lesson";
// import ForgetPassword from "./Pages/ChangePassword/ChangePassword";
// import ProfileEdit from "./Pages/ProfileEdit/ProfileEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/lesson" element={<Lesson />} />
        <Route path="/my-course" element={<CategoryCourse isPurchase={true}/>} />
        <Route path="/explore-course" element={<CategoryCourse isPurchase={false}/>} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/list-courses" element={<Courses />} />
        <Route path="/course-filter" element={<CourseFilter />} />
        <Route path="/detail-course/:id_course" element={<DetailCourse />} />
        <Route path="/list-procedures" element={<ListProcedures />} />
        <Route path="/contact-us" element={<ContactUs />} />
        {/* <Route path="/coursedetail">
          <Route path=":id_course" element={<CourseDetail />} />
          <Route path=":id_course/lesson/:id_lesson" element={<Lesson />} />
        </Route>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/progress/:id_course" element={<Progress />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
