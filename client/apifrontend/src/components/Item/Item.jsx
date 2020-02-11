import React, {useState} from 'react';
import {Segment, Popup, Button, Menu} from 'semantic-ui-react';

const Item = ({name, dataKey, onDelete, ...rest}) => {

    const [active, setActive] = useState(false);

    const handleDelete = () => {

        setActive(false);

        if(onDelete){
            onDelete(dataKey, name);
        }
    }

    return(
        <Segment basic textAlign='center'>
            <Popup 
            trigger={<Button content={name} />} 
            hoverable 
            hideOnScroll
            open={active}
            on='hover'
            onOpen={()=>setActive(true)}
            onClose={()=>setActive(false)}
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