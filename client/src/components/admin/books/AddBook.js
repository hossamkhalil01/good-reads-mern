import React, { Component } from "react";
import {
  Alert,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import axios from "axios";
class AddBook extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categories: nextProps.categories,
      authors: nextProps.authors,
    });
  }

  state = {
    modal: false,
    books: [],
    categories: [],
    authors: [],
    book: {
      title: "",
      authors: [],
      categories: [],
      description: "",
    },
    selectedFile: null,
  };

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
    if (
      this.state.book.title === "" ||
      this.state.book.author === [] ||
      this.state.book.categories === [] ||
      this.state.book.description === ""
    ) {
    } else {
      const formData = new FormData();
      formData.append("body", JSON.stringify(this.state.book));
      formData.append("myImage", this.state.selectedFile);

      console.log(formData.get("body"), formData.get("myImage"));
  
      axios
        .post("http://localhost:8000/books", formData)
        .then((response) => {
          console.log(response.data.data);
          const booksProps = this.props.books;
          this.state.authors.forEach(element => {
            if(element._id === response.data.data.authors[0])
            {
              let obj = { firstName:element.firstName , _id:response.data.data.authors[0]
              , lastName:element.lastName
              }
              response.data.data.authors[0] = obj ;
            }
          });

          this.state.categories.forEach(element => {
            if(element._id === response.data.data.categories[0])
            {
              let obj = { label:element.label , _id:response.data.data.categories[0]
              }
              response.data.data.categories[0] = obj ;
            }
          });

          booksProps.push(response.data.data);
          this.setState({
            books: booksProps,
          });
          console.log("d", booksProps);
          this.props.handlerFromParant(booksProps);
          this.setState({
            books: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleOnChangetitle = (event) => {
    this.setState({ book: { ...this.state.book, title: event.target.value } });
  };
  handleOnChangeCategory = (event) => {
    this.setState({
      book: { ...this.state.book, categories: event.target.value },
    });
  };
  handleOnChangeAuthor = (event) => {
    this.setState({
      book: { ...this.state.book, authors: event.target.value },
    });
  };
  handleOnChangeDescription = (event) => {
    this.setState({
      book: { ...this.state.book, description: event.target.value },
    });
  };

  handleselectedFile = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  render() {
    const { categories, authors, error } = this.state;
    const categoiresView = categories.length ? (
      categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.label}
        </option>
      ))
    ) : error ? (
      <h1>
        <Alert color="danger">{error}</Alert>
      </h1>
    ) : null;
    const authorView = authors.length ? (
      authors.map((author) => (
        <option key={author._id} value={author._id}>
          {author.firstName}
        </option>
      ))
    ) : error ? (
      <h1>
        <Alert color="danger">{error}</Alert>
      </h1>
    ) : null;

    return (
      <div>
        <h1>Book Contents</h1>
        <Button color="success" onClick={this.toggle}>
          Add Books{" "}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={this.state.backdrop}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add Book</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              value={this.state.title}
              onChange={this.handleOnChangetitle}
              placeholder="Book Name"
            />
            <Input
              type="select"
              name="selectCategory"
              id="categorySelect"
              onClick={this.handleOnChangeCategory}
             
            >
              {categoiresView}
              <option disabled selected>PLease select Category</option>
            </Input>
            <Input
              type="select"
              name="selectAuthor"
              id="authorSelect"
              onClick={this.handleOnChangeAuthor}
            >
              {authorView}
              <option  disabled selected>PLease select Author</option>
            </Input>
            <textarea
              name="description"
              id="authorSelect"
              onChange={this.handleOnChangeDescription}
              placeholder="Discription "
            ></textarea>

            <Input
              type="file"
              name=""
              id="addImageBook"
              onChange={this.handleselectedFile}
              placeholder="Book Photo "
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Add Book
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddBook;
