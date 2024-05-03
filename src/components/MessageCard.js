 
 import moment from 'moment';
import 'moment/locale/fr';
const MessageCard = ({ mensaje }) => {
  // const {nombre, email, asunto}= mensaje
  return (


    <div>
      <div className="card text-white bg-secondary  mb-3">
        <div className="card-header bg-warning ">
              {mensaje.email}
          <button type="button" className="close  text-black" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-body">
          <h5 className="card-title"> <strong>Sujet:</strong>   {mensaje.asunto}</h5>
        
        </div>
        <div className="card-body  text-dark">
          
          <p className="card-text  "><strong>Descripcion:</strong>{mensaje.descripcion}</p>
        </div>
        <div className="card-card text-white bg-success   mb-3  ">
          <i className="fas fa-calendar-alt mr-2 text-warning"></i> {/* Icono de fecha de Font Awesome */}
         
          {moment(mensaje.createdAt).fromNow()}
        </div>
        <div className='row'>
          <div className='col'>
            <div className="d-flex justify-content-between">
              <a href="#" className="btn btn-primary">Button</a>
              <a href="#" className="btn btn-primary">Button</a>
              <a href="#" className="btn btn-primary">Button</a>
            </div>
          </div>
        </div>
      </div>
    </div>





  );
}

export default MessageCard;