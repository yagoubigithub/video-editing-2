import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getTemplate } from '../api/template'
import Editor from './Editor'


//context
import { TextContext } from "../context/TextContext"
const Template = () => {
    const { setFile  , setTexts} = useContext(TextContext)
    const {templateId} = useParams()

    const [template , setTemplate]  = useState({})

    useEffect(()=>{
        getTemplate(templateId).then(data=>{
            console.log(data)
            setFile({...data.template.videoId})
           setTimeout(() => {
            setTexts([...data.template.texts])
           }, 2000);
        })

    }, [])
  return (
    <div><Editor /></div>
  )
}

export default Template