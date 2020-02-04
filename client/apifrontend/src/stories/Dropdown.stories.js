import React from 'react';

import { action } from '@storybook/addon-actions';
import Dropdown from '../components/dropdown/dropdown';

export default {
    title:'Dropdown',
    component: Dropdown
}

export const title = () => <Dropdown title='Dropdown title:' />

export const options = () => <Dropdown 
title='Dropdown title:'
options={[
    'option 1',
    'option 2',
    'option 3',
    'option 4',
    'option 5',
    'option 6'
]}
/>

 export const valueCallback = () => <Dropdown
 title='Dropdown title:'
 options={[
    'option 1',
    'option 2',
    'option 3',
    'option 4',
    'option 5',
    'option 6'
 ]}
 onValueChanged={action('value changed')}
 />