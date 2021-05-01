import React, { useState } from 'react';
import CategoryItem from '../CategoryItem';
import { connect } from 'react-redux';
import { editCategory } from '../../../redux/categories';

class DisplayEditCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            title: '',
            image: '',
            newTitle: '',
            newImage: ''
        }
    }

    editCategory = (title, image) => {
        this.setState(oldState => ({
            isEditing: true,
            title: title,
            image: image,
            newTitle: title,
            newImage: image
        }))
    }

    displayCategories = () => {
        this.setState({
            isEditing: false,
            title: '',
            image: ''
        })
    }

    updateTitle = (e) => {
        e.preventDefault();

        this.setState(oldState => ({
            ...oldState,
            newTitle: e.target.value
        }))
    }

    replaceImage = e => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            this.setState(oldState => ({
                ...oldState,
                newImage: reader.result
            }))
        }
    }

    updateCategory = () => {
        if (this.state.title === this.state.newTitle && this.state.image === this.state.newImage)
            return alert("items have not changed")

        if (this.state.newTitle.length === 0 || this.state.newImage.length === 0)
            return alert("title and image must be not empty")
            
        this.props.editCategory({ 
            title: this.state.title,
            newTitle: this.state.newTitle,
            image: this.state.image,
            newImage: this.state.newImage
        });

        this.displayCategories();
    }

    render() {
        return (
            <>
                {
                    this.state.isEditing ?
                        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent:'space-around', alignItems: 'center' }}>
                            <div>
                                <label htmlFor='new-title'>New Title</label>
                                <input onChange={ this.updateTitle }
                                    id='new-title'
                                    type='text'
                                    value={ this.state.newTitle } />
                            </div>
                            <img src={this.state.newImage} alt="dummy" width="300" height="300" />
                            <input
                                type="file"
                                id="upload-button"
                                onChange={ this.replaceImage }
                                accept="image/*" />
                            <button onClick={ this.updateCategory }>Update Category</button>
                            <button onClick={ this.displayCategories }>Return to Categories</button>
                        </div>
                    :
                        <div style={{ height: '100%', width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                            {
                                this.props.categories.categories ?
                                    this.props.categories.categories.map((category, i) => {
                                        return <CategoryItem
                                                    editCategory={ this.editCategory }
                                                    key={i}
                                                    src={`data:image/png;base64,${category.image}`}
                                                    title={category.title} />
                                    })
                                :
                                    <></>
                            }
                        </div>
                }
            </>
        )
    }
}

export default connect(state => state, { editCategory })(DisplayEditCategory)