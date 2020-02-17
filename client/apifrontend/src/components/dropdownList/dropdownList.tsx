import React from 'react';
import {Dropdown, Segment} from 'semantic-ui-react';
import {DropdownProps, DropdownItemProps} from 'semantic-ui-react';
// import { string, number } from 'prop-types';
// import PropTypes from 'prop-types';

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
    dropdownData: DropdownMetadata[],
    onValueChange: (category:any, value:any, options:DropdownOption[])=>void,
    onShowError: (category:any)=>boolean,
    onShowText: (category:any)=>string
}

const DropdownList: React.FC<Props> = ({
    dropdownData,
    onValueChange,
    onShowError,
    onShowText
})=>{

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

// DropdownList.propTypes={
//     header: PropTypes.string,
//     dropdownData: PropTypes.array.isRequired,
//     onValueChange: PropTypes.func,
//     onShowError: PropTypes.func.isRequired,
//     onShowText: PropTypes.func.isRequired
// }

export default DropdownList;