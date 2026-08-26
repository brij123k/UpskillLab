import React from 'react'
import TeacherHeader from '../components/Dashboard_Components/TeacherHeader'
import TeacherFooter from '../components/Dashboard_Components/TeacherFooter'

function TeacherPanelLayout({ children }) {
    return (
        <>
            <TeacherHeader/>
            {children}
            <TeacherFooter />
        </>
    )
}

export default TeacherPanelLayout
