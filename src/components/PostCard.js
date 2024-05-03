import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import Comments from "./homePost/Comments";
import CardBody from "./homePost/post_card/CardBody";
import CardFooter from "./homePost/post_card/CardFooter";
import InputComment from "./homePost/InputComment";
 
import CardInfosala from './homePost/post_card/CardInfosala';
import Cardeventossala from './homePost/post_card/Cardeventossala';
import CardFooterdisplay from './homePost/post_card/CardFooterdisplay';
import Cardserviciosdesala from './homePost/post_card/Cardserviciosdesala';
import CardHeader from './homePost/post_card/CardHeader';
//import Cardtitlesala from './homePost/post_card/Cardtitlesala'; <Cardtitlesala post={post} />
import Informaciondecontacto from "./homePost/post_card/Informaciondecontacto";
import Cardtitlesala from "./homePost/post_card/Cardtitlesala";
 

const PostCard = ({ post, theme }) => {
 
  const location = useLocation();
  const isPostDetailPage = location.pathname.startsWith(`/post/${post._id}`);
  const [showFooter, setShowFooter] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
    const [inputCommentVisible, setInputCommentVisible] = useState(false); // Estado para controlar la visibilidad del área de comentario
  
  useEffect(() => {
    // Mostrar el CardFooter en la página de detalles del post si está autorizado
    if (isPostDetailPage && post.informacion === 'permitirinformacion') {
      setShowFooter(true);
    }
  }, [isPostDetailPage, post.informacion]);

  
 
  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
    if (!commentsVisible) {
      setInputCommentVisible(true); // Mostrar InputComment cuando se muestren los comentarios
    }
  };
  
  const renderInformacionContacto = () => {
    if (!isPostDetailPage || post.informacion !== 'permitirinformacion') return null;
    return <Informaciondecontacto post={post} />;
  };

  const renderComentarios = () => {                           
    if (!isPostDetailPage || post.comentarios !== 'permitircomentarios' || !commentsVisible) return null;
    return (
      <>
        <Comments post={post} />
        <InputComment post={post} />
      </>
    );
  };

  return (
    <div className="card">
    <CardHeader post={post} />
    <Cardtitlesala  post={post}  />
    <CardBody post={post} theme={theme} />
     
    {isPostDetailPage && <CardInfosala post={post} />}
    
    {isPostDetailPage && <Cardeventossala post={post} />}
    {isPostDetailPage && <Cardserviciosdesala post={post} />}
    {isPostDetailPage && <CardFooterdisplay post={post} />}
 {isPostDetailPage && renderInformacionContacto()}

    {isPostDetailPage && renderComentarios()}
    {isPostDetailPage && showFooter && (
  <>
    
    <CardFooter post={post} toggleCommentsVisibility={toggleCommentsVisibility} />
    <Comments post={post} />
    <InputComment post={post} />
 
  </>
)}

  </div>
  );
};

export default PostCard;
