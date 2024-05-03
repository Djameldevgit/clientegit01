import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import CardBody from "./homeServicio/servicio_card/CardBody";
import CardFooter from "./homeServicio/servicio_card/CardFooter";



import CardInfoservicio from './homeServicio/servicio_card/CardInfoservicio';

import CardFooterdisplay from './homeServicio/servicio_card/CardFooterdisplay';
import Cardserviciosdeservicio from './homeServicio/servicio_card/Cardserviciosdeservicio';
import CardHeaderr from './homeServicio/servicio_card/CardHeaderr';
import Cardtitleservicio from './homeServicio/servicio_card/Cardtitleservicio';
import Informaciondecontacto from "./homeServicio/servicio_card/Informaciondecontacto";

const ServicioCard = ({ servicio, theme }) => {

  const location = useLocation();
  const isServicioDetailPage = location.pathname.startsWith(`/servicio/${servicio._id}`);
  const [showFooter, setShowFooter] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);

  useEffect(() => {
    // Mostrar el CardFooter en la página de detalles del servicio si está autorizado
    if (isServicioDetailPage && servicio.informacion === 'permitirinformacion') {
      setShowFooter(true);
    }
  }, [isServicioDetailPage, servicio.informacion]);





  const renderInformacionContacto = () => {
    if (!isServicioDetailPage || servicio.informacion !== 'permitirinformacion') return null;
    return <Informaciondecontacto servicio={servicio} />;
  };



  return (
    <div className="card">
      <CardHeaderr servicio={servicio} />
      <Cardtitleservicio servicio={servicio} />
      <CardBody servicio={servicio} theme={theme} />
      {isServicioDetailPage && <CardInfoservicio servicio={servicio} />}

      {isServicioDetailPage && <Cardserviciosdeservicio servicio={servicio} />}
      {isServicioDetailPage && <CardFooterdisplay servicio={servicio} />}
      {isServicioDetailPage && renderInformacionContacto()}


     

    </div>
  );
};

export default ServicioCard;
