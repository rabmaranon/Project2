import React from 'react'
import "../scss/components/Button.scss"
function Button({ children }) {
    return (
        <button className="btn">
            {children}
        </button>
    )
}

export default Button
