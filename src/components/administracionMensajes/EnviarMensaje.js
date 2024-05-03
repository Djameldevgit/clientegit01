// a.js

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { createMessageAdmin } from '../../redux/actions/messagesadminAction';


const EnviarMensaje = () => {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const initialState = {

        descripcion: '', email: '', asunto: ''
    }
    const [messageData, setMessageData] = useState(initialState);
    const { descripcion, email, asunto } = messageData;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessageData({ ...messageData, [name]: value });
    };

    const handleSubmit = () => {

        dispatch(createMessageAdmin({ descripcion, email, asunto, auth })); // Asegúrate de pasar "socket" si es necesario
        setMessageData({
            descripcion: '', email: '', asunto: ''
        }); // Limpia los campos después de enviar el mensaje
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Envoyer un message
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Message à l'administration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group className="   mb-3 mt-2"  controlId="email">
                            <Form.Label>Courrier électronique</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder=" "
                                name="email"
                                value={messageData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label> Sujet</Form.Label>
                            <Form.Control 
                            type="text"
                                
                                placeholder=" "
                                name="asunto"
                                value={messageData.asunto}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="   mb-3  mb-3" controlId="nom">
                            <Form.Label>Description  </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder=" "
                                name="descripcion"
                                value={messageData.descripcion}
                                onChange={handleChange}
                            />
                        </Form.Group>




                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Envoyer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default EnviarMensaje

