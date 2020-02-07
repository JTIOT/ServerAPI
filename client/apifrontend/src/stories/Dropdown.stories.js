import React from 'react';
import {action} from '@storybook/addon-actions';
import {Dropdown} from 'semantic-ui-react';


export default{
    title:'Dropdown',
    component:Dropdown
}

const itemOptions = [
    {
        text:'Item 1',
        value:'Item1'
    },
    {
        text:'Item 2',
        value:'Item2'
    },
    {
        text:'Item 3',
        value:'Item3'
    },
    {
        text:'Item 4',
        value:'Item4'
    },
    {
        text:'Item 5',
        value:'Item5'
    },
]

export const SearchDropdown = () => {

    return (
        <Dropdown
        placeholder='Choose item'
        search
        options={itemOptions}
        onChange={action('on value changed')}
         />
    );
}