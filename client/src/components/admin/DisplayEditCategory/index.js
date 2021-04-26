import React from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../../redux/categories';

class DisplayEditCategory extends React.Component {
    constructor() {
        super()
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default connect(state => state, { getCategories })(DisplayEditCategory);
