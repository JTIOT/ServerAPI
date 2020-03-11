import React from 'react';
import { CSVLink } from "react-csv";
import {Button} from 'semantic-ui-react';

interface Props{
    title?: string,
    csvData: any|null,
    outputFilename?: string
}

/**
 * CSV file download button
 * 
 * Handle generating CSV file 
 */
const CSVDownloadButton = <T extends Props>({
    title='Download CSV File',
    csvData,
    outputFilename='Output.csv'
}:T)=>{

    if(csvData){
        return(
            <Button  content={
                <CSVLink 
                data={csvData}
                filename={outputFilename}
                >{title}</CSVLink>
            } />
        );
    }

    return null;
    
}

export default CSVDownloadButton;