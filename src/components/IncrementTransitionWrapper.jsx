import React, { useEffect, useRef, useState } from 'react';

const IncrementTransitionWrapper = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(!isVisible);
                    observer.disconnect(); 
                }
            },
            { threshold: 0.1 } 
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref}>
            {isVisible && children} 
        </div>
    );
};

export default IncrementTransitionWrapper;


