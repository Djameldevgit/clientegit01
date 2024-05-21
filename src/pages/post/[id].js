import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../../redux/actions/postAction';
import LoadIcon from '../../images/loading.gif';
import PostCard from '../../components/PostCard';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState([]);

    const { detailPost } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {// lo primero que se ejecuta  se ejecuta el useEffect definido en el componente. Este useEffect se usa para despachar la acción getPost.
        dispatch(getPost({ detailPost, id }));//se despacha la acción getPost con el id del post, el estado detailPost actual y la información de autenticación (auth).

        if (detailPost.length > 0) {// Si detailPost tiene elementos, se filtran los posts que coinciden con el id y se actualiza el estado local post
            const newArr = detailPost.filter(post => post._id === id);//
            setPost(newArr);//setPost(newArr): Si detailPost contiene datos, filtra el post con el id correcto y actualiza el estado local.
        }
    }, [detailPost, dispatch, id]);

    return (
        <div className="posts">
            {post.length === 0 && (
                <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
            )}

            {post.map(item => (
                <PostCard key={item._id} post={item} />
            ))}
        </div>
    );
};

export default Post;
