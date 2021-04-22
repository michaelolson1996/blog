import React from 'react';
import { connect } from 'react-redux';
import { postCategory } from '../../../redux/categories';
import './index.css';

class DisplayCreateCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: {
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
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: reader.result
                }
            })
        }
    }

    handleUpload = e => {
        e.preventDefault();

        if (this.state.title.length == 0)
            alert("needs title");
        else if (this.state.image.raw.length == 0)
            alert("needs image");
        else
            this.props.postCategory({
                title: this.state.title,
                raw: this.state.image.raw
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
                    {this.state.image.preview ? (
                        <img src={this.state.image.preview} alt="dummy" width="300" height="300" />
                    ) : (
                        <>
                            {/* <span className="fa-stack fa-2x mt-3 mb-2">
                                <i className="fas fa-circle fa-stack-2x" />
                                <i className="fas fa-store fa-stack-1x fa-inverse" />
                            </span> */}
                            {/* <h5 className="text-center">Upload your photo</h5> */}
                        </>
                    )}
                </label>

                {console.log(this.state)}
    
                <input
                    type="file"
                    id="upload-button"
                    onChange={ this.handleImageDeclaration }
                />
    
                <button onClick={ this.handleUpload }>Create Category</button>
            </form>
        )
    }
}

export default connect(state => state, { postCategory })(DisplayCreateCategory);