import React from 'react'
import CardHeader from './home/post_card/CardHeader'
import CardBody from './home/post_card/CardBody'
import CardFooter from './home/post_card/CardFooter'
import { useLocation } from "react-router-dom";
import Comments from './home/Comments'
import InputComment from './home/InputComment'
import Description from './home/post_card/Description';

const PostCard = ({post, theme}) => {
    const location = useLocation();
    const isPostDetailPage = location.pathname.startsWith(`/post/${post._id}`);

    return (
        <div className={`card my-3 ${isPostDetailPage ? 'card-detail' : 'card-home'}`}>
            <CardHeader post={post} />
            <CardBody post={post} theme={theme} />
            <CardFooter post={post} isPostDetailPage={isPostDetailPage} />  
           {isPostDetailPage &&  <Description post={post}/>}
            {isPostDetailPage && <Comments post={post} />}
            {isPostDetailPage && <InputComment post={post} />}
        </div>
    )
}

export default PostCard
