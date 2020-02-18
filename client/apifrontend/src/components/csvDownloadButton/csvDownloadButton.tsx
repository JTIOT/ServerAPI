import React from 'react';
import { CSVLink } from "react-csv";
import {Button} from 'semantic-ui-react';

interface Props{
    title?: string,
    csvData: any|null,
    outputFilename?: string
}

/**
 * Render CSV download button
 * 
 * Render nothing if csv data is null
 */
const CSVDownloadButton: React.FC<Props> = ({
    title='Download CSV File',
    csvData,
    outputFilename='Output.csv'
})=>{

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