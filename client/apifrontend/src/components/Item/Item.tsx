import React, {useState} from 'react';
import {Segment, Popup, Button, Menu} from 'semantic-ui-react';
import {SemanticCOLORS} from 'semantic-ui-react'

import classes from './Item.module.scss';

interface Props{
    title: string,
    dataIndex: string|number,
    onDelete?: (dataIndex:string|number, title:string)=>void,
    color?: SemanticCOLORS
    labelTitle?: string|undefined,
    labelPosition?: "left"|"right"|undefined
    labelPointer?: "left"|"right"|undefined
    popupTriggers?: ('hover'|'click'|'focus')[],
    popupDelay?: number
}

/**
 * Item with label and show menu popup with delete button when hover
 * 
 * Label has position and pointer for left or right
 * 
 * popup trigger can be hover, cick, focus or mixed
 */
const Item: React.FC<Props> = ({
    title, 
    dataIndex, 
    onDelete,
    color='grey', 
    labelTitle, 
    labelPosition, 
    labelPointer,
    popupTriggers=['hover'],
    popupDelay=500
}) => {

    const [active, setActive] = useState(false);

    const handleDelete = () => {

        setActive(false);

        if(onDelete){
            onDelete(dataIndex, title);
        }
    }

    return(
        <Segment className={classes.overlay} basic textAlign='center'>
            <Popup
            trigger={<Button  
                color={color} 
                content={title}
                label={labelTitle?{basic: false, pointing: labelPointer, content: labelTitle }:undefined}
                labelPosition={labelTitle?labelPosition:undefined} 
                />} 
            hoverable 
            hideOnScroll
            open={active}
            on={popupTriggers}
            onOpen={()=>setActive(true)}
            onClose={()=>setActive(false)}
            mouseEnterDelay={popupDelay}
            >
                <Menu.Item content={
                    <Button 
                    color='red' 
                    content='Delete'
                    onClick={()=>handleDelete()}
                    />
                } />
            </Popup>
        </Segment>
    );
}

export default Item;