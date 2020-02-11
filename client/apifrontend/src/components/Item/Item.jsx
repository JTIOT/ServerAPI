import React from 'react';
import {Segment, Popup, Button, Dropdown} from 'semantic-ui-react';

const Item = ({key, name, onDelete}) => {

    console.log(key, name);

    const handleDelete = (e, data) => {

        if(onDelete){
            onDelete(key, name);
        }
    }

    return(
        <Segment textAlign='left'>
            <Popup trigger={<Button content={name} />} hoverable>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Button 
                        icon='delete' 
                        content='Delete' 
                        color='red' 
                        onClick={handleDelete}
                        />
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Popup>
        </Segment>
    );
}

export default Item;