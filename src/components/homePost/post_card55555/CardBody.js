 
 import Carousel from '../../Carouselss/CarouselPost';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
const CardBody = ({ post, isHomePage }) => {
  return (
    <Card>
      <CardContent>
        {post.images.length > 0 && <Carousel images={post.images} id={post._id} isHomePage={isHomePage} height={250} />}
      </CardContent>
    </Card>
  );
};

export default CardBody;

