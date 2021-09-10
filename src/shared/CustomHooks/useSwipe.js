import { useState } from 'react'

export const useSwipe = () => {
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    function handleTouchStart(e){
        setTouchStart(e.targetTouches[0].clientX)
    }

    function handleTouchMove(e){
        setTouchEnd(e.targetTouches[0].clientX)
    }

    function handleTouchEnd(swipeLeft, swipeRight){
        if(touchStart - touchEnd < -75){
            swipeLeft()
        }
        if(touchStart - touchEnd > -75){
            swipeRight()
        }
    }

    return [handleTouchStart, handleTouchMove, handleTouchEnd]
}
