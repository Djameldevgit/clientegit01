import React from 'react';
import { useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions/globalTypes';

const Statussearchh = () => {
    const dispatch = useDispatch();



    const handleButtonClick = () => {
        dispatch({ type: GLOBALTYPES.STATUSSEARCH, payload: true });
    };

    return (

        <div className="sidebar-search"  >
            <div>
                <div className="input-group">
                    <input type="text" className="form-control search-menu" placeholder='Recherche avancée' onClick={handleButtonClick} />
                    <div className="input-group-append">
                        <span className="input-group-text">
                            <i className="fa fa-search" aria-hidden="true" />
                        </span>
                    </div>
                </div>
            </div>
        </div>


    );
};


export default Statussearchh