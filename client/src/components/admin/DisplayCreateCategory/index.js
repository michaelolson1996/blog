import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postCategory } from '../../../redux/categories';
import './index.css';

function DisplayCreateCategory() {

    const [ image, setImage ] = useState({ preview: "", raw: "" });

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            })
        }
        console.log(image)
    }

    const handleUpload = async e => {
        e.preventDefault();
        console.log(e.target.value)
        const formData = new FormData();
        formData.append("image", image.raw);

        postCategory(formData);
    }

    return (
        <form className="create-category-container">
            <h1>Create New Category</h1>
            <input className="category-title-input" type="text" placeholder="Category Title" />
            <label htmlFor="upload-button">
                {image.preview ? (
                    <img src={image.preview} alt="dummy" width="300" height="300" />
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

            <input
                type="file"
                id="upload-button"
                onChange={ handleChange }
            />

            <button onSubmit={ handleUpload }>Create Category</button>
        </form>
    )
}

export default connect(state => state, { postCategory })(DisplayCreateCategory);