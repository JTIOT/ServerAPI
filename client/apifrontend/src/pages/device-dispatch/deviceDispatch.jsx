import React from 'react'
// import Dropdown from '../../components/dropdown/dropdown';
import {Dropdown, Segment, Header} from 'semantic-ui-react';
// import InputField from '../../components/inputField/inputField';


import classes from './deviceDispatch.module.scss';

const modelOptions = [
    {
        text:'Model 1',
        value:'Model1'
    },
    {
        text:'Model 2',
        value:'Model2'
    },
    {
        text:'Model 3',
        value:'Model3'
    },
    {
        text:'Model 4',
        value:'Model4'
    },
]

const typeOptions = [
    {
        text:'Type 1',
        value:'Type1'
    },
    {
        text:'Type 2',
        value:'Type2'
    },
    {
        text:'Type 3',
        value:'Type3'
    },
    {
        text:'Type 4',
        value:'Type4'
    },
]

const companyOptions = [
    {
        text:'Company 1',
        value:'Company1'
    },
    {
        text:'Company 2',
        value:'Company2'
    },
    {
        text:'Company 3',
        value:'Company3'
    },
    {
        text:'Company 4',
        value:'Company4'
    },
]

const recipientOptions = [
    {
        text:'Recipient 1',
        value:'Recipient1'
    },
    {
        text:'Recipient 2',
        value:'Recipient2'
    },
    {
        text:'Recipient 3',
        value:'Recipient3'
    },
    {
        text:'Recipient 4',
        value:'Recipient4'
    },
]

const DeviceDispatch = () => {

    return (
        <Segment.Group
        className={classes.margin}
         compact 
         raised>
            <Segment>
                <Header 
                icon='exchange' 
                color='purple'
                content='Dispatch System' 
                subheader='Manage your dispatch' 
                />
            </Segment>
            <Segment>
                <Dropdown 
                placeholder='Select Model'
                selection
                search
                button
                noResultsMessage='No model found'
                options={modelOptions}
                onChange={(e, {value})=>console.log('selected model ', value)}
                />
            </Segment>
            <Segment>
                <Dropdown
                placeholder='Select Type'
                search
                button
                selection
                noResultsMessage='No type found'
                options={typeOptions}
                onChange={(e, {value})=>console.log('selected type ', value)}
                />
            </Segment>
            <Segment>
                <Dropdown
                placeholder='Select Company ID'
                search
                button
                selection
                noResultsMessage='No company ID found'
                options={companyOptions}
                onChange={(e, {value})=>console.log('selected company id ', value)}
                />
            </Segment>
            <Segment>
                <Dropdown
                placeholder='Select Recipient ID'
                search
                button
                selection
                noResultsMessage='No recipient id found'
                options={recipientOptions}
                onChange={(e, {value})=>console.log('selected recipient id ', value)}
                />
            </Segment>
        </Segment.Group>
    );
}

export default DeviceDispatch;