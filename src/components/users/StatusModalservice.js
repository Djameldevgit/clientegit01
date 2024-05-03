import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

import { createPostPendiente } from '../../redux/actions/postaproveAction'
import { updatePost } from '../../redux/actions/postAction';

import automobilesjson from "../../json/automobiles.json";
import communesjson from "../../json/communes.json";


import { imageShow, videoShow } from '../../utils/mediaShow'
import Slider from 'rc-slider';

import Select from 'react-select';


const StatusModalservice = () => {

    const { auth, theme, status, socket } = useSelector(state => state)
    const { user } = useSelector(state => state.auth);
    const { bloquepost } = user;
    const dispatch = useDispatch()







    const handleTransaccionClick = (tipo) => {
        setTipoTransaccion(tipo);
    };


    const [selectedMarca, setSelectedMarca] = useState([]);
    const [selectedModelo, setSelectedModelo] = useState([]);

    const [selectedWilaya, setSelectedWilaya] = useState([]);
    const [selectedCommune, setSelectedCommune] = useState([]);




    const handleMarcaChange = (event) => {
        const selectedMarca = event.target.value;
        setSelectedMarca(selectedMarca);

        const marcaEncontrada = automobilesjson.find((marca) => marca.marca === selectedMarca);
        const modelos = marcaEncontrada && marcaEncontrada.modelo ? marcaEncontrada.modelo : [];

        if (modelos.length > 0) {
            setSelectedModelo(modelos[0]);
        } else {
            setSelectedModelo('');
        }
    };


    const handleWilayaChange = (event) => {
        const selectedWilaya = event.target.value;
        setSelectedWilaya(selectedWilaya);

        const wilayaEncontrada = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya);
        const communes = wilayaEncontrada && wilayaEncontrada.commune ? wilayaEncontrada.commune : [];

        if (communes.length > 0) {
            setSelectedCommune(communes[0]);
        } else {
            setSelectedCommune('');
        }
    };


    const handleModeloChange = (event) => {
        setSelectedModelo(event.target.value);
    };

    const handleCommuneChange = (event) => {
        setSelectedCommune(event.target.value);
    };

    const initialState = { content: '', tipoAlquiler: '', priceservicio: '', ventalocation: '',   ano: '', versionfinition: '', motor: '', inergia: '', transmicion: '', kilometraje: '', color: '',   discripcion: '', priceservicio: '', dinero: '', negociable: '', wilaya: '', commune: '', nomprenom: '', telefono: '', email: '', specifications: [], privacidad_informations: '', comentarios: '' }
    const [servicioData, setServiciodata] = useState(initialState);

    const [images, setImages] = useState([])
    const { specifications } = servicioData; // Obtén el valor de 'specifications' del objeto 'servicioData'
    const [tipoTransaccion, setTipoTransaccion] = useState(servicioData.ventalocation);


    const datos = [
        { value: 'Climatisation', label: 'Climatisation' },
        { value: 'Direction assisstée', label: 'Direction assisstée' },
        { value: 'Commandes aux volant', label: 'Commandes aux volant' },
        { value: 'Volant cuir', label: 'Volant cuir' },
        { value: 'Accoudoir', label: 'Accoudoir' },
        { value: 'Ecran Tactile', label: 'Ecran Tactile' },
        { value: 'Retroviseurs éléctriques', label: 'Retroviseurs éléctriques' },
        { value: 'Rétroviseurs rabattables', label: 'Rétroviseurs rabattables' },
        { value: 'Vitres éléctriques avant', label: 'Vitres éléctriques avant' },
        { value: 'Vitres éléctriques arrière', label: 'Vitres éléctriques arrière' },
        { value: 'Toit ouvrant', label: 'Toit ouvrant' },
        { value: 'Jantes Alliage', label: 'Jantes Alliage' },
        { value: 'Phares antibrouillard', label: 'Phares antibrouillard' },
        { value: 'Phares xénon / Full LED', label: 'Phares xénon / Full LED' },
        { value: 'Feux du jour', label: 'Feux du jour' },
        { value: 'ABS', label: 'ABS' },
        { value: 'ESP', label: 'ESP' },
        { value: 'Radar de recul', label: 'Radar de recul' },
        { value: 'Alarme', label: 'Alarme' },
        { value: 'Régulateur de vitesse', label: 'Régulateur de vitesse' },
        { value: 'Détécteur de pluie', label: 'Détécteur de pluie' },
    ];

    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleChangeInput = (e, value) => {
        if (value !== undefined) {
            // Manejar el Slider
            setServiciodata({ ...servicioData, [e]: value });
        } else {
            // Manejar los selects
            const { name, value } = e.target;
            setServiciodata({ ...servicioData, [name]: value });
        }
    };


    const handleChangeSelect = selectedOptions => {
        const selectedValues = selectedOptions.map(option => option.value);
        setServiciodata({ ...servicioData, specifications: selectedValues });
    };





    const handleSubmit = (e) => {
        e.preventDefault();

        if (images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Veuillez ajouter votre photo.' },
            });



        if (status.onEdit) {
            dispatch(updatePost({ servicioData, specifications, marca: selectedMarca, modelo: selectedModelo, wilaya: selectedWilaya, commune: selectedCommune, images, auth, status }));
        } else {
            dispatch(createPostPendiente({ servicioData, specifications, marca: selectedMarca, modelo: selectedModelo, wilaya: selectedWilaya, commune: selectedCommune, images, auth, socket }));

        }


        setServiciodata({
            content: '', tipoAlquiler: '', priceservicio: '', ventalocation: '',   ano: '', versionfinition: '', motor: '', inergia: '', transmicion: '', kilometraje: '', color: '',   discripcion: '', priceservicio: '', dinero: '', negociable: '', wilaya: '', commune: '', nomprenom: '', telefono: '', email: '', specifications: [], privacidad_informations: '', comentarios: ''
        });
        setImages([]);
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    }
    const marcasOptions = automobilesjson.map((marca, index) => (
        <option key={index} value={marca.marca}>
            {marca.marca}
        </option>
    ));

    const modelosOptions = automobilesjson.find((marca) => marca.marca === selectedMarca)?.modelo?.map((modelo, index) => (
        <option key={index} value={modelo}>
            {modelo}
        </option>
    ));

    const wilayasOptions = communesjson.map((wilaya, index) => (
        <option key={index} value={wilaya.wilaya}>
            {wilaya.wilaya}
        </option>
    ));

    const communesOptions = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya)?.commune?.map((commune, index) => (
        <option key={index} value={commune}>
            {commune}
        </option>
    ));




    useEffect(() => {
        if (status.onEdit) {


            setServiciodata({ ...status, specifications: status.specifications });
            setImages(status.images);
            setSelectedMarca(status.marca)
            setSelectedModelo(status.modelo)
            setSelectedWilaya(status.wilaya)
            setSelectedCommune(status.commune)

        }
    }, [status])








    return (


        <div className="status_modal"   >
            <div className="status_body">



                <form onSubmit={handleSubmit}  >



                    <div className="status_header">
                        <h5 className="m-0"> Publications Automobiles</h5>
                        <span onClick={() => dispatch({
                            type: GLOBALTYPES.STATUS, payload: false
                        })}>
                            &times;
                        </span>
                    </div>


                    <div className="form-group">
                        <button type="button" className="btn btn-info btn-block" onClick={() => handleTransaccionClick('Venta')}>
                            Vente
                        </button>
                        <button type="button" className="btn btn-info btn-block" onClick={() => handleTransaccionClick('Alquiler')}>
                            Location
                        </button>
                    </div>














                    {tipoTransaccion === 'Venta' && (
                        <div>
                            <br></br>

                            <br></br>
                            <div className="form-group">

                                <select name="ventalocation" value={servicioData.ventalocation} onChange={(e) => handleChangeInput(e)} className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                    <option value="">Tipe de transacction</option>
                                    <option value="Vente">Vente</option>
                                    <option value="Location" disabled>Location</option>
                                </select>
                            </div>
                            <div>

                            </div>
                            <br></br>
                            

                            <div className="form-group">
                                <label className="text-danger">Marque:</label>
                                <div>
                                    <select className="form-control" name="marca" value={selectedMarca} onChange={handleMarcaChange} disabled={bloquepost === 'bloque-post'} >
                                        <option value="">Seleccionar marca</option>
                                        {marcasOptions}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="text-danger">Modelo:</label>
                                <div>
                                    <select className="form-control" name="modelo" value={selectedModelo} onChange={handleModeloChange} disabled={bloquepost === 'bloque-post'} >
                                        <option value="">Seleccionar modelo</option>
                                        {modelosOptions}
                                    </select>
                                </div>
                            </div>
                            <br></br>
                            <div className="card-body form-group">
                                <label className="text-danger">Sélectionner l'année: </label>
                                <Slider
                                    min={1990}
                                    max={2023}
                                    step={1}
                                    value={servicioData.ano}
                                    onChange={(value) => {
                                        handleChangeInput('ano', value);
                                    }}
                                    trackStyle={{ backgroundColor: '#44EB00', height: 10 }}
                                    handleStyle={{
                                        borderColor: '#00AF72',
                                        height: 20,
                                        width: 20,
                                        marginLeft: -10,
                                        marginTop: -5,
                                        backgroundColor: '#007bff',
                                    }}
                                    railStyle={{ backgroundColor: '#ccc', height: 10 }}
                                    disabled={bloquepost === 'bloque-post'}
                                />
                                <div style={{ marginTop: 10 }}>
                                    Année : {servicioData.ano}
                                </div>
                            </div>




                            <br></br>


                            <div className="form-group  ">
                                <label className="text-danger" >Version finition: </label>
                                <input onChange={(e) => handleChangeInput(e)} placeholder="Version finition" value={servicioData.versionfinition} name="versionfinition" type="text" className="form-control" disabled={bloquepost === 'bloque-post'} />
                            </div>
                            <br></br>




                            <div className="form-group  ">
                                <label className="text-danger" >Motorisation: </label>
                                <input onChange={(e) => handleChangeInput(e)} placeholder="Moteur" value={servicioData.motor} name="motor" type="text" className="form-control" disabled={bloquepost === 'bloque-post'} />
                            </div>



                            <div className="form-group">

                                <select name="inergia" value={servicioData.inergia} onChange={(e) => handleChangeInput(e)} className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                    <option value="">Inergie</option>
                                    <option value="Essence">Essence</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="GPL">GPL</option></select>
                            </div>


                            <div className="form-group">

                                <select name="transmicion" value={servicioData.transmicion} onChange={(e) => handleChangeInput(e)} className="form-control" disabled={bloquepost === 'bloque-post'} >
                                    <option value="">Boite</option>
                                    <option value="Manuelle">Manuelle</option>
                                    <option value="Automatique">Automatique</option>
                                    <option value="Semi Automatique">Semi Automatique</option>
                                </select>
                            </div>
                            <br></br>
                            <div className="card-body form-group">
                                <label className="text-danger">sélectionner le kilométrage: </label>
                                <Slider
                                    min={0}
                                    max={50000}
                                    step={1}
                                    value={servicioData.kilometraje}
                                    onChange={(value) => {
                                        handleChangeInput('kilometraje', value);
                                    }}
                                    trackStyle={{ backgroundColor: '#44EB00', height: 10 }}
                                    handleStyle={{
                                        borderColor: '#00AF72',
                                        height: 20,
                                        width: 20,
                                        marginLeft: -10,
                                        marginTop: -5,
                                        backgroundColor: '#007bff',
                                    }}
                                    railStyle={{ backgroundColor: '#ccc', height: 10 }}
                                    disabled={bloquepost === 'bloque-post'}
                                />
                                <div style={{ marginTop: 10 }}>
                                     {servicioData.kilometraje} Km
                                </div>
                            </div>

                            <div className="form-group">

                                <select name="color" value={servicioData.color} placeholder="Couleur" onChange={(e) => handleChangeInput(e)} className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                    <option value="">Couleur</option>
                                    <option value="Blanc">Blanc</option>
                                    <option value="Noir">Noir</option>
                                    <option value="Gris">Gris</option>
                                    <option value="Gris Argent">Gris Argent</option>
                                    <option value="Gris Souris">Gris Souris</option>
                                    <option value="Gris Manitoba">Gris Manitoba</option>
                                    <option value="Gris Champagne">Gris Champagne</option>
                                    <option value="Gris Alluminium">Gris Alluminium</option>
                                    <option value="Bleu">Bleu</option>
                                    <option value="Bleu Ciel">Bleu Ciel</option>
                                    <option value="Bleu Nuit">Bleu Nuit</option>
                                    <option value="Bleu Turquoise">Bleu Turquoise</option>
                                    <option value="Bleu Gauloise">Bleu Gauloise</option>
                                    <option value="Vert">Vert</option>
                                    <option value="Vert Bouteille">Vert Bouteille</option>
                                    <option value="Vert Militaire">Vert Militaire</option>
                                    <option value="Vert Pistache">Vert Pistache</option>
                                    <option value="Marron18">Marron</option>
                                    <option value="Maron Chocolat">Maron Chocolat</option>
                                    <option value="Rouge">Rouge</option>
                                    <option value="Rouge Bordeaux">Rouge Bordeaux</option>
                                    <option value="Grenat">Grenat</option>
                                    <option value="Rose">Rose</option>
                                    <option value="Jaun">Jaune</option>
                                    <option value="Miel">Miel</option>
                                    <option value="Beige">Beige</option>
                                    <option value="Orange">Orange</option>
                                    <option value="Violet">Violet</option>
                                    <option value="Mauve">Mauve</option>
                                    <option value="Aubergine">Aubergine</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>



 

                            <div className="form-group">
                                <div>
                                    <Select
                                        isDisabled={bloquepost === 'bloque-post'}

                                        placeholder="Options de voiture"
                                        value={datos.filter(obj => servicioData.specifications && servicioData.specifications.includes(obj.value))}
                                        options={datos}
                                        onChange={handleChangeSelect}
                                        isMulti
                                        closeMenuOnSelect={false}
                                    />
                                </div>

                            </div>

                            <br></br>
 
                            <div className="card-body form-group">
                                <label className="text-danger">Sélectionner Prix pour Milions Cm: </label>
                                <Slider
                                    min={100}
                                    max={3000}
                                    step={20}
                                    value={servicioData.priceservicio}
                                    onChange={(value) => {
                                        handleChangeInput('priceservicio', value);
                                    }}
                                    trackStyle={{ backgroundColor: '#44EB00', height: 10 }}
                                    handleStyle={{
                                        borderColor: '#00AF72',
                                        height: 20,
                                        width: 20,
                                        marginLeft: -10,
                                        marginTop: -5,
                                        backgroundColor: '#007bff',
                                    }}
                                    railStyle={{ backgroundColor: '#ccc', height: 10 }}
                                    disabled={bloquepost === 'bloque-post'}
                                />
                                <div style={{ marginTop: 10 }}>
                                    prix: {servicioData.priceservicio} Milions Cm
                                </div>



                                <br></br>

                                <div className="form-group" >
                                    <select onChange={(e) => handleChangeInput(e)} value={servicioData.dinero} name="dinero" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                        <option > Devis de vente</option>
                                        <option value="Dinars" disabled >Dinars</option>

                                        <option value="Millions Centimes" > Millions Centimes </option>

                                    </select>
                                </div>
                                <div>
                                    <select onChange={(e) => handleChangeInput(e)} value={servicioData.negociable} name="negociable" placeholder="Negociable" className="form-control" disabled={bloquepost === 'bloque-post'} >
                                        <option > Négociation:</option>
                                        <option value="Négociable" > Négociable</option>
                                        <option value="Fixe">Fixe</option>
                                        <option value="Offert">Offert</option>
                                        <option value="J'accepte l'échange">J'accepte l'échange</option>
                                        <option value="Pas d'échange">Pas d'échange</option>
                                    </select>
                                </div>
                            </div>
                            <br></br>

                            <label className="text-danger">Description: </label>
                            <textarea name="discripcion" value={servicioData.discripcion}
                                onChange={(e) => handleChangeInput(e)}
                                style={{
                                    filter: theme ? 'invert(1)' : 'invert(0)',
                                    color: theme ? 'white' : '#111',
                                    background: theme ? 'rgba(0,0,0,.03)' : '',

                                }}
                                disabled={bloquepost === 'bloque-post'}
                            />



                            <div className="form-group">
                                <label className="text-danger">Wilaya:</label>
                                <div>
                                    <select className="form-control" name="wilaya" value={selectedWilaya} onChange={handleWilayaChange} disabled={bloquepost === 'bloque-post'} >
                                        <option value="">Seleccionar wilaya</option>
                                        {wilayasOptions}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="text-danger">Communes:</label>
                                <div>
                                    <select className="form-control" name="commune" value={selectedCommune} onChange={handleCommuneChange} disabled={bloquepost === 'bloque-post'} >
                                        <option value="">Seleccionar commune</option>
                                        {communesOptions}
                                    </select>
                                </div>
                            </div>

                            <br></br>
                            <div className="form-group  ">
                                <label className="text-danger">Cordonnées :</label>
                                <input onChange={(e) => handleChangeInput(e)} placeholder="Nom et Prénom" value={servicioData.nomprenom} name="nomprenom" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                            </div>


                            <div className="form-group  ">
                                <label className="text-danger">Numéro de téléphone :</label>
                                <input onChange={(e) => handleChangeInput(e)} placeholder="Téléphone" value={servicioData.telefono} name="telefono" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                            </div>


                            <div className="form-group  ">
                                <label className="text-danger">Email :</label>
                                <input onChange={(e) => handleChangeInput(e)} placeholder="Email" value={servicioData.email} name="email" type="email" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                            </div>

                            <br></br>

                            <div className="form-group" >
                                <label className="text-danger">Options d'informations personnelles:</label>
                                <select onChange={(e) => handleChangeInput(e)} value={servicioData.privacidad_informations} name="privacidad_informations" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                    <option > Options  </option>
                                    <option value="permitirinformacion">Autoriser les informations</option>
                                    <option value="ne-pas-permitirinformacion">Ne pas autoriser les informations</option>

                                </select>
                            </div>
                            <div className="form-group" >
                                <label className="text-danger">Options des commentaires:</label>
                                <select onChange={(e) => handleChangeInput(e)} value={servicioData.comentarios} name="comentarios" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                    <option > Options </option>
                                    <option value="permitircomentarios">Autoriser les commentaires</option>

                                    <option value="ne-pas-permitircomentarios">Ne pas autoriser les commentaires</option>

                                </select>
                            </div>


                            <div className="show_images" >
                                {
                                    images.map((img, index) => (
                                        <div key={index} id="file_img" disabled={bloquepost === 'bloque-post'}  >
                                            {
                                                img.camera ? imageShow(img.camera, theme)
                                                    : img.url
                                                        ? <>
                                                            {
                                                                img.url.match(/video/i)
                                                                    ? videoShow(img.url, theme)
                                                                    : imageShow(img.url, theme)
                                                            }
                                                        </>
                                                        : <>
                                                            {
                                                                img.type.match(/video/i)
                                                                    ? videoShow(URL.createObjectURL(img), theme)
                                                                    : imageShow(URL.createObjectURL(img), theme)
                                                            }
                                                        </>
                                            }
                                            <span onClick={() => deleteImages(index)}>&times;</span>
                                        </div>
                                    ))
                                }
                            </div >
    <div className="input_images"> {
                                <div className="file_upload">
                                    <i className="fas fa-image" />
                                    <input type="file" name="file" id="file"
                                        multiple accept="image/*,video/*" onChange={handleChangeImages}
                                        disabled={bloquepost === 'bloque-post'}
                                    />
                                </div>
                            }
                            </div>
      <div className="status_footer">
                                <>
                                    <button className="btn btn-secondary w-100" type="submit"
                                        disabled={bloquepost === 'bloque-post'}
                                    > Envoiye
                                    </button>
                                </>
                            </div>
        </div>
                    )}















                    {tipoTransaccion === 'Alquiler' && (
                        <div>
                            <br></br>

                            <br></br>
                            <div className="form-group">
                                <label className="text-danger">Location</label>
                                <select name="ventalocation" value={servicioData.ventalocation} onChange={(e) => handleChangeInput(e)} className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                    
                                    <option value="">Tipe de transacction</option>
                                    <option value="Vente"disabled>Vente</option>
                                   
                                    <option value="Location">Location</option>
                                </select>
                            </div>

                            <br></br>
                            <div className="form-group">
                                <label className="text-danger">Marque:</label>
                                <div>
                                    <select className="form-control" name="marca" value={selectedMarca} onChange={handleMarcaChange} disabled={bloquepost === 'bloque-post'} >
                                        <option value="">Seleccionar marca</option>
                                        {marcasOptions}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="text-danger">Modelo:</label>
                                <div>
                                    <select className="form-control" name="modelo" value={selectedModelo} onChange={handleModeloChange} disabled={bloquepost === 'bloque-post'} >
                                        <option value="">Seleccionar modelo</option>
                                        {modelosOptions}
                                    </select>
                                </div>
                            </div>


                            <br></br>
                            <label className="text-danger">Specifications :</label>


                            <div className="form-group">

                                <select name="color" value={servicioData.color} placeholder="Couleur" onChange={(e) => handleChangeInput(e)} className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                    <option value="">Couleur</option>
                                    <option value="Blanc">Blanc</option>
                                    <option value="Noir">Noir</option>
                                    <option value="Gris">Gris</option>
                                    <option value="Gris Argent">Gris Argent</option>
                                    <option value="Gris Souris">Gris Souris</option>
                                    <option value="Gris Manitoba">Gris Manitoba</option>
                                    <option value="Gris Champagne">Gris Champagne</option>
                                    <option value="Gris Alluminium">Gris Alluminium</option>
                                    <option value="Bleu">Bleu</option>
                                    <option value="Bleu Ciel">Bleu Ciel</option>
                                    <option value="Bleu Nuit">Bleu Nuit</option>
                                    <option value="Bleu Turquoise">Bleu Turquoise</option>
                                    <option value="Bleu Gauloise">Bleu Gauloise</option>
                                    <option value="Vert">Vert</option>
                                    <option value="Vert Bouteille">Vert Bouteille</option>
                                    <option value="Vert Militaire">Vert Militaire</option>
                                    <option value="Vert Pistache">Vert Pistache</option>
                                    <option value="Marron18">Marron</option>
                                    <option value="Maron Chocolat">Maron Chocolat</option>
                                    <option value="Rouge">Rouge</option>
                                    <option value="Rouge Bordeaux">Rouge Bordeaux</option>
                                    <option value="Grenat">Grenat</option>
                                    <option value="Rose">Rose</option>
                                    <option value="Jaun">Jaune</option>
                                    <option value="Miel">Miel</option>
                                    <option value="Beige">Beige</option>
                                    <option value="Orange">Orange</option>
                                    <option value="Violet">Violet</option>
                                    <option value="Mauve">Mauve</option>
                                    <option value="Aubergine">Aubergine</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label className="text-danger">Type de location :</label>
                                <select
                                    name="tipoAlquiler"
                                    value={servicioData.tipoAlquiler}
                                    onChange={(e) => handleChangeInput(e)}
                                    className="form-control"
                                    required disabled={bloquepost === 'bloque-post'}
                                >
                                    <option value="">Sélectionnez le type de location</option>
                                    <option value="Particular">Particulier</option>
                                    <option value="Entreprise">Entreprise</option>
                                </select>
                            </div>
                            <div className="form-group  ">
                                <label className="text-danger" >Nom d'entreprise: </label>
                                <input onChange={(e) => handleChangeInput(e)} placeholder="Version finition" value={servicioData.content} name="content" type="text" className="form-control" disabled={bloquepost === 'bloque-post'} />
                            </div>





                            <div className="card-body form-group">
                                <label className="text-danger">Sélectionner le Prix par jour en dinars: </label>

                                <Slider
                                    min={2000}
                                    max={50000}
                                    step={20}
                                    value={servicioData.priceservicio}
                                    onChange={(value) => {
                                        handleChangeInput('priceservicio', value);
                                    }}
                                    trackStyle={{ backgroundColor: '#EB2B00', height: 10 }}
                                    handleStyle={{
                                        borderColor: '#007bff',
                                        height: 20,
                                        width: 20,
                                        marginLeft: -10,
                                        marginTop: -5,
                                        backgroundColor: '#007bff',
                                    }}
                                    railStyle={{ backgroundColor: '#ccc', height: 10 }}
                                    disabled={bloquepost === 'bloque-post'}
                                />
                                <div style={{ marginTop: 10 }}>
                                    Prix : {servicioData.priceservicio}  
                                </div>
                            </div>
                            <div className="form-group" >
                                    <select onChange={(e) => handleChangeInput(e)} value={servicioData.dinero} name="dinero" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                        <option > Devis de vente</option>
                                        <option value="Dinars"   >Dinars</option>

                                        <option value="Millions Centimes"disabled > Millions Centimes </option>

                                    </select>
                                </div>
                            <div>
                                <select onChange={(e) => handleChangeInput(e)} value={servicioData.negociable} name="negociable" placeholder="Negociable" className="form-control" disabled={bloquepost === 'bloque-post'} >
                                    <option > Négociation:</option>
                                    <option value="Négociable" > Négociable</option>
                                    <option value="Fixe">Fixe</option>
                                    <option value="Offert">Offert</option>

                                </select>
                            </div>



                            <br></br>

                            <label className="text-danger">Description: </label>
                            <textarea name="discripcion" value={servicioData.discripcion}

                                onChange={(e) => handleChangeInput(e)}
                                style={{
                                    filter: theme ? 'invert(1)' : 'invert(0)',
                                    color: theme ? 'white' : '#111',
                                    background: theme ? 'rgba(0,0,0,.03)' : '',

                                }}
                                disabled={bloquepost === 'bloque-post'}
                            />



                            <div className="form-group">
                                <label className="text-danger">Wilaya:</label>
                                <div>
                                    <select className="form-control" name="wilaya" value={selectedWilaya} onChange={handleWilayaChange} disabled={bloquepost === 'bloque-post'} >
                                        <option value="">Seleccionar wilaya</option>
                                        {wilayasOptions}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="text-danger">Communes:</label>
                                <div>
                                    <select className="form-control" name="commune" value={selectedCommune} onChange={handleCommuneChange} disabled={bloquepost === 'bloque-post'} >
                                        <option value="">Seleccionar commune</option>
                                        {communesOptions}
                                    </select>
                                </div>
                            </div>

                            <br></br>
                            <div className="form-group  ">
                                <label className="text-danger">Cordonnées :</label>
                                <input onChange={(e) => handleChangeInput(e)} placeholder="Nom et Prénom" value={servicioData.nomprenom} name="nomprenom" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                            </div>


                            <div className="form-group  ">
                                <label className="text-danger">Numéro de téléphone :</label>
                                <input onChange={(e) => handleChangeInput(e)} placeholder="Téléphone" value={servicioData.telefono} name="telefono" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                            </div>


                            <div className="form-group  ">
                                <label className="text-danger">Email :</label>
                                <input onChange={(e) => handleChangeInput(e)} placeholder="Email" value={servicioData.email} name="email" type="email" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                            </div>

                            <br></br>

                            <div className="form-group" >
                                <label className="text-danger">Options d'informations personnelles:</label>
                                <select onChange={(e) => handleChangeInput(e)} value={servicioData.privacidad_informations} name="privacidad_informations" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                    <option > Options  </option>
                                    <option value="permitirinformacion">Autoriser les informations</option>
                                    <option value="ne-pas-permitirinformacion">Ne pas autoriser les informations</option>

                                </select>
                            </div>
                            <div className="form-group" >
                                <label className="text-danger">Options des commentaires:</label>
                                <select onChange={(e) => handleChangeInput(e)} value={servicioData.comentarios} name="comentarios" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                    <option > Options </option>
                                    <option value="permitircomentarios">Autoriser les commentaires</option>

                                    <option value="ne-pas-permitircomentarios">Ne pas autoriser les commentaires</option>

                                </select>
                            </div>


                            <div className="show_images" >
                                {
                                    images.map((img, index) => (
                                        <div key={index} id="file_img" disabled={bloquepost === 'bloque-post'}  >
                                            {
                                                img.camera ? imageShow(img.camera, theme)
                                                    : img.url
                                                        ? <>
                                                            {
                                                                img.url.match(/video/i)
                                                                    ? videoShow(img.url, theme)
                                                                    : imageShow(img.url, theme)
                                                            }
                                                        </>
                                                        : <>
                                                            {
                                                                img.type.match(/video/i)
                                                                    ? videoShow(URL.createObjectURL(img), theme)
                                                                    : imageShow(URL.createObjectURL(img), theme)
                                                            }
                                                        </>
                                            }
                                            <span onClick={() => deleteImages(index)}>&times;</span>
                                        </div>
                                    ))
                                }
                            </div >


                            <div className="input_images"> {
                                <div className="file_upload">
                                    <i className="fas fa-image" />
                                    <input type="file" name="file" id="file"
                                        multiple accept="image/*,video/*" onChange={handleChangeImages}
                                        disabled={bloquepost === 'bloque-post'}
                                    />
                                </div>
                            }
                            </div>



                            <div className="status_footer">
                                <>
                                    <button className="btn btn-secondary w-100" type="submit"
                                        disabled={bloquepost === 'bloque-post'}
                                    > Envoiye
                                    </button>
                                </>
                            </div>

                        </div>
                    )}



                </form >
            </div >

        </div >
    )
}

export default StatusModalservice

