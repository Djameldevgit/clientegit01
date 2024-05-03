import React from 'react'

const Cardmessage = () => {
    return(  
    
      <div className="card text-white bg-dark   ">
        <div className="custom-heading">
          <h1 className="custom-heading__title">Gradient Banner Cards</h1>
          <p className="custom-heading__credits"> hola error </p>
        </div>
        <div className="custom-cards">
          <div className="custom-card custom-card-1">
            
            <p className="custom-card__exit"><i className="fas fa-times"></i></p>
            <h5 className="custom-card__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
            <p className="custom-card__apply">
              <a className="custom-card__link" href="#">Apply Now <i className="fas fa-arrow-right"></i></a>
            </p>
          </div>
       
        </div>
      </div>
   
    

)
}


export default Cardmessage