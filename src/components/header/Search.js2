import React, { useState } from 'react';
import {   useDispatch } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import PostCard from '../PostCard';
import LoadIcon from '../../images/loading.gif';
import { useSelector } from 'react-redux'
const Search = () => {
    const {   auth  } = useSelector(state => state)

    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);

 
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return;

        try {
            setLoad(true);
            const res = await getDataAPI(`search?content=${search}`,auth.token );
            setPosts(res.data.posts);
            setLoad(false);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }
            });
        }
    };

    const handleClose = () => {
        setSearch('');
        setPosts([]);
    };

    return (
        <form className="search_form" onSubmit={handleSearch}>
            <input type="text" name="search" value={search} id="search" title="Recherche"
                onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
                <span className="material-icons">search</span>
                <span>Recherche</span>
            </div>

            <div className="close_search" onClick={handleClose}
                style={{ opacity: posts.length === 0 ? 0 : 1 }} >
                &times;
            </div>

            <button type="submit" style={{ display: 'none' }}> </button>

            {load && <img className="loading" src={LoadIcon} alt="loading" />}

            <div className="posts">
                {
                    search && posts.map(post => (
                        <PostCard
                            key={post._id}
                            post={post}
                            handleClose={handleClose}
                        />
                    ))
                }
            </div>
        </form>
    );
};

export default Search;
