import React from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../redux/categories';
import EditButtons from '../components/admin/EditButtons';
import DisplayCRUDItems from '../components/admin/DisplayCRUDItems';
import DisplayCRUDForm from '../components/admin/DisplayCRUDForm';
import DisplayCreateCategory from '../components/admin/DisplayCreateCategory';
import DisplayEditCategory from '../components/admin/DisplayEditCategory';
import DisplayEditPost from '../components/admin/DisplayEditPost';


class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            operation: ''
        }
    }

    componentDidMount() {
        this.props.getCategories();
    }

    displayForms = () => {
        switch (this.state.operation) {
            case 'new_post':
                return <DisplayCRUDForm categories={ this.props.categories.categories } />
            case 'edit_post':
                return <DisplayEditPost categories={ this.props.categories.categories } />
            case 'new_category':
                return <DisplayCreateCategory categories={ this.props.categories.categories } />
            case 'edit_category':
                return <DisplayEditCategory categories={ this.props.categories.categories } />
            default:
                return;
        }
    }

    setOperation = (operation) => {
        this.setState({
            operation: operation
        })
    }

    render() {
        return (
            <div style={{ display: 'flex', width: '100vw' }}>
                <EditButtons setOperation={ this.setOperation } />
                <DisplayCRUDItems>
                    { this.displayForms() }
                </DisplayCRUDItems>
            </div>
        )
    }
}

export default connect(state => state, { getCategories })(Admin)
