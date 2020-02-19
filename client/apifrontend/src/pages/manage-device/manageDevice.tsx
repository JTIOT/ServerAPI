import React,{useState} from 'react';
import faker from 'faker';
import {Segment, Header, Button, Popup} from 'semantic-ui-react';
import DropdownList, {DropdownOption, DropdownMetadata} from '../../components/dropdownList/dropdownList';
import GroupList from '../../components/groupList/groupList';
import { useSpring, animated } from 'react-spring'

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

interface UesrSelectedData{
    [key:string]: any|null,
}
//initial data for user selected data
const initData:UesrSelectedData = {
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

    const [data, setData] = useState<UesrSelectedData>(initData);
    const [toggle, setToggle] = useState<boolean>(false);
    const {x} = useSpring({ 
        from:{x:0}, 
        to:{x:toggle?1:0}, 
        reset:true,
        onRest:()=>setToggle(false), 
        config:{duration:900} 
    });

    function handleValueChange(category:string, value:any, dropdownOptions:DropdownOption[]) {
        const selectedData = dropdownOptions.find((e:DropdownOption)=>e.value===value);
        setData({...data, [category]:selectedData})
    }

    function handleShowText(category:string){
        return data[category]?data[category].text:undefined
    }

    function handleShowError(category:string){
        return data[category]?false:true
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
             </div>
        </div>
    );
}

export default ManageDeivce;