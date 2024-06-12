import React, { useState, useEffect } from 'react'
import CommentDisplay from './comments/CommentDisplay'
 
const Comments = ({servicio}) => {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [next, setNext] = useState(2)

    const [replyComments, setReplyComments] = useState([])

    useEffect(() => {
        const newCm = servicio.comments.filter(cm => !cm.reply)
        setComments(newCm)
        setShowComments(newCm.slice(newCm.length - next))
    },[servicio.comments, next])

    useEffect(()=> {
        const newRep = servicio.comments.filter(cm => cm.reply)
        setReplyComments(newRep)
    }, [servicio.comments])

    return (
        <div className="comments">
            {
                showComments.map((comment, index) => (
                    <CommentDisplay key={index} comment={comment} servicio={servicio}
                    replyCm={replyComments.filter(item => item.reply === comment._id)} />
                ))
            }

            {
                comments.length - next > 0
                ? <div className="p-2 border-top"
                style={{cursor: 'pointer', color: 'crimson'}}
                onClick={() => setNext(next + 10)}>
                    Voir plus de commentaires...
                </div>

                : comments.length > 2 &&
                <div className="p-2 border-top"
                style={{cursor: 'pointer', color: 'crimson'}}
                onClick={() => setNext(2)}>
                    Masquer les commentaires...
                </div>
            }
        </div>
    )
}

export default Comments
