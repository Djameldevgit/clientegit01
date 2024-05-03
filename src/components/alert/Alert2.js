import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Notify = () => {
  const { alert } = useSelector(state => state);
  const dispatch = useDispatch();
  const [showAlert2, setShowAlert2] = useState(false);

  const handleShowAlert2 = () => {
    setShowAlert2(true);
    dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
  };

  return (
    <div>
      {alert.loading && <Loading />}

      {alert.error && (
        <Alert variant="danger" onClose={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })} dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{alert.error}</p>
        </Alert>
      )}

      {alert.success && (
        <Alert variant="success" onClose={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })} dismissible>
          <Alert.Heading>Success</Alert.Heading>
          <p>{alert.success}</p>
        </Alert>
      )}

      {/* Renderizar el nuevo Alert2 */}
      {showAlert2 && <Alert2 onClose={() => setShowAlert2(false)} />}
      {!showAlert2 && <Button onClick={handleShowAlert2}>Show Alert2</Button>}
    </div>
  );
};

export default Notify;
