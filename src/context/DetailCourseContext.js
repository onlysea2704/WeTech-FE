import React, { createContext, useContext, useState } from "react";

const DetailCourseContext = createContext();

export const useDetailCourse = () => {
    return useContext(DetailCourseContext);
};

export const DetailCourseProvider = ({ children, value }) => {
    return <DetailCourseContext.Provider value={value}>{children}</DetailCourseContext.Provider>;
};
