import { useState, useEffect } from 'react'

const getWidth = () => window.innerWidth 
    || document.documentElement.clientWidth 
    || document.body.clientWidth

export function useCurrentWidth() {
    let [width, setWidth] = useState(getWidth())

    useEffect(() => {
        let timeoutId = null;

        // timeout before running function to be more performant
        const resizeListener = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setWidth(getWidth()), 100);
        };

        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])

    return width;
}