import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,Input} from 'reactstrap';
import axios from 'axios';

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        modal: false,
        categories: [],
        label: ''
    };

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));

        if (this.state.label === '') {
        } else if (this.state.label !== '') {
            // const token = localStorage.token;
            //  if(token) {
            // const conf = {
            //   headers:{
            //   "x-auth":token,
            //     }
            // };
           
            axios.post('http://localhost:8000/categories', {
                label: this.state.label
            })
            .then(response => {
                console.log(response);
                const categoriesProps = this.props.categories;
                console.log("res" , response);
                categoriesProps.push({ id:response.data.data._id , label: response.data.data.label});
                this.setState({
                    categories: [...this.props.categories,this.state.label],
                    label: '',
                });
                this.props.handlerFromParant(categoriesProps);
            }
            )
            .catch(error => {
                console.log(error);
            });
        // }
    }
    }

    handleOnChange = event => {
        this.setState({label: event.target.value});
    }

    render() {
        return (
            <div>
                {/* <h1>Category Contents</h1> */}
                <Button color="success" onClick={this.toggle}>Add Category</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Category</ModalHeader>
                    <ModalBody>
                        <Input type="text" value={this.state.label} onChange={this.handleOnChange}
                               placeholder='Category Name'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Add
                            Category</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddCategory;