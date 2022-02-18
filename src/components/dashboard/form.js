import React, { useState } from 'react'

const initialState = {
    title: '',
    type: 'movie',
    language: 'english',
    impressions: '',
    links: [],
    dateAdded: new Date(),
    dateConsumed: null,
    image: '',
}

export default function Form(props) {
    const [formState, setFormState] = useState({...initialState})
    const handleChange = (type, e) => {
        const val = e.target.value
        setFormState({...formState, [type]: val})
    }
    const submitForm = (e) => {
        if(e)   e.preventDefault()
        console.log(`will submit`, formState)
        props.updateState('add', formState)
        setFormState({...initialState})
    }

    return (
        <>
            <form onSubmit={submitForm} >
                <input type="text" autoFocus placeholder="Title" value={formState.title} onChange={e => handleChange('title', e)}/>
                <input type="text" placeholder="Image" value={formState.image} onChange={e => handleChange('image', e)}/>
                <button onClick={submitForm}>Submit</button>
            </form>
        </>
    )
}