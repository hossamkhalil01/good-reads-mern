import React, { Component } from "react";
import {
  Table,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Input,
} from "reactstrap";
import axios from "axios";
import AddCategory from "./AddCategory";

class CategoriesView extends Component {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    categories: [],
    modal: false,
    label: "",
    IdEdit: 0,
    errors: {
      label: "" ,
    },
    submitDisabled:false
  };

  toggle(id) {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      label: "",
      IdEdit: 0,
    }));

    if (id !== null) {
      const categories = this.state.categories;
      const category = categories.filter((category) => {
        return category._id === id;
      });

      const catid = category[0]._id;
      const cattitle = category[0].label;
      this.setState({
        label: cattitle,
        IdEdit: catid,
      });
    }
  }

  handleUpdateCategory() {
    const title = this.state.label;
    const id = this.state.IdEdit;
    if (title && id) {
      const categories = this.state.categories;
      for (let key in categories) {
        if (categories[key]._id === id) {
          categories[key].label = title;
          this.setState({ categories: categories });
          this.setState({
            label: "",
            idEdit: "",
          });
          axios
            .put(`http://localhost:8000/categories/${id}`, {
              label: title,
            })
            .then((res) => {
              if (res.status === 200) {
               
                this.toggle(null);
                this.setState({
                  label: "",
                  errors: { ...this.state.errors, label: "" } , submitDisabled: false
                });
              } else {
                console.log("not updated in db");
              }
              
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

  handleData(data) {
    this.setState({
      categories: data,
    });
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/categories`)
      .then((res) => {
        console.log(res);
        this.setState({
          categories: res.data.data,
        });
        this.props.passCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ error: "Error reteiriving data" });
  }

  handleDeleteCategory = (deletedId) => {
    axios
      .delete(`http://localhost:8000/categories/${deletedId}`)
      .then((res) => {
        console.log(res);
        this.setState({
          categories: this.state.categories.filter(
            (category) => category._id !== deletedId
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ error: "Error Delete Operation" });
  };

  handleOnChange = (event) => {
    this.setState({ label: event.target.value }, () => {
      console.log("dd");
      this.canSubmit();
    });
  };

  canSubmit = () => {
    console.log("canSubmit");
    const { label } = this.state;
    console.log("e", label.length);
    if (label.length >0 && label.length <20 ) {
      this.setState({ errors: { ...this.state.errors, label: '' } , submitDisabled: false });
    } else {
      this.setState({ errors: { ...this.state.errors, label: "Label is required " } , submitDisabled: true });
    }
  };

  render() {
    const { categories, error , errors} = this.state;

    const categoriesView = categories.length
      ? categories.map((category) => (
          <tr key={category._id}>
            <td>{category.label}</td>
            <td>
              <Button
                color="danger"
                onClick={() => {
                  this.handleDeleteCategory(category._id);
                }}
              >
                Delete
              </Button>
            </td>
            <td>
              <Button color="success" onClick={() => this.toggle(category._id)}>
                Edit
              </Button>
            </td>
          </tr>
        ))
      : error;

    return (
      
      <div className="CategoriesTable">
        <AddCategory
          categories={this.state.categories}
          handlerFromParant={this.handleData}
        />
        <Modal
          isOpen={this.state.modal}
          toggle={() => this.toggle()}
          className={this.props.className}
        >
          <ModalHeader>Edit Category</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              defaultValue={this.state.label}
              onChange={this.handleOnChange}
              placeholder="Category Name"
              maxLength="20"
            />
               {errors.label.length > 0 && (
                <span className="error">{errors.label}</span>
              )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleUpdateCategory() } disabled={this.state.submitDisabled}>
              Edit Category
            </Button>
            <Button color="secondary" onClick={() => this.toggle(null)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>#</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>{categoriesView}</tbody>
        </Table>
      </div>
    );
  }
}

export default CategoriesView;
