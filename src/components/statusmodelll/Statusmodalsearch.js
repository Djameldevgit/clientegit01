
import { Form, TabContent } from 'react-bootstrap';
import Wilayacommune from '../searching/Wilayacommune';


import Ventaprecioautomobile from '../ranges/Ventaprecioautomobile';
import Marcamodelo from '../searching/Marcamodelo';




import React, { useState } from 'react';

import { getDataAPI } from '../../utils/fetchData';



import { getServicios, SERVICIO_TYPES } from '../../redux/actions/servicioAction';

import { useSelector, useDispatch } from 'react-redux';


import Ventaprecioservicio from '../ranges/Ventaprecioservicio';

import { getPosts, POST_TYPES } from '../../redux/actions/postAction';

import { GLOBALTYPES } from '../../redux/actions/globalTypes';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const Statusmodalsearch = ({ closeModal }) => {



    const { homePostsReducer, homeServiciosReducer } = useSelector((state) => state);

    const dispatch = useDispatch()


    const [, setSearchResults] = useState([]);
    const [, setTotalResults] = useState(0);

    const [optionservicio, setOptionservicio] = useState('');
    const [tipoTransaccion, setTipoTransaccion] = useState('');
    const [showSearchFields, setShowSearchFields] = useState(false);
    const [ventaValue, setVentalocation] = useState('');
    const [wilayaValue, setWilayaValue] = useState('');
    const [communeValue, setCommuneValue] = useState('');
    const [marcaValue, setMarcaValue] = useState('');
    const [modeloValue, setModeloValue] = useState('');
    const [content, setcontent] = useState('');
    const [pricesala, setpricesala] = useState([5000, 2000000]);
    const [priceservicio, setpriceservicio] = useState([500, 1000000]);



    const handlechange = (event) => {
        setcontent(event.target.value); // Actualiza el estado content con el valor del campo de entrada
    }



    const VentaPrecioservicioo = (value) => {
        setpriceservicio(value);
    };

    const VentaPrecioAutomobileee = (value) => {
        setpricesala(value);
    };


    const handleSelectChange = (value, e) => {
        setOptionservicio(value);
        setTipoTransaccion(e.target.value);

    };

    const handleReset = () => {
        setVentalocation('');
        setTipoTransaccion('');

        setWilayaValue('');
        setCommuneValue('');
        setMarcaValue('');
        setModeloValue('');
        setpricesala([5000, 2000000]);;
        setpriceservicio([500, 1000000]);;

        setOptionservicio('')
        setcontent('')


        dispatch(getPosts());
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
                if (ventaValue) {
                    url += `&venta=${ventaValue}`;
                }
                if (content) {
                    url += `&content=${content}`;
                }
                if (pricesala[0] !== 5000 || pricesala[1] !== 2000000) {
                    url += `&minpriciosala=${pricesala[0]}&maxpriciosala=${pricesala[1]}`;
                }

                if (wilayaValue) {
                    url += `&wilaya=${wilayaValue}`;
                }

                if (communeValue) {
                    url += `&commune=${communeValue}`;
                }

                if (marcaValue) {
                    url += `&marca=${marcaValue}`;
                }




            } else if (tipoTransaccion === 'servicio') {


                url = `/servicios?limit=${homeServiciosReducer.page * 9}`;

                if (tipoTransaccion) {
                    url += `&salaservicio=${tipoTransaccion}`;
                }
                if (ventaValue) {
                    url += `&venta=${ventaValue}`;
                }

                if (priceservicio[0] !== 500 || priceservicio[1] !== 1000000) {
                    url += `&minpriceservicio=${priceservicio[0]}&maxpriceservicio=${priceservicio[1]}`;
                }

                if (wilayaValue) {
                    url += `&wilaya=${wilayaValue}`;
                }

                if (communeValue) {
                    url += `&commune=${communeValue}`;
                }

                if (marcaValue) {
                    url += `&marca=${marcaValue}`;
                }
                if (optionservicio) {
                    url += `&optionservicio=${optionservicio}`;
                }

            } else {
                // Tipo de transacción no especificado, manejar según tu lógica
                console.error('Tipo de transacción no especificado');
                return;
            }

            // Resto del código de construcción de la URL...

            const response = await getDataAPI(url);

            // Verifica si response está definido antes de acceder a sus propiedades
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
                // No hay datos en la respuesta
                setSearchResults([]);
                setTotalResults(0);
            }
            dispatch({ type: GLOBALTYPES.STATUSSEARCH, payload: false });


        } catch (error) {
            console.error('Error en handleBuscar:', error);
        }
    }




    return (


        <div className="status_modal">
            <div className="status_body">


                <form  >

                    <div className="status_header">
                        <h5 className="m-0 mx-auto">Recherche avancée</h5>
                        <span onClick={() => dispatch({ type: GLOBALTYPES.STATUSSEARCH, payload: false })}>
                            <span onClick={closeModal}>&times;</span>
                        </span>
                    </div>

                    <div className="sidebar-search">
                        <div>

                            <input
                                type="text"
                                className="form-control search-menu"
                                onClick={() => setShowSearchFields(!showSearchFields)} // Modificado para alternar el estado
                                placeholder="Options"
                            />


                        </div>
                    </div>




                    {showSearchFields && (
                        <div className='card mx-2'>

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

                                    <input
                                        type="text"
                                        name='content'
                                        value={content} // Usa searchTerm en lugar de content para mantenerlos sincronizados
                                        onChange={handlechange}
                                        placeholder="Buscar posts..."
                                    />



                                    <div className="search-container   mb-2 mt-2">
                                        <Wilayacommune
                                            selectedWilaya={wilayaValue}
                                            setSelectedWilaya={setWilayaValue}
                                            selectedCommune={communeValue}
                                            setSelectedCommune={setCommuneValue} />
                                    </div>


                                    <div className='card-body mb-2'>


                                        <div className="search-container   mb-2 mt-2">
                                            <Ventaprecioautomobile
                                                VentaPrecioAutomobileee={VentaPrecioAutomobileee}
                                            />
                                        </div>


                                    </div>




                                </div>
                            )}





                            {tipoTransaccion === 'servicio' && (

                                <div>
                                    <div className="search-container   mb-2 mt-2">
                                        <Wilayacommune
                                            selectedWilaya={wilayaValue}
                                            setSelectedWilaya={setWilayaValue}
                                            selectedCommune={communeValue}
                                            setSelectedCommune={setCommuneValue} />
                                    </div>
                                    <div>

                                        <Form.Select aria-label="Default select example" onChange={handleSelectChange}
                                            value={optionservicio}>
                                            <option value="">Options service</option>
                                            <option value="Services de Planification des événements">Services de Planification de événements</option>
                                            <option value="Organisations de mariage">Organisations de mariage</option>
                                            <option value="Location de Mobilier et Équipement">Location de Mobilier et Équipement</option>
                                            <option value="Décoration Des Salles Des Fêtes">Décoration Des Salles Des Fêtes</option>
                                            <option value="Espace pour les événements">Espace pour les événements</option>
                                            <option value="Catering et Banque">Catering et Banquet</option>
                                            <option value="Service de transport / Location de voiture de mariage">Service de transport / Location de voiture de mariage</option>
                                            <option value="Location de matériel audiovisuel et Lumières">Location de matériel audiovisuel et Lumières</option>
                                            <option value="Musiciens et Groupes en Direct">Musiciens et Groupes en Direct</option>
                                            <option value="Location de robes de mariée et de costumes">Location de robes de mariée et de costumes</option>
                                            <option value="Service de maquillage et coiffure">Service de maquillage et coiffure</option>
                                            <option value="Service de navette pour les invités">Service de navette pour les invités</option>
                                            <option value="Service de Photographie et Vidéographie">Photographie et Vidéographie</option>
                                            <option value="Service de Traiteur et Restauration">Service de Traiteur et Restauration</option>
                                            <option value="Gâteau de mariage">Gâteau de mariage</option>
                                            <option value="Services de Fleurs et Décoration">Services de Fleurs et Décoration</option>
                                            <option value="Service de garde d'enfants">Service de garde d'enfants</option>
                                            <option value="Services de Nettoyage">Services de Nettoyage</option>
                                            <option value="Service de sécurité">Service de sécurité</option>
                                            <option value="Service de Feux d'artifice">Service de Feux d'artifice</option>
                                        </Form.Select>
                                    </div>
                                    <div className="search-container   mb-2 mt-2">
                                        <Marcamodelo
                                            selectedMarca={marcaValue}
                                            setSelectedMarca={setMarcaValue}
                                            selectedModelo={modeloValue}
                                            setSelectedModelo={setModeloValue}
                                        />
                                    </div>



                                    <div>

                                        <Ventaprecioservicio VentaPrecioservicioo={VentaPrecioservicioo} />
                                    </div>






                                </div>
                            )}




                            <div className="search-container card-body   mb-2 mt-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="button" onClick={handleBuscar} className="btn btn-primary" >
                                    Filtre
                                </button>




                                <button type="button" onClick={handleReset} className="btn btn-secondary mr-2">
                                    <i className="fas fa-redo" style={{ cursor: 'pointer' }} />
                                </button>
                            </div>





                        </div>
                    )}






                </form>
            </div >
        </div >
    );
}


export default Statusmodalsearch