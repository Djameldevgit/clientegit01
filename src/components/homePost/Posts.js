import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { POST_TYPES } from '../../redux/actions/postAction'
import PostCard from './../PostCard';
//import Marcamodelo from '../searching/Marcamodelo'
//import Wilayacommune from '../searching/Wilayacommune'




const Posts = () => {
  const { homePostsReducer, theme } = useSelector((state) => state);



  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`/posts?limit=${homePostsReducer.page * 9}`);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePostsReducer.page + 1 }
    });

    setLoad(false);
  };


  return (
    <div >



      <div className="post_thumb">
        {
          homePostsReducer.posts && Array.isArray(homePostsReducer.posts) && homePostsReducer.posts.map(post => (
            <PostCard key={post._id} post={post} theme={theme} />
          ))
        }

        {
          load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        }

        
      </div>
      <LoadMoreBtn result={homePostsReducer.result} page={homePostsReducer.page}
          load={load} handleLoadMore={handleLoadMore} />
    </div >
  );
};

export default Posts;
