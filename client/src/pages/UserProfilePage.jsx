import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { hostUrl } from "../api/urls";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { currentUser } from "../services/authService";
import { capitalize } from "../utils/utils";
//import axios from "axios";
import React from "react";

import { Button, Form, FormControl, Nav, Card, Modal } from 'react-bootstrap';
import { getUser } from "../services/userService";




function UserProfilePage() {
        const [user, setUser] = useState({});
        const { id } = useParams();
        const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

        const retrieveUser = async (id) => {
                const data = await getUser(id);

                setUser(data.data.data);
        };

        useEffect(() => {
                retrieveUser(id);
                //console.log(user);
        });



        return (



                <div>
                        <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={user.avatar} />
                                <Card.Body>
                                        <Card.Title><b>{user.firstName} {user.lastName}</b></Card.Title>
                                        <Card.Text>
                                                <h5>{user.email}</h5>
                                        </Card.Text>
                                        <Button variant="primary" onClick={handleShow}>
                                                Launch demo modal
      </Button>

                                        <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                        <Modal.Title>Modal heading</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                                <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                                Close
          </Button>
                                                        <Button variant="primary" onClick={handleClose}>
                                                                Save Changes
          </Button>
                                                </Modal.Footer>
                                        </Modal>
                                </Card.Body>
                        </Card>

                </div>
        );
}

export default UserProfilePage;

//     const [isLoading, setIsLoading] = useState(true);
//     const [user, setUer] = useState({});
//     const queryParams = new URLSearchParams(window.location.search);
//     const id = queryParams.get('id');
//     const base_url="http://localhost:3200/api/users/60b22c77994e6d36b2409040";

//     const getUpdatedUser = async (userId) => {
//       const data = await getUser(userId);

//       setUpdatedUser(data.data.data);
//     };

// useEffect(() => {
//     async function fetchApi() {
//       // console.log("hello");
//       let  userResponse = await axios.get(base_url);
//       if (userResponse) {
//         setIsLoading(false);
//         setUer(userResponse.data);


//        }}

//     fetchApi();
//   }, [isLoading]);




//             function ValidUserData() {

//               return (
//               <Container>
// {                 <Row>{




//     <Col >
//                   <Card style={{ width: '15rem' }}>
//                   <Card.Img variant="top" src={user.avatar} 
//                   alt={user.firstName} />
//                   <Card.Body>
//                     <Card.Title>  {user.firstName} </Card.Title>
//                     <Card.Text>
//                     <p>{user.lastName}</p> 
//                     <p>{user.email}</p>  
//                     </Card.Text>


//                   </Card.Body>
//                 </Card>
//                 </Col>



//                   })



//                   </Row>



//                  }
//                </Container>
//                );}

//                 // if(isLoading === false && booksexist){

//                 // return <ValidBookData></ValidBookData>;
//                 // }




//                 return <ValidUserData></ValidUserData>;



