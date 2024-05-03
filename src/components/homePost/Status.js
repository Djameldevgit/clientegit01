import React from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Status  = () => {
  const dispatch = useDispatch();

  const buttonStyles = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#3498db',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const handleButtonClick = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: true });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <button style={buttonStyles} onClick={handleButtonClick}>
      Publier un article Automobile
      </button>
    </div>
  );
};

export default Status ;
