import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
 
//import { createPost, updatePost } from '../../redux/actions/postadminAction'
import Icons from '../Icons'
import { imageShow, videoShow } from '../../utils/mediaShow'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { createPostadmin, updatePostadmin } from '../../redux/actions/postadminAction'
 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const StatusadminModal = () => {
     
    const { auth, theme, statusadmin, socket } = useSelector(state => state)
    const dispatch = useDispatch()
      
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])

    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleStream = () => {
        setStream(true)
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({video: true})
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
        setImages([...images, {camera: URL}])
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }
    const blockedKeywords = ['script', 'exe', 'bat', 'sh'];

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const maxImages = 3;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: 'Veuillez ajouter votre photo.' },
            });
            const invalidFiles = images.filter(image =>
                !allowedExtensions.includes(image.name.split('.').pop().toLowerCase())
            );
        
            if (invalidFiles.length > 0) {
                return dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: {
                        error: `Les fichiers suivants ne sont pas autorisés: ${invalidFiles.map(file => file.name).join(', ')}`,
                    },
                });
            }


            if (images.length > maxImages) {
                return dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: { error: `Vous ne pouvez télécharger que ${maxImages} images.` },
                });
            }

            const invalidFiles2 = images.filter(image =>
                !allowedExtensions.includes(image.name.split('.').pop().toLowerCase()) ||
                image.type.includes('video')
            );
        
            if (invalidFiles2.length > 0) {
                return dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: {
                        error: `Les fichiers suivants ne sont pas autorisés: ${invalidFiles.map(file => file.name).join(', ')}`,
                    },
                });
            }


            const blockedFiles = images.filter(image =>
                blockedKeywords.some(keyword =>
                    image.name.toLowerCase().includes(keyword)
                )
            );
        
            if (blockedFiles.length > 0) {
                return dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: {
                        error: `Les fichiers suivants ne sont pas autorisés: ${blockedFiles.map(file => file.name).join(', ')}`,
                    },
                });
            }


        if(statusadmin.onEdit){
            dispatch(updatePostadmin({content, images, auth, statusadmin}))
        }else{
            dispatch(createPostadmin({content, images, auth, socket}))
        }
        

        setContent('')
        setImages([])
        if(tracks) tracks.stop()
        dispatch({ type: GLOBALTYPES.STATUSADMIN, payload: false})
    }

    useEffect(() => {
        if(statusadmin.onEdit){
            setContent(statusadmin.content)
            setImages(statusadmin.images)
        }
    },[statusadmin])


   

    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Publication administration </h5>
                    <span onClick={() => dispatch({
                        type: GLOBALTYPES.STATUSADMIN, payload: false
                    })}>
                        &times;
                    </span>
                </div>

                <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
            </form>
        </div>
    )
}


export default StatusadminModal

