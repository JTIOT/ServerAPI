import React, {useState} from 'react';
import QrReader from 'react-qr-reader';
// import classes from './qr-reader.module.scss';

const QRCodeReader = () => {

    const [qrcodeList, setQrcodeList] = useState<string[]>([]);

    /**
     * Format mac from QRCode
     * e.g http://www.ban99.com/aibed/2059A0B0AA20
     * turn into 20:59:A0:B0:AA:20
     * @param {*} qrcode 
     */
    const macFromQRCode = (qrcode:string) => {

        //extract mac from qrcode url
        const mac = qrcode.substring(qrcode.lastIndexOf('/')+1);
        //turn it into array of chars
        const strArr = mac.split('');
        //combine chars with ':'
        const formatedMac = strArr.reduce((acc, value, index)=>{

            if(index !== 0 && (index+1) !== strArr.length){
                const newVal = ((index+1) % 2) === 0? (value+':') : value;
                return acc+newVal;
            }
            return acc.length>0?acc+value:value;

        }, '');

        return formatedMac;
    }

    const handleError = (err:any) => {

        console.log('QRCode error ', err);

        // setQrcode(null);
    }

    const handleScan = (data:string|null) => {

        // console.log('QRCode scan ', data);

        if(data){

            const mac = macFromQRCode(data);
            const macExist = qrcodeList.find((value)=>{
                return value === mac;
            })
            if(!macExist){
                const newMacList = [...qrcodeList, mac];
                console.log('add mac ', mac, newMacList);
                setQrcodeList(newMacList);
            }
            
        }
    }

    return (
        <div>
            <QrReader
            delay={100}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '30%' }}
            resolution={1000}
            />
            <div>
            {
                qrcodeList.map((mac, i)=>{
                    return <p key={i}>{mac}</p>
                })
            }
            </div>
        </div>
    );
}

export default QRCodeReader;