import axios from "axios";
import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect } from "react";
import { Button, Form, FormControl, Nav, Navbar,Card,Container,Row,Col} from 'react-bootstrap';
import withAuth from "./WithAuth";
import URLs from '../services/apiUrls.js';


 
function User() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUer] = useState({});
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const base_url="http://localhost:3200/api/users/";

  

useEffect(() => {
    async function fetchApi() {
      // console.log("hello");
      let  userResponse = await axios.get(base_url+id);
      if (userResponse) {
        setIsLoading(false);
        setUer(userResponse.data);
        
       
       }}
      
    fetchApi();
  }, [isLoading]);

  

  
            function ValidUserData() {
  
              return (
              <Container>
{                 <Row>{
                
                    
                 
 
    <Col >
                  <Card style={{ width: '15rem' }}>
                  <Card.Img variant="top" src={user.avatar} 
                  alt={user.firstName} />
                  <Card.Body>
                    <Card.Title>  {user.firstName} </Card.Title>
                    <Card.Text>
                    <p>{user.lastName}</p> 
                    <p>{user.email}</p>  
                    </Card.Text>
                    
                    
                  </Card.Body>
                </Card>
                </Col>
                 
              
                  
                  })
                 
                
            
                  </Row>
   
              
       
                 }
               </Container>
               );}
        
                // if(isLoading === false && booksexist){

                // return <ValidBookData></ValidBookData>;
                // }
             
          

            if (isLoading === false) {
                return <ValidUserData></ValidUserData>;

                
              } 
              else {
                return <h1>testing</h1>;
              }
          
        
        }

    export default withAuth(User);