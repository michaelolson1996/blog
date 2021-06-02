import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as CodeStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactDOMServer from 'react-dom/server';



class NewCode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            codeOptionsDisplay: {
                languages: false,
                styles: false,
            },
            newCode: {
                type: 'code',
                language: '',
                style: null,
                value: '',
                getPreview: () => { return <>{this.value}</> }
            }
        }
    }

    getStylesOptions = () => {
        return (
            <div id="code-style-wrapper">
                {
                    Object.entries(CodeStyles).map((item, i) => { 
                        return <button className="code-language-buttons" key={i} onClick={ () => { this.setNewCodeStyle(item[1]); this.toggleCodeStyles() } }>{ item[0] }</button>
                    })
                }
            </div>
        )
    }

    getLanguageOptions = () => {
        return (
            <div id="code-language-wrapper">
                {
                    SyntaxHighlighter.supportedLanguages.map((item, i) => {
                        return <button className="code-language-buttons" key={i} onClick={ () => { this.setNewCodeLanguage(item); this.toggleCodeLanguages();  } }>{ item }</button>
                    })
                }
            </div>
        )
    }

    setNewCodeLanguage = (language) => {
        this.setState(oldState => ({
            ...oldState,
            newCode: {
                ...oldState.newCode,
                language: language
            }
        }))
    }

    setNewCodeStyle = (style) => {
        this.setState(oldState => ({
            ...oldState,
            newCode: {
                ...oldState.newCode,
                style: style
            }
        }))
    }

    toggleCodeLanguages = () => {
        this.setState(oldState => ({
            ...oldState,
            codeOptionsDisplay: {
                languages: !oldState.codeOptionsDisplay.languages,
                styles: false,
            },
        }))
    }

    toggleCodeStyles = () => {
        this.setState(oldState => ({
            ...oldState,
            codeOptionsDisplay: {
                languages: false,
                styles: !oldState.codeOptionsDisplay.styles,
            },
        }))
    }

    render() {
        return (
            <>
                <h2>Code</h2>
                <div id="code-wrapper">
                    <button onClick={ this.toggleCodeLanguages } id="code-language-button" className="code-button">Language</button>
                    <button onClick={ this.toggleCodeStyles } id="code-style-button" className="code-button">Style</button>
                    {
                        this.state.codeOptionsDisplay.languages ?
                            this.getLanguageOptions()
                        :
                            this.state.codeOptionsDisplay.styles ?
                                this.getStylesOptions()
                            :
                                <div style={{ height:'500px',width:'100%' }}>
                                    <p>{this.state.newCode.language}</p>
                                </div>
                    }
                </div>
                <textarea id='code-data' cols='60' rows='7' />
                <button onClick={ (e) => {
                    this.state.newCode.value = ReactDOMServer.renderToString(
                        <SyntaxHighlighter language={this.state.newCode.language} style={this.state.newCode.style}>{document.getElementById('code-data').value}</SyntaxHighlighter>
                    );
                    this.props.submitData(e, this.state.newCode)
                } }>Submit</button>
            </>
        )
    }
}

export default NewCode;