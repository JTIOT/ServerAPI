import React from 'react';
import {Dropdown, Segment, Divider} from 'semantic-ui-react';
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
    onShowText: <T extends TCategory>(category:T)=>string|undefined
}

/**
 * DropdownList render a list of dropdown component
 * @param {boolean} segmented each dropdown is segmented
 * @param {Array<DropdownMetadata>} dropdownData an array of DropdownMetadata define how
 * many dropdown will be rendered
 * @param {fucntion} onValueChange a callback when dropdown value changed
 * @param {fucntion} onShowError a callback ask if dropdown need to show error
 * @param {fucntion} onShowText a callback ask for dropdown selected text for display purpose
 */ 
const DropdownList = <T extends Props>({
    segmented=true,
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

    function handleShowText(category:TCategory){
        const text = onShowText(category);
        return text?text:undefined;
    }

    function handleShowError(category:TCategory){
        const value = onShowError(category);
        return value;
    }

    function handleValueChange<V,K extends DropdownProps>(
        category:TCategory,
        e:V,
         prop:K
         ){


        if(onValueChange){
            onValueChange(category, prop.value, options[category]);
        }
    }

    const renderDropdownlist = () => {
        return dropdownData.map((element:DropdownMetadata, index)=>{
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
                    onChange={(e, prop)=>handleValueChange(element.category, e, prop)}
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