import React from 'react';
import {Segment, Header} from 'semantic-ui-react';
import {StrictHeaderProps} from 'semantic-ui-react';
import { useSpring, animated } from 'react-spring';

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

    const {scale} = useSpring({
        from: {scale: 0.1},
        to: {scale: 1},
        config: {duration: 500}
    })

    return (
        <animated.div style={{transform:scale.interpolate({
            range: [0, 0.18, 0.28, 0.35, 0.44, 0.55, 0.65, 0.75, 0.9, 1],
            output: [0, 0.2, 0.3, 0.5, 0.9, 1.1, 1.2, 1.1, 0.9, 1]
        }).interpolate((s: any)=>`scale(${s})`)
        }}>
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
        </animated.div>
    );
}

export default GroupList;