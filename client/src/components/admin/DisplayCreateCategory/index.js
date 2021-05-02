import React from 'react';
import { connect } from 'react-redux';
import { postCategory, getCategories } from '../../../redux/categories';
import './index.css';

class DisplayCreateCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: {
                image_name: "",
                preview: "",
                raw: ""
            },
            title: ""
        }
    }
 

    handleTitleChange = e => {
        this.setState({
            title: e.target.value,
        })
    }

    handleImageDeclaration = e => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            this.setState({
                image: {
                    image_name: e.target.files[0].name,
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: reader.result
                }
            })
        }
    }

    handleUpload = e => {
        e.preventDefault();

        if (this.state.title.length === 0)
            alert("needs title");
        else if (this.state.image.raw.length === 0)
            alert("needs image");
        else
            this.props.postCategory({
                title: this.state.title,
                raw: this.state.image.raw,
                image_name: this.state.image.image_name
            });
    }

    render() {
        return (
            <form
                // onSubmit={ handleUpload }
                className="create-category-container">
                <h1>Create New Category</h1>
                <input onChange={ this.handleTitleChange } className="category-title-input" type="text" placeholder="Category Title" />
                <label htmlFor="upload-button">
                    {
                        this.state.image.preview ?
                            <img src={this.state.image.preview} alt="dummy" width="300" height="300" />
                        :
                            <></>
                    }
                </label>
    
                <input
                    type="file"
                    id="upload-button"
                    onChange={ this.handleImageDeclaration }
                    accept="image/*" />
    
                <button onClick={ this.handleUpload }>Create Category</button>
            </form>
        )
    }
}

export default connect(state => state, { postCategory, getCategories })(DisplayCreateCategory);