import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from "reactstrap";
import axios from "axios";
import { Redirect } from 'react-router-dom'


class AddAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        modal: false,
        authors: [],
        author: {
            // fullName: '',
            // dateOfBirth: '',
            // img: '',
            firstName:"",
            lastName: "",
            description: "",
            bDate: "",

        },
        // selectedFile: null,
    };

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));

        // if (this.state.author.dateOfBirth === '' || this.state.author.authorFullName === '') {
        // } else {
             if ( !this.state.firstName ) {
        } else if (this.state.firstName !== '') {

            // const token = localStorage.token;
            // if (token) {
            //     const data = new FormData();
            //     data.append(
            //         "file",
            //         this.state.selectedFile,
            //         this.state.selectedFile.name
            //     );

                // data.append("body", JSON.stringify(this.state.author));
                // const conf = {
                //     onUploadProgress: ProgressEvent => {
                //         this.setState({
                //             loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
                //         });
                //     },
                //     headers: {
                //         "Content-Type": "application/json",
                //         "x-auth": token
                //     }
                // };
                axios.post('http://localhost:8000/authors', {
                // label: this.state.label
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                bDate:this.state.bDate,
                description:this.state.description

            })
                    .then(response => {
                        const authorsProps = this.props.authors;
                        authorsProps.push({ _id:response.data.data._id , firstName: response.data.data.firstName ,lastName: response.data.data.lastName ,bDate: response.data.data.bDate,description: response.data.data.description  });
                        this.setState({
                            authors: [...this.props.authors,this.state.firstName,this.state.lastName,this.state.bDate,this.state.description],
                            firstName: '',
                            lastName: '',
                            bDate:'' ,
                            description:''


                        });
                        this.props.handlerFromParant(authorsProps);
                    

                    }).catch(error => {
                        console.log(error);
                    });
            // }

         
        }
    }

    handleOnChaneFname = event => {
        this.setState({ firstName: event.target.value });
    };


    handleOnChanelastnam = event => {
        this.setState({ lastName:event.target.value } );
    };

  
    handleOnChanebirthdate= event => {
        this.setState({ bDate:event.target.value });
    };

    handleOnChanedescription= event => {
        this.setState({ description:event.target.value });
    };
    // handleOnChaneDate = event => {
    //     this.setState({ author: { ...this.state.author, dateOfBirth: event.target.value } });
    // }
    // handleselectedFile = event => {
    //     this.setState({
    //         selectedFile: event.target.files[0],
    //         loaded: 0
    //     });
    // };

    render() {
        return (
            // localStorage.token ?
                <div>
                    {/* <h1>Authors Contents</h1> */}
                    <Button color="success" onClick={this.toggle}>Add Author</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Add Author</ModalHeader>
                        <ModalBody>
                            {console.log("herreee",this.state.firstName)}
                            <Input type="text" value={this.state.firstName} onChange={this.handleOnChaneFname}
                                placeholder='Author FirstName' />
                                 <Input type="text" value={this.state.lastName} onChange={this.handleOnChanelastnam}
                                placeholder='Author lastName' />
                                 <Input type="text" value={this.state.bDate} onChange={this.handleOnChanebirthdate}
                                placeholder='Author birthdate' />
                                      <Input type="text" value={this.state.description} onChange={this.handleOnChanedescription}
                                placeholder='description' />

                            {/* <Input type="date" value={this.state.authorDate} onChange={this.handleOnChaneDate}
                                placeholder='Author Date' />
                            <Input
                                type="file"
                                name=""
                                id="exampleFile"
                                onChange={this.handleselectedFile}
                                placeholder='Author Photo ' /> */}

                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Add
                                Author</Button>
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                // : <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
        );
    }
}

export default AddAuthor;