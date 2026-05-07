
import React,{useEffect} from 'react'
import { useSpring ,animated} from 'react-spring'

function IncrementTansition(props) {
 
    const {number}=useSpring({
        from:{number:0},
        number:props.n,
        delay:400,
        config:{mass:1,tension:20,friction:10, duration:1000}
    })
    useEffect(() => {
    }, [props.n]);
 
  return (
    !props.large ? 
    <animated.h2 className="display-5 fw-bold text-primary mb-0" >{number.to((n) => `${props.symbol1} ${n.toFixed(0)} ${props.symbol2}`)}</animated.h2>  
    : <animated.h1 className="display-5 fw-bold text-primary mb-0">{number.to((n) => `${props.symbol1} ${n.toFixed(0)} ${props.symbol2}`)}</animated.h1>  )
}

export default IncrementTansition