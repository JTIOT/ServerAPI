import React from 'react';
import faker from 'faker';
import {Segment, Header, Button, Popup, Divider} from 'semantic-ui-react';
import ItemList, {IItem} from '../../components/itemList/itemList';
import DropdownList, {DropdownOption, DropdownMetadata} from '../../components/dropdownList/dropdownList';
import GroupList from '../../components/groupList/groupList';
import CSVReaderButton from '../../components/csvReaderButton/csvReaderButton';
import CSVDownloadButton from '../../components/csvDownloadButton/csvDownloadButton';
import {stripMAC} from '../../utils/utils';
import { withTranslation, WithTranslation } from 'react-i18next';

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

// const getDevices = () => {

//     let items = [];
//     for(let i=0; i<4; i++){
//         const item = faker.finance.mask(10);
//         items.push({
//             key:i,
//             text:item,
//             value:item
//         })
//     }
//     return items;

// }

interface IData{
    [key:string]:any|null
}

interface IState{
    items: IItem[],
    data: IData,
    csvData: null|any[][],
    scanning: boolean,
}

interface IProps extends WithTranslation{}

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





class DeviceDispatch extends React.Component<IProps, IState> {


    state = {
        items: Array<IItem>(),
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
            const qrcode = stripMAC(this.qrcodeInputKey);
            
            const found = items.find((i: IItem)=>{
                return i.value === qrcode;
            })
    
            if(found){
                console.log(`${qrcode} is in the list`);
                return;
            }
    
            const key = items.length.toString();
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
        this.setState({...this.state, items:[], scanning:false});
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
                key:i.toString(),
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

    renderDropdownMenu = () => {
        const {t} = this.props;
        return (
            <GroupList
            className={classes.selection}
            header={t('DeviceDispatch.Management.Title')}
            subheader={t('DeviceDispatch.Management.Subtitle')}
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
        )
    }

    renderOptions = () =>{

        return(
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
        )
    }

    renderClearAllBtn = ()=>{

        return (
            <Button
                className={classes.clearBtn} 
                icon='delete'
                color='red' 
                content='Clear all'
                onClick={this.handleClearAll}
            />
        )
    }

    renderDeviceList = () =>{

        const {items} = this.state;

        return (
            <div className={classes.itemGroup}>
                {
                <ItemList 
                items={items}
                onItemDelete={this.handleItemDelete}
                />
                }
            </div>
        )
    }

    renderOutput = () => {

        const {items, csvData} = this.state;

        return(
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
        )
    }

    render(){
        const {data, items, scanning} = this.state;
        const {t} = this.props;

        return (
            <div className={classes.overlay}>
                <Header 
                icon='exchange' 
                color='purple'
                content={t('DeviceDispatch.Title')} 
                subheader={t('DeviceDispatch.Subtitle')} 
                size='large'
                />
                <div className={classes.content}>
                    {
                        //dropdown menu
                        this.renderDropdownMenu()
                    }
                    
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
                        this.renderClearAllBtn()
                        :
                        null
                    }
                    {//list of device or import from scv
                        (items!==null && items.length>0) || scanning?
                        this.renderDeviceList()
                        :
                        this.renderOptions()
                    }
                    </GroupList>
                    }
                </div> 
                {
                    this.renderOutput()
                }
            </div>
        );
    }
}

export default withTranslation()(DeviceDispatch);