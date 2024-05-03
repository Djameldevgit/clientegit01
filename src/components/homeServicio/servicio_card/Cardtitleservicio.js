
 
import CardHeader from '@mui/material/CardHeader';

 
 
import Typography from '@mui/material/Typography';
 

import moment from 'moment';
import 'moment/locale/fr';

 
const Cardtitleservicio = ({ servicio }) => {
  const { contentservicio } = servicio

  return (
    
    <CardHeader
      title={
        <Typography variant="h5" sx={{ color: '#333333' }}>
          {contentservicio}
        </Typography>
      }
      subheader={
        <Typography variant="subtitle1" sx={{ color: '#757575' }}>
          {moment(servicio.createdAt).fromNow()}
        </Typography>
      }
    />
 
  
  


  )}
        export default Cardtitleservicio;

