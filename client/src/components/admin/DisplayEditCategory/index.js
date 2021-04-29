import React, { useState } from 'react';
import CategoryItem from '../CategoryItem';
import { connect } from 'react-redux';

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
                                    name='new-title'
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
                                this.props.categories.categories.map((category, i) => {
                                    return <CategoryItem
                                                editCategory={ this.editCategory }
                                                key={i}
                                                src={`data:image/png;base64,${category.image}`}
                                                title={category.title} />
                                })
                            }
                        </div>
                }
            </>
        )
    }
}

export default connect(state => state, {  })(DisplayEditCategory)
