
import React from 'react'
import empty from '../assets/images/empty.json'
import Lottie from 'lottie-react'

const NoDataFound = (props) => {
  return (



    <div className='NoDataFound'>

      <Lottie  style={{
          width: props.width ? props.width :   150,
          height: props.height ? props.height :  150,
          alignItems: "center"
        }}
        animationData={empty} 
        loop={true} />

      <h2>{props.text ? props.text : "No Data Found !!"}</h2>
  </div>

  )
}

export default NoDataFound