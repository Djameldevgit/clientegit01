
 
import CardHeader from '@mui/material/CardHeader';

 
 
import Typography from '@mui/material/Typography';
 

import moment from 'moment';
import 'moment/locale/fr';

 
const Cardtitlepost = ({ post }) => {
  const { content } = post

  return (
    
    <CardHeader
      title={
        <Typography variant="h5" sx={{ color: '#333333' }}>
          {content}
        </Typography>
      }
      subheader={
        <Typography variant="subtitle1" sx={{ color: '#757575' }}>
          {moment(post.createdAt).fromNow()}
        </Typography>
      }
    />
 
  
  


  )}
        export default Cardtitlepost;

