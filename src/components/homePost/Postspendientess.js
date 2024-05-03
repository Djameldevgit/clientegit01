import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
 

import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
 
import PostCard from '../PostCard';
import { POSTAPROVE_TYPES } from '../../redux/actions/postaproveAction';
 
const Postspendientess = () => {
  const { postaproveReducer, auth } = useSelector((state) => state);
  console.log(postaproveReducer)
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postspedientes = postaproveReducer.posts.filter((p) => p.estado === 'pendiente');
    setPosts(postspedientes);
  }, [postaproveReducer.posts]);
  
  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getpostspendientes?limit=${postaproveReducer.page * 9}`, auth.token);

      dispatch({
        type: POSTAPROVE_TYPES.APROVE_POST_PENDIENTE,
        payload: { ...res.data, page: postaproveReducer.page + 1 },
      });
  
      setLoad(false);
    };
  
    return (
      <div className="post_thumb">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      <LoadMoreBtn
        result={postaproveReducer.result}
        page={postaproveReducer.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Postspendientess;
 

 