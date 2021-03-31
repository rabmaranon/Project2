import React from 'react'
import "../scss/components/Button.scss"
function Button({ children, color }) {
    return (
        <button className={color ? 'btn11' : "btn"} style={{ backgroundColor: color }}>
            {children}
        </button>
    )
}

export default Button
