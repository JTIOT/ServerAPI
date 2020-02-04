import React, {useState} from 'react';

import classes from './dropdown.module.scss';

const Dropdown = ({title='', options=[], onValueChanged}) => {

    const [value, setValue] = useState('');

    const onValueChange = (e)=>{
        
        const val = e.target.value;

        setValue(val);
        if(onValueChanged){
            val?onValueChanged(options[val], val):onValueChanged(undefined, undefined);
        }
    }

    return (
        <div className={classes.overlay}>
            <label className={classes.label}>{title}</label>
            <select className={classes.dropdown} value={value} onChange={onValueChange}>
                <option key={''} value=''>---select---</option>
                {
                    
                    options.map((item, index)=>{
                        return <option key={index} value={index}>{item}</option>
                    })
                    
                }
            </select>
        </div>
    );
}

export default Dropdown;