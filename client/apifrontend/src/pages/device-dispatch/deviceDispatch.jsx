import React from 'react'
import Dropdown from '../../components/dropdown/dropdown';
import InputField from '../../components/inputField/inputField';

import classes from './deviceDispatch.module.scss';

const DeviceDispatch = () => {

    return (
        <div className={classes.overlay}>
            <Dropdown 
            title='Device model:' 
            options={[
                'model 1',
                'model 2',
                'model 3',
                'model 4'
            ]}
            onValueChanged={(value, index)=>{
                console.log('model', value, index);
            }}
             />
            <Dropdown title='Device type:' options={[
                'type 1',
                'type 2',
                'type 3',
                'type 4'
            ]}
            onValueChanged={(value, index)=>{
                console.log('type', value, index);
            }}
            />
            <Dropdown title='Company id:' options={[
                'id 1',
                'id 2',
                'id 3',
                'id 4'
            ]}
            onValueChanged={(value, index)=>{
                console.log('company id', value, index);
            }}
             />
             <InputField title='recipient id:' 
             placeholder='Enter receipient id'
             onValueChanged={(value)=>{
                 console.log('receipient id ', value);
             }} 
             />
        </div>
    );
}

export default DeviceDispatch;