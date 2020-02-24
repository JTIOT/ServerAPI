import React,{useState} from 'react';
import faker from 'faker';
import {Segment, Header, Button, Popup, Input} from 'semantic-ui-react';
import {InputOnChangeData} from 'semantic-ui-react';
import DropdownList, {DropdownOption, DropdownMetadata} from '../../components/dropdownList/dropdownList';
import GroupList from '../../components/groupList/groupList';
import Datatable from '../../components/datatable/datatable';

import {
    DateInput,
    DatesRangeInput
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

const getRecords = ()=>{

    let ret : {
        headers:Array<string>,
        records:Array<Array<string>>
    } = {
        headers:[
        'Comanpany',
        'Product Name',
        'Account Name',
        'Transaction Type',
        'Currency Name',
        'Product Material'
        ],
        records:[]
    }

    console.log(faker);
    for(let i=0; i<100; i++){
        const record = [
            faker.company.companyName(),
            faker.commerce.productName(),
            faker.finance.accountName(),
            faker.finance.transactionType(),
            faker.finance.currencyName(),
            faker.commerce.productMaterial()
        ]
        ret.records.push(record);
    }

    return ret;
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

const renderDropdownList = (
    dropdownData: DropdownMetadata[], 
    showTextHandler: any, 
    showErrorHandler: any, 
    valueChangeHandler: any
    )=>{

        return(
            <GroupList
            className={classes.selection}
            header='Management'
            subheader='Select'
            headerIcon='cog'
            headerAlign='left'
            >
                <DropdownList 
                dropdownData={dropdownData}
                onShowText={showTextHandler}
                onShowError={showErrorHandler}
                onValueChange={valueChangeHandler}
                />
            </GroupList>
        );
}

const renderQuery = (
    date: string,
    dateChangeHandler: any,
    searchFieldChangeHandler: any
    )=>{
        return(
            <GroupList
            className={classes.query}
            header='Query'
            subheader='Query'
            headerIcon='cog'
            headerAlign='left'
            >
                <Segment>
                    <Header content='Date Range' textAlign='left' />
                    <DatesRangeInput
                    name="dateTime"
                    placeholder="Pick End Date"
                    value={date}
                    iconPosition="left"
                    onChange={dateChangeHandler}
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
                    onChange={searchFieldChangeHandler} 
                    />
                </Segment>
            </GroupList>
            )
}

const renderRecords = (records:any)=>{
    if(!records) return null;

    return <Datatable headers={records.headers} records={records.records} />;
}

const ManageDeivce = ()=>{

    const [data, setData] = useState(initData);
    const [date, setDate] = useState('');
    const [searchField, setSearchField] = useState('');
    const [records, setRecrods] = useState(getRecords());

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

    const handleDateChanged = (
        _e:React.SyntheticEvent<HTMLElement, Event>,
         data:any)=>{
            console.log(data.value);
            setDate(data.value);
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
                    renderDropdownList(
                        dropdownData,
                        handleShowText,
                        handleShowError,
                        handleValueChange
                    )
                }
            
                {
                    //query menu
                    (!data.model || !data.type || !data.operator)?
                    null
                    :
                    renderQuery(
                        date,
                        handleDateChanged,
                        handleSearchFieldChanged
                    )
                }
             </div>
             <div className={classes.table}>
             {
                 (!data.model || !data.type || !data.operator) || !date?
                 null
                 :
                 renderRecords(records)
             }
             </div>
             {/*
                (!date)?
                null
                :
                <Button 
                primary 
                content='Search' 
                />
                */
            }
        </div>
    );
}

export default ManageDeivce;