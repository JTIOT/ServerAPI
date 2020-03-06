import React, { useRef } from 'react';
import {Dropdown, Segment, Grid} from 'semantic-ui-react';
import {DropdownProps} from 'semantic-ui-react';

/**
 * Type for options in each dropdwon
 */
export interface DropdownOption{
    key: number|string,
    text: string,
    value: any,
}

/**
 * Type for dropdown's metadata
 */
export interface DropdownMetadata{
    category: TCategory,
    placeholder: string,
    noResultsMessage: string,
    options: DropdownOption[],
}

/**
 * Category type
 */
type TCategory = | string;

interface Props{
    segmented? : boolean,
    dropdownData: DropdownMetadata[],
    onValueChange: <
    T extends TCategory,
    V extends any,
    K extends DropdownOption>(category:T, value:V, options:K[])=>void,
    onShowError: <T extends TCategory>(category:T)=>boolean,
    onShowText: <T extends TCategory>(category:T)=>string|undefined,
    [x:string]: any
}

/**
 * DropdownList render a list of dropdown component
 * DropdownList manage all options for each dropdown
 * @param {boolean} segmented each dropdown is segmented
 * @param {Array<DropdownMetadata>} dropdownData an array of DropdownMetadata define how
 * many dropdown will be rendered
 * @param {fucntion} onValueChange a callback when dropdown value changed
 * @param {fucntion} onShowError a callback ask if dropdown need to show error
 * @param {fucntion} onShowText a callback ask for dropdown selected text for display purpose
 */ 
const DropdownList = <T extends Props>({
    segmented=false,
    dropdownData,
    onValueChange,
    onShowError,
    onShowText
}:T)=>{

    //construct options by category
    let options:{[key in TCategory]:DropdownOption[]} = {};
    dropdownData.forEach(e=>{
        options = {...options, [e.category]:e.options};
    })

    const handleShowText = <T extends TCategory>(category:T)=>{
        const text = onShowText(category);
        return text?text:undefined;
    }

    const handleShowError = <T extends TCategory>(category:T)=>{
        const value = onShowError(category);
        return value;
    }

    const handleValueChange = <V extends  React.SyntheticEvent<HTMLElement, Event>,
    K extends DropdownProps>(
        category:TCategory,
        _e:V,
         data:K
         )=>{
            if(onValueChange){
                onValueChange(category, data.value, options[category]);
            }
    }

    const renderDropdownlist = () => {
        return <div>
        {
        dropdownData.map((element:DropdownMetadata, index)=>{
            return <Segment
                    key={index}
                    basic={!segmented}
                    >
                        <Dropdown 
                        placeholder={element.placeholder}
                        selection
                        search
                        closeOnChange={true}
                        deburr={true}
                        noResultsMessage={element.noResultsMessage}
                        options={element.options}
                        text={handleShowText(element.category)}
                        onChange={(e, data)=>handleValueChange(element.category, e, data)}
                        error={handleShowError(element.category)}
                        category={element.category}
                        selectOnBlur={false}
                        selectOnNavigation={false}
                        />
                    </Segment>
        })
        }
        </div>
        
    }

    return renderDropdownlist()
}

export default DropdownList;