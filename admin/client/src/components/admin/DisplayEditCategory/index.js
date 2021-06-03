import React from 'react';
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
            newImage: '',
            newImageTitle: ''
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
                newImage: reader.result,
                newImageTitle: e.target.files[0].name
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
            newImage: this.state.newImage,
            newImageTitle: this.state.newImageTitle
        });

        this.displayCategories();
    }

    render() {
        return (
            <>
                {
                    this.state.isEditing ?
                        <div id="edit-category-form">
                            <div id="edit-category-title-input-wrapper">
                                <input onChange={ this.updateTitle }
                                    id='edit-category-title-input'
                                    type='text'
                                    value={ this.state.newTitle } />
                            </div>
                            <img id="edit-category-image" src={this.state.newImage} alt="dummy" />
                            <input
                                type="file"
                                id="upload-button"
                                onChange={ this.replaceImage }
                                accept="image/*" />
                            <button className="edit-category-buttons" onClick={ this.updateCategory }>Update Category</button>
                            <button className="edit-category-buttons" onClick={ this.displayCategories }>Return to Categories</button>
                        </div>
                    :
                        <div style={{ height: '100%', width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                            {
                                this.props.categories.categories ?
                                    this.props.categories.categories.map((category, i) => {
                                        return <CategoryItem
                                                    type={"edit_category"}
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