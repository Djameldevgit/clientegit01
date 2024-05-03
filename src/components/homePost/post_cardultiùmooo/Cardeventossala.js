import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import EventIcon from '@mui/icons-material/Event';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ListGroup from 'react-bootstrap/ListGroup';

const Cardeventossala = ({ post }) => {
  const { specifications} = post;

  return (
    <Card>
      <CardContent>
        <Typography
          level="title-md"
          overlay="true"
          underline="none"
          style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
        >
          <Icon component={EventIcon} style={{ color: 'yellow', marginRight: '7px' }} />
          Événements:
        </Typography>

        {specifications && specifications.length > 0 ? (
          specifications.map((evento, index) => (
            <div key={index}>
              <ListGroup>
                <Typography variant="body1">
                  <ListGroup.Item>
                    <Icon component={CheckBoxIcon} style={{ color: 'green', marginRight: '8px' }} />
                    {evento}
                  </ListGroup.Item>
                </Typography>
              </ListGroup>
            </div>
          ))
        ) : (
          <Typography variant="body1">Aucun événement disponible</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Cardeventossala;
