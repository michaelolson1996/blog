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
            operation: '',
            displayOptions: false
        }
    }

    componentDidMount() {
        this.props.getCategories();
    }

    displayForms = () => {
        switch (this.state.operation) {
            case 'new_post':
                return <DisplayCRUDForm categories={ this.props.categories.categories } />;
            case 'edit_post':
                return <DisplayEditPost categories={ this.props.categories.categories } />;
            case 'new_category':
                return <DisplayCreateCategory categories={ this.props.categories.categories } />;
            case 'edit_category':
                return <DisplayEditCategory categories={ this.props.categories.categories } />;
            default:
                return <DisplayCRUDForm categories={ this.props.categories.categories } />;
        }
    }

    setOperation = (operation) => {
        this.setState(oldState => ({
            operation: operation,
            displayOptions: !oldState.displayOptions
        }))
    }

    toggleDisplayOptions = () => {
        this.setState(oldState => ({
            operation: oldState.operation,
            displayOptions: !oldState.displayOptions
        }))
    }

    render() {
        return (
            <>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '80px', width: '400px' }} onClick={ () => { this.toggleDisplayOptions() } }></div>
                {
                    this.state.displayOptions ?
                        <EditButtons toggleDisplayOptions={this.toggleDisplayOptions} setOperation={ this.setOperation } />
                    :
                        <></>
                }

                <DisplayCRUDItems>
                    { this.displayForms() }
                </DisplayCRUDItems>
            </>
        )
    }
}

export default connect(state => state, { getCategories })(Admin)
