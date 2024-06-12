import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import CarouselServicio from '../../Carouselss/CarouselServicio';
import LikeButton from '../../LikeButton'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { likeServicio, unLikeServicio } from '../../../redux/actions/servicioAction'

const CardBody = ({ servicio }) => {
  const { auth,theme, socket ,languagee } = useSelector(state => state)
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)



  const location = useLocation();
  const isDetailPage = location.pathname.includes('/servicio/');
  
  
  // Likes
  useEffect(() => {
    if (servicio.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    } else {
      setIsLike(false)
    }
  }, [servicio.likes, auth.user._id])
  
  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true)
    await dispatch(likeServicio({ servicio, auth, socket }))
    setLoadLike(false)
  }

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true)
    await dispatch(unLikeServicio({ servicio, auth, socket }))
    setLoadLike(false)
  }
  return (
    <>
      {servicio.images.length > 0 && <CarouselServicio images={servicio.images} id={servicio._id} />}

      {!isDetailPage && (
        <>
          <div style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
            <h2 className='mb-  mr-2' style={{ fontSize: '20px', margin: '0', color: '#007bff' }}>
              {t(servicio.ventalocation, { lng: languagee.language })}
            </h2>
          </div>







          <div className="card-body row">
  <div className="col-md-6 d-flex align-items-center justify-content-between">
    <div style={{ textAlign: 'left' }}>
       
      <span style={{ color: 'dark' }}>{servicio.wilaya}, {servicio.commune}   </span>
       
    </div>
  </div>

  <div className="col-md-6 d-flex align-items-center justify-content-end">
    <div className="details-item">
      
      <span className="details-count" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
      <LikeButton
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            /> {servicio.likes.length}
      </span>
    </div>
  </div>
</div>




          <div className="ml-2 my-2">
            <button className="btn btn-primary form-control px-3"  >
              <Link to={`/servicio/${servicio._id}`} className="text-white">
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
