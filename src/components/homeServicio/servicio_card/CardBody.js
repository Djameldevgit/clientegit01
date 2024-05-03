
import { Link, useLocation } from 'react-router-dom';
import CarouselServicio from '../../Carouselss/CarouselServicio';
import { IoCarOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

const CardBody = ({ servicio }) => {
  const { auth, languagee } = useSelector(state => state)
  const dispatch = useDispatch()
  const { t } = useTranslation();




  const location = useLocation();
  const isDetailPage = location.pathname.includes('/servicio/');

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
      <span style={{ color: 'blue' }}>Wilaya: </span>
      <span style={{ color: 'dark' }}>{servicio.wilaya}</span>
    </div>
  </div>

  <div className="col-md-6 d-flex align-items-center justify-content-end">
    <div className="details-item">
      <i className="far fa-heart text-danger mr-2" style={{ fontSize: '1.2rem' }}></i>
      <span className="details-count" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
        {servicio.likes.length}
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
