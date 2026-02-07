import React from 'react'
import { useSelector } from 'react-redux';
import { IMAGES } from '../../constants/images';
import { Link } from 'react-router-dom';
export const Avatar = () => {
  const {user} = useSelector((state) => state.user);
//   const profilePic = user.image??IMAGES.AVATAR
    return (
        <Link to={`/profile`}>
            <img src={IMAGES.AVATAR} alt="" className='rounded-circule mx-4'width={75}/>
        </Link>
  )
}
