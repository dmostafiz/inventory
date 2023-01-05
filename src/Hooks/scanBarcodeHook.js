import React, { useEffect, useState } from 'react';
import useScanDetection from 'use-scan-detection';
import dynamic from 'next/dynamic';
import Axios from '../Helpers/Axios';
 
const scanBarcodeHook = () => {
    const [scannedValue, setValue] = useState("");
    const [scannedProduct, setProduct] = useState(null);
 
    // useScanDetection({
    //     onComplete: setValue,
    //     minLength: 1 // EAN13
    // });

    useEffect(() => {

        if (scannedValue) {

            console.log('Barcode scan detected: ', scannedValue);
            
            async function getProductByScannedValue() {
                const res = await Axios.get(`/product/${scannedValue}`)

                if(res?.data?.ok && res?.data?.product){
                    setProduct(res?.data?.product)
                }
            }

            getProductByScannedValue()
        }
    }, [scannedValue])
 
    return {scannedProduct}
};
 
export default scanBarcodeHook