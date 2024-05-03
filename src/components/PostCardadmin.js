 
import CardBody from './homeAdmin/post_cardadmin/CardBody'
 
import CardHeader from './homeAdmin/post_cardadmin/CardHeader';

const PostCardadmin = ({post, theme}) => {
  
    return (
        <div>
            <div>
                <CardHeader post={post} />
                <CardBody post={post} theme={theme} />
 
            </div>
        </div>
    );
}

export default PostCardadmin;