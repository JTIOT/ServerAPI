import React from 'react';
import {Dropdown, Segment} from 'semantic-ui-react';
import {DropdownProps, DropdownItemProps} from 'semantic-ui-react';

export interface DropdownOption{
    key: number|string,
    text: string,
    value: any,
}

const defaultOption:DropdownOption = {
    key: '',
    text: '',
    value: '',
}


export interface DropdownMetadata{
    category: any,
    placeholder: string,
    noResultsMessage: string,
    options: DropdownOption[],
}

interface Props{
    segmented? : boolean,
    dropdownData: DropdownMetadata[],
    onValueChange: (category:any, value:any, options:DropdownOption[])=>void,
    onShowError: (category:any)=>boolean,
    onShowText: (category:any)=>string|null
}

/**
 * DropdownList render a list of dropdown component
 * @param props 
 */
const DropdownList: React.FC<Props> = (props)=>{

    const {
        segmented=true,
        dropdownData,
        onValueChange,
        onShowError,
        onShowText
    } = props;

    const handleShowText = (category:any)=>{
        const text = onShowText(category);
        return text?text:undefined;
    }

    const handleShowError = (category:any)=>{
        const value = onShowError(category);
        return value;
    }

    const handleValueChange = (
        e:React.SyntheticEvent<HTMLElement, Event>,
         prop:DropdownProps
         )=>{
        
        let transformedOptions:DropdownOption[] = [];

        //transform semantic dropdown options to options with key
        if(prop.options){ 
            prop.options.forEach(e=>{
                const o = Object.assign<DropdownOption, DropdownItemProps>(
                    {...defaultOption},
                    e
                );
                transformedOptions.push(o);
            })
        }

        if(onValueChange){
            onValueChange(prop.category, prop.value, transformedOptions);
        }
    }

    const renderDropdownlist = () => {
        return dropdownData.map((element, index)=>{
            return <Segment
                    key={index}
                    basic={!segmented}
                    content={<Dropdown 
                    placeholder={element.placeholder}
                    selection
                    search
                    button
                    noResultsMessage={element.noResultsMessage}
                    options={element.options}
                    text={handleShowText(element.category)}
                    onChange={handleValueChange}
                    error={handleShowError(element.category)}
                    category={element.category}
                    />}
                />
        })
    }
    return (
        <React.Fragment>
            {
                renderDropdownlist()
            }
        </React.Fragment>
    );
}

export default DropdownList;