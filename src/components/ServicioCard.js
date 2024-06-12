import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardBody from "./homeServicio/servicio_card/CardBody";
import CardFooter from "./homeServicio/servicio_card/CardFooter";
import CardInfoservicio from './homeServicio/servicio_card/CardInfoservicio';
import Cardserviciosdeservicio from './homeServicio/servicio_card/Cardserviciosdeservicio';
 
import Cardtitleservicio from './homeServicio/servicio_card/Cardtitleservicio';
import Informaciondecontacto from "./homeServicio/servicio_card/Informaciondecontacto";
 
import CardHeaderr from "./homeServicio/servicio_card/CardHeaderr";
 

const ServicioCard = ({ servicio, theme }) => {
  const location = useLocation();
  const isServicioDetailPage = location.pathname.startsWith(`/servicio/${servicio._id}`);

  const [showComments, setShowComments] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (isServicioDetailPage) {
      setShowComments(servicio.comentarios === true);
      setShowInfo(servicio.informacion === true);
    }
  }, [isServicioDetailPage, servicio.comentarios, servicio.informacion]);

  const renderInformacionContacto = () => {
    if (!showInfo) return null;
    return <Informaciondecontacto servicio={servicio} />;
  };

  return (
    <div className="card">
      {<CardHeaderr servicio={servicio}/>}
      <Cardtitleservicio servicio={servicio} />
      <CardBody servicio={servicio} theme={theme} />
      {isServicioDetailPage && <CardInfoservicio servicio={servicio} />}
      {isServicioDetailPage && <Cardserviciosdeservicio servicio={servicio} />}
      {showInfo && renderInformacionContacto()}
      {showComments && <CardFooter servicio={servicio} />}
 
    </div>
  );
};

export default ServicioCard;


       
   
 
