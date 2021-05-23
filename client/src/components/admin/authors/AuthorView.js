import React, { Component } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap";
import { hostUrl } from "../../../api/urls";
import * as services from "../../../services/authorsService";
import AddAuthor from "./AddAuthor";
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
    submitDisabled: false,
    errors: {
      firstName: "",
      lastName: "",
      bDate: "Required",
    },
    loaded: 0,
  };

  handleData(data) {
    this.setState({
      authors: data,
    });
  }

  toggle(id) {
    console.log("id", id);
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

      const firstName = author[0].firstName;
      const lastName = author[0].lastName;
      const description = author[0].description;
      const photo = author[0].photo;
      const bDate = author[0].bDate;

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
          const formData = new FormData();
          formData.append("body", JSON.stringify(authors[key]));
          formData.append("myImage", this.state.selectedFile);
          services.updateAuthor(id, formData).then((res) => {
            authors[key].photo = res.data.data.photo;

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
              errors: {
                ...this.state.errors, firstName: "Required ", lastName: "Required",
                bDate: "Required",
              }, submitDisabled: true


            });
          }).catch((err) => {
            console.log({ err });
            this.setState({ error: "Error Delete Operation" });
          });
        }
      }
    }
  }



  //Delete Author
  handleDeleteAuthor = (deletedId) => {
    services.deleteAuthor(deletedId).then((res) => {
      console.log(res);
      this.setState({
        authors: this.state.authors.filter(
          (author) => author._id !== deletedId
        ),
      });
    })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ error: "Error Delete Operation" });
  };

  componentDidMount() {

    services.getAuthors()
      .then((response) => {
        this.setState({ authors: response.data.data.docs });
        this.props.passAuthors(response.data.data.docs);
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ error: "Error reteiriving data" });
  }

  handleOnChangefirstName = (event) => {
    this.setState({
      author: {
        ...this.state.author,

        firstName: event.target.value,

      },
    });
    console.log(this.state.author.fullName);
    const { firstName } = this.state.author;
    if (firstName.length > 1) {
      this.setState({ errors: { ...this.state.errors, firstName: '' }, submitDisabled: false });


    } else {
      this.setState({ errors: { ...this.state.errors, firstName: "Required " }, submitDisabled: true });
    }

  };

  handleOnChangelastName = (event) => {
    this.setState({
      author: {
        ...this.state.author,
        lastName: event.target.value,
      },
    });
    console.log(this.state.author.fullName);
    const { lastName } = this.state.author;
    if (lastName.length > 1) {
      this.setState({ errors: { ...this.state.errors, lastName: '' }, submitDisabled: false });
    } else {
      this.setState({ errors: { ...this.state.errors, lastName: "Required " }, submitDisabled: true });
    }
  };

  handleOnChangeDescription = (event) => {
    this.setState({
      author: {
        ...this.state.author,
        description: event.target.value,
      },
    });
    console.log(this.state.author.description);
  };

  handleOnChangebDate = (event) => {
    this.setState({
      author: {
        ...this.state.author,

        bDate: event.target.value,
      },
    });
    console.log(this.state.author.bDate);
    const { bDate } = this.state.author;
    if (bDate.length > 0) {
      this.setState({ errors: { ...this.state.errors, bDate: '' }, submitDisabled: false });



    } else {
      this.setState({ errors: { ...this.state.errors, bDate: "Required " }, submitDisabled: true });
    }

  };

  handleselectedFile = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  render() {
    const { authors, error, errors } = this.state;
    const authorsView = authors.length
      ? authors.map((author) => (
        <tr key={author._id}>
          <td><img src={`${hostUrl}${author.photo}`} alt="img" width="75" height="75" /></td>

          <td>{author.firstName}</td>
          <td>{author.lastName}</td>
          <td>{author.description}</td>
          <td>{author.bDate.match(/\d{4}-\d{2}-\d{2}/)}</td>

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
      <div>
        <AddAuthor
          authors={this.state.authors}
          handlerFromParant={this.handleData}
        />

        <Modal
          isOpen={this.state.modal}
          toggle={() => this.toggle()}
          className={this.props.className}
          backdrop="static"
        >
          <ModalHeader>Edit Author</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              defaultValue={this.state.author.firstName}
              onChange={this.handleOnChangefirstName}
              placeholder="firstName"
              maxLength="20"
            />
            {errors.firstName.length > 0 && (
              <span className="error">{errors.firstName}</span>
            )}
            <Input
              type="text"
              defaultValue={this.state.author.lastName}
              onChange={this.handleOnChangelastName}
              placeholder="lastName"
              maxLength="20"
            />
            {errors.lastName.length > 0 && (
              <span className="error">{errors.lastName}</span>
            )}
            <textarea
              name="description"
              defaultValue={this.state.author.description}
              onChange={this.handleOnChangeDescription}
              placeholder="Discription "
            ></textarea>

            <Input
              type="date"
              defaultValue={this.state.author.bDate.match(/\d{4}-\d{2}-\d{2}/)}
              onChange={this.handleOnChangebDate}
              placeholder="Author Date fo Birth"
            />
            {errors.bDate.length > 0 && (
              <span className="error">{errors.bDate}</span>
            )}

            <Input
              type="file"
              name=""
              id="exampleFile"
              onChange={this.handleselectedFile}
              placeholder='Author Photo ' />
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
              <th>AuthorPhoto</th>
              <th>FirstName</th>
              <th>lastName</th>
              <th>Description</th>
              <th>Date of Birth</th>
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


