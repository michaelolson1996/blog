import React from 'react';
import { connect } from 'react-redux';

class DisplayCRUDForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdown: {
                display: false
            },
            blogItemForm: {
                display: false,
                blogItem: ''
            },
            categories: [],
            chosenCategory: '',
            post: {
                title: '',
                subTitle: '',
                dateCreated: '',
                headerImage: {
                    raw: '',
                    preview: ''
                },
                content: []
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

        this.setState(oldState => ({
            post: {
                ...oldState.post,
                title: e.target.value,
            }
        }))
    }

    handlePostSubtitle = e => {
        e.preventDefault()

        this.setState(oldState => ({
            ...oldState.post,
            subTitle: e.target.value,
        }))
    }

    handleHeaderImage = e => {
        let reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            this.setState(oldState => ({
                post: {
                    ...oldState.post,
                    headerImage: {
                        raw: reader.result,
                        preview: URL.createObjectURL(e.target.files[0])
                    }
                }
            }))
        }
    }

    submitData = (e, data) => {
        e.preventDefault()

        this.setState(oldState => ({
            ...oldState,
            blogItemForm: {
                ...oldState.blogItemForm,
                display: !oldState.blogItemForm.display
            },
            post: {
                ...oldState.post,
                content: [...oldState.post.content, data],
            }
        }));
    }

    addParagraph = () => {
        return (
            <>
                <h2>Paragraph</h2>
                <textarea id='paragraph-data' cols='60' rows='7' />
                <button onClick={ (e) => this.submitData(e, {
                    type: 'paragraph', 
                    value: document.getElementById('paragraph-data').value,
                    getValue: function() {
                        return (
                            <div>

                            </div>
                        );
                    }
                    }) }>Submit
                </button>
            </>
        );
    }

    addImage = () => {
        return (
            <>
                <h2>Image</h2>

            </>
        );
    }

    addCode = () => {
        return (
            <>
                <h2>Code</h2>
                <textarea id='code-data' cols='60' rows='7' />
                <button onClick={ (e) => this.submitData(e, {type: 'code', value: document.getElementById('code-data').value}) }>Submit</button>
            </>
        );
    }

    addVideo = () => {
        return (
            <>
                <h2>Video</h2>
            </>
        );
    }

    addSeperator = () => {
        return (
            <>
                <h2>Seperator</h2>
            </>
        );
    }

    addSectionTitle = () => {
        return (
            <>
                <h2>Section Title</h2>
                <input id='section-title-data' type='text' />
                <button onClick={ (e) => this.submitData(e, {type: 'section title', value: document.getElementById('section-title-data').value}) }>Submit</button>
            </>
        );
    }

    toggleFormDisplay = e => {
        e.preventDefault();

        this.setState(oldState => ({
            blogItemForm: {
                display: !oldState.blogItemForm.display
            }
        }))
    }

    setFormItem = () => {
        let formData;
        switch (this.state.blogItemForm.blogItem) {
            case 'Paragraph': {
                formData = this.addParagraph();
                break;
            }
            case 'Image': {
                formData = this.addImage();
                break;
            }
            case 'Code': {
                formData = this.addCode();
                break;
            }
            case 'Video': {
                formData = this.addVideo();
                break;
            }
            case 'Seperator': {
                formData = this.addSeperator();
                break;
            }
            case 'Section Title': {
                formData = this.addSectionTitle();
                break;
            }
            default: {
                break;
            }
        }

        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                { formData }
            </div>
        )
    }

    displayBlogItemForm = e => {
        e.preventDefault();

        this.setState(oldState => ({
            blogItemForm: {
                display: !oldState.blogItemForm.display,
                blogItem: e.target.textContent
            }
        }))
    }

    displayContent = () => {
        this.state.post.content.forEach(item => {

        })
    }

    render() {
        return (
            <form style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-around', height: '150px' }}>
                        <label>
                            Post Title
                            <input style={{ height: '40px', marginLeft: '20px' }} onChange={ this.handlePostTitle } type='text' placeholder='title' />
                        </label>
                        <label>
                            Post SubTitle
                            <input style={{ height: '40px', marginLeft: '20px' }} onChange={ this.handlePostSubtitle } type='text' placeholder='subtitle' />
                        </label>
                    </div>

                    <div style={{ height: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <button onClick={ this.displayDropdown } style={{ height: '40px', width: '280px' }}>{ this.state.chosenCategory ? this.state.chosenCategory : 'Pick Category'}</button>
                        {
                            (this.state.dropdown.display && this.state.categories) ?
                                this.state.categories.map((category, i) => {
                                    return (
                                        <button onClick={ () => this.chooseCategory(category.title) } key={i} style={{ display: 'flex', alignItems: 'center', height: '40px', width: '280px', position: 'relative' }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px 0 30px 0' }}>
                    <label htmlFor='header-image'>
                        {
                            this.state.post.headerImage.preview ?
                                <img style={{ minHeight: '400px', width: '90%' }} src={this.state.post.headerImage.preview} alt="dummy" width="300" height="300" />
                            :
                                <div style={{ minHeight: '400px', width: '90%' }}></div>
                        }
                    </label>
                    <input onChange={ this.handleHeaderImage } type='file' id='header-image' accept='image/*' style={{ marginTop: '30px' }} />
                </div>
                {
                    this.state.blogItemForm.display ?
                        <>
                            <div id='blog-item-form' style={{ height: '90vh', width: '90vw', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', backgroundColor: 'white', border: '1px solid black', zIndex: 4 }}>
                                {
                                    this.setFormItem()
                                }
                            </div>
                            <div onClick={ this.toggleFormDisplay } id='blog-item-form-bg' style={{ height: '100vh', width: '100vw', position: 'absolute', top: '0', left: '0', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 3 }}></div>
                        </>
                    :
                        <></>
                }

                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    {
                        ["Paragraph", "Image", "Code", "Video", "Seperator", "Section Title"].map((buttonName, i) => {
                            return <button key={i} onClick={ this.displayBlogItemForm }>{ buttonName }</button>
                        })
                    }
                </div>
                <div className='blog-container' style={{ width: '100%', height: 'auto' }}>
                    {
                        this.displayContent()
                    }
                </div>
            </form>
        )
    }
}

export default connect(state => state, {  })(DisplayCRUDForm)
