export const stripMAC = (qrcodeURL:string)=>{

    const tightCode = qrcodeURL.split('/').pop();
    let qrcode = '';
    if(tightCode){
        for(let i=0; i<tightCode.length; i+=2){
            const partial = tightCode.substr(i, 2);
            if(i===0){
                qrcode += partial;
            }
            else{
                qrcode += ':'+ partial;
            }
        }
    }
    return qrcode;
}