import React from 'react';
import { getCategories } from '../redux/categories';
import { connect } from 'react-redux';
import Category from '../components/Category';
import "./styles/categories.css";

class Categories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        this.props.getCategories();
    }

    componentDidUpdate() {
        if (this.props.categories.categories && this.props.categories.categories.length !== this.state.categories.length)
            this.setState({ categories: [...this.props.categories.categories] })
    }

    render() {
        return (
            <div id="category-graph-wrapper">
                {
                    this.state.categories.length > 0 ?
                        this.state.categories.map((category, i) => {
                            return <Category key={i} category={category} />
                        })
                    :
                        <></>
                }
            </div>
        )
    }
}

export default connect(state => state, { getCategories })(Categories);