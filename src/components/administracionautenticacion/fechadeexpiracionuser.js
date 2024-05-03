import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { postDataAPI } from '../../utils/fetchData';

const Fechadeexpiracionuser = () => {
  const { auth } = useSelector(state => state);
  const { user } = useSelector(state => state.auth);
  const [expirationDate, setExpirationDate] = useState(null);

  useEffect(() => {
    const fetchExpirationDate = async () => {
      try {
        if (!auth || !auth.user || !auth.user._id) {
          console.error('User not authenticated or missing user ID.');
          return;
        }

        const response = await postDataAPI(`user/${user._id}`, { expirationDate }, auth.token);
        setExpirationDate(response.expirationDate);
      } catch (error) {
        console.error('Error fetching expiration date:', error);
      }
    };

    fetchExpirationDate();
  }, [auth, expirationDate]);

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value); // Assuming expirationDate is captured from some input field
  };

  const handleSubmit = async () => {
    try {
      await postDataAPI(`user/${user._id}`, { expirationDate }, auth.token);
      console.log('Expiration date updated successfully.');
    } catch (error) {
      console.error('Error updating expiration date:', error);
    }
  };

  return (
    <div className="profile">
    <h2>User Profile</h2>
    <div>
      <input type="date" value={expirationDate} onChange={handleExpirationDateChange} />
      <button onClick={handleSubmit}>Update Expiration Date</button> {/* Botón para enviar la fecha */}
      <p>Expiration Date: {expirationDate ? expirationDate : 'Loading...'}</p>
    </div>
  </div>
  );
};

export default Fechadeexpiracionuser;
