import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
 
import LoadIcon from '../../images/loading.gif'
 
import PostCardadmin from '../../components/PostCardadmin'
import { getPostadmin } from '../../redux/actions/postadminAction'


const Post = () => {
    const { id } = useParams()
    const [postadmin, setPostadmin] = useState([])

    const { auth, detailPostadmin } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPostadmin({detailPostadmin, id, auth}))

        if(detailPostadmin.length > 0){
            const newArr = detailPostadmin.filter(post => post._id === id)
            setPostadmin(newArr)
        }
    },[detailPostadmin, dispatch, id, auth])

    return (
        <div className="posts">
            {
                postadmin.length === 0 &&
                <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
            }

            {
                postadmin.map(item => (
                    <PostCardadmin key={item._id} postadmin={item} />
                ))
            }
        </div>
    )
}

export default Post
