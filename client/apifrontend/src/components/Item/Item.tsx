import React, {useState} from 'react';
import {Segment, Popup, Button, Menu} from 'semantic-ui-react';

import classes from './Item.module.scss';

interface Props{
    title: string,
    dataIndex: string|number,
    onDelete?: (dataIndex:string|number, title:string)=>void,
    labelTitle?: string|undefined,
    labelPosition?: "left"|"right"|undefined
    labelPointer?: "left"|"right"|undefined
}

const Item: React.FC<Props> = ({
    title, 
    dataIndex, 
    onDelete, 
    labelTitle, 
    labelPosition, 
    labelPointer
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
                color='grey' 
                content={title}
                label={labelTitle?{basic: false, pointing: labelPointer, content: labelTitle }:undefined}
                labelPosition={labelTitle?labelPosition:undefined} 
                />} 
            hoverable 
            hideOnScroll
            open={active}
            on='hover'
            onOpen={()=>setActive(true)}
            onClose={()=>setActive(false)}
            mouseEnterDelay={500}
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