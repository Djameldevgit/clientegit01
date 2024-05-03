import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Send from '../../../images/send.svg'
import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux'
import { likeServicio, unLikeServicio, saveServicio, unSaveServicio } from '../../../redux/actions/servicioAction'
import ShareModal from '../../ShareModal'
 
import { useTranslation } from 'react-i18next'

const CardFooter = ({ servicio }) => {

  const { languagee } = useSelector(state => state)

  const { t } = useTranslation();



  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const [isShare, setIsShare] = useState(false)

  const { auth, theme, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  const [saved, setSaved] = useState(false)
  const [saveLoad, setSaveLoad] = useState(false)

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


  // Saved
  useEffect(() => {
    if (auth.user.saved.find(id => id === servicio._id)) {
      setSaved(true)
    } else {
      setSaved(false)
    }
  }, [auth.user.saved, servicio._id])

  const handleSaveServicio= async () => {
    if (saveLoad) return;

    setSaveLoad(true)
    await dispatch(saveServicio({ servicio, auth }))
    setSaveLoad(false)
  }

  const handleUnSaveServicio= async () => {
    if (saveLoad) return;

    setSaveLoad(true)
    await dispatch(unSaveServicio({ servicio, auth }))
    setSaveLoad(false)
  }

  return (
    <div>
<p className="card-title  " style={{ color: '#333', borderBottom: '2px solid #FFD700'  }}> </p>

      <div style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
        <h4 className="card-title" style={{ color: '#333', borderBottom: '2px solid #FFD700', paddingBottom: '10px' }}>
          <i className="fas fa-question-circle ml-3 mr-2" style={{ fontSize: '24px', color: '#F73D06' }} /> {t("Questions & Réponses", { lng: languagee.language })}
        </h4>

      </div>

   


      <div className="card_footer"  >
        <div className="card_icon_menu" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LikeButton
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            />

            <Link to={`/servicio/${servicio._id}`} className="text-dark" style={{ marginLeft: '10px' }}>
              <i className="far fa-comment" style={{ fontSize: '20px', color: '#3498DB', cursor: 'pointer' }} />
            </Link>

            <img src={Send} alt="Send" style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setIsShare(!isShare)} />
          </div>

          <div>
            {
              saved
                ? <i className="fas fa-bookmark text-info" style={{ fontSize: '20px', color: '#27AE60', cursor: 'pointer' }} onClick={handleUnSaveServicio} />
                : <i className="far fa-bookmark" style={{ fontSize: '20px', color: '#333', cursor: 'pointer' }} onClick={handleSaveServicio} />
            }
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <h6 style={{ padding: '0 25px', fontSize: '14px', cursor: 'pointer', color: '#333' }}>
            {servicio.likes.length}   {t('likes', { lng: languagee.language })}
          </h6>
          <h6 style={{ padding: '0 25px', fontSize: '14px', cursor: 'pointer', color: '#333' }}>
            {servicio.comments.length}  {t('comments', { lng: languagee.language })}
          </h6>
        </div>

        
      </div>

    </div>
  )
}

export default CardFooter
