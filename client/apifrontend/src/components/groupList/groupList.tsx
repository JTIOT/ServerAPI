import React from 'react';
import {Segment, Header, Card, SegmentGroup, CardContent} from 'semantic-ui-react';
import {StrictHeaderProps} from 'semantic-ui-react';

interface Props{
    children?: any,
    header?: string,
    headerAlign?: StrictHeaderProps["textAlign"],
    subheader?: string,
    headerIcon: StrictHeaderProps["icon"],
    headerColor?: StrictHeaderProps["color"],
    [x:string]: any
}

/**
 * GroupList component display a title and render it's children
 * @param props 
 */
const GroupList: React.FC<Props> = (props)=>{
    const {
        className,
        children,
        header='header',
        headerAlign='left', 
        subheader='sub header', 
        headerIcon, 
        headerColor='purple',
    } = props;

    return (

        <Segment.Group
        className={className} 
        compact
        >
            <Segment>
                <Header
                textAlign={headerAlign?headerAlign:'left'} 
                icon={headerIcon} 
                color={headerColor}
                content={header} 
                subheader={subheader} 
                />
            </Segment>
            <Segment>
            {
                children
            }
            </Segment>
        </Segment.Group>

    );
}

export default GroupList;