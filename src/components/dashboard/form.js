import React, { useState } from 'react'

export default function Form(props) {
    const [formState, setFormState] = useState({
        title: '',
        type: 'movie',
        language: 'english',
        impressions: '',
        links: [],
        dateAdded: new Date(),
        dateConsumed: null
    })
    const handleChange = (type, e) => {
        const val = e.target.value
        setFormState({...formState, [type]: val})
    }
    const submitForm = (e) => {
        e.preventDefault()
        console.log(`will submit`, formState)
        props.updateState('add', formState)
    }

    return (
        <>
            <form onSubmit={submitForm} >
                <input type="text" autoFocus placeholder="Title" value={formState.title} onChange={e => handleChange('title', e)}/>
            </form>
        </>
    )
}