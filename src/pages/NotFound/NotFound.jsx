import React from 'react'
import { IMAGES } from '../../constants/images'
export const NotFound = () => {
    return (
    <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
        <img src={IMAGES.Not_Found_Image} alt="Not Found" />
        <h2> we couldn't find what you were looking for </h2>
        <p className='text-muted'> we are very sorry but somthing went wrong , please try again </p>
    </div>
    )
}
