import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
 import { getServicio } from '../../redux/actions/servicioAction';

import LoadIcon from '../../images/loading.gif';
import ServicioCard from '../../components/ServicioCard';

const Servicio = () => {
    
    const { id } = useParams();
    const [servicio, setServicio] = useState([]);

    const { detailServicio } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServicio({ detailServicio, id }));

        if (detailServicio.length > 0) {
            const newArr = detailServicio.filter(servicio => servicio._id === id);
            setServicio(newArr);
        }
    }, [detailServicio, dispatch, id]);

    return (
        <div className="posts">
            {servicio.length === 0 && (
                <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
            )}

            {servicio.map(item => (
                <ServicioCard key={item._id} servicio={item} />
            ))}
        </div>
    );
};

export default Servicio;
