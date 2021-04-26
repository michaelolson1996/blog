import React, { useState } from 'react';
import EditButtons from '../components/admin/EditButtons';
import DisplayCRUDItems from '../components/admin/DisplayCRUDItems';
import DisplayCRUDForm from '../components/admin/DisplayCRUDForm';
import DisplayCreateCategory from '../components/admin/DisplayCreateCategory';
import DisplayEditCategory from '../components/admin/DisplayEditCategory';


export default function Admin() {

    const [ operation, setOperation ] = new useState(null);

    const displayForms = () => {
        switch (operation) {
            case 'new_post': {
                return <DisplayCRUDForm />
            }
            case 'new_category': {
                return <DisplayCreateCategory />
            }
            case 'edit_category': {
                return <DisplayEditCategory />
            }
            default: {
                return;
            }
        }
    }

    return (
        <div style={{ display: 'flex', width: '100vw' }}>
            { console.log(operation) }
            <EditButtons setOperation={ setOperation } />
            <DisplayCRUDItems>
                { displayForms() }
            </DisplayCRUDItems>
        </div>
    )
}
