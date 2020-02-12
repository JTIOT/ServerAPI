import React, {useState} from 'react';
import faker from 'faker';
// import Dropdown from '../../components/dropdown/dropdown';
import {Dropdown, Segment, Header, Button} from 'semantic-ui-react';
// import InputField from '../../components/inputField/inputField';
import Item from '../../components/Item/Item';

import classes from './deviceDispatch.module.scss';

const modelOptions = () => {
    let models = [];
    for(let i=1; i<8; i++){
        const model = faker.commerce.productName();
        models.push({
            key:i,
            text:model,
            value:model,
            category:'model'
        })
    }
    return models;
}

const typeOptions = () => {

    let types = [];
    for(let i=0; i<8; i++){
        const type = faker.commerce.productMaterial();
        types.push({
            key:i,
            text:type,
            value:type,
            category:'type'
        })
    }
    return types;
}

const companyOptions = () => {

    let companys = [];
    for(let i=0; i<7; i++){
        const company = faker.company.companyName();
        companys.push({
            key:i,
            text:company,
            value:company,
            category:'company'
        })
    }
    return companys;

}

const recipientOptions = () => {

    let recipients = [];
    for(let i=0; i<5; i++){
        const recipient = faker.company.companyName();
        recipients.push({
            key:i,
            text:recipient,
            value:recipient,
            category:'recipient'
        })
    }
    return recipients;

}

const getDevices = () => {

    let items = [];
    for(let i=0; i<4; i++){
        const item = faker.finance.mask(10);
        items.push({
            key:i,
            text:item,
            value:item
        })
    }
    return items;

}

const initData = {
    model:null,
    type:null,
    company:null,
    recipient:null
}

const dropdownData = [
    {
        category:'model',
        placeholder:'Select Model',
        noResultsMessage:'No model found',
        options:modelOptions(),
    },
    {
        category:'type',
        placeholder:'Select Type',
        noResultsMessage:'No type found',
        options:typeOptions(),
    },
    {
        category:'company',
        placeholder:'Select Company',
        noResultsMessage:'No company found',
        options:companyOptions(),
    },
    {
        category:'recipient',
        placeholder:'Select Recipient',
        noResultsMessage:'No recipient found',
        options:recipientOptions(),
    }
]

const DeviceDispatch = () => {

    const [items, setItems] = useState(getDevices());
    const [data, setData] = useState(initData);

    const handleDataChange = (e, prop) => {
        const selectedData = prop.options.find(e=>e.value===prop.value);
        setData({...data, [selectedData.category]:selectedData})
    }

    const handleOutput = ()=>{
        console.log(data);
    }
    
    const handleItemDelete = (dataIndex) => {

        console.log('Delete item',items.splice(dataIndex, 1));
        setItems([...items]);
    }

    const renderItems = () => {
    
        return items.map((item, index)=>{
            return <Item 
            key={index} 
            dataIndex={index} 
            title={item.text} 
            onDelete={handleItemDelete} 
            />
        });
    }

    const renderDropdownlist = () => {

        return dropdownData.map((element, index)=>{
            return <Segment
                    key={index}
                    content={<Dropdown 
                    placeholder={element.placeholder}
                    selection
                    search
                    button
                    noResultsMessage={element.noResultsMessage}
                    options={element.options}
                    value={data[element.category]?data[element.category].value:initData[element.category]}
                    text={data[element.category]?data[element.category].text:null}
                    onChange={handleDataChange}
                    error={data[element.category]?false:true}
                    />}
                />
        })
    }

    return (
        <div className={classes.overlay}>
            <Header 
            icon='exchange' 
            color='purple'
            content='Dispatch management' 
            subheader='Manage your dispatch' 
            size='large'
            />
            <div className={classes.content}>
                {
                    //dropdown menu
                }
                <Segment.Group 
                className={classes.selection}
                compact
                >
                    <Segment>
                        <Header 
                        icon='cog' 
                        color='purple'
                        content='Management' 
                        subheader='Manage your delivery' 
                        />
                    </Segment>
                    {   
                        renderDropdownlist()
                    }
                </Segment.Group>
                {
                    //scanned device list
                }
                <Segment.Group 
                className={classes.deviceList}
                compact
                >
                    <Segment>
                        <Header
                        icon='tablet'
                        color='purple'
                        content='Devices' 
                        subheader='Scanned devices'  
                        />
                    </Segment>
                    {
                    items!==null && items.length>0?
                    <Segment className={classes.itemGroup}>
                    {
                        renderItems()
                    }
                    </Segment>
                    :
                    <Segment placeholder>
                        <Header color='red' content='There is no device. Scan your deivce to start' />
                    </Segment>
                    }
                </Segment.Group>
            </div>    
            <Button primary content='Output' onClick={handleOutput} />        
        </div>
    );
}

export default DeviceDispatch;