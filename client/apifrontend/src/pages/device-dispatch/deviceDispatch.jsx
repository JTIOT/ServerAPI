import React, {useState} from 'react';
import faker from 'faker';
import {Segment, Header, Button} from 'semantic-ui-react';
import Item from '../../components/Item/Item';
import DropdownList from '../../components/dropdownList/dropdownList';
import GroupList from '../../components/groupList/groupList';

import classes from './deviceDispatch.module.scss';

const modelOptions = () => {
    let models = [];
    for(let i=1; i<8; i++){
        const model = faker.commerce.productName();
        models.push({
            key:i,
            text:model,
            value:model,
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
            // category:'recipient'
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

//selected data from dropdown
const initData = {
    model:null,
    type:null,
    company:null,
    recipient:null
}

//data for each dropdown
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

    const handleValueChange = (category, value, dropdownOptions) => {
        const selectedData = dropdownOptions.find(e=>e.value===value);
        setData({...data, [category]:selectedData})
    }

    const handleOutput = ()=>{
        console.log(data, items);
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
                <GroupList
                className={classes.selection}
                header='Management'
                subheader='Manage your delivery'
                headerIcon='cog'
                headerAlign='left'
                >
                    <DropdownList 
                    dropdownData={dropdownData}
                    onShowText={category=>data[category]?data[category].text:null}
                    onShowError={category=>data[category]?false:true}
                    onValueChange={handleValueChange}
                    />
                </GroupList>
                {
                    //scanned device list
                }
                <GroupList
                className={classes.deviceList}
                header='Devices'
                subheader='Scanned devices'
                headerIcon='tablet'
                headerAlign='left'
                headerColor='purple'
                >
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
                </GroupList>
            </div>    
            <Button primary content='Output' onClick={handleOutput} />        
        </div>
    );
}

export default DeviceDispatch;