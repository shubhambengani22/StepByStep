import React, { useState, useEffect } from 'react'
import '../styles/Nav.css'
import logo from '../assets/images/logoStepByStep.png'

function Nav() {
  const [show, handleShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true)
      } else handleShow(false)
    })
    // This is to remove the listener in case useEffect fires multiple times to avoid multiple listeners
    return () => {
      window.removeEventListener('scroll')
    }
  }, [])

  return (
    <div className='container'>
      <div className='nav__logo'>
        <img src={logo} alt='Logo' />
      </div>
      <div className='card'>
        <div className='nav__links'>
          <div className='nav__link__items'>
            <a href='#'>About</a>
            <a href='#'>Team</a>
          </div>
          <div className='login'>
            <a href='#'>Login</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
