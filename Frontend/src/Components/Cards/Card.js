import React from "react"
// import star from "./star.png"
import "./Card.css"
import "../../Pages/Chat/Chatbox.css"

export default function Card(props){
    // let badgeText 
    // if (props.item.openSpots === 0){
    //     badgeText = "SOLD OUT"
    // }
    // else if (props.item.location === "Online"){
    //     badgeText = "ONLINE"
    // }
    return(
        <div className = "products-card">
            <a href={props.item.Link}>
            {/* {badgeText && <div className = "card-badge">{badgeText}</div>} */}
            <img src={props.item["Image URL"]} alt="" className="card-image"/>
            {/* <div className = "card-stats"> */}
                {/* <img alt="" src = {star} className = "card-star"/> */}
                {/* <span> &nbsp;{props.item.stats.ratings}</span> */}
                {/* <span className = "grey"> &nbsp;({props.item.stats.reviewCount}) • </span> */}
                {/* <span className = "grey">&nbsp;{props.item.location}</span> */}
            {/* </div> */}
                <p className = "card-title">{props.item.Title}</p>
                <p className = "card-title"><span className = "bold">Price: {props.item.Price}</span></p>
                </a>
        </div>
    )
} 