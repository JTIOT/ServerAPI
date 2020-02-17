import React, {useState} from 'react';

import classes from './inputField.module.scss';

interface Props {
    title?: string,
    placeholder?: string,
    onValueChanged?: (value:string)=>void
}

const InputField: React.FC<Props> = ({title='', placeholder='', onValueChanged}) => {

    const [value, setValue] = useState('');

    const onValueChange = (e:any) => {
        setValue(e.target.value);
        if(onValueChanged){
            onValueChanged(e.target.value);
        }
    }

    return (
        <div className={classes.overlay}>
            <label className={classes.label}>{title}</label>
            <input className={classes.input} 
            placeholder={placeholder}
            onChange={onValueChange}
            value={value}
             />
        </div>
    );
} 

export default InputField;