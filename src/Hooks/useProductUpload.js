import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Axios from '../Helpers/Axios';

export default function useProductUpload() {

  const toast = useToast()

  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null);

  useEffect(() => {

    console.log('UploadedFile ', file)

    let fileReader = false;

    if (file) {

      const fileSize = file.size / 1024 / 1024

      console.log('File size: ', fileSize)

      if (fileSize > 1) {
        toast({
          title: 'Sorry!',
          description: "You can upload maximum 1 picture!",
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })

        setFile(null)

        return
      }

      // if(file.size > )

      setPreview(URL.createObjectURL(file))

      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onloadend = () => {
        // console.log('Loaded Image: ', reader.result)
        setImage(reader.result)

      }
    }

    return () => {
      // isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }



  }, [file]);





  return { file, setFile, preview, setPreview, image }
}