import React, {useState} from 'react';
import faker from 'faker';
import {Segment, Header, Button, Popup} from 'semantic-ui-react';
import Item from '../../components/Item/Item';
import DropdownList, {DropdownOption, DropdownMetadata} from '../../components/dropdownList/dropdownList';
import GroupList from '../../components/groupList/groupList';
import { CSVLink } from "react-csv";
import CSVReaderButton from '../../components/csvReaderButton/csvReaderButton';
import { useSpring, animated } from 'react-spring'

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
interface SelectedData{
    [key:string]: any|null,
}

const initData:SelectedData = {
    model:null,
    type:null,
    company:null,
    recipient:null
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

    const [items, setItems] = useState<any|null>(getDevices());
    const [data, setData] = useState<SelectedData>(initData);
    const [csvData, setCSVData] = useState<any>('');
    const [toggle, setToggle] = useState(false);
    const {x} = useSpring({ 
        from:{x:0}, 
        to:{x:toggle?1:0}, 
        reset:true,
        onRest:()=>setToggle(false), 
        config:{duration:900} 
    });

    const handleValueChange = (category:any, value:any, dropdownOptions:DropdownOption[]) => {
        const selectedData = dropdownOptions.find(e=>e.value===value);
        setData({...data, [category]:selectedData})
    }

    const handleClearAll = ()=>{
        setItems(null);
    }

    const createCSVData = async ()=>{
        if(items && items.length>0)
        {
            let csv = items.map((i:any)=>{
                return [i.value];
            });
            return csv
        }

        return null;
    }

    const handleOutput = async ()=>{
        console.log(data, items);
        
        if(!(data.model && data.type && data.company && data.recipient)){
            console.log('toggle');
            setToggle(true);
            return
        }
        const csv = await createCSVData();
        console.log(csv);
        csv?setCSVData(csv):setCSVData(null);
    }

    const handleImportCSV = (inData:any) => {
        console.log(inData);

        const transformedData = inData.map((e:any, i:number)=>{
            return {
                key:i,
                text:e[0],
                value:e[0]
            }
        });

        setItems(transformedData);
    }

    const handleImportCSVError = (error:any) =>{
        console.log('read csv fail', error);
    }
    
    const handleItemDelete = (dataIndex:any) => {

        console.log('Delete item',items.splice(dataIndex, 1));
        setItems([...items]);
    }

    const renderItems = () => {
    
        return items.map((item:any, index:number)=>{
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
                <animated.div style={{
                    transform:x.interpolate({
                        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                        output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                    })
                    .interpolate((x:any)=>`scale(${x})`)
                }}>
                    <GroupList
                    className={classes.selection}
                    header='Management'
                    subheader='Manage your delivery'
                    headerIcon='cog'
                    headerAlign='left'
                    >
                        <DropdownList 
                        dropdownData={dropdownData}
                        onShowText={(category:any)=>data[category]?data[category].text:null}
                        onShowError={(category:any)=>data[category]?false:true}
                        onValueChange={handleValueChange}
                        />
                    </GroupList>
                </animated.div>
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
                        items && items.length>0?
                        <Segment>
                            <Button
                            className={classes.clearBtn} 
                            icon='delete'
                            color='red' 
                            content='Clear all'
                            onClick={handleClearAll}
                            />
                        </Segment>
                        :
                        null
                    }
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
                            <CSVReaderButton 
                            title='Import csv'
                            onReadCSV={handleImportCSV}
                            onError={handleImportCSVError}
                            />
                        </Segment>
                    }
                </GroupList>
            </div> 
            <Popup trigger={    
                <Button primary content='Output' onClick={handleOutput} />
            }>
                Output your result in console and download your csv file
            </Popup>
            {
                csvData?
                <Button  content={
                    <CSVLink 
                    data={csvData}
                    filename={'DeviceMAC.csv'}
                    >Download CSV file</CSVLink>
                } />
                :
                null
            }     
        </div>
    );
}

export default DeviceDispatch;