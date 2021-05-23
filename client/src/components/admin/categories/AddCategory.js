import React from "react";
import {
  Button,
  Form, Input, Modal,
  ModalBody,
  ModalFooter, ModalHeader
} from "reactstrap";
import * as services from "../../../services/categoriesService";


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
      label: "Label is required "
    },
  };

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));

    if (this.state.label === "") {
    } else if (this.state.label !== "") {
      services.createCategory({
        label: this.state.label,
      }).then((response) => {
        const categoriesProps = this.props.categories;
        categoriesProps.push({
          _id: response.data.data._id,
          label: response.data.data.label,
          disabled: true,
        });
        this.setState({
          categories: [...this.props.categories, this.state.label],
          label: "",
          errors: { ...this.state.errors, label: "Label is required" }, submitDisabled: true
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
      this.canSubmit();
    });
  };

  canSubmit = () => {
    const { label } = this.state;
    if (label.length > 0 && label.length < 20) {
      this.setState({ errors: { ...this.state.errors, label: '' }, submitDisabled: false });


    } else {
      this.setState({ errors: { ...this.state.errors, label: "Label is required" }, submitDisabled: true });
    }
  };

  render() {
    const { errors } = this.state;
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
                maxLength="20"
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
