import React ,{useState,useContext,useEffect}from 'react'
import Fileupload from '../Utils/Fileupload'
import Axios from 'axios';
import { useHistory } from 'react-router';
import { Navbar } from '../Navbar';
import SweetAlertContext from "../context/SweetAlertContext";

const category =[
    {key:1,value:"Vegetables"},
    {key:2,value:"Fruits"},
    {key:3,value:"Spices"},
    {key:4,value:"Snacks "},
    {key:5,value:"Dairy"},
    {key:6,value:"Dry Fruits"},
    {key:7,value:"Beverages"},
    {key:8,value:"Cooking & Baking essential"},
    {key: 9, value: "PANEER LABABDAR" },
    {key: 10, value: "VEG DUM BIRYANI" },
    {key: 11, value: "HAKKA NOODLES" },
    
]
const Delivery = [
    { key: 1, value: "New Products" },
    { key: 2, value: "Free Shipping" },
    { key: 3, value: "One Day Delivery" },
    { key: 4, value: "Two Day Delivery" },
]



function UploadProduct(props) {
    let history = useHistory();
    const  {upload,toggle, addminus}  = useContext(SweetAlertContext);

    useEffect(() => {
        addminus();
      });
    
    useEffect(() => {
        toggle();
    }, [])

    const [title, settitle] = useState("")
    const [desc, setdesc] = useState("")
    const [price, setprice] = useState(0)
    const [categoryvalue, setcategory] = useState(1)
    const [Deliveryvalue, setDelivery] = useState(1)
    const [Images, setImages] = useState([])
    const [quantity, setquantity] = useState(1)
    const titlechange =(event)=>{
        settitle(event.currentTarget.value)
    }
    const descchange =(event)=>{
        setdesc(event.currentTarget.value)
    }
    const pricechange =(event)=>{
        setprice(event.currentTarget.value)
    }
    const onchangecategory =(event)=>{
        setcategory(event.currentTarget.value)
    }
    const updateImages =(newImages)=>{
        setImages(newImages)
    }
    const onchangequantity =(event)=>{
        setquantity(event.currentTarget.value)
    }
    
    const onchangeDelivery =(event)=>{
        setDelivery(event.currentTarget.value)
    }
    const url = `http://localhost:5000/api/product/uploadProduct`
    
    const onsubmit = (e)=>{

        if(!title ||!desc ||!price || !Images||!categoryvalue ||!quantity ||!Delivery){
            return alert('fill all the fields')
        }
        const variables = {
            title: title,
            description: desc,
            price:price ,
            image: Images,
            category: categoryvalue,
            countInStock: quantity,
            delivery:Deliveryvalue,
        }
        e.preventDefault()
        Axios.post(url,variables)
        .then(response=>{
            if(response.data.success){
                history.push('/dry_fruits')
                upload();
            }
            else{
                props.showAlert("Failed to Upload Product","Danger")

            }
        })
    }
    return (
        <>
        <Navbar/>
        <div className="container" style={{margin:'2rem auto'}}>
            <div  style={{margin:'2rem auto', textAlign:'center'}}>
                <h2>Upload your Product here</h2>
            </div>

            <form onSubmit={onsubmit}>
                {/* Dropzone */}
                <Fileupload refreshFunction={updateImages}/>

                {/* title */}
                <label className="my-3">Title</label>
                <input  className="my-1" onChange={titlechange} value={title}/>
                <br />
                <br />
                {/* description */}
                <label  className="my-3">Description</label>
                <textarea  className="my-1" onChange={descchange} value={desc}/>
                <br />
                <br />
                {/* price */}
                <label  className="my-3">Price</label>
                <input  className="my-1"onChange={pricechange} value={price} type="number"/>
                <br />
                <br />
                {/* category */}
                <label  className="my-3">Category</label>
                <select onChange={onchangecategory} className="my-3">

                    {category.map(item=>(
                         <option  className="my-1" key={item.key} value={item.key}>{item.value}</option>
                    ))}
                   
                </select>
                <br />
                <br />
                {/* Delivery */}
                <label  className="my-3">Category</label>
                <select onChange={onchangeDelivery} className="my-3">

                    {Delivery.map(item=>(
                         <option  className="my-1" key={item.key} value={item.key}>{item.value}</option>
                    ))}
                   
                </select>
                <br />
                <br />
                {/* countInStock */}
                <label className="my-3">Quantity</label>
                <input  className="my-1" onChange={onchangequantity} value={quantity} type="number"/>
                <br />
                <br />
                {/* submit button */}
                <button className="btn btn-primary my-3" onClick={onsubmit}>Submit</button>
            </form>
        </div>
        </>
    )
}

export default UploadProduct
