import React from 'react';
import {Dropdown, Segment, Header} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DropdownList = ({
    header='Dropdown title', 
    subheader='Dropdown subtitle', 
    headerIcon='cog', 
    headerColor='purple',
    dropdownData,
    onValueChange,
    onShowError,
    onShowText
})=>{

    const handleShowText = (category)=>{
        const text = onShowText(category);
        return text?text:null;
    }

    const handleShowError = (category)=>{
        const value = onShowError(category);
        return value;
    }

    const handleValueChange = (e, prop)=>{
        if(onValueChange){
            onValueChange(prop.category, prop.value, prop.options);
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

    return(
        <Segment.Group 
        compact
        >
            <Segment>
                <Header 
                icon={headerIcon} 
                color={headerColor}
                content={header} 
                subheader={subheader} 
                />
            </Segment>
            {   
                renderDropdownlist()
            }
        </Segment.Group>
    );
}

DropdownList.propTypes={
    dropdownData: PropTypes.array.isRequired,
    onValueChange: PropTypes.func,
    onShowError: PropTypes.func.isRequired,
    onShowText: PropTypes.func.isRequired
}

export default DropdownList;