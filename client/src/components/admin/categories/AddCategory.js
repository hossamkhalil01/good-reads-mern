import React from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
} from "reactstrap";

import axios from "axios";

import validator from "validator";

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    modal: false,
    categories: [],
    label: "",
    initialValid: this.props,
    submitDisabled: true,
    errors: {
      label:"Label is required " 
    },
  };

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));

    if (this.state.label === "") {
    } else if (this.state.label !== "") {
      axios
        .post("http://localhost:8000/categories", {
          label: this.state.label,
        })
        .then((response) => {
          const categoriesProps = this.props.categories;
          categoriesProps.push({
            _id: response.data.data._id,
            label: response.data.data.label,
            disabled: true,
          });
          this.setState({
            categories: [...this.props.categories, this.state.label],
            label: "",
            errors: { ...this.state.errors, label: "Label is required " } , submitDisabled: true 
          });
          this.props.handlerFromParant(categoriesProps);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleOnChange = (event) => {
    event.preventDefault();
    this.setState({ label: event.target.value }, () => {
      console.log("dd");
      this.canSubmit();
    });
  };

  // canSubmit = () => {
  //   console.log("canSubmit");
  //   const { label } = this.state;
  //   console.log("e" , validator.isLength(label));
  //   if (validator.isLength(label) > 0) {
  //     this.setState({ submitDisabled:false  });
  //   } else {
  //     this.setState({ submitDisabled:true  });
  //   }
  // };

  ////////////////works!!!////

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
    const {errors} = this.state;
    return (
      <div>
        {/* <h1>Category Contents</h1> */}
        <Button color="success" onClick={this.toggle}>
          Add Category
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={this.state.backdrop}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add Category</ModalHeader>
          <ModalBody>
            <Form>
              <Input
                type="text"
                value={this.state.label}
                onChange={this.handleOnChange}
                placeholder="Category Name"
                maxLength = "20"
              />
              {errors.label.length > 0 && (
                <span className="error">{errors.label}</span>
              )}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.toggle}
              disabled={this.state.submitDisabled}
            >
              Add Category
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddCategory;
