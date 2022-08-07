import React,{useEffect,useState} from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        if(props.detail.image && props.detail.image.length >0){
            let image =[];

            props.detail.image && props.detail.image.map(item=>{
                image.push({
                    original:`http://localhost:5000/${item}`,
                    thumbnail:`http://localhost:5000/${item}`,
                })
            })
            setImages(image)
        }
    }, [props.detail])
    return (
        <div>
            <ImageGallery items={Images} thumbnailPosition="left" lazyLoad={true}  autoPlay={true} showPlayButton={false}/>
        </div>
    )
}

export default ProductImage
