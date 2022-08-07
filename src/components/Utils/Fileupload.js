import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { Navbar } from '../Navbar';
function Fileupload(props) {

    const [Images, setImages] = useState([])
    const ondelete =(image)=>{
        const currentIndex = Images.indexOf(image)
        let newImages = [...Images]
        newImages.splice(currentIndex,1)   

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        const url ='http://localhost:5000/api/product/uploadImage' 
        Axios.post(url, formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }
    return (
        <>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={80000000} >
                {({getRootProps, getInputProps})=>(
                    
                    <div style={{width:'300px', height:'250px',border:'1px solid black',display:'flex',alignItems:'center',justifyContent:'center'}} 
                    {...getRootProps()}
                    >
                        
                        <input {...getInputProps()}/> 
                        <i class="fas fa-plus" style={{fontSize:'3rem'}}></i>
                    </div>
                )}

            </Dropzone>

            <div style={{display:'flex',width:'300px', height:'250px',overflowX:'scroll'}} >
            {Images.map((image,index)=>(
                <div onClick={()=>ondelete(image)}>
                <img style={{width:'300px',minWidth:'300px',height:'250px'}} src={`http://localhost:5000/${image}`}alt={`proudctimg-${index}`}/>
            </div>
            ))}
                
            </div>
        </div>
        </>
    )
}

export default Fileupload
