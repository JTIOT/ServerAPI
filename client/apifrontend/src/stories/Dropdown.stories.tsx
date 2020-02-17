import React,{useState} from 'react';
import {action} from '@storybook/addon-actions';
import {Dropdown, Button, Segment} from 'semantic-ui-react';
import faker from 'faker';
import DropdownList,{DropdownOption} from'../components/dropdownList/dropdownList';
import GroupList from '../components/groupList/groupList';


export default{
    title:'Dropdown',
    component:Dropdown
}

const itemOptions = [
    {
        text:'Item 1',
        value:'Item1'
    },
    {
        text:'Item 2',
        value:'Item2'
    },
    {
        text:'Item 3',
        value:'Item3'
    },
    {
        text:'Item 4',
        value:'Item4'
    },
    {
        text:'Item 5',
        value:'Item5'
    },
]

export const SearchDropdown = () => {

    return (
        <Dropdown
        placeholder='Choose item'
        search
        options={itemOptions}
        onChange={action('on value changed')}
         />
    );
}

const modelOptions = () => {
    let models = [];
    for(let i=1; i<8; i++){
        const model = faker.commerce.productName();
        models.push({
            key:i,
            text:model,
            value:model,
            // category:'model'
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
            // category:'type'
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
            // category:'company'
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

interface SelectedData{
    [key:string]:any|null
}
const initData:SelectedData = {
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

export const SemanticDropdown = () => {

    const [data, setData] = useState(initData);

    const handleValueChange = (category:any, value:any, dropdownOptions:DropdownOption[]) => {
        const selectedData = dropdownOptions.find(e=>e.value===value);
        setData({...data, [category]:selectedData})
    }

    return (
        <div>
            <GroupList
            header='Header'
            subheader='sub header'
            headerIcon='cog'
            headerAlign='left'>
                <DropdownList 
                dropdownData={dropdownData}
                onShowText={category=>data[category]?data[category].text:null}
                onShowError={category=>data[category]?false:true}
                onValueChange={handleValueChange}
                />
                <Segment>
                    <Button content='output' onClick={()=>console.log(data)} />
                </Segment>
            </GroupList>
        </div>
    );
}