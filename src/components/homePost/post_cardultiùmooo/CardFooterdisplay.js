import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FollowBtn from '../../FollowBtn';

const CardFooterdisplay = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div>
      <Card>
        <CardContent>
          <div className="col-12">
            <div className="d-flex flex-md-row flex-column align-items-center justify-content-between">
               

                
               
              <FollowBtn user={user} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CardFooterdisplay;
