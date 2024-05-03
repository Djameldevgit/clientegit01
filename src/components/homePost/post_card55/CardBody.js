
import { Link, useLocation } from 'react-router-dom';
import CarouselPost from '../../Carouselss/CarouselPost';
import { IoCarOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { incrementViews } from '../../../redux/actions/postAction';

const CardBody = ({ post }) => {
  const { auth, languagee } = useSelector(state => state)
  const dispatch = useDispatch()
  const { t } = useTranslation();


  const handleViewDetails = () => {
    dispatch(incrementViews({ post, auth }));
    // Aquí puedes navegar a la página de detalles utilizando react-router-dom
    // history.push(`/detalle/${post._id}`);
  };

  const location = useLocation();
  const isDetailPage = location.pathname.includes('/post/');

  return (
    <>
      {post.images.length > 0 && <CarouselPost images={post.images} id={post._id} />}

      {!isDetailPage && (
        <>
          <div style={{ textAlign: languagee.language === 'ar' ? 'right' : 'left' }}>
            <h2 className='mb-2 mr-2' style={{ fontSize: '20px', margin: '0', color: '#007bff' }}>
              {t(post.ventalocation, { lng: languagee.language })}
            </h2>
          </div>






          <div style={{ display: 'flex', alignItems: 'center' }}>
            
            <h4 style={{ fontSize: '18px', margin: '0' }}>
              <span style={{ color: '#333' }}>  {post.marca}  </span>       <span style={{ color: '#ff5722' }}> {post.modelo}</span> &nbsp; <span style={{ color: '#888' }}>{post.ano}</span>
            </h4>
          </div>

          <div className="card-body row">
  <div className="col-md-6 d-flex align-items-center justify-content-between">
  <div style={{ textAlign: 'left' }}>
  <span style={{ color: 'blue' }}>Publié le: </span>
  <span style={{ color: 'red' }}>{new Date(post.createdAt).toLocaleDateString()}</span>
</div>


    <div className="d-flex align-items-center details-item">
      <i className="far fa-heart text-danger mr-2" style={{ fontSize: '1.2rem' }}></i>
      <span className="details-count" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
        {post.likes.length}
      </span>
    </div>
  </div>
</div>



          <div className="ml-2 my-2">
            <button className="btn btn-primary form-control px-3" onClick={handleViewDetails}>
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
 