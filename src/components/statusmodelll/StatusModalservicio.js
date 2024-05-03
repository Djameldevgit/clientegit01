import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

import { createServicioPendiente } from '../../redux/actions/servicioaproveAction'
import { updateServicio } from '../../redux/actions/servicioAction';


import communesjson from "../../json/communes.json";


import { imageShow, videoShow } from '../../utils/mediaShow'
import Slider from 'rc-slider';


import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';
import { FormGroup } from '@material-ui/core';






const StatusModalservicio = ({ closeModal }) => {

    const { auth, theme, statusservicio, socket } = useSelector(state => state)
    const { user } = useSelector(state => state.auth);
    const { bloquepost } = user;

    const dispatch = useDispatch()
    const initialState = { contentservicio: '', direcion: '', wilaya: '', commune: '', discripcion: '', priceservicio: '', dinero: '', negociable: '', nomprenom: '', telefono: '', email: '', web: '', informacion: ''   }


    const [servicioData, setServiciodata] = useState(initialState);
    const [images, setImages] = useState([])

    const [selectedWilaya, setSelectedWilaya] = useState([]);
    const [selectedCommune, setSelectedCommune] = useState([]);
    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')



    const handleStream = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }



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




    const handleCommuneChange = (event) => {
        setSelectedCommune(event.target.value);
    };




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








    const handleSubmit = (e) => {
        e.preventDefault();

        if (images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Veuillez ajouter votre photo.' },
            });



        if (statusservicio.onEdit) {
            dispatch(updateServicio({ servicioData, wilaya: selectedWilaya, commune: selectedCommune, images, auth, statusservicio }));
        } else {
            dispatch(createServicioPendiente({ servicioData, wilaya: selectedWilaya, commune: selectedCommune, images, auth, socket }));
        }


        setServiciodata({
            contentservicio: '', direcion: '', wilaya: '', commune: '', discripcion: '', priceservicio: '', dinero: '', negociable: '', nomprenom: '', telefono: '', email: '', web: '', informacion: false,
        });
        setImages([]);
        dispatch({ type: GLOBALTYPES.STATUSSERVICIO, payload: false });
    }




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
        if (statusservicio.onEdit) {


            setServiciodata({ ...statusservicio.servicioData });
            setImages(statusservicio.images);

            setSelectedWilaya(statusservicio.wilaya)
            setSelectedCommune(statusservicio.commune)

        }
    }, [statusservicio])


    /*
          <div className="form-group" >
                            <label className="text-danger">Titre:</label>
                            <select onChange={(e) => handleChangeInput(e)} value={servicioData.contentservicio} name="contentservicio" placeholder="Titre" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                <option > Options  </option>
                                <option value="Service">Service</option>
                                <option value="Salle des fêtes" disabled>Salle des fêtes</option>
    
                            </select>
                        </div>
                        <br></br>*/




    return (


        <div className="status_modal">
            <div className="status_body">


                <form onSubmit={handleSubmit}>

                    <div className="status_header">
                        <h5 className="m-0"> Annonces service Salle des fêtes</h5>
                        <span onClick={() => dispatch({
                            type: GLOBALTYPES.STATUSSERVICIO, payload: false
                        })}>
                            <span onClick={closeModal}>&times;</span>
                        </span>
                    </div>







                    <br></br>

                    <div className="form-group" >
                        <select onChange={(e) => handleChangeInput(e)} value={servicioData.contentservicio} name="contentservicio" placeholder="Titre" className="form-control" disabled={bloquepost === 'bloque-post'}  >

                            <option > Option de service</option>

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


                        </select>
                    </div>

                    <br></br>

                    <div className="form-group" >
                        <label className="text-danger">Adresse </label>
                        <input onChange={(e) => handleChangeInput(e)} name="direcion" placeholder='Adresse' value={servicioData.direcion} className="form-control" disabled={bloquepost === 'bloque-post'} />
                    </div>

                    <br></br>
                    <div className="form-group">
                        <label className="text-danger">Wilaya:</label>
                        <div>
                            <select className="form-control" name="wilaya" value={selectedWilaya} onChange={handleWilayaChange} disabled={bloquepost === 'bloque-post'} >
                                <option value="">Seleccionar wilaya</option>
                                {wilayasOptions}
                            </select>
                        </div>
                    </div>
                    <br></br>
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


                    <div className="card-body form-group">
                        <label className="text-danger">Description et prestations de la salle: </label>
                        <textarea name="discripcion" value={servicioData.discripcion}
                            onChange={(e) => handleChangeInput(e)}
                            style={{
                                filter: theme ? 'invert(1)' : 'invert(0)',
                                color: theme ? 'white' : '#111',
                                background: theme ? 'rgba(0,0,0,.03)' : '',

                            }}
                            disabled={bloquepost === 'bloque-post'}
                        />
                    </div>

                    <br></br>
                    <div className="card-body form-group">
                        <label className="text-danger">Prix en Dinars </label>
                        <Slider
                            min={500}
                            max={2000000}
                            step={500}
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
                            {servicioData.priceservicio} Dinars
                        </div>



                        <br></br>

                        <div className="form-group" >
                            <select onChange={(e) => handleChangeInput(e)} value={servicioData.dinero} name="dinero" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                <option > Devis </option>
                                <option value="Dinars"  >Dinars</option>

                                <option value="Millions Centimes" disabled > Millions Centimes </option>

                            </select>
                        </div>
                        <br></br>

                        <div>
                            <select onChange={(e) => handleChangeInput(e)} value={servicioData.negociable} name="negociable" placeholder="Negociable" className="form-control" disabled={bloquepost === 'bloque-post'} >
                                <option > Négociation:</option>
                                <option value="Négociable" > Négociable</option>
                                <option value="Fixe">Fixe</option>
                                <option value="Offert">Offert</option>

                            </select>
                        </div>
                    </div>
                    <br></br>




                    <br></br>

                    <br></br>
                    <label className="text-warning">Coordonnées du propriétaire :</label>
                    <div className="form-group  ">
                        <label className="text-danger">Nom :</label>
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Nom et Prénom" value={servicioData.nomprenom} name="nomprenom" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>
                    <br></br>

                    <div className="form-group  ">
                        <label className="text-danger">Numéro de téléphone :</label>
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Téléphone" value={servicioData.telefono} name="telefono" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>
                    <br></br>

                    <div className="form-group  ">
                        <label className="text-danger">Email :</label>
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Email" value={servicioData.email} name="email" type="email" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>

                    <br></br>


                    <div className="form-group" >
                        <label className="text-danger">Site Web & réseau sociaux</label>
                        <input onChange={(e) => handleChangeInput(e)} name="web" value={servicioData.web} placeholder="Site Web & réseau sociaux" className="form-control" disabled={bloquepost === 'bloque-post'} />
                    </div>

                    <br></br>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={servicioData.informacion}
                                    onChange={(e) =>
                                        setServiciodata({
                                            ...servicioData,
                                            informacion: e.target.checked,
                                        })
                                    }
                                />
                            }
                            label="Autoriser les informations de contact"
                        />

                    </FormGroup>
                    <br></br>


                    <br></br>


                    <div className="show_images">
                        {
                            images.map((img, index) => (
                                <div key={index} id="file_img">
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
                    </div>

                    {
                        stream &&
                        <div className="stream position-relative">
                            <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                            <span onClick={handleStopStream}>&times;</span>
                            <canvas ref={refCanvas} style={{ display: 'none' }} />
                        </div>
                    }

                    <div className="input_images">
                        {
                            stream
                                ? <i className="fas fa-camera" onClick={handleCapture} />
                                : <>
                                    <i className="fas fa-camera" onClick={handleStream} />

                                    <div className="file_upload">
                                        <i className="fas fa-image" />
                                        <input type="file" name="file" id="file"
                                            multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                    </div>
                                </>
                        }

                    </div>
                    <div className="status_footer">
                        <div>
                            <button className="btn btn-secondary w-100" type="submit"
                                disabled={bloquepost === 'bloque-post'}
                            > Envoiye
                            </button>

                        </div>
                    </div>



                </form>
            </div>
        </div>
    );
}

export default StatusModalservicio

