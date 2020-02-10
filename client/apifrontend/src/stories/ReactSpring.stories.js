import React from 'react';
import {useSpring, animated} from 'react-spring'

export default{
    title:'Fade'
}

export const Fade = ()=>{

    const props = useSpring({opacity: 1, from: {opacity: 0}, delay:400})
    return <animated.div style={props}>I will fade in</animated.div>
}

export const NumberIncrease = () => {

    const props = useSpring({ number: 100, from: { number: 0 }, delay:400 })
    return <animated.span>{props.number}</animated.span>
}