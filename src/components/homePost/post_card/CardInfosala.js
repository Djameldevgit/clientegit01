
import FollowBtn from '../../FollowBtn';


import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import React from 'react';




const CardInfosala = ({ post }) => {

  const { languagee } = useSelector(state => state)
  const { t } = useTranslation();



  return (
    <div>
      <div className="container mt-2 mb-4 ">
        <div className="row">

          <div className="col-12">



            <article className="card car-details label-info new">

              <div className="d-flex flex-md-row align-items-md-start align-items-center flex-column">

                <div className="w-100 ">




                  <div style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
                    <p className='ml-2 mr4 text-danger' style={{ borderBottom: '2px solid #007bff', paddingBottom: '5px', margin: '20px 0', color: '#007bff', fontSize: '1.25rem', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                      {t("Description de l'annonce", { lng: languagee.language })}
                    </p>

                  </div>


                  <hr />
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <ul>
                        <li><i className="fas fa-calendar" style={{ color: '#ff9900' }} /> <strong>Titre: </strong>  {post.content}</li>
<li><i className="fas fa-calendar-alt" style={{ color: '#ff9900' }} /> <strong>Publié le: </strong>  {new Date(post.createdAt).toLocaleDateString()} a las {new Date(post.createdAt).toLocaleTimeString()}</li>
<li><i className="fas fa-eye" style={{ color: '#33cc33' }} /> <strong>Vue: </strong>  {post.vistas}</li>
<li><i className="fas fa-thumbs-up" style={{ color: '#ff0000' }} /> <strong>Likes: </strong> {post.likes.length}</li>
<li><i className="fas fa-comments" style={{ color: '#ff0000' }} /> <strong>Commentaires: </strong> {post.comments.length}</li>
<li>
  <i className="fas fa-money-bill-wave" style={{ color: '#ff0000' }} />
  <strong>Prix: </strong>
  <span>
    <p style={{ display: 'inline', marginRight: '10px' }}>{post.pricesala}</p>
    <p style={{ display: 'inline', marginRight: '10px' }}>{post.dinero}</p>
    <p style={{ display: 'inline' }}>{post.negociable}</p>
  </span>
</li>


                        </ul>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </article>
          </div>
        </div>
      </div>


    </div>
  )
}

export default CardInfosala