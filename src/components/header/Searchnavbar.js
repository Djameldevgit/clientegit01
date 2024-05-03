import React, { useState, useEffect, useRef } from 'react';
import { getDataAPI } from './../../utils/fetchData';
import { useSelector } from 'react-redux';
 
import { getServicios, SERVICIO_TYPES } from '../../redux/actions/servicioAction';

import { useDispatch } from 'react-redux';
 
import { getPosts, POST_TYPES } from '../../redux/actions/postAction';
 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




const Searchnavbar = () => {
  const { homePostsReducer, homeServiciosReducer } = useSelector((state) => state);

  const [, setSearchResults] = useState([]);
  const [, setTotalResults] = useState(0);


  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showSearchFields, setShowSearchFields] = useState(false);
  const [content, setcontent] = useState('');
  const [contentservicio, setcontentservicio] = useState('');
  const [tipoTransaccion, setTipoTransaccion] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      setMenuPosition({ top: inputRect.bottom, left: inputRect.left });
    }
  }, [showSearchFields]);

  const handlechangesala = (event) => {
    setcontent(event.target.value.toLowerCase() );
  }

  const handlechangeservivio = (event) => {
    setcontentservicio(event.target.value);
  }

  const handleResetsala = () => {
    setcontent('')
    setcontentservicio('')
    dispatch(getPosts());

  };

  const handleResetservicio = () => {
    setcontent('')
    setcontentservicio('')

    dispatch(getServicios());
  };
  const handleBuscar = async () => {
    try {
      let url = '';
      if (tipoTransaccion === 'sala') {
        url = `/posts?limit=${homePostsReducer.page * 9}`;
        if (tipoTransaccion) {
          url += `&salaservicio=${tipoTransaccion}`;
        }
        if (content) {
          url += `&content=${content}`;
        }
      } else if (tipoTransaccion === 'servicio') {
        url = `/servicios?limit=${homeServiciosReducer.page * 9}`;
        if (tipoTransaccion) {
          url += `&salaservicio=${tipoTransaccion}`;
        }
        if (contentservicio) {
          url += `&contentservicio=${contentservicio}`;
        }
      } else {
        console.error('Tipo de transacción no especificado');
        return;
      }

      const response = await getDataAPI(url);

      if (response?.data) {
        setSearchResults(tipoTransaccion === 'sala' ? response.data.posts : response.data.servicios);
        setTotalResults(response.data.result);
        dispatch({
          type: POST_TYPES.GET_POSTS,
          payload: { ...response.data, page: homePostsReducer.page + 1 },
        });
        dispatch({
          type: SERVICIO_TYPES.GET_SERVICIOS,
          payload: { ...response.data, page: homeServiciosReducer.page + 1 },
        });
      } else {
        setSearchResults([]);
        setTotalResults(0);
      }

    } catch (error) {
      console.error('Error en handleBuscar:', error);
    }
     

  }
   /*
  ref={dropdownRef}
  const hideSearchFields = () => {
    setShowSearchFields(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        hideSearchFields();
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownRef, hideSearchFields]);
  */
  return (
    <div className='card'  style={{ position: 'relative' }}    >
      <input
        ref={inputRef}
        type="text"
        className="form-control search-menu"
        onClick={() => setShowSearchFields(!showSearchFields)}
        placeholder="Recherche"
      />
      {showSearchFields && (
        <div className='card mx-2' style={{ position: 'absolute', top: '50px', right: '0', zIndex: '999', width: '200px' }}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Options</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Options"
              value={tipoTransaccion}
              onChange={(e) => setTipoTransaccion(e.target.value)}
            >
              <MenuItem value="sala">Salle des fêtes</MenuItem>
              <MenuItem value="servicio">Prestations de service</MenuItem>
            </Select>
          </FormControl>
          {tipoTransaccion === 'sala' && (
            <div>
               <div className="form-group mb-2 mt-2"  >
                <input 
 

                className='form-control'
                  type="text"
                  name='content'
                  value={content}
                  onChange={handlechangesala}
                  placeholder="Recherche..."
                />
              </div>
            </div>
          )}
          {tipoTransaccion === 'servicio' && (
            <select onChange={(e) => handlechangeservivio(e)} value={contentservicio} name="contentservicio" placeholder="Recherche..." className="form-control"    >

              <option > Option de service</option>
              <option value="Services de Planification de événements">Services de Planification de événements</option>
              <option value="Organisations de mariage">Organisations de mariage</option>
              <option value="Location de Mobilier et Équipement">Location de Mobilier et Équipement</option>
              <option value="Décoration Des Salles Des Fêtes">Décoration Des Salles Des Fêtes</option>
              <option value="Espace pour les événements">Espace pour les événements</option>
              <option value="Catering et Banque">Catering et Banquet</option>
              <option value="Transport de Luxe / Location de voiture de mariage">Transport de Luxe / Location de voiture de mariage</option>
              <option value="Location de matériel audiovisuel et Lumières">Location de matériel audiovisuel et Lumières</option>
              <option value="Musiciens et Groupes en Direct">Musiciens et Groupes en Direct</option>
              <option value="Location de robes de mariée et de costumes">Location de robes de mariée et de costumes</option>
              <option value="Service de maquillage et coiffure">Service de maquillage et coiffure</option>
              <option value="Service de navette pour les invités">Service de navette pour les invités</option>
              <option value="Photographie et Vidéographie">Photographie et Vidéographie</option>
              <option value="Service de Traiteur et Restauration">Service de Traiteur et Restauration</option>
              <option value="Gâteau de mariage">Gâteau de mariage</option>
              <option value="Services de Fleurs et Décoration">Services de Fleurs et Décoration</option>
              <option value="Service de garde d'enfants">Service de garde d'enfants</option>
              <option value="Services de Nettoyage">Services de Nettoyage</option>
              <option value="sService de sécurité">Service de sécurité</option>
              <option value="Feux d'artifice">Feux d'artifice</option>


            </select>

          )}
          <div className="search-container card-body   mb-2 mt-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button   type="button" onClick={handleBuscar}  className="btn btn-primary">
              Rechercher
            </button>

            {
              tipoTransaccion === 'sala' ?
                <>     <button type="button" onClick={handleResetsala} className="btn btn-secondary mr-2">
                  <i className="fas fa-redo" style={{ cursor: 'pointer' }} />
                </button>
                </> :
                <>     <button type="button" onClick={handleResetservicio} className="btn btn-secondary mr-2">
                  <i className="fas fa-redo" style={{ cursor: 'pointer' }} />
                </button>
                </>
            }


          </div>
        </div>
      )}
    </div>
  );
};




export default Searchnavbar


