import React from 'react';
import { connect } from 'react-redux';
import { postPost } from '../../../redux/posts';
import Preview from '../Preview';
import NewCode from './NewCode';
import NewImage from './NewImage';
import parse from 'html-react-parser';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as CodeStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactDOMServer from 'react-dom/server';
import "./index.css";

class DisplayCRUDForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdown: {
                display: false,
            },
            preview: {
                display: false,
            },
            displayAddOptions: false,
            blogItemForm: {
                display: false,
                blogItem: '',
            },
            categories: [],
            post: {
                isPublished: false,
                chosenCategory: '',
                title: '',
                subTitle: '',
                dateCreated: '',
                headerImage: {
                    raw: '',
                    preview: '',
                },
                content: [],
            },
        };
    };

    componentDidMount() {
        this.addCategoriesToState();
    }

    componentDidUpdate() {
        if (this.props.categories.categories !== undefined)
            if (this.state.categories.length === 0 && this.props.categories.categories.length !== 0)
                this.addCategoriesToState()
    }

    addCategoriesToState = async () => {
        const categories = await this.props.categories.categories;

        if (categories !== undefined) {
            this.setState(oldState => ({
                ...oldState,
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

    chooseCategory = title => {
        this.setState(oldState => ({
            ...oldState,
            dropdown: {
                display: !oldState.dropdown.display
            },
            post: {
                ...oldState.post,
                chosenCategory: title,
            }
        }));
    }

    handlePostTitle = e => {
        e.preventDefault();

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
            post: {
                ...oldState.post,
                subTitle: e.target.value,
            }
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
                    value: `<div class="post-paragraph-wrapper"><p class="post-paragraph">${document.getElementById('paragraph-data').value}</p></div>`,
                }) }>Submit
                </button>
            </>
        );
    }

    addImage = () => {
        return <NewImage addImageToState={this.addImageToState} />
    }

    addImageToState = (newImage) => {
        this.setState(oldState => ({
            ...oldState,
            blogItemForm: {
                ...oldState.blogItemForm,
                display: !oldState.blogItemForm.display
            },
            post: {
                ...oldState.post,
                content: [...oldState.post.content, newImage],
            }
        }));
    }

    addVideo = () => {
        const extractImageData = e => {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = () => {

                const newVideo = {
                    type: 'video',
                    value: `<div class="post-video-wrapper"><video class="post-video" autoPlay={true} loop={true} src=${reader.result} /></div>`,
                    getPreview: () => { return this.value }
                };

                this.setState(oldState => ({
                    ...oldState,
                    blogItemForm: {
                        ...oldState.blogItemForm,
                        display: !oldState.blogItemForm.display
                    },
                    post: {
                        ...oldState.post,
                        content: [...oldState.post.content, newVideo],
                    }
                }));
            }
        }

        return (
            <>
                <h2>Video</h2>
                <input id='video-data' type='file' accept='video/*' onChange={ extractImageData } />
            </>
        );
    }

    addCode = () => {
        return <><NewCode submitData={this.submitData} /></>
    }

    addSeperator = () => {

        const extractImageData = e => {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = () => {
                this.setState(oldState => ({
                    ...oldState,
                    blogItemForm: {
                        ...oldState.blogItemForm,
                        display: !oldState.blogItemForm.display
                    },
                    post: {
                        ...oldState.post,
                        content: [...oldState.post.content, {
                            type: 'seperator',
                            value:
                            `
                                <div class="post-seperator-wrapper">
                                    <img class="post-seperator" alt="seperator" src=${reader.result} />
                                </div>
                            `,
                        }],
                    }
                }));
            }
        }

        return (
            <>
            <h2>Seperator</h2>
            <input type='file' 
                   accept='image/*'
                   id='seperator-data'
                   onChange={ extractImageData } />
        </>
        );
    }

    addSectionTitle = () => {
        return (
            <>
                <h2>Section Title</h2>
                <input id='section-title-data' type='text' />
                <button onClick={ e => this.submitData(e, {
                    type: 'section title', 
                    value: `
                    <div class="post-section-title-wrapper">
                        <h3 class="post-section-title">${document.getElementById('section-title-data').value}</h3>
                    </div>
                    `,

                    }) }>Submit</button>
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

    moveItemUp = (e,i) => {
        e.preventDefault();

        let content = this.state.post.content;
        let movedItem = content.splice(i, 1);
        i === 0 ?
            content.push(movedItem[0])
        :
            content.splice(i - 1, 0, movedItem[0])
        
        this.setState(oldState => ({
            ...oldState,
            blogItemForm: {
                ...oldState.blogItemForm,
            },
            post: {
                ...oldState.post,
                content: content,
            }
        }))
    }

    removeItem = (e,i) => {
        e.preventDefault();

        let content = this.state.post.content;
        content.splice(i, 1);

        this.setState(oldState => ({
            ...oldState,
            blogItemForm: {
                ...oldState.blogItemForm,
            },
            post: {
                ...oldState.post,
                content: content,
            }
        }))
    }

    moveItemDown = (e,i) => {
        e.preventDefault();

        let content = this.state.post.content;
        let movedItem = content.splice(i, 1);

        i === content.length ?
            content.splice(0,0,movedItem[0])
        :
            content.splice(i + 1, 0, movedItem[0])

        this.setState(oldState => ({
            ...oldState,
            blogItemForm: {
                ...oldState.blogItemForm,
            },
            post: {
                ...oldState.post,
                content: content,
            }
        }))
    }

    displayContent = () => {
        return this.state.post.content.map((item, i) => {
            return (
                <div key={i} style={{ width: '100%', display: 'flex', height: 'auto', minHeight: '300px', alignItems: 'center' }}>
                    <div>
                        <h2>{ item.type }</h2>
                        { parse(item.value) }
                    </div>
                    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'  }}>
                        <button onClick={ e =>  this.moveItemUp(e, i) } style={{ width: '200px' }}>Move Up</button>
                        <button onClick={ e => this.removeItem(e, i) } style={{ width: '200px' }}>Remove</button>
                        <button onClick={ e =>  this.moveItemDown(e, i) } style={{ width: '200px' }}>Move Down</button>
                    </div>
                </div>
            );
        })
    }

    togglePreview = () => {

        this.setState(oldState => ({
            ...oldState,
            preview: {
                display: !oldState.preview.display,
            },
        }))
    }

    toggleAddComponent = () => {
        this.setState(oldState => ({
            ...oldState,
            displayAddOptions: !oldState.displayAddOptions
        }))
    }

    savePost = () => {
        this.props.postPost(this.state.post)
    }

    render() {
        return (
            <div id="new-post-wrapper">
                <div id="post-header-info-wrapper">
                    <div id="header-info-inputs-wrapper">
                        <input className="header-info-inputs" onChange={ this.handlePostTitle } type='text' placeholder="Title" />
                        <input className="header-info-inputs" onChange={ this.handlePostSubtitle } type='text' placeholder="SubTitle" />
                    </div>
                    <div id="header-image-wrapper">
                        <input onChange={ this.handleHeaderImage } type='file' accept='image/*' id="header-browse-button" />
                        <label htmlFor='header-browse-button'>
                            {
                                this.state.post.headerImage.preview ?
                                    <img style={{ width: '100%' }} src={this.state.post.headerImage.preview} alt="dummy" width="300" height="300" />
                                :
                                    <div style={{ width: '100%' }}></div>
                            }
                        </label>
                    </div>
                    <div id="category-dropdown-wrapper">
                        <button onClick={ this.displayDropdown } id="category-dropdown-button">{ this.state.post.chosenCategory ? this.state.post.chosenCategory : 'Pick Category'}</button>
                        {
                            this.state.dropdown.display && this.state.categories ?
                                this.state.categories.map((category, i) => {
                                    return (
                                        <button onClick={ () => this.chooseCategory(category.title) } key={i} className="category-dropdown-buttons">
                                            <img className="category-dropdown-images" alt={ category.title } src={ `data:image/png;base64,${ category.image }` } />
                                            <p>{ category.title }</p>
                                        </button>
                                    )
                                })
                            :
                                <></>
                        }
                    </div>
                </div>
                {
                    this.state.blogItemForm.display ?
                        <>
                            <div id='blog-item-form'>
                                {
                                    this.setFormItem()
                                }
                            </div>
                            <div onClick={ this.toggleFormDisplay } id='blog-item-form-bg'></div>
                        </>
                    :
                        <></>
                }
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    {
                        this.state.displayAddOptions ?
                            <>
                                <div onClick={ this.toggleAddComponent } id="add-options-overlay"></div>
                                <div id="add-options-wrapper">
                                    {
                                        ["Section Title", "Paragraph", "Image", "Code", "Video", "Seperator"].map((buttonName, i) => {
                                            return <button className="add-options-buttons" key={i} onClick={ this.displayBlogItemForm }>{ buttonName }</button>
                                        })
                                    }
                                </div>
                            </>
                        :
                            <></>
                    }
                </div>
                <div className='blog-container' style={{ width: '100%' }}>
                    {
                        this.displayContent()
                    }
                </div>
                <div id="post-options-wrap">
                    <div className="post-options-buttons" onClick={ this.toggleAddComponent }>Add</div>
                    <div className="post-options-buttons" onClick={ this.togglePreview }>Preview</div>
                    <div className="post-options-buttons" onClick={ this.savePost }>Save</div>
                    <div className="post-options-buttons" onClick={ this.publishPost }>Publish</div>
                </div>
                {
                    this.state.preview.display ?
                        <Preview togglePreview={ this.togglePreview }  post={ this.state.post } />
                    :
                        <></>
                }
            </div>
        )
    }
}

export default connect(state => state, { postPost })(DisplayCRUDForm)