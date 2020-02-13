import React, {useState} from 'react';
import {Segment, Popup, Button, Menu} from 'semantic-ui-react';

import classes from './Item.module.scss';

const Item = ({title, dataIndex, onDelete}) => {

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
            trigger={<Button basic color='black' content={title} />} 
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