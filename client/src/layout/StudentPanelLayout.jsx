import React from 'react'
import StudentHeader from '../components/Dashboard_Components/StudentHeader'
import StudentFooter from '../components/Dashboard_Components/StudentFooter'

function StudentPanelLayout({ children }) {
    return (
        <>
            <StudentHeader/>
            {children}
            <StudentFooter />
        </>
    )
}

export default StudentPanelLayout
