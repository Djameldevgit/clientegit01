
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';

import moment from 'moment';
import 'moment/locale/fr';
 
import Typography from '@mui/material/Typography';

const Cardtitlesala = ({post}) => {
  const { content } = post

  return (
 
    <CardHeader
    title={
      <Typography variant="h5" sx={{ color: '#333333' }}>
        {content}
      </Typography>
    }S
    subheader={
      <Typography variant="subtitle1" sx={{ color: '#757575' }}>
        {moment(post.createdAt).fromNow()}
      </Typography>
    }
  />


  )}

export default Cardtitlesala

