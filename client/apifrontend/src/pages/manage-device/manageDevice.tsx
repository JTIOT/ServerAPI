import React,{useState, useEffect} from 'react';
import faker from 'faker';
import {Segment, Header, Input} from 'semantic-ui-react';
import {InputOnChangeData} from 'semantic-ui-react';
import DropdownList, {DropdownOption, DropdownMetadata} from '../../components/dropdownList/dropdownList';
import GroupList from '../../components/groupList/groupList';
import Datatable from '../../components/datatable/datatable';
import {Subject} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators'

import {
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

interface Records{ 
    headers:Array<string>,
    records:Array<Array<string>>
}
const getRecords = ()=>{

    let ret : Records = {
        headers:[
        'Comanpany',
        'Product Name',
        'Account Name',
        'Transaction Type',
        'Currency Name',
        'Product Material'
        ],
        records:[],
    }

    for(let i=0; i<1000; i++){
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
    searchFieldChangeHandler: any,
    searching:boolean
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
                    loading={searching}
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

const filterRecords = async (records:string[][], keyword:string)=>{
    if(!keyword) return  records;
    
    return records.filter(record=>{
        for(let i=0; i<record.length; i++){
            if(record[i].includes(keyword)) return true;
        }
        return false;
    })
    
}

const allRecords = getRecords();

const subject = new Subject<string>();

const ManageDeivce = ()=>{

    const [data, setData] = useState(initData);
    const [date, setDate] = useState('');
    const [searchField, setSearchField] = useState('');
    const [records, setRecrods] = useState<Records|null>(null);
    const [searching, setSearching] = useState(false);

    useEffect(()=>{
        if(!data.model || !data.type || !data.operator) return;

        const dateComp = date.split(' - ');
        if((dateComp.length !== 2 || !dateComp[1])) return;

        setSearching(true);
        //publish search keyword
        subject.next(searchField);

    },[searchField, date])

    useEffect(()=>{
        subject
        .pipe(
            debounceTime(1000),
            map(async (keyword)=>{
                const resData = await filterRecords(allRecords.records, keyword);
                let initRecords = getRecords();
                initRecords.records = resData;
                return initRecords;
            }),
        )
        .subscribe(async (newRecords)=>{
            const result = await newRecords
            setSearching(false);
            setRecrods(result);
        })
    }, [])

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
            setRecrods(null);
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
                        handleSearchFieldChanged,
                        searching
                    )
                }
             </div>
             <div className={classes.table}>
             {
                 renderRecords(records)
             }
             </div>
             
        </div>
    );
}

export default ManageDeivce;