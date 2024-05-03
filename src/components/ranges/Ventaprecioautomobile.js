import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 

 

const Ventaprecioautomobile = ({VentaPrecioAutomobileee}) => {
  const [pricesala, setPricesala ] = useState([5000, 2000000]);

  return (
    <div className='card'>
      <label>
      Prix en Dinars
        <Slider
          min={5000}
          max={2000000}
          step={5000}
          range
          value={pricesala}
          onChange={(newRange) => {
            setPricesala(newRange);
            VentaPrecioAutomobileee(newRange); // Llama a la función proporcionada por el prop
          }}
          trackStyle={{ backgroundColor: '#007bff', height: 10 }}
          handleStyle={{
            borderColor: '#007bff',
            height: 20,
            width: 20,
            marginLeft: -10,
            marginTop: -5,
            backgroundColor: '#007bff',
          }}
          railStyle={{ backgroundColor: '#ccc', height: 10 }}
        />

        <div style={{ marginTop: 10 }}>
       {pricesala[0]} à {pricesala[1]} Dinars
        </div>
      </label>
    </div>
  );
};

export default Ventaprecioautomobile
