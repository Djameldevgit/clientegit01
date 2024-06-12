import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from '../../redux/actions/commentAction'
import Icons from '../Icons'

const InputComment = ({children, servicio, onReply, setOnReply}) => {
    const [content, setContent] = useState('')

    const { auth, socket, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!content.trim()){
            if(setOnReply) return setOnReply(false);
            return;
        }

        setContent('')
        
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }
        
        dispatch(createComment({servicio, newComment, auth, socket}))

        if(setOnReply) return setOnReply(false);
    }

    return (
        <form className="card-footer comment_input " onSubmit={handleSubmit} >
        {children}
        <input
            type="text"
            placeholder="Ajoutez vos commentaires.."
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : '#111',
                background: theme ? 'rgba(0,0,0,.03)' : '',
                backgroundColor: '#e0e0ff', // Color azul muy claro
            }}
        />
    
        <Icons setContent={setContent} content={content} theme={theme} />
    
        <button type="submit" className="postBtn">
            Envoiye
        </button>
    </form>
    
    )
}

export default InputComment
