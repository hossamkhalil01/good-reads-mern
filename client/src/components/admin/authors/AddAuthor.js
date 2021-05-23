import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "reactstrap";
import axios from "axios";

class AddAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    modal: false,
    authors: [],
    author: {
      firstName: "",
      lastName: "",
      description: "",
      bDate: "",
    },
    selectedFile: null,
  };

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));

    // if (this.state.author.dateOfBirth === '' || this.state.author.authorFullName === '') {
    // } else {
    if (this.state.author.firstName === ""
    ) {
    } else {
        const data = new FormData();
        
        console.log("this the author" , JSON.stringify(this.state.author) , this.state.selectedFile)
        data.append("body", JSON.stringify(this.state.author));
        data.append("myImage", this.state.selectedFile);
       
       for (var pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
    console.log("f" , data); 
      axios
        .post("http://localhost:8000/authors", data)
        .then((response) => {
          console.log(response.data);
          const authorsProps = this.props.authors;
          authorsProps.push({
            _id: response.data.author._id,
            firstName: response.data.author.firstName,
            lastName: response.data.author.lastName,
            bDate: response.data.author.bDate,
            description: response.data.author.description,
            photo: response.data.author.photo
          });
          
          this.setState({
            authors: [
              ...this.props.authors,
              this.state.firstName,
              this.state.lastName,
              this.state.bDate,
              this.state.description
            ],
            firstName: "",
            lastName: "",
            bDate: "",
            description: "",
          });
          this.props.handlerFromParant(authorsProps);
        })
        .catch((error) => {
          console.log(error);
        });
      // }
    }
  }

  handleOnChaneFname = (event) => {
    this.setState({ author: { ...this.state.author, firstName: event.target.value } });
  };

  handleOnChanelastnam = (event) => {
    this.setState({ author: { ...this.state.author, lastName: event.target.value } });
  };

  handleOnChanebirthdate = (event) => {
    this.setState({ author: { ...this.state.author, bDate: event.target.value } });
  };

  handleOnChanedescription = (event) => {
    this.setState({ author: { ...this.state.author, description: event.target.value } });
  };
  handleselectedFile = event => {
      this.setState({
          selectedFile: event.target.files[0],
          loaded: 0
      });
  };

  render() {
    return (
      // localStorage.token ?
      <div>
        {/* <h1>Authors Contents</h1> */}
        <Button color="success" onClick={this.toggle}>
          Add Author
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={this.state.backdrop}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add Author</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              value={this.state.firstName}
              onChange={this.handleOnChaneFname}
              placeholder="Author FirstName"
            />
            <Input
              type="text"
              value={this.state.lastName}
              onChange={this.handleOnChanelastnam}
              placeholder="Author lastName"
            />
            <Input
              type="text"
              value={this.state.description}
              onChange={this.handleOnChanedescription}
              placeholder="description"
            />
            <Input
              type="text"
              value={this.state.bDate}
              onChange={this.handleOnChanebirthdate}
              placeholder="Author birthdate"
            />

            {/* {/* <Input type="date" value={this.state.authorDate} onChange={this.handleOnChaneDate}
                                placeholder='Author Date' /> */}
                            <Input
                                type="file"
                                name=""
                                id="exampleFile"
                                onChange={this.handleselectedFile}
                                placeholder='Author Photo ' />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Add Author
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddAuthor;