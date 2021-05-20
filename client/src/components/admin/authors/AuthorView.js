// import React, { Component } from 'react';
// // import '../css/AuthorView.css';
// import AddAuthor from './AddAuthor';
// import axios from "axios";
// import { Redirect } from 'react-router-dom'
// import { Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";

// class AuthorView extends Component {
//     constructor(props) {
//         super(props);
//         this.handleData = this.handleData.bind(this);
//         this.toggle = this.toggle.bind(this);
//     }

//     state = {
//         authors: [],
//         modal: false,
//         author: {
//             fullName: '',
//             dateOfBirth: '',
//         },
//         IdEdit: 0,
//         selectedFile: null,
//         loaded: 0,
//     };

//     handleData(data) {
//         this.setState({
//             authors: data
//         });
//     }

//     toggle(id) {
//         console.log(id);
//         this.setState(prevState => ({
//             modal: !prevState.modal,
//             author: {
//                 fullName: '',
//                 dateOfBirth: '',
//             },
//             IdEdit: 0
//         }));
//         if (id !== null) {
//             const authors = this.state.authors;
//             const author = authors.filter(author => {
//                 return author._id === id;
//             });
//             console.log(id);
//             console.log(author);

//             const fullName = author[0].fullName;
//             const dateOfBirth = author[0].dateOfBirth;
//             this.setState({
//                 author: {
//                     fullName,
//                     dateOfBirth,
//                 },
//                 IdEdit: id,
//             });
//         }
//     }

//     // handleUpdateAuthor() {

//     //     const fullName = this.state.author.fullName;
//     //     const dateOfBirth = this.state.author.dateOfBirth;
//     //     const id = this.state.IdEdit;
//     //     if (fullName !== '' && id !== 0 && dateOfBirth !== '') {
//     //         const authors = this.state.authors;
//     //         for (let key in authors) {
//     //             if (authors[key]._id === id) {
//     //                 authors[key].fullName = fullName;

//     //                 // send post
//     //                 // const token = localStorage.token;
//     //                 // if (token) {
//     //                     const data = new FormData();
//     //                     data.append(
//     //                         "file",
//     //                         this.state.selectedFile,
//     //                         this.state.selectedFile.name
//     //                     );
//     //                     data.append("body", JSON.stringify(this.state.author));
//     //                     const conf = {
//     //                         onUploadProgress: ProgressEvent => {
//     //                             this.setState({
//     //                                 loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
//     //                             });
//     //                         },
//     //                         // headers: {
//     //                         //     "Content-Type": "application/json",
//     //                         //     "x-auth": token
//     //                         // }
//     //                     };
//     //                     axios.put(`/api/admin/authors/${id}`, data)
//     //                         .then(res => {
//     //                             // console.log(res);
//     //                             if (res.status === 200) {
//     //                                 authors[key].photo = res.data.photo;

//     //                                 this.setState({
//     //                                     authors,
//     //                                     author: {
//     //                                         fullName: '',
//     //                                         dateOfBirth: '',
//     //                                     },
//     //                                     IdEdit: 0
//     //                                 }
//     //                                 );
//     //                                 // console.log(res.data.photo);
//     //                             } else {
//     //                                 console.log("not updated in db");
//     //                             }
//     //                         })
//     //                         .catch(err => {
//     //                             console.log({ err });
//     //                             this.setState({ error: 'Error Delete Operation' })
//     //                         })
//     //                 // }
//     //             }

//     //         }
//     //     }
//     //     ;

//     // }

//     handleDeleteAuthor = deletedId => {

//         const token = localStorage.token;
//         if (token) {
//             const conf = {
//                 headers: {
//                     "x-auth": token,
//                 }
//             }
//             axios.delete(`/api/admin/authors/${deletedId}`, conf)
//                 .then(res => {
//                     if (res.status === 200) {
//                         console.log(res);
//                     } else {
//                         console.log("not deleted from db");
//                     }
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//             this.setState({ error: 'Error Delete Operation' })
//         }
//         this.setState({ authors: this.state.authors.filter(author => author._id !== deletedId) });
//     }

//     componentDidMount() {
//         // const token = localStorage.token;
//         // if (token) {
//             // const conf = {
//             //     headers: {
//             //         "x-auth": token,
//             //     }
//             // }
//             axios.get('http://localhost:8000/authors')
//                 .then(response => {
//                     console.log(response);
//                     this.setState(
//                         { authors: response.data}
//                     );
//                     this.props.passAuthors(response.data);

//                 }).catch(error => {
//                     console.log(error);
//                     this.setState({ error: 'Error reteiriving data' })
//                 })
//         // }

//     }

//     handleOnChangefullName = event => {
//         this.setState({
//             author: {
//                 ...this.state.author,
//                 fullName: event.target.value
//             }
//         });
//         console.log(this.state.author.fullName);
//     }

//     handleOnChangeDate = event => {
//         this.setState({
//             author: {
//                 ...this.state.author,
//                 dateOfBirth: event.target.value
//             }
//         });
//         console.log(this.state.author.dateOfBirth);
//     }

//     handleselectedFile = event => {
//         this.setState({
//             selectedFile: event.target.files[0],
//             loaded: 0
//         });
//     };

//     render() {
//         const { authors, error } = this.state;
//         const authorsView = authors.length ? authors.map(author =>
//             <tr key={author._id}>
//                 <td><img src={author.photo} alt="img" width="75" height="75" /></td>
//                 <td>{author.fullName}</td>
//                 <td>{author.dateOfBirth}</td>
//                 <td><Button color='danger' onClick={() => this.handleDeleteAuthor(author._id)}>Delete</Button></td>
//                 <td><Button color='success' onClick={() => this.toggle(author._id)}>Edit</Button></td>
//             </tr>
//         ) : error

//         return (
//                 <div>
//                     <AddAuthor authors={this.state.authors} handlerFromParant={this.handleData} />
//                     <Modal isOpen={this.state.modal} toggle={() => this.toggle()}
//                         className={this.props.className}>
//                         <ModalHeader>Edit Author</ModalHeader>
//                         <ModalBody>
//                             <Input type="text" defaultValue={this.state.author.fullName}
//                                 onChange={this.handleOnChangefullName}
//                                 placeholder='Full FIrstName' />
//                             <Input type="date" defaultValue={this.state.author.dateOfBirth}
//                                 onChange={this.handleOnChangeDate}
//                                 placeholder='Author Date fo Birth' />
//                             <Input
//                                 type="file"
//                                 name=""
//                                 id="exampleFile"
//                                 onChange={this.handleselectedFile}
//                                 placeholder='Author Photo ' />

//                         </ModalBody>
//                         <ModalFooter>
//                             <Button color="primary" onClick={() => this.handleUpdateAuthor()}>Edit Author</Button>{' '}
//                             <Button color="secondary" onClick={() => this.toggle(null)}>Close</Button>
//                         </ModalFooter>
//                     </Modal>
//                     <Table>
//                         <thead>
//                             <tr>
//                                 <th>Author Photo</th>
//                                 <th>Author Full-Name</th>
//                                 <th>Author Date Of Birth</th>
//                                 <th>#</th>
//                                 <th>#</th>
//                             </tr>
//                         </thead>
//                         <tbody>{authorsView}</tbody>
//                     </Table>
//                 </div>

//         );
//     }
// }

// export default AuthorView;

///////////////////////////*************************///////////////////////////// */

import React, { Component, useEffect } from "react";
// import '../css/AuthorView.css';
import AddAuthor from "./AddAuthor";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  Alert,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

class AuthorView extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    authors: [],
    modal: false,
    author: {
      firstName: "",
      lastName: "",
      description: "",
      photo: "",
      bDate: "",
    },
    IdEdit: 0,
    selectedFile: null,
    loaded: 0,
  };

  handleData(data) {
    this.setState({
      authors: data,
    });
  }

  toggle(id) {
    console.log(id);
    this.setState((prevState) => ({
      modal: !prevState.modal,
      author: {
        firstName: "",
        lastName: "",
        description: "",
        photo: "",
        bDate: "",
      },
      IdEdit: 0,
    }));
    if (id !== null) {
      const authors = this.state.authors;
      const author = authors.filter((author) => {
        return author._id === id;
      });
      console.log(id);
      console.log(author);

      const firstName = author[0].firstName;
      const lastName = author[0].lastName;
      const description = author[0].description;
      const photo = author[0].photo;
      const bDate = author[0].bDate;

      // const dateOfBirth = author[0].dateOfBirth;
      this.setState({
        author: {
          firstName,
          lastName,
          description,
          photo,
          bDate,
        },
        IdEdit: id,
      });
    }
  }

  handleUpdateAuthor() {
    const fName = this.state.author.firstName;
    const lName = this.state.author.lastName;
    const Authordescription = this.state.author.description;
    const birthDate = this.state.author.bDate;
    const id = this.state.IdEdit;
    if (fName !== "" && lName !== "" && id !== 0 && birthDate !== "") {
      const authors = this.state.authors;
      for (let key in authors) {
        if (authors[key]._id === id) {
          authors[key].firstName = fName;
          authors[key].lastName = lName;
          authors[key].description = Authordescription;
          authors[key].bDate = birthDate;
          // send post
          // const token = localStorage.token;
          // if (token) {
        //   const data = new FormData();
        //   data.append(
        //     "file",
        //     this.state.selectedFile,
        //     this.state.selectedFile.name
        //   );
        //   data.append("body", JSON.stringify(this.state.author));
        //   const conf = {
        //     onUploadProgress: (ProgressEvent) => {
        //       this.setState({
        //         loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
        //       });
        //     },
            // headers: {
            //     "Content-Type": "application/json",
            //     "x-auth": token
            // }
        //   };
          axios
            .put(`http://localhost:8000/authors/${id}`,{
                firstName:fName,
                lastName:lName,
                bDate:birthDate,
                description:Authordescription
            })
            .then((res) => {
              // console.log(res);
              authors[key].photo = res.data.photo;
              this.setState({
                authors,
                author: {
                  firstName: "",
                  lastName: "",
                  description: "",
                  photo: "",
                  bDate: "",
                },
                IdEdit: 0,
              });
              this.toggle(null);
              // console.log(res.data.photo);
            })
            .catch((err) => {
              console.log({ err });
              this.setState({ error: "Error Delete Operation" });
            });
          // }
        }
      }
    }
  }



// axios.put(`http://localhost:8000/categories/${id}`, {
//                             label: title
//                         })
//                             .then(res => {
//                                 console.log(res);
//                                 if (res.status === 200) {
//                                     console.log(res);
//                                     this.toggle(null);

//                                 } else {
//                                     console.log("not updated in db");
//                                 }
//                             })
//                             .catch(err => {
//                                 console.log({ err });
//                                 this.setState({ error: 'Error Delete Operation' })
//                             })
//   handleDeleteAuthor = (deletedId) => {
//     // const token = localStorage.token;
//     // if (token) {
//     //   const conf = {
//     //     headers: {
//     //       "x-auth": token,
//     //     },
//     //   };
//     axios
//       .delete(`http://localhost:8000/authors/${deletedId}`)
//       .then((res) => {
//         console.log(res);
//         this.setState({
//           authors: this.state.authors.filter(
//             (author) => author._id !== deletedId
//           ),
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     this.setState({ error: "Error Delete Operation" });
//   };

  componentDidMount() {
    // const token = localStorage.token;
    // if (token) {
    // const conf = {
    //     headers: {
    //         "x-auth": token,
    //     }
    // }
    axios
      .get("http://localhost:8000/authors")
      .then((response) => {
        console.log(response.data.data);
        this.setState({ authors: response.data.data });
        this.props.passAuthors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ error: "Error reteiriving data" });
  }

  //   componentWillUnmount() {
  //       console.log("unmount");
  //     this._isMounted = true;
  //   }

  handleOnChangefirstName = (event) => {
    this.setState({
      author: {
        ...this.state.author,
        // fullName: event.target.value
        firstName: event.target.value,
        // lastName: event.target.value,
        // description: event.target.value,
        // bDate: event.target.value,
      },
    });
    console.log(this.state.author.fullName);
  };

  handleOnChangelastName = (event) => {
    this.setState({
      author: {
        ...this.state.author,
        // fullName: event.target.value
        // firstName: event.target.value,
        lastName: event.target.value,
        // description: event.target.value,
        // bDate: event.target.value,
      },
    });
    console.log(this.state.author.fullName);
  };

  handleOnChangeDescription = (event) => {
    this.setState({
      author: {
        ...this.state.author,
        // fullName: event.target.value
        // firstName: event.target.value,
        // lastName: event.target.value,
        description: event.target.value,
        // bDate: event.target.value,
      },
    });
    console.log(this.state.author.description);
  };

  handleOnChangebDate = (event) => {
    this.setState({
      author: {
        ...this.state.author,
        //   dateOfBirth: event.target.value
        // firstName: event.target.value,
        // lastName: event.target.value,
        // description: event.target.value,
        bDate: event.target.value,
      },
    });
    console.log(this.state.author.bDate);
  };

  handleselectedFile = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  render() {
    const { authors, error } = this.state;
    const authorsView = authors.length
      ? authors.map((author) => (
          <tr key={author._id}>
            {/* <td><img src={author.photo} alt="img" width="75" height="75" /></td> */}
            <td>{author.firstName}</td>
            <td>{author.lastName}</td>
            <td>{author.description}</td>
            <td>{author.bDate.match(/\d{4}-\d{2}-\d{2}/)}</td>
            {/* <td>{author.dateOfBirth}</td> */}
            <td>
              <Button
                color="danger"
                onClick={() => this.handleDeleteAuthor(author._id)}
              >
                Delete
              </Button>
            </td>
            <td>
              <Button color="success" onClick={() => this.toggle(author._id)}>
                Edit
              </Button>
            </td>
          </tr>
        ))
      : error;

    return (
      // <h1>sdhdshgdshgsdgv</h1>
      <div>
        <AddAuthor
          authors={this.state.authors}
          handlerFromParant={this.handleData}
        />

        <Modal
          isOpen={this.state.modal}
          toggle={() => this.toggle()}
          className={this.props.className}
        >
          <ModalHeader>Edit Author</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              defaultValue={this.state.author.firstName}
              onChange={this.handleOnChangefirstName}
              placeholder="firstName"
            />
            <Input
              type="text"
              defaultValue={this.state.author.lastName}
              onChange={this.handleOnChangelastName}
              placeholder="lastName"
            />
            <Input
              type="text"
              defaultValue={this.state.author.description}
              onChange={this.handleOnChangeDescription}
              placeholder="Description"
            />
            {/* <Input
              type="date"
              defaultValue={this.state.author.bDate.match(/\d{4}-\d{2}-\d{2}/)}
              onChange={this.handleOnChangebDate}
              placeholder="BirthDate"
            /> */}
            <Input
              type="date"
              defaultValue={this.state.author.bDate.match(/\d{4}-\d{2}-\d{2}/)}
              onChange={this.handleOnChangebDate}
              placeholder="Author Date fo Birth"
            />
            {/* <Input
                                type="file"
                                name=""
                                id="exampleFile"
                                onChange={this.handleselectedFile}
                                placeholder='Author Photo ' /> */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleUpdateAuthor()}>
              Edit Author
            </Button>{" "}
            <Button color="secondary" onClick={() => this.toggle(null)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>lastName</th>
              <th>Description</th>
              <th>Date of Birth</th>
              <th>Photo</th>
              <th>#</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>{authorsView}</tbody>
        </Table>
      </div>
    );
  }
}

export default AuthorView;
