import React, { useState, useEffect } from 'react';
import { saveCounterError, saveCounterSuccess } from '../../redux/actions/profileAction';
 
import { postDataAPI } from '../../utils/fetchData';
import { useSelector ,useDispatch } from 'react-redux'
const Contador = () => {

  const { auth  } = useSelector(state => state)
  const dispatch = useDispatch();


  const [years, setYears] = useState(parseInt(localStorage.getItem('years')) || 0);
  const [months, setMonths] = useState(parseInt(localStorage.getItem('months')) || 0);
  const [days, setDays] = useState(parseInt(localStorage.getItem('days')) || 0);
  const [hours, setHours] = useState(parseInt(localStorage.getItem('hours')) || 0);
  const [minutes, setMinutes] = useState(parseInt(localStorage.getItem('minutes')) || 0);
  const [seconds, setSeconds] = useState(parseInt(localStorage.getItem('seconds')) || 0);
  const [isRunning, setIsRunning] = useState(false);
 
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        } else if (days > 0) {
          setDays((prevDays) => prevDays - 1);
          setHours(23);
          setMinutes(59);
          setSeconds(59);
        } else if (months > 0) {
          setMonths((prevMonths) => prevMonths - 1);
          // Lógica para calcular los días en el mes
          setHours(23);
          setMinutes(59);
          setSeconds(59);
        } else if (years > 0) {
          setYears((prevYears) => prevYears - 1);
          // Lógica para calcular los días en el año
          setHours(23);
          setMinutes(59);
          setSeconds(59);
        } else {
          setIsRunning(false);
          clearInterval(interval);
          alert('¡Tiempo terminado!');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, years, months, days, hours, minutes, seconds]);

  const startCountdown = () => {
    setIsRunning(true);
  };

  const stopCountdown = () => {
    setIsRunning(false);
  };

  const resetCountdown = () => {
    setIsRunning(false);
    setYears(0);
    setMonths(0);
    setDays(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    // También limpiamos el almacenamiento local
     
  };

  const saveCounter = async () => {
    
  
    try {
      // Realiza la solicitud al servidor
       await postDataAPI('contador', { years, months, days, hours, minutes, seconds }, auth.token);
      console.log('Counter information saved successfully');
      // Despacha la acción de éxito
      dispatch(saveCounterSuccess());
    } catch (error) {
      console.error('Error saving counter information:', error);
      // Despacha la acción de error
      dispatch(saveCounterError(error.message));
    }
  };
  

  // Almacenar los valores en el almacenamiento local al cambiar
 
  return (
   
   <div className="container">
     <div className="container">
      <h1 className="mt-5">Countdown Timer</h1>
      {auth.user && (
        <div className="input-group mt-3">
        <h1 className="mt-5">Countdown Timer user</h1>
    <div className="input-group mt-3">
      <input
        type="number"
        className="form-control"
        value={years}
        onChange={(e) => setYears(parseInt(e.target.value))}
        placeholder="Years"
      />
      <input
        type="number"
        className="form-control"
        value={months}
        onChange={(e) => setMonths(parseInt(e.target.value))}
        placeholder="Months"
      />
      <input
        type="number"
        className="form-control"
        value={days}
        onChange={(e) => setDays(parseInt(e.target.value))}
        placeholder="Days"
      />
      <input
        type="number"
        className="form-control"
        value={hours}
        onChange={(e) => setHours(parseInt(e.target.value))}
        placeholder="Hours"
      />
      <input
        type="number"
        className="form-control"
        value={minutes}
        onChange={(e) => setMinutes(parseInt(e.target.value))}
        placeholder="Minutes"
      />
      <input
        type="number"
        className="form-control"
        value={seconds}
        onChange={(e) => setSeconds(parseInt(e.target.value))}
        placeholder="Seconds"
      />
    </div>
    <div className="mt-3">
      <button className="btn btn-primary mr-2" onClick={startCountdown} disabled={isRunning}>
        Start
      </button>
      <button className="btn btn-danger mr-2" onClick={stopCountdown} disabled={!isRunning}>
        Stop
      </button>
      <button className="btn btn-secondary" onClick={resetCountdown}>
        Reset
      </button>
      <button className="btn btn-success" onClick={saveCounter}>
        Save Counter
      </button>

    </div>
    <div className="countdown-display mt-3">
      <h2>Countdown</h2>
      <p>
        {years > 0 && <span className="badge badge-primary mr-1">{years} Years</span>}
        {months > 0 && <span className="badge badge-primary mr-1">{months} Months</span>}
        {days > 0 && <span className="badge badge-primary mr-1">{days} Days</span>}
        {hours > 0 && <span className="badge badge-primary mr-1">{hours} Hours</span>}
        {minutes > 0 && <span className="badge badge-primary mr-1">{minutes} Minutes</span>}
        {seconds > 0 && <span className="badge badge-primary">{seconds} Seconds</span>}
      </p>
    </div>
  </div>
        
      )}
      {auth.user && auth.user.role === 'admin' && (
        <div className="admin-section">
        <h1 className="mt-5">Countdown Timer user</h1>
    <div className="input-group mt-3">
      <input
        type="number"
        className="form-control"
        value={years}
        onChange={(e) => setYears(parseInt(e.target.value))}
        placeholder="Years"
      />
      <input
        type="number"
        className="form-control"
        value={months}
        onChange={(e) => setMonths(parseInt(e.target.value))}
        placeholder="Months"
      />
      <input
        type="number"
        className="form-control"
        value={days}
        onChange={(e) => setDays(parseInt(e.target.value))}
        placeholder="Days"
      />
      <input
        type="number"
        className="form-control"
        value={hours}
        onChange={(e) => setHours(parseInt(e.target.value))}
        placeholder="Hours"
      />
      <input
        type="number"
        className="form-control"
        value={minutes}
        onChange={(e) => setMinutes(parseInt(e.target.value))}
        placeholder="Minutes"
      />
      <input
        type="number"
        className="form-control"
        value={seconds}
        onChange={(e) => setSeconds(parseInt(e.target.value))}
        placeholder="Seconds"
      />
    </div>
    <div className="mt-3">
      <button className="btn btn-primary mr-2" onClick={startCountdown} disabled={isRunning}>
        Start
      </button>
      <button className="btn btn-danger mr-2" onClick={stopCountdown} disabled={!isRunning}>
        Stop
      </button>
      <button className="btn btn-secondary" onClick={resetCountdown}>
        Reset
      </button>
      <button className="btn btn-success" onClick={saveCounter}>
        Save Counter
      </button>

    </div>
    <div className="countdown-display mt-3">
      <h2>Countdown</h2>
      <p>
        {years > 0 && <span className="badge badge-primary mr-1">{years} Years</span>}
        {months > 0 && <span className="badge badge-primary mr-1">{months} Months</span>}
        {days > 0 && <span className="badge badge-primary mr-1">{days} Days</span>}
        {hours > 0 && <span className="badge badge-primary mr-1">{hours} Hours</span>}
        {minutes > 0 && <span className="badge badge-primary mr-1">{minutes} Minutes</span>}
        {seconds > 0 && <span className="badge badge-primary">{seconds} Seconds</span>}
      </p>
    </div>
  
        </div>
      )}
    </div>
   
   
     </div>
  
  );
};

export default Contador;
