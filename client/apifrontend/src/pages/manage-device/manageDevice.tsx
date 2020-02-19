import React,{useState} from 'react';
import faker from 'faker';
import {Segment, Header, Button, Popup, Input} from 'semantic-ui-react';
import {InputOnChangeData} from 'semantic-ui-react';
import DropdownList, {DropdownOption, DropdownMetadata} from '../../components/dropdownList/dropdownList';
import GroupList from '../../components/groupList/groupList';

import {
    DateInput
  } from 'semantic-ui-calendar-react';

import classes from './manageDevice.module.scss';

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

const operatorOptions = () => {

    let operators = [];
    for(let i=0; i<8; i++){
        const operator = faker.name.findName();
        operators.push({
            key:i,
            text:operator,
            value:operator,
        })
    }
    return operators;
}

//initial data for user selected data
const initData:{[key:string]:any|null} = {
    model:null,
    type:null,
    operator:null
}

//data for each dropdown
const dropdownData:DropdownMetadata[] = [
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
        category:'operator',
        placeholder:'Select Operator',
        noResultsMessage:'No operator found',
        options:operatorOptions(),
    }
]

const ManageDeivce = ()=>{

    const [data, setData] = useState(initData);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchField, setSearchField] = useState('');

    const handleValueChange = (category:string, value:any, dropdownOptions:DropdownOption[])=>{
        const selectedData = dropdownOptions.find((e:DropdownOption)=>e.value===value);
        setData({...data, [category]:selectedData})
    }

    const handleShowText = (category:string)=>{
        return data[category]?data[category].text:undefined
    }

    const handleShowError = (category:string)=>{
        return data[category]?false:true
    }

    const handleStartDateChanged = (
        _e:React.SyntheticEvent<HTMLElement, Event>,
         data:any)=>{
            console.log(data.value);
            setStartDate(data.value);
    }

    const handleEndDateChanged = (
        _e:React.SyntheticEvent<HTMLElement, Event>,
         data:any
         )=>{
            console.log(data.value);
            setEndDate(data.value);
    }

    const handleSearchFieldChanged = (
        _e:React.ChangeEvent<HTMLInputElement>,
         data:InputOnChangeData
        )=>{
            console.log(data.value);
            setSearchField(data.value);
    }

    return (
        <div className={classes.overlay}>
            <Header 
            icon='tv' 
            color='purple'
            content='Device management' 
            subheader='Manage all devices' 
            size='large'
            />
             <div className={classes.content}>
                {
                    //dropdown menu
                }
                <GroupList
                className={classes.selection}
                header='Management'
                subheader='Select'
                headerIcon='cog'
                headerAlign='left'
                >
                    <DropdownList 
                    dropdownData={dropdownData}
                    onShowText={handleShowText}
                    onShowError={handleShowError}
                    onValueChange={handleValueChange}
                    />
                </GroupList>
                {
                (!data.model || !data.type || !data.operator)?
                null
                :
                <GroupList
                className={classes.query}
                header='Query'
                subheader='Query'
                headerIcon='cog'
                headerAlign='left'
                >
                    <Segment>
                        <Header content='Start date' textAlign='left' />
                        <DateInput
                        name="dateTime"
                        placeholder="Pick Start Date"
                        value={startDate}
                        iconPosition="left"
                        onChange={handleStartDateChanged}
                        closeOnMouseLeave={true}
                        closable
                        animation={'none' as any}
                        hideMobileKeyboard
                        />
                    </Segment>
                    <Segment>
                        <Header content='End date' textAlign='left' />
                        <DateInput
                        name="dateTime"
                        placeholder="Pick End Date"
                        value={endDate}
                        iconPosition="left"
                        onChange={handleEndDateChanged}
                        closeOnMouseLeave={true}
                        closable
                        animation={'none' as any}
                        hideMobileKeyboard
                        />
                    </Segment>
                    <Segment>
                        <Header content='Search' textAlign='left' />
                        <Input 
                        icon='search'
                        placeholder='Search...'
                        onChange={handleSearchFieldChanged} 
                        />
                    </Segment>
                </GroupList>
                }
             </div>
        </div>
    );
}

export default ManageDeivce;