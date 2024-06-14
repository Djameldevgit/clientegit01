import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardBody from "./homePost/post_card/CardBody";
import CardFooter from "./homePost/post_card/CardFooter";
import CardInfopost from './homePost/post_card/CardInfopost';
 
import Cardtitlepost from './homePost/post_card/Cardtitlepost';
import Informaciondecontacto from "./homePost/post_card/Informaciondecontacto";
 
import CardHeaderr from "./homePost/post_card/CardHeaderr";
import Descripcion from "./homePost/post_card/Descripcion";
import Map from "./homePost/post_card/Map";
 

const PostCard = ({ post, theme }) => {
  const location = useLocation();
  const isPostDetailPage = location.pathname.startsWith(`/post/${post._id}`);

  const [showComments, setShowComments] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (isPostDetailPage) {
      setShowComments(post.comentarios === true);
      setShowInfo(post.informacion === true);
    }
  }, [isPostDetailPage, post.comentarios, post.informacion]);

  const renderInformacionContacto = () => {
    if (!showInfo) return null;
    return <Informaciondecontacto post={post} />;
  };

  return (
    <div className="card">
      {<CardHeaderr post={post}/>}
      <Cardtitlepost post={post} />
      <CardBody post={post} theme={theme} />
      <Descripcion post={post} theme={theme} />
      <Map post={post} theme={theme} />
      {isPostDetailPage && <CardInfopost post={post} />}
    
      {showInfo && renderInformacionContacto()}
      {showComments && <CardFooter post={post} />}
 
    </div>
  );
};

export default PostCard;


       
   