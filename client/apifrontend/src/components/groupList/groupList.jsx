import React from 'react';
import {Segment, Header} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const GroupList = ({
    className,
    children,
    header='header',
    headerAlign='left', 
    subheader='sub header', 
    headerIcon, 
    headerColor='purple',
})=>{

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
            {
                children
            }
        </Segment.Group>
    );
}

GroupList.propTypes={
    header: PropTypes.string,
    headerAlign: PropTypes.string,
    subheader: PropTypes.string,
    headerColor: PropTypes.string
}

export default GroupList;