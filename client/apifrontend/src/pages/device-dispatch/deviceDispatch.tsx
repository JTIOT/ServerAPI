import React from 'react';
import faker from 'faker';
import {Segment, Header, Button, Popup, Divider} from 'semantic-ui-react';
import Item from '../../components/Item/Item';
import DropdownList, {DropdownOption, DropdownMetadata} from '../../components/dropdownList/dropdownList';
import GroupList from '../../components/groupList/groupList';
import CSVReaderButton from '../../components/csvReaderButton/csvReaderButton';
import CSVDownloadButton from '../../components/csvDownloadButton/csvDownloadButton';

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

interface IData{
    [key:string]:any|null
}

interface IState{
    items: any[],
    data: IData,
    csvData: null|any[][],
    scanning: boolean,
}

//initial data for user selected data
const initData:IData = {
    model:null,
    type:null,
    company:null,
    recipient:null,
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





class DeviceDispatch extends React.Component<{}, IState> {


    state = {
        items: [],
        data: initData,
        csvData: null,
        toggle: false,
        scanning: false,
    }

    qrcodeInputKey = '';

    onKeyPress = (e:KeyboardEvent)=>{

        if(!this.state.scanning) return;

        if(e.key === 'Enter')
        {
            const {items} = this.state;

            console.log(this.state.items);
            const qrcode = this.stripMAC(this.qrcodeInputKey);
            
            const found = items.find((i: { value: any; })=>{
                return i.value === qrcode;
            })
    
            if(found){
                console.log(`${qrcode} is in the list`);
                return;
            }
    
            const key = items.length;
            let newItems: any[] = [...items];
            newItems.unshift({
                key:key, 
                text:qrcode, 
                value:qrcode
            });
            this.setState({...this.state, items:newItems});

            this.qrcodeInputKey = '';
            return;
        }

        this.qrcodeInputKey += e.key;
    }


    componentDidMount(){
        window.addEventListener('keypress', this.onKeyPress);
        
    }

    componentWillUnmount(){
        window.removeEventListener('keypress', this.onKeyPress);
    }

    validateData(inData:IData){
        return (inData.model && inData.type && inData.company && inData.recipient) !== null;
    }
    
    stripMAC = (qrcodeURL:string)=>{

        const tightCode = qrcodeURL.split('/').pop();
        let qrcode = '';
        if(tightCode){
            for(let i=0; i<tightCode.length; i+=2){
                const partial = tightCode.substr(i, 2);
                if(i===0){
                    qrcode += partial;
                }
                else{
                    qrcode += ':'+ partial;
                }
            }
        }
        return qrcode;
    }

    handleValueChange = (category:string, value:any, dropdownOptions:DropdownOption[])=>{
        const {data} = this.state;
        const selectedData = dropdownOptions.find((e:DropdownOption)=>e.value===value);
        this.setState({...this.state, data:{...data, [category]:selectedData}})
    }

    handleShowText = (category:string)=>{
        const {data} = this.state;
        return data[category]?data[category].text:undefined
    }

    handleShowError = (category:string)=>{
        const {data} = this.state;
        return data[category]?false:true
    }

    handleClearAll = ()=>{
        this.setState({...this.state, items:[]});
    }

    createCSVData = async ()=>{
        const {items} = this.state;

        if(items && items.length>0)
        {
            let csv = items.map((i:any)=>{
                return [i.value];
            });
            return csv
        }

        return null;
    }

    handleOutput = async ()=>{
        const {data, items} = this.state;

        console.log(data, items);

        const csv = await this.createCSVData();
        console.log(csv);
        csv?this.setState({...this.state, csvData:csv}):this.setState({...this.state, csvData:null});
    }

    handleImportCSV = (inData:any) => {
        console.log(inData);

        const transformedData = inData.map((e:any, i:number)=>{
            return {
                key:i,
                text:e[0],
                value:e[0]
            }
        });

        this.setState({...this.state, items:transformedData});
    }

    handleImportCSVError = (error:any) =>{
        console.log('read csv fail', error);
    }

    handleStartScanning = ()=>{
        if(!this.validateData(this.state.data)) return;
        this.setState({...this.state, scanning:true});
    }
    
    handleItemDelete = (dataIndex:any) => {
        const {items} = this.state;

        const i = items.splice(dataIndex, 1);
        console.log('Delete item',i);
        this.setState({...this.state, items:[...items]})
    }

    renderItems = () => {
        const {items} = this.state;

        return items.map((item:any, index:number)=>{
            return <Item 
            key={index} 
            dataIndex={index} 
            title={item.text} 
            onDelete={this.handleItemDelete} 
            labelTitle={`${index+1}`}
            labelPosition='left'
            labelPointer='right'
            />
        });
    }

    render(){
        const {data, items, csvData, scanning} = this.state;

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
                        onShowText={this.handleShowText}
                        onShowError={this.handleShowError}
                        onValueChange={this.handleValueChange}
                        />
                    </GroupList>
                    {
                        //scanned device list
                    }
                    {
                    data === null || !this.validateData(data)?
                    null
                    :
                    <GroupList
                    className={classes.deviceList}
                    header='Devices'
                    subheader='Scanned devices'
                    headerIcon='tablet'
                    headerAlign='left'
                    headerColor='purple'
                    >
                        {//clear all button
                            items && items.length>0?
                            <Button
                                className={classes.clearBtn} 
                                icon='delete'
                                color='red' 
                                content='Clear all'
                                onClick={this.handleClearAll}
                                />
                            :
                            null
                        }
                        {//list of device or import from scv
                            items!==null && items.length>0 || scanning?
                            <div className={classes.itemGroup}>
                                {
                                this.renderItems()
                                }
                            </div>
                            :
                            <Segment placeholder>
                                <div>
                                    <Header color='red' content='Import CSV file' />
                                    <CSVReaderButton 
                                    title='Import csv'
                                    onReadCSV={this.handleImportCSV}
                                    onError={this.handleImportCSVError}
                                    />
                                </div>
                                <div>
                                    <Divider horizontal>OR</Divider>
                                </div>
                                <div>
                                    <Header color='red' content='Scan device with QRCode scanner' />
                                    <Button 
                                    content='Start scanning' 
                                    onClick={this.handleStartScanning} 
                                    />
                                </div>
                            </Segment>
                        }
                    </GroupList>
                    }
                </div> 
                {
                items.length === 0?
                null
                :
                <div className={classes.buttonGroup}>
                    <Popup trigger={    
                        <Button primary content='Output' onClick={this.handleOutput} />
                    }>
                        Output your result in console and download your csv file
                    </Popup>
                    <CSVDownloadButton 
                    title='Download CSV File' 
                    csvData={csvData} 
                    outputFilename='DeviceMAC.csv'
                    />
                </div>    
                }
            </div>
        );
    }
}

export default DeviceDispatch;