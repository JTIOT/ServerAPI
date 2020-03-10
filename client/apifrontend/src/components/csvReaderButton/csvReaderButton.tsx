import React,{createRef} from 'react';
import {Button} from 'semantic-ui-react';
import { CSVReader } from 'react-papaparse'

// import classes from './csvReaderButton.module.scss';

interface Props{
    title: string,
    onReadCSV: (data:any)=>void,
    onError: (err:any)=>void
}

const CSVReaderButton = <T extends Props>({title, onReadCSV, onError}:T) =>{
    
    let ref = createRef<HTMLElement>();

    const handleReadCSV = (data:any) => {
        onReadCSV(data.data);
    }
    
    const handleOnError = (err:any, file:any, inputElem:any, reason:any) => {
        onError(err);
    }
    
    const handleImportOffer = () => {
        if(ref && ref.current) ref.current.click();
    }

    return (
        <Button onClick={handleImportOffer}>
            {title}
            <CSVReader
            onFileLoaded={handleReadCSV}
            inputRef={ref}
            style={{display: 'none'}}
            onError={handleOnError}
            />
        </Button>
    );
}

export default CSVReaderButton;