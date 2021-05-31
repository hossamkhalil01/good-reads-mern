import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { hostUrl, imagesBase } from "../api/urls";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { currentUser } from "../services/authService";
import { capitalize } from "../utils/utils";
import React from "react";
import ReactDOM from 'react-dom';
import { Button, form, Nav, Card, Modal } from 'react-bootstrap';
import { getUser, updateUser } from "../services/userService";
import { ContactSupportOutlined } from "@material-ui/icons";





function UserProfilePage() {
        const [user, setUser] = useState({});

        const { id } = useParams();
        const [show, setShow] = useState(false);
        const [showModalChangeProfile, setShowModalChangeProfile] = useState(false);
        const path = "/avatars/";
        const [fname, setFname] = useState(user.firstName);
        const [lname, setLname] = useState(user.lastName);
        const [email, setEmail] = useState(user.email);
        const [selectedFile, setSelectedFile] = useState({});
        const [updatedImage, setUpdatedImage] = useState({});
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const handleShowModalChangeProfile = () => setShowModalChangeProfile(true);
        const handleCloseModalChangeProfile = () => setShowModalChangeProfile(false);




        const retrieveUser = async (id) => {
                const data = await getUser(id);

                setUser(data.data.data);
        };
        const fff = { firstName: fname }


        const editUser = async (id, body) => {
                const data = await updateUser(id, body);


        };



        useEffect(() => {


                retrieveUser(id);




        }, [id]);
        const changeHandler = (e) => setFname(e.target.value);

        const mySubmitHandler = (event) => {

                editUser(id, fff);


        }

        const onFileChange = event => {

                // Update the state
                setSelectedFile(event.target.files[0]);

        };

        const mySubmitHandlerChangeProfile = (event) => {
                if (selectedFile != null) {
                        event.preventDefault();
                        const formData = new FormData();
                        formData.append("myImage", selectedFile);


                        editUser(id, formData);
                        setSelectedFile({});

                        window.location.reload();


                }
                else {
                        alert("You didn't select image.")
                }
        }


        return (

                <div><Navbar />
                        <div className="main-content" style={{ display: "flex", alignItems: "center", displayContent: "center" }} >


                                <img src="/assets/img/idCard.jpeg" width="500" height="350" />

                                <div >
                                        <Card style={{ width: '18rem', marginLeft: 20 }}>
                                                {user.avatar=="default.png" ? (
                                                        <Card.Img variant="top" src={`${hostUrl}${imagesBase}${path}${user.avatar}`} />
                                                 
                                                ) : (
                                                        <Card.Img variant="top" src={`${hostUrl}${user.avatar}`} />
                                                )}
                                                
                                                <Card.Body>
                                                        <Card.Title><b>{user.firstName} {user.lastName}</b></Card.Title>
                                                        <Card.Text>
                                                                <h5>{user.email}</h5>
                                                        </Card.Text>
                                                        <div style={{ display: "flex" }}>
                                                                <Button variant="success" onClick={handleShow}>
                                                                        Edit Information
      </Button>
                                                                <Button style={{ marginLeft: 8 }} variant="success" onClick={handleShowModalChangeProfile}>
                                                                        Change Profile Picture
      </Button>

                                                        </div>


                                                        <Modal show={show} onHide={handleClose}>
                                                                <form onSubmit={mySubmitHandler}>
                                                                        <Modal.Header closeButton>
                                                                                <Modal.Title>Edit Your Information</Modal.Title>
                                                                        </Modal.Header>

                                                                        <Modal.Body>

                                                                                <label>FirstName: </label><br></br>

                                                                                <input
                                                                                        type="text"
                                                                                        value={fname}
                                                                                        onChange={changeHandler}
                                                                                /><br></br>

                                                                                <label>LastName: </label><br></br>

                                                                                <input
                                                                                        type="text"
                                                                                        value={lname}
                                                                                /><br></br>
                                                                                <label>Email: </label><br></br>

                                                                                <input
                                                                                        type="text"
                                                                                        value={email}

                                                                                /><br></br>




                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                                <input
                                                                                        type='submit'
                                                                                        accept="image/*"
                                                                                        id="avatar"
                                                                                        multiple
                                                                                        className="btn btn-info"
                                                                                        value="Save Changes"
                                                                                />
                                                                                <Button variant="secondary" onClick={handleClose}>
                                                                                        Close
          </Button>

                                                                        </Modal.Footer>
                                                                </form>
                                                        </Modal>

                                                        <Modal show={showModalChangeProfile} onHide={handleCloseModalChangeProfile}>
                                                                <form onSubmit={mySubmitHandlerChangeProfile}>
                                                                        <Modal.Header closeButton>
                                                                                <Modal.Title>Change Profile Picture</Modal.Title>
                                                                        </Modal.Header>

                                                                        <Modal.Body>

                                                                                <h1>Select Image</h1>
                                                                                <input type="file" name="myImage" onChange={onFileChange} />



                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                                <input
                                                                                        type='submit'
                                                                                        className="btn btn-info"
                                                                                        value="Upload"
                                                                                />
                                                                                <Button variant="secondary" onClick={handleCloseModalChangeProfile}>
                                                                                        Close
          </Button>

                                                                        </Modal.Footer>
                                                                </form>
                                                        </Modal>
                                                </Card.Body>
                                        </Card>
                                </div>


                        </div>
                        <Footer />
                </div>
        );
}

export default UserProfilePage;

