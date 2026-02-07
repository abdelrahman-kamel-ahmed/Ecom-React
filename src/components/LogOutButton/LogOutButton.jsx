import React from 'react'
import { Button } from 'react-bootstrap'
import { logout } from '../../store/slicies/userSlices'
import { useDispatch } from 'react-redux'
export const LogOutButton = () => {
    //dispatch logout
    const dispatch=useDispatch();
  function handleLogout() {
    //clear global states
    dispatch(logout());
    //clear local storage
    localStorage.removeItem("userData");

  }
    return (
    <Button variant='danger' onClick={handleLogout}>Logout</Button>
  )
}
