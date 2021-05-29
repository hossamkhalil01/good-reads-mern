import axios from "axios";
import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect } from "react";
import { Button, Form, FormControl, Nav, Navbar,Card,Container,Row,Col} from 'react-bootstrap';
import withAuth from "./WithAuth";
import URLs from '../services/apiUrls.js';


 
function Category() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUer] = useState([{}]);
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    const base_url="http://localhost:3200/api/users/";

  

useEffect(() => {
    async function fetchApi() {
      // console.log("hello");
      let  userResponse = await axios.get(base_url+id);
      if (categoryResponse) {
        setIsLoading(false);
        setAllCategory(categoryResponse.data);
        // console.log(categoryResponse);
       
       }}
      
    fetchApi();
  }, [isLoading]);

  async function fetchBookApi(id) {
    
    let BasePath="http://localhost:3200/api/books/category/";
 console.log(id);
 let  bookResponse = await axios.get(BasePath+id);
 if (bookResponse.data.length) {
  console.log("hello");
   setIsLoading(false);
   setBooksexist(true);
   setALLBooks(bookResponse.data);
   console.log(bookResponse.data);

console.log("enter");
 
  }
  else{
  setBooksexist(false);
  }
}

  function ValidData() {
     
    
      
    return (
     
      <Container className="list-group m-5">{
      <Row>{
      <Col>{
      

	<ul className="list-group"  >
        	{/* <li >
                 <a href="#" className="list-group-item list-group-item-action active">{ALLCategory[0].title}</a>
 
 
</li> */}
  		{ALLCategory.map(function(keyName) {
    		return (
 
      			<li  className="list-group-item list-group-item-action" key={keyName._id}>
					<a href="#"  type="button" onClick ={
            ()=>
            fetchBookApi(keyName._id)
          
          
          }> {keyName.title} </a>
          		</li>
    		)
		})}
	</ul>
  }
  </Col>
}
<Col>

{booksexist ? <ValidBookData></ValidBookData> : <p className="alert alert-danger">There are no books here</p>}
  </Col>
 
 
</Row>
  }
</Container>


 );

            }

            function ValidBookData() {
  
              return (
              <Container>
{                 <Row>{
                 ALLBooks.map(function(keyName) {
            
                  return (
                    
                 
 
    <Col >
                  <Card style={{ width: '15rem' }}>
                  <Card.Img variant="top" src={`${URLs.baseURL}${URLs.bookImageURL}${keyName.image}`} 
                  alt={keyName.title} />
                  <Card.Body>
                    <Card.Title> {keyName.title} </Card.Title>
                    <Card.Text>
                    {keyName.description} 
                    </Card.Text>
           
                    <LinkContainer to={`/authorsDetails/${keyName.author}`} exact>
                <Button variant="info" className="btn btn-block ">
                    Auther
                </Button>

            </LinkContainer>

            <LinkContainer to={`/booksDetails/${keyName._id}`} exact>
                <Button variant="info" className="btn btn-block">
                    BookDetails
                </Button>
            </LinkContainer>
                  </Card.Body>
                </Card>
                </Col>
                 
              
                  
                  )})
                 
                
            }
                  </Row>
   
              
       
                 }
               </Container>
               );}
        
                // if(isLoading === false && booksexist){

                // return <ValidBookData></ValidBookData>;
                // }
             
          

            if (isLoading === false) {
                return <ValidData></ValidData>;

                
              } 
              else {
                return <h1>testing</h1>;
              }
          
        
        }

    export default withAuth(Category);