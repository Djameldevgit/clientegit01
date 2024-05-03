import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import RoomServiceIcon from '@mui/icons-material/RoomService';

const Cardserviciosdeservicio = ({ servicio }) => {


  return (
    <Card>
      <CardContent>
    
     
  <CardContent>
    <Typography
      variant="h6"
      style={{ 
        color: 'blue',
        textDecoration: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <RoomServiceIcon style={{ color: 'yellow', marginRight: '10px' }} />
      <span style={{ color: 'red', marginRight: '10px'}}>{servicio.contentservicio}: </span> {servicio.optionservicio}
    </Typography>
  </CardContent>
 

 


        <div >

          <CardContent>
            <Typography variant="body1" color="">
              <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                <li style={{ marginBottom: '8px' }}>
                  <span style={{ color: 'darkcyan', marginRight: '8px' }}>   Description:</span>
                  {servicio.discripcion}
                </li>
              </ul>
            </Typography>
          </CardContent>

        </div>


      </CardContent>
    </Card>
  );
};

export default Cardserviciosdeservicio;
