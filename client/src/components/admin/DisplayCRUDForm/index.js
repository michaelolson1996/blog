import React, { useState } from 'react';
import { connect } from 'react-redux';

class DisplayCRUDForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdown: {
                display: false
            },
            categories: [],
            chosenCategory: '',
            post: {
                title: '',
                headerImage: {
                    raw: '',
                    preview: ''
                }
            }
        }
    }

    componentDidMount() {
        this.addCategoriesToState()
    }

    addCategoriesToState = async () => {

        const categories = await this.props.categories.categories;

        if (categories !== undefined) {
            this.setState(({
                categories: [...categories],
            }));
        }
    }

    
    displayDropdown = e => {
        e.preventDefault();

        this.setState(oldState => ({
            dropdown: {
                display: !oldState.dropdown.display
            }
        }));
    }

    chooseCategory = (title) => {
        this.setState(oldState => ({
            dropdown: {
                display: !oldState.dropdown.display
            },
            chosenCategory: title,
        }));
    }

    handlePostTitle = e => {
        e.preventDefault()

        this.setState({
            post: {
                title: e.target.value
            }
        })
    }

    render() {
        return (
            <form style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
                    <label>
                        Post Title
                        <input style={{ height: '40px', marginLeft: '20px' }} onChange={ this.handlePostTitle } type='text' placeholder='title' />
                    </label>
                    <div style={{ height: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <button onClick={ this.displayDropdown } style={{ height: '40px', width: '280px' }}>{ this.state.chosenCategory ? this.state.chosenCategory : 'Pick Category'}</button>
                        {
                            (this.state.dropdown.display && this.state.categories) ?
                                this.state.categories.map((category, i) => {
                                    return (
                                        <button onClick={ () => this.chooseCategory(category.title) } key={i} style={{ display: 'flex', alignItems: 'center', height: '40px', width: '280px' }}>
                                            <img style={{ height: '30px', width: '30px', marginRight: '30px' }} alt={ category.title } src={ `data:image/png;base64,${ category.image }` } />
                                            <p>{ category.title }</p>
                                        </button>
                                    )
                                })
                            :
                                <></>
                        }
                    </div>
                </div>
                <div>
                    <label htmlFor='header-image'>

                    </label>
                    <input type='file' id='header-image' accept='image/*'>Upload Header Image</input>
                </div>
                {
                    console.log(this.state)
                }
            </form>
        )
    }
}

export default connect(state => state, {  })(DisplayCRUDForm)
