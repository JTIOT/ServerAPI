import React,{createRef} from 'react';
import {Button} from 'semantic-ui-react';
import { CSVReader } from 'react-papaparse'

import classes from './csvReaderButton.module.scss';

const CSVReaderButton = ({title, onReadCSV, onError}) =>{
    
    let ref = createRef();

    const handleReadCSV = (data) => {
        onReadCSV(data.data);
    }
    
    const handleOnError = (err, file, inputElem, reason) => {
        onError(err);
    }
    
    const handleImportOffer = () => {
        ref.current.click();
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