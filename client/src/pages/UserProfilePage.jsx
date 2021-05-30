import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { hostUrl , imagesBase} from "../api/urls";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { currentUser } from "../services/authService";
import { capitalize } from "../utils/utils";
import React from "react";
import ReactDOM from 'react-dom';
import { Button, form, Nav, Card, Modal } from 'react-bootstrap';
import { getUser } from "../services/userService";





function UserProfilePage() {
        const [user, setUser] = useState({});
        const { id } = useParams();
        const [show, setShow] = useState(false);
        const path="/avatars/";

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const retrieveUser = async (id) => {
                const data = await getUser(id);

                setUser(data.data.data);
        };

        useEffect(() => {
                if (currentUser) {

                        retrieveUser(id);
                        
                }

                
        });



        return (



                <div style={{display:"flex", alignItems: "center",displayContent: "center"}} >
                        <img src="/assets/img/Wavy_Bus-01_Single-02.jpg" width="500" height="400" />
                        
                        <div >
                        <Card style={{ width: '18rem'}}>
                                <Card.Img variant="top" src={`${hostUrl}${imagesBase}${path}${user.avatar}`} />
                                <Card.Body>
                                        <Card.Title><b>{user.firstName} {user.lastName}</b></Card.Title>
                                        <Card.Text>
                                                <h5>{user.email}</h5>
                                        </Card.Text>
                                        <Button variant="warning" onClick={handleShow}>
                                                Edit
      </Button>

                                        <Modal show={show} onHide={handleClose}>
                                                <form>
                                                        <Modal.Header closeButton>
                                                                <Modal.Title>Edit Your Information</Modal.Title>
                                                        </Modal.Header>

                                                        <Modal.Body>

                                                                <label>FirstName: </label><br></br>

                                                                <input
                                                                        type="text"
                                                                /><br></br>

                                                                <label>LastName: </label><br></br>

                                                                <input
                                                                        type="text"
                                                                /><br></br>
                                                                <label>Email: </label><br></br>

                                                                <input
                                                                        type="text"
                                                                /><br></br>
                                                                <label>New Password: </label><br></br>

                                                                <input
                                                                        type="text"
                                                                /><br></br>
                                                                <label>Confirm Password: </label><br></br>

                                                                <input
                                                                        type="text"
                                                                /><br></br>




                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                                <input
                                                                        type='submit'
                                                                        className="btn btn-info"
                                                                />
                                                                <Button variant="secondary" onClick={handleClose}>
                                                                        Close
          </Button>

                                                        </Modal.Footer>
                                                </form>
                                        </Modal>
                                </Card.Body>
                        </Card>
                        </div>


                </div>
        );
}

export default UserProfilePage;

