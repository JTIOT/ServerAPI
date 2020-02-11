import React, {useState} from 'react';
import faker from 'faker';
// import Dropdown from '../../components/dropdown/dropdown';
import {Dropdown, Segment, Header} from 'semantic-ui-react';
// import InputField from '../../components/inputField/inputField';
import Item from '../../components/Item/Item';

import classes from './deviceDispatch.module.scss';

const modelOptions = () => {
    let models = [];
    for(let i=0; i<4; i++){
        const model = faker.commerce.productName();
        models.push({
            text:model,
            value:model
        })
    }
    return models;
}

const typeOptions = () => {

    let types = [];
    for(let i=0; i<4; i++){
        const type = faker.commerce.productMaterial();
        types.push({
            text:type,
            value:type
        })
    }
    return types;
}

const companyOptions = () => {

    let companys = [];
    for(let i=0; i<4; i++){
        const company = faker.company.companyName();
        companys.push({
            text:company,
            value:company
        })
    }
    return companys;

}

const getItems = () => {

    let items = [];
    for(let i=0; i<4; i++){
        const item = faker.company.companyName();
        items.push({
            text:item,
            value:item
        })
    }
    return items;

}

const DeviceDispatch = () => {

    // const [items, setItems] = useState(getItems());

    // const handleItemDelete = (index, name) => {

    //     console.log('delete item at ', index, name);
    // }

    // const renderItems = () => {

    //     return items.map((item, index)=>{
    //         return <Item key={index} name={item.text} onDelete={handleItemDelete} />
    //     });
    // }

    return (
        <Segment.Group
        className={classes.margin}
         compact 
         raised>
            <Segment>
                <Header 
                icon='exchange' 
                color='purple'
                content='Dispatch System' 
                subheader='Manage your dispatch' 
                />
            </Segment>
            <Segment>
                <Dropdown 
                placeholder='Select Model'
                selection
                search
                button
                noResultsMessage='No model found'
                options={modelOptions()}
                onChange={(e, {value})=>console.log('selected model ', value)}
                />
            </Segment>
            <Segment>
                <Dropdown
                placeholder='Select Type'
                search
                button
                selection
                noResultsMessage='No type found'
                options={typeOptions()}
                onChange={(e, {value})=>console.log('selected type ', value)}
                />
            </Segment>
            <Segment>
                <Dropdown
                placeholder='Select Company ID'
                search
                button
                selection
                noResultsMessage='No company ID found'
                options={companyOptions()}
                onChange={(e, {value})=>console.log('selected company id ', value)}
                />
            </Segment>
            <Segment>
                <Dropdown
                placeholder='Select Recipient ID'
                search
                button
                selection
                noResultsMessage='No recipient id found'
                options={companyOptions()}
                onChange={(e, {value})=>console.log('selected recipient id ', value)}
                />
            </Segment>
            {
                //Device scanned section
            }
            <Segment>
                <Header
                color='purple'
                content='Devices' 
                subheader='Scanned devices'  
                />
            </Segment>
            <Segment.Group>
                
            </Segment.Group>
        </Segment.Group>
    );
}

export default DeviceDispatch;