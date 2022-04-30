import React from 'react'


export function Material (props) {
    const {} = props

    return (
    <div className="MaterialContainer">
        <h3 className="MaterialHeader"> </h3>
        <div className="MaterialBody">
            <p>Item: {}</p>
            <p>Description: {}</p>
            <p>Amount: {}</p>
            <img src="" alt= "photo of material"></img>
            <p>Contact Me: {}</p>
        </div>
    </div>
    )
}

