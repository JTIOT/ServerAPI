import React, {useState} from 'react';
import faker from 'faker';
// import Dropdown from '../../components/dropdown/dropdown';
import {Dropdown, Segment, Header, Grid, Button} from 'semantic-ui-react';
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
            value:model
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
            key:i,
            text:company,
            value:company
        })
    }
    return companys;

}

const getDevices = () => {

    let items = [];
    for(let i=0; i<10; i++){
        const item = faker.company.companyName();
        items.push({
            key:i,
            text:item,
            value:item
        })
    }
    return items;

}



const DeviceDispatch = () => {

    const models = modelOptions();
    const [items, setItems] = useState(getDevices());
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedRecipient, setSelectedRecipient] = useState(null);

    const handleModelChange = (e, data) => {
        const selectModel =data.options.find(e=>e.value===data.value);
        setSelectedModel(selectModel);
    }

    const handleTypeChange = (e, data)=>{
        const selectType =data.options.find(e=>e.value===data.value);
        setSelectedType(selectType);
    }

    const handleCompanyChange = (e, data)=>{
        const selectCompany =data.options.find(e=>e.value===data.value);
        setSelectedCompany(selectCompany);
    }

    const handleRecipientChange = (e, data)=>{
        const selectRecipient =data.options.find(e=>e.value===data.value);
        setSelectedRecipient(selectRecipient);
    }

    const handleItemDelete = (dataKey, name) => {

        console.log('Delete item',items.splice(dataKey, 1));
        setItems([...items]);
    }

    const handleOutput = ()=>{
        console.log(selectedModel, selectedType, selectedCompany, selectedRecipient);
    }
    
    const renderItems = () => {
    
        return items.map((item, index)=>{
            return <Item 
            key={index} 
            dataKey={index} 
            name={item.text} 
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
                <Segment.Group 
                className={classes.selection}
                compact
                >
                    <Segment>
                        <Header 
                        icon='cog' 
                        color='purple'
                        content='Management' 
                        subheader='Manage your dispatch' 
                        />
                    </Segment>
                    <Segment
                        content={<Dropdown 
                        placeholder='Select Model'
                        selection
                        search
                        button
                        noResultsMessage='No model found'
                        options={models}
                        defaultValue={selectedModel?selectedModel.value:null}
                        text={selectedModel?selectedModel.text:null}
                        onChange={handleModelChange}
                        />}
                    />
                    <Segment
                        content={<Dropdown
                        placeholder='Select Type'
                        search
                        button
                        selection
                        noResultsMessage='No type found'
                        options={typeOptions()}
                        defaultValue={selectedType?selectedType.value:null}
                        text={selectedType?selectedType.text:null}
                        onChange={handleTypeChange}
                        />}
                    />
                    <Segment
                        content={<Dropdown
                        placeholder='Select Company ID'
                        search
                        button
                        selection
                        noResultsMessage='No company ID found'
                        options={companyOptions()}
                        defaultValue={selectedCompany?selectedCompany.value:null}
                        text={selectedCompany?selectedCompany.text:null}
                        onChange={handleCompanyChange}
                        />}
                    />
                    <Segment
                        content={<Dropdown
                        placeholder='Select Recipient ID'
                        search
                        button
                        selection
                        noResultsMessage='No recipient id found'
                        options={companyOptions()}
                        defaultValue={selectedRecipient?selectedRecipient.value:null}
                        text={selectedRecipient?selectedRecipient.text:null}
                        onChange={handleRecipientChange}
                        />}
                    />
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
                        color='purple'
                        content='Devices' 
                        subheader='Scanned devices'  
                        />
                    </Segment>
                    <Segment className={classes.itemGroup}>
                    {
                        renderItems()
                    }
                    </Segment>
                </Segment.Group>
            </div>    
            <Button content='Output' onClick={handleOutput} />        
        </div>
    );
}

export default DeviceDispatch;