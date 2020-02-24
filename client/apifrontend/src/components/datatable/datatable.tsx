import React from 'react';
import { StickyTable, Row, Cell } from 'react-sticky-table';

import classes from './datatable.module.scss';

interface Props{
    headers: Array<string>,
    records: Array<Array<string>> | undefined,
    stickToHeader?: number,
    stickToColumn?: number
}

const renderHeader = (headerStrings:Array<string>)=>{
    return (
        <Row key='headerRow'>{
            headerStrings.map((h, i)=>{
                return <Cell key={i} 
                style={{
                    backgroundColor:'lightGrey'
                }}>{h}
                </Cell>
            })
            }
        </Row>
    );
}

const renderRecord = (records:Array<Array<string>> | undefined)=>{
    if(!records) return null;

    return records.map((record, i)=>{
        return (
            <Row key={i}>
                {
                    record.map((cell, i)=>{
                        return(
                        <Cell key={i}>{cell}</Cell>
                        )
                    })
                }
            </Row>
        )
    })
}

const Datatable = <T extends Props>({
    headers, 
    records,
    stickToHeader=1,
    stickToColumn=1
}:T)=>{
    return (
        <div className={classes.overlay}>
            <StickyTable
            stickyHeaderCount={stickToHeader}
            stickyColumnCount={stickToColumn}
            >
                {renderHeader(headers)}
                {renderRecord(records)}
            </StickyTable>
        </div>
    );
}

export default Datatable;