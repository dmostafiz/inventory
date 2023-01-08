import React, { useState } from 'react'
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import * as htmlToImage from 'html-to-image';
import { Image } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function ReactToSvg({ node }) {

    const [imgUrl, setImgUrl] = useState(null);

    useEffect(() => {

        async function getDataUrl() {
            const dataUrl = await htmlToImage.toPng('<h1>Hello World</h1>');
            setImgUrl(dataUrl)
        }

        getDataUrl()

    }, [node])



    return (
        <>
            {imgUrl && <img src={imgUrl} />}
        </>
    )
}
