import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
 
import RoomServiceIcon from '@mui/icons-material/RoomService';
 
const Cardserviciosdesala = ({ post }) => {
  

  return (
    <Card>
      <CardContent>
        <Typography
          level="title-md"
          overlay="true"
          underline="none"
          style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
        >
          <RoomServiceIcon style={{ color: 'yellow', marginRight: '7px' }} /> Services disponibles de la salle

        </Typography>

 
          <div >
        
              <CardContent>
                <Typography variant="body1" color="">
                  <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                    <li style={{ marginBottom: '8px' }}>
                      <span style={{ color: 'darkcyan', marginRight: '8px' }}>   Description:</span>
                      {post.discripcion}
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            
          </div>
       

      </CardContent>
    </Card>
  );
};

export default Cardserviciosdesala;
