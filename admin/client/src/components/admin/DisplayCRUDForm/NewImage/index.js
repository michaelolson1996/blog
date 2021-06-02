import React from 'react';

class NewImage extends React.Component {
    constructor(props) {
        super(props)
    }

    extractImageData = e => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            const newImage = {
                type: 'image',
                value: `<div class="post-image-wrapper"><img class="post-image" alt="blog-post-img" src=${reader.result} /></div>`,
                getPreview: () => { return this.value }
            };

            this.props.addImageToState(newImage);
        }
    }

    render() {
        return (
            <>
                <h2>Image</h2>
                <input type='file' 
                    accept='image/*'
                    id='image-data'
                    onChange={ this.extractImageData } />
            </>
        )
    }
}

export default NewImage;