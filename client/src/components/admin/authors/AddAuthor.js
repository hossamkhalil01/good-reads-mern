import React from "react";
import {
  Button,
  Input, Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import * as services from "../../../services/authorsService";

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

    if (this.state.author.firstName === "" ||
      this.state.author.lastName === "" ||
      this.state.author.bDate === "") {
    } else {
      const data = new FormData();

      data.append("body", JSON.stringify(this.state.author));
      data.append("myImage", this.state.selectedFile);

      services.createAuthor(data)
        .then(({ data: { data } }) => {
          const authorsProps = this.props.authors;
          authorsProps.push({
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            bDate: data.bDate,
            description: data.description,
            photo: data.photo
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
      <div>
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
            <textarea
              name="description"
              defaultValue={this.state.author.description}
              onChange={this.handleOnChangeDescription}
              placeholder="Discription "
            ></textarea>
            <Input
              type="date"
              value={this.state.bDate}
              onChange={this.handleOnChanebirthdate}
              placeholder="Author birthdate"
            />

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