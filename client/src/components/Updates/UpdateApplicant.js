import React from 'react'
import UpdateStatus from './UpdateStatus'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const UpdateApplicant = () => {
    const appDetails = useSelector(state => state.singleApplicant.ApplicantDetails)
    return (
        <>
            <div className='container p-4'>
                {
                    Object.keys(appDetails).length > 0 ? <div >
                        <p className='text-center p-2 fw-bold'>Change Status of the Applicant : {appDetails.name}</p>
                        <UpdateStatus applicantdetails={appDetails} />
                    </div> : <Navigate to="/" />
                }
            </div>
        </>
    )
}
export default UpdateApplicant