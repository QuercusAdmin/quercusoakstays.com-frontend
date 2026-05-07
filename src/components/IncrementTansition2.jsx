
import React,{useEffect} from 'react'
import { useSpring ,animated} from 'react-spring'

function IncrementTansition2(props) {
 
    const {number}=useSpring({
        from:{number:0},
        number:props.n,
        delay:800,
        config:{mass:1,tension:20,friction:10, duration:1000}
    })
    useEffect(() => {
    }, [props.n]);
 
  return (
    !props.large ? 
    <animated.h2 className={props.className} >{number.to((n) => `${props.symbol1} ${n.toFixed(0)} ${props.symbol2}`)}</animated.h2>  
    : <animated.h1 className={props.className}>{number.to((n) => `${props.symbol1} ${n.toFixed(0)} ${props.symbol2}`)}</animated.h1>  )
}

export default IncrementTansition2