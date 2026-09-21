import React, { useEffect } from 'react'
import StudentHeader from '../components/Dashboard_Components/StudentHeader'
import StudentFooter from '../components/Dashboard_Components/StudentFooter'

function StudentPanelLayout({ children }) {
    
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }, []);
    return (
        <>
            <StudentHeader/>
            {children}
            <StudentFooter />
        </>
    )
}

export default StudentPanelLayout
