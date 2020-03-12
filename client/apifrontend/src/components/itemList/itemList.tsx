import React from 'react';
import Item from '../Item/Item';

export interface IItem{
    [key:string]: any,
    text: string,
}

interface Props{
    items: IItem[],
    onItemDelete?: (index:number)=>void,
    indexLabel?: boolean,
    labelPos?: "left" | "right" | undefined,
    labelPointer?: "left" | "right" | undefined
}

/**
 * Item list is a component and used to group each Item component
 */
const ItemList = <P extends Props>({
    items,
    onItemDelete,
    indexLabel=true,
    labelPos='left',
    labelPointer='right'    
}:P
    ) => {

    const handleItemDelete = (dataIndex:any) => {
        if(onItemDelete) onItemDelete(dataIndex);
    }

    return (
        <React.Fragment>
        {
        items.map((e,index)=>{
            return <Item 
            key={index} 
            dataIndex={index} 
            title={e.text} 
            onDelete={handleItemDelete} 
            labelTitle={indexLabel?`${index+1}`:undefined}
            labelPosition={labelPos}
            labelPointer={labelPointer}
            />
        })
        }   
        </React.Fragment>
    );
}

export default ItemList;