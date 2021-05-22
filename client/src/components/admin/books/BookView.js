import React, { Component } from "react";
import axios from "axios";
import { Button, Table } from "reactstrap";
import AddBook from "./AddBook";
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
class BookView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      loaded: 0,
    };
    this.handleData = this.handleData.bind(this);
    this.handleUpdateBook = this.handleUpdateBook.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleData(data) {
    this.setState({
      books: data,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      categories: nextProps.categories,
      authors: nextProps.authors,
    });
  }

  toggle(id) {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      book: {
        title: "",
        authors: [],
        categories: [],
        description: "",
      },
      IdEdit: 0,
    }));
    if (id !== null) {
      const books = this.state.books;
      const book = books.filter((book) => {
        return book._id === id;
      });
      console.log("hhh", book);
      const title = book[0].title;
      const authors = book[0].authors;
      const categories = book[0].categories;
      const description = book[0].description;
      this.setState({
        book: {
          title,
          authors,
          categories,
          description,
        },
        IdEdit: id,
      });
    }
  }

  handleUpdateBook() {
    const title = this.state.book.title;
    const authors = this.state.book.authors;
    const categories = this.state.book.categories;
    const description = this.state.book.description;

    const id = this.state.IdEdit;
    if (
      title !== "" &&
      id !== 0 &&
      authors !== [] &&
      categories !== [] &&
      description !== ""
    ) {
      const books = this.state.books;
      for (let key in books) {
        if (books[key]._id === id) {
          books[key].title = title;
          books[key].authors = authors;
          books[key].categories = categories;
          books[key].description = description;
          console.log(books[key]);
          // send post
          // const token = localStorage.token;
          // if (token) {
          const data = new FormData();
          data.append("body", JSON.stringify(books[key]));
          data.append("myImage", this.state.selectedFile);
          console.log(data.get("body"));
          console.log(data.get("myImage"));
          axios
            .put(`http://localhost:8000/books/${id}`, data)
            .then((res) => {
              console.log(res.data.data);
              books[key].coverImage = res.data.data.coverImage;
              
              books[key].authors= res.data.data.authors;
              books[key].categories= res.data.data.categories;


                this.setState({
                  books,
                  book: {
                    title: "",
                    description: "",
                    authors: "",
                    categories: "",
                  },
                  IdEdit: 0,
                });
                this.toggle(null);
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

  componentDidMount() {
    axios
      .get("http://localhost:8000/books")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({ books: response.data.data });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error reteiriving data" });
      });
  }

  handleDeleteBook = (deletedId) => {
    axios
      .delete(`http://localhost:8000/books/${deletedId}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    this.setState({ error: "Error Delete Operation" });
    this.setState({
      books: this.state.books.filter((book) => book._id !== deletedId),
    });
  };

  handleOnChangetitle = (event) => {
    this.setState({
      book: { ...this.state.book, title: event.target.value },
    });
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
    const { categories, books, authors, error } = this.state;
    const categoiresView = categories.length
      ? categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.label}
          </option>
        ))
      : error;
    const authorView = authors.length
      ? authors.map((author) => (
          <option key={author._id} value={author._id}>
            {author.firstName}
          </option>
        ))
      : error;

    const bookslength = books.length;
    const booksView = bookslength
      ? books.map((book) => (
          <tr key={book._id}>
            <td>
              <img
                src={`http://localhost:8000/${book.coverImage}`}
                alt="img"
                width="75"
                height="75"
              />
            </td>
            <td>{book.title}</td>
            <td>
              {book.authors[0].firstName} {book.authors[0].lastName}
            </td>
            <td>{book.categories[0].label}</td>
            <td>{book.description}</td>
            <td>
              <Button
                color="danger"
                onClick={() => this.handleDeleteBook(book._id)}
              >
                Delete
              </Button>
            </td>
            <td>
              <Button color="success" onClick={() => this.toggle(book._id)}>
                Edit
              </Button>
            </td>
          </tr>
        ))
      : error;
    return (
      <div>
        <AddBook
          categories={this.state.categories}
          handlerFromParant={this.handleData}
          books={this.state.books}
          authors={this.state.authors}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop="static"
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add Book</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              value={this.state.title}
              defaultValue={this.state.book.title}
              onChange={this.handleOnChangetitle}
              placeholder="Book Name"
            />
            <Input
              type="select"
              name="selectCategory"
              defaultValue={this.state.book.category}
              id="categorySelect"
              onClick={this.handleOnChangeCategory}
            >
              {categoiresView}
            </Input>
            <Input
              type="select"
              name="selectAuthor"
              id="authorSelect"
              defaultValue={this.state.book.author}
              onClick={this.handleOnChangeAuthor}
            >
              {authorView}
            </Input>
            <textarea
              name="description"
              id="authorSelect"
              defaultValue={this.state.book.description}
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
            <Button color="primary" onClick={this.handleUpdateBook}>
              {" "}
              Edit Book
            </Button>{" "}
            <Button color="secondary" onClick={() => this.toggle(null)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>Book Photo</th>
              <th>Book Name</th>
              <th>Book Author</th>
              <th>Book Category</th>
              <th>Book Description</th>
              <th>#</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>{booksView}</tbody>
        </Table>
      </div>
    );
  }
}

export default BookView;
