import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
 

import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
 
import PostCardadmin from '../PostCardadmin'
import { POSTADMIN_TYPES } from '../../redux/actions/postadminAction'


const Postsadmin = () => {
    const { homePostsadminReducer, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
 
    const [load, setLoad] = useState(false)

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`postsadmin?limit=${homePostsadminReducer.page * 9}`, auth.token)

        dispatch({
            type: POSTADMIN_TYPES.GET_POSTSADMIN, 
            payload: {...res.data, page: homePostsadminReducer.page + 1}
        })

        setLoad(false)
    }

    return (
        <div className="posts">
            {
                homePostsadminReducer.posts.map(post => (
                    <PostCardadmin key={post._id} post={post} theme={theme} />
                ))
            }

            {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            
            <LoadMoreBtn result={homePostsadminReducer.result} page={homePostsadminReducer.page}
            load={load} handleLoadMore={handleLoadMore} />
        </div>
    )
}

export default Postsadmin
