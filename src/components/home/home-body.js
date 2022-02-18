import React from 'react'
import './index.css'
import { Link } from "react-router-dom"

export default function HomeBody (props) {
    const {items} = props
    return (
        <div className="appBody">
        {
            items.map((item) => {
                return (
                    <Item key={item.id} item={item} />
                )
            })
        }
        </div>
    )
}

function Item(props) {
    const { item } = props
    const {
        title, image,
    } = item

    return (
        <div>
            {/* <div className="font-10">{item.title}</div> */}
            <Link to={`/item/${item.id}`}>
                <div className="itemCard">
                    <img
                        src={item.image}
                        style={{width:"100px", height:"150px", objectFit: 'cover'}}
                        className="thumbnail"
                        alt={item.title}
                    />
                </div>
            </Link>
        </div>
    )
}