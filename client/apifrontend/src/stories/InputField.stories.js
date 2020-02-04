import React from 'react';

import { action } from '@storybook/addon-actions';
import InputField from '../components/inputField/inputField';

export default {
    title:'InputField',
    component:InputField
}

export const title = () => <InputField title='TextField title:' />

export const placeholder = () => <InputField
title='TextField title:'
placeholder='Enter text here' /> 

export const valueCallback = () => <InputField 
title='TextField title:'
placeholder='Enter text here'
onValueChanged={action('value changed')}
/>