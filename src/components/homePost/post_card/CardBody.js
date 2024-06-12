import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import CarouselPost from '../../Carouselss/CarouselPost';
import LikeButton from '../../LikeButton'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { likePost, unLikePost } from '../../../redux/actions/postAction'

const CardBody = ({ post }) => {
  const { auth,theme, socket ,languagee } = useSelector(state => state)
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)



  const location = useLocation();
  const isDetailPage = location.pathname.includes('/post/');
  
  
  // Likes
  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    } else {
      setIsLike(false)
    }
  }, [post.likes, auth.user._id])
  
  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true)
    await dispatch(likePost({ post, auth, socket }))
    setLoadLike(false)
  }

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true)
    await dispatch(unLikePost({ post, auth, socket }))
    setLoadLike(false)
  }
  return (
    <>
      {post.images.length > 0 && <CarouselPost images={post.images} id={post._id} />}

      {!isDetailPage && (
        <>
          <div style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
            <h2 className='mb-  mr-2' style={{ fontSize: '20px', margin: '0', color: '#007bff' }}>
              {t(post.ventalocation, { lng: languagee.language })}
            </h2>
          </div>







          <div className="card-body row">
  <div className="col-md-6 d-flex align-items-center justify-content-between">
    <div style={{ textAlign: 'left' }}>
       
      <span style={{ color: 'dark' }}>{post.wilaya}, {post.commune}   </span>
       
    </div>
  </div>

  <div className="col-md-6 d-flex align-items-center justify-content-end">
    <div className="details-item">
      
      <span className="details-count" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
      <LikeButton
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            /> {post.likes.length}
      </span>
    </div>
  </div>
</div>




          <div className="ml-2 my-2">
            <button className="btn btn-primary form-control px-3"  >
              <Link to={`/post/${post._id}`} className="text-white">
                {t('Voir les détails', { lng: languagee.language })}
              </Link>
            </button>
          </div>




        </>
      )}
    </>
  );
};

export default CardBody;
