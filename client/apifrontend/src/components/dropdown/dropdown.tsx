import React, {useState} from 'react';

import classes from './dropdown.module.scss';

interface Props{
    title?: string,
    options: Array<string>,
    onValueChanged?: (value:string|undefined, index:number|undefined)=>void
}

const Dropdown = <T extends Props>({title='', options=[], onValueChanged}:T) => {

    const [value, setValue] = useState('');

    const onValueChange = (e:any | undefined)=>{
        if(!e) return;

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