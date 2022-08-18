import React from 'react'

const styles = {
  width: "100%",
  display: "flex",
  height: "80px",
  backgroundColor: "red"
}

const Footer = () => {
  return (
    <div className='d-flex py-5 mt-auto footer'>
      <div>
        by: Daniel Ilies
      </div>
      <div>
        @2022
      </div>

    </div>
  )
}

export default Footer