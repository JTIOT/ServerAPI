import React, {useState} from 'react';
import {Input, InputOnChangeData} from 'semantic-ui-react';

import classes from './inputField.module.scss';

interface Props {
    icon?: string,
    placeholder?: string,
    onValueChanged?: (value:string)=>void
}

const InputField: React.FC<Props> = ({
    icon='search', 
    placeholder='Search...', 
    onValueChanged
}) => {

    const [value, setValue] = useState('');

    const onValueChange = (
        _e:React.ChangeEvent<HTMLInputElement>,
         data:InputOnChangeData
         ) => {
        setValue(data.value);
        if(onValueChanged){
            onValueChanged(value);
        }
    }

    return (
        <Input 
        icon='search'
        placeholder={placeholder}
        onChange={onValueChange} 
        />
    );
} 

export default InputField;