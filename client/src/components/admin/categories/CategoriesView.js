import React, { Component } from 'react';
import { Table, Button, Alert, ModalHeader, ModalBody, ModalFooter, Modal, Input } from "reactstrap";
import axios from 'axios';
import { Redirect } from 'react-router-dom'
// import '../css/CategoriesView.css';
import AddCategory from './AddCategory';

class CategoriesView extends Component {
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    state = {
        categories: [],
        modal: false,
        NameEdit: '',
        IdEdit: 0
    };

    toggle(id) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            NameEdit: '',
            IdEdit: 0
        }));

        if (id !== null) {
            const categories = this.state.categories;
            const category = categories.filter(category => {
                return category._id === id;
            });

            const catid = category[0]._id;
            const cattitle = category[0].label;
            this.setState({
                NameEdit: cattitle,
                IdEdit: catid
            });
        }

    }

//     handleUpdateCategory() {

//         const title = this.state.NameEdit;
//         const id = this.state.IdEdit;
//         if (title && id) {
//             console.log("k" , id);
//             const categories = this.state.categories;
//             for (let key in categories) {
//                 if (categories[key]._id === id) {
//                     categories[key].label = title;
//                     this.setState({ categories: categories });
//                     this.setState({
//                         NameEdit: '',
//                         idEdit: ''
//                     });
//                     // send put request
//                     // const token = localStorage.token;
//                     // if (token) {
//                     //     const conf = {
//                     //         headers: {
//                     //             "x-auth": token,
//                     //         }
//                     //     }
//                     console.log("j" , id);
//                     console.log("s" , title , title.length)
//                         axios.put(`http://localhost:8000/categories/${id}`, {
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
//                     // }
//                 }
//             }
//         }
//     }

//     handleData(data) {
//         this.setState({
//             categories: data
//         });
//     }

//     componentDidMount() {
//         // const token = localStorage.token;
//         // if (token) {
//         //     const conf = {
//         //         headers: {
//         //             "x-auth": token,
//         //         }
//         //     }
//             axios.get(`http://localhost:8000/categories`)
//                 .then(res => {
//                     console.log(res);
//                     this.setState({
//                         categories: res.data.data
//                     })
//                     this.props.passCategories(res.data.data);

//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//             this.setState({ error: 'Error reteiriving data' })
//         // }
//     }

//     handleDeleteCategory = deletedId => {
//         const token = localStorage.token;
//         // if (token) {
//         //     const conf = {
//         //         headers: {
//         //             "x-auth": token,
//         //         }
//         //     }
//             axios.delete(`http://localhost:8000/categories/${deletedId}`)
//                 .then(res => {
//                         console.log(res);
//                         this.setState({ categories: this.state.categories.filter(category => category._id !== deletedId) });
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//             this.setState({ error: 'Error Delete Operation' })
//         // }
      

//     }

//     handleOnChange = event => {
//         this.setState({ NameEdit: event.target.value });
//         console.log(this.state.NameEdit);
//     }

//     render() {
//         const { categories, error } = this.state;
//         const categoriesView = categories.length ? categories.map(category =>
//             <tr key={category._id}>
//                 <td>{category.label}</td> 
//                 <td><Button color='danger' onClick={() => this.handleDeleteCategory(category._id)}>Delete</Button></td>
//                 <td><Button color='success' onClick={() => this.toggle(category._id)}>Edit</Button></td>
//             </tr>
//         ) : error 

//         return (
//                 <div className='CategoriesTable'>
//                     <AddCategory categories={this.state.categories} handlerFromParant={this.handleData} />
//                     <Modal isOpen={this.state.modal} toggle={() => this.toggle()}
//                         className={this.props.className}>
//                         <ModalHeader>Add Category</ModalHeader>
//                         <ModalBody>
//                             <Input type="text" defaultValue={this.state.NameEdit} onChange={this.handleOnChange}
//                                 placeholder='Category Name' />
//                         </ModalBody>
//                         <ModalFooter>
//                             <Button color="primary" onClick={() => this.handleUpdateCategory()}>Edit
//                                 Category</Button>{' '}
//                             <Button color="secondary" onClick={() => this.toggle(null)}>Close</Button>
//                         </ModalFooter>
//                     </Modal>
//                     <Table>
//                         <thead>
//                             <tr>
//                                 <th>Category Name</th>
//                                 <th>#</th>
//                                 <th>#</th>
//                             </tr>
//                         </thead>
//                         <tbody>{categoriesView}</tbody>
//                     </Table>
//                 </div>
               
//         );
//     }
// }

// export default CategoriesView;