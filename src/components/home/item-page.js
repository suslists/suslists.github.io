import React from 'react'
import './index.css'
import { Link, useParams } from "react-router-dom"

export default function ItemPage(props) {
    const { items, itemId } = props
    

    return (
        <div>
            I'm an item, {itemId}
        </div>
    )
}