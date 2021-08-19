// Used to close side panels or modals by clicking outside of them

import { useState, useEffect } from 'react'

export function useOutsideClick(ref) {
    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        function outsideClick(e) {
            if (!ref.current || ref.current.contains(e.target)) {
                return
            } else {
                setExpanded(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", outsideClick)
        document.addEventListener('touchstart', outsideClick)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", outsideClick)
            document.removeEventListener('touchstart', outsideClick)
        };
    }, [ref])

    const expandPanel = () => {
        setExpanded(true)
    }

    const collapsePanel = () => {
        setExpanded(false)
    }

    return [expandPanel, collapsePanel, expanded]
}