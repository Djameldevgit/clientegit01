import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

import { createPostpendiente } from '../../redux/actions/postaproveAction'
import { updatePost } from '../../redux/actions/postAction';


import communesjson from "../../json/communes.json";
import Select from 'react-select';

import { imageShow, videoShow } from '../../utils/mediaShow'
import Slider from 'rc-slider';

 
import Checkbox from '@mui/material/Checkbox';
 
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormGroup } from '@material-ui/core';
 


const StatusModalsalle = ({ closeModal }) => {

    const { auth, theme, status, socket } = useSelector(state => state)
    const { user } = useSelector(state => state.auth);
    const { bloquepost } = user;

    const dispatch = useDispatch()
    const initialState = {

        content: '', direcion: '', wilaya: '', commune: '', specifications: [], discripcion: '', pricesala: '', dinero: '', negociable: '', nomprenom: '', telefono: '', email: '', web: '', informacion: false, comentarios: false
    }

    const [postData, setPostdata] = useState(initialState);
    const [images, setImages] = useState([])
    const { specifications } = postData; // Obtén el valor de 'specifications' del objeto 'postdata'

    const [selectedWilaya, setSelectedWilaya] = useState([]);
    const [selectedCommune, setSelectedCommune] = useState([]);
    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')

    const datos = [
        { label: 'Mariages (حفلات الزفاف)', value: 'Mariages' },
        { label: 'Fiançailles (خطبة)', value: 'Fiançailles' },
        { label: '3akika (عقيقة)', value: '3akika' },
        { label: 'Circoncision-khtana (الختان)', value: 'Circoncision-khtana' },
        { label: 'Baptêmes (التعميد)', value: 'Baptêmes' },
        { label: 'Anniversaires (الذكرى)', value: 'Anniversaires' },
        { label: 'Diplômes (التخرج)', value: 'Diplômes' },
        { label: 'Fêtes d\'anniversaire (حفلات عيد الميلاد)', value: 'Fêtes d\'anniversaire' },
        { label: 'Réunions familiales (اجتماعات عائلية)', value: 'Réunions familiales' },
        { label: 'Événements d\'entreprise (أحداث الشركات)', value: 'Événements d\'entreprise' },
        { label: 'Conférences (المؤتمرات)', value: 'Conférences' },
        { label: 'Séminaires (الندوات)', value: 'Séminaires' },
        { label: 'Réunion (الاجتماع)', value: 'Réunion' },
        { label: 'Expositions (المعارض)', value: 'Expositions' },
        { label: 'Salle (القاعة)', value: 'Salle' },
        { label: 'Fêtes (الاحتفالات)', value: 'Fêtes' },
        { label: 'Dîner (العشاء)', value: 'Dîner' },
        { label: 'Buffet (البوفيه)', value: 'Buffet' },
        { label: 'Cafétéria (المقهى)', value: 'Cafétéria' }
    ];


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




    const handleChangeImages = e => {//se encarga de gestionar las imágenes seleccionadas.
        const files = [...e.target.files]//para almacenar los archivos seleccionados.
        let err = ""
        let newImages = []//Se definen una variable de errores let err = "" y un array para nuevas imágenes let newImages = [].

        files.forEach(file => {//se aplican condiciones para validar los archivos (existencia, tamaño).
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)//Si no hay errores, se empujan las nuevas imágenes al array newImages con newImages.push(file).
        })

        if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
        setImages([...images, ...newImages])//Se actualiza el estado local de las imágenes con setImages([...images, ...newImages]), agregando las nuevas imágenes al estado existente.
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleChangeInput = (e, value) => {
        if (value !== undefined) {
            // Manejar el Slider
            setPostdata({ ...postData, [e]: value });
        } else {
            // Manejar los selects
            const { name, value } = e.target;
            setPostdata({ ...postData, [name]: value });
        }
    };


    const handleChangeSelect = selectedOptions => {
        const selectedValues = selectedOptions.map(option => option.value);
        setPostdata({ ...postData, specifications: selectedValues });
    };




    const handleSubmit = (e) => {
        e.preventDefault();

        if (images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Veuillez ajouter votre photo.' },
            });



        if (status.onEdit) {
            dispatch(updatePost({ postData, specifications, wilaya: selectedWilaya, commune: selectedCommune, images, auth, status }));
        } else {
            dispatch(createPostpendiente({ postData, specifications, wilaya: selectedWilaya, commune: selectedCommune, images, auth, socket }));
        }


        setPostdata({
            content: '', direcion: '', wilaya: '', commune: '', specifications: [], discripcion: '', pricesala: '', dinero: '', negociable: '', nomprenom: '', telefono: '', email: '', web: '', informacion: false, comentarios: false
        });
        setImages([])
        if(tracks) tracks.stop()
        dispatch({ type: GLOBALTYPES.STATUS, payload: false})
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
        if (status.onEdit) {


            setPostdata({ ...status, specifications: status.specifications });
            setImages(status.images);

            setSelectedWilaya(status.wilaya)
            setSelectedCommune(status.commune)

        }
    }, [status])








    return (


        <div className="status_modal">
            <div className="status_body">


                <form onSubmit={handleSubmit}>

                    <div className="status_header">
                        <h5 className="m-0"> Annonces Salle des fêtes</h5>
                        <span onClick={() => dispatch({
                            type: GLOBALTYPES.STATUS, payload: false
                        })}>
                             
                        </span>
                    </div>







                    <br></br>

                    <div className="form-group" >
                        <label className="text-danger">Nom de la salle </label>
                        <input onChange={(e) => handleChangeInput(e)} name="content" placeholder='Nom de la salle' value={postData.content} className="form-control" disabled={bloquepost === 'bloque-post'} />
                    </div>

                    <br></br>

                    <div className="form-group" >
                        <label className="text-danger">Adresse </label>
                        <input onChange={(e) => handleChangeInput(e)} name="direcion" placeholder='Adresse' value={postData.direcion} className="form-control" disabled={bloquepost === 'bloque-post'} />
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
                    <br></br>

                    <div className="form-group" >
                        <label className="text-danger">Événements de la salle</label>
                        <div>
                            <Select
                                isDisabled={bloquepost === 'bloque-post'}

                                placeholder="Événements"
                                value={datos.filter(obj => postData.specifications && postData.specifications.includes(obj.value))}
                                options={datos}
                                onChange={handleChangeSelect}
                                isMulti
                                closeMenuOnSelect={false}
                            />
                        </div>
                    </div>

                    <br></br>

                    <div className="card-body form-group">
                        <label className="text-danger">Description et prestations de la salle: </label>
                        <textarea name="discripcion" value={postData.discripcion}
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
                            value={postData.pricesala}
                            onChange={(value) => {
                                handleChangeInput('pricesala', value);
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
                            {postData.pricesala} Dinars
                        </div>



                        <br></br>

                        <div className="form-group" >
                            <select onChange={(e) => handleChangeInput(e)} value={postData.dinero} name="dinero" placeholder="Devise" className="form-control" disabled={bloquepost === 'bloque-post'}  >
                                <option > Devis </option>
                                <option value="Dinars"  >Dinars</option>

                                <option value="Millions Centimes" disabled > Millions Centimes </option>

                            </select>
                        </div>
                        <br></br>

                        <div>
                            <select onChange={(e) => handleChangeInput(e)} value={postData.negociable} name="negociable" placeholder="Negociable" className="form-control" disabled={bloquepost === 'bloque-post'} >
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
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Nom et Prénom" value={postData.nomprenom} name="nomprenom" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>
                    <br></br>

                    <div className="form-group  ">
                        <label className="text-danger">Numéro de téléphone :</label>
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Téléphone" value={postData.telefono} name="telefono" type="text" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>
                    <br></br>

                    <div className="form-group  ">
                        <label className="text-danger">Email :</label>
                        <input onChange={(e) => handleChangeInput(e)} placeholder="Email" value={postData.email} name="email" type="email" className="form-control" required="required" disabled={bloquepost === 'bloque-post'} />
                    </div>

                    <br></br>


                    <div className="form-group" >
                        <label className="text-danger">Site Web & réseau sociaux</label>
                        <input onChange={(e) => handleChangeInput(e)} name="web" value={postData.web} placeholder="Site Web & réseau sociaux" className="form-control" disabled={bloquepost === 'bloque-post'} />
                    </div><br></br>

                    <br></br>


                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={postData.informacion}
                                    onChange={(e) =>
                                        setPostdata({
                                            ...postData,
                                            informacion: e.target.checked,
                                        })
                                    }
                                />
                            }
                            label="Autoriser les informations de contact"
                        />

                    </FormGroup>




                    <div className="option-details">
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={postData.comentarios}
                                        onChange={(e) =>
                                            setPostdata({
                                                ...postData,
                                                comentarios: e.target.checked,
                                            })
                                        }
                                    />
                                }
                                label="Activer les commentaires"
                            />




                        </FormGroup>
                    </div>








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


export default StatusModalsalle


 