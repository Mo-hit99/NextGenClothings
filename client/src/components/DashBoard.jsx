import axios from "axios";
import { useEffect, useState } from "react"

export default function DashBoard() {
  
  const [image,setImage]=useState('');
  const [brand,setBrand]=useState('')
  const [title,setTitle]=useState('')
  const [price,setPrice]=useState('')
  const [description,setDescription]=useState('')
  const [category,setCategory]=useState('')
  const [rate,setRate]=useState('')
  const [count,setCount]=useState('') 
  const [productData,setProductData]= useState('');
  const [model ,setModal]= useState(false)
  
  const formData = new FormData()
  formData.append('brand',brand)
  formData.append('title',title)
  formData.append('price',price)
  formData.append('description',description)
  formData.append('category',category)
  formData.append('rate',rate)
  formData.append('count',count)
  if (image) {
    for (let i = 0; i < image.length; i++) {
      formData.append('image', image[i]);
  }
  } 
  useEffect(()=>{
   fetchProductData()
  },[])
  
  async function fetchProductData(){
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_LINK}/productData`)
      const productData = response.data.queryData
      setProductData(productData);
      if(!response){
        console.log("failed to fetch")
      }
      if(response.ok){
        console.log('fetch data successfully')
      }
      setBrand(productData.brand)
      setImage(productData.filename)
      
  } catch (error) {
    console.log({error : error.message})
  }
}
async function deleteProduct(id){
  try {
    const response = await axios.delete(`${import.meta.env.VITE_SERVER_LINK}/productData/${id}`)

    if(response){
      fetchProductData()
    }
    
} catch (error) {
  console.log({error : error.message})
}
}

async function getByIdData(id){
  try {
    const productDataId =await axios.get(import.meta.env.VITE_SERVER_LINK + `/productData/${id}`);
    const productDataById = productDataId.data;
    setBrand(productDataById.brand)
    setTitle(productDataById.title)
    setCategory(productDataById.category)
    setPrice(productDataById.price)
    setCount(productDataById.count)
    setRate(productDataById.rate)
    setDescription(productDataById.description)
  } catch (error) {
    console.log(error)
  }
}

async function updateProduct(id) {
  setModal(!model)
  getByIdData(id)
}
async function updateSubmitProduct(id) {
  try {
    const updateProduct =await axios.put(import.meta.env.VITE_SERVER_LINK + `/productData/${id}`,formData,{
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
    if(updateProduct){
      fetchProductData()
    }
  } catch (error) {
    alert('invalid Data or must fill fields')
    console.log(error)
  }
}

return (
  <section className="dashboard-home-screen">
   <h1>DashBoard</h1>
   <div className="admin-product-container">
    {
      productData && productData?.map((item)=> (
      <div key={item._id} className="admin-product-card">
    <div className="admin-product-card-image">
      <img className="admin-product-image" src={`${import.meta.env.VITE_SERVER_LINK}/productData/${item?.filename[0]}`} alt={item.category} />
    </div>
    <div className="admin-product-brand"> {item.brand} </div>
    <div className="admin-product-title"> {item.title} </div>
    <div className="admin-product-rate">⭐{item.rate} <span className="admin-product-count"></span>({item.count})</div>
    <div className="admin-product-price"> ₹{item.price} </div>
    <div className="admin-product-category"> {item.category}
        <div className="admin-product-author">{item.createdAt}</div>
        <div className="delete-update-btn-container">
          <button title="Edit" className="admin-update-btn" onClick={()=> updateProduct(item._id)} ><i className="fa-solid fa-pencil"></i></button>
          <button title="Delete" className="admin-delete-btn" onClick={()=>deleteProduct(item._id)}><i className="fa-regular fa-trash-can"></i></button>
        </div>
    </div>
    {
        model &&
      <div className="updateProduct-container">
        <button className='product-remove-btn' onClick={()=>setModal(false)}><i className="fa-solid fa-circle-xmark"></i></button>
      <form id='form-data' encType="multipart/form-data">
      <label htmlFor="brand">Brand</label>
      <input className='create-data' type="text" value={brand || ''} name="brand" id='brand' onChange={(e)=> setBrand(e.target.value)}/>
      <label htmlFor="title">Title</label>
      <input className='create-data' type="text" value={title || ''} name='title' id='title' onChange={(e)=> setTitle(e.target.value)}/>
      <label htmlFor="price">Price</label>
      <input className='create-data' type="text" value={price || ''} name='price' id='price' onChange={(e)=> setPrice(e.target.value)}/>
      <label htmlFor="category">Category</label>
      <input className='create-data' type="text" value={category || ''} name='category' id='category' onChange={(e)=> setCategory(e.target.value)}/>
      <label htmlFor="rate">Rate</label>
      <input className='create-data' type="text" value={rate || ''} name='rate' id='rate' onChange={(e)=> setRate(e.target.value)}/>
      <label htmlFor="count">Count</label>
      <input  className='create-data'type="text" name='count' value={count || ''} id='count' onChange={(e)=> setCount(e.target.value)} />
      <label htmlFor="description">Description</label>
      <textarea className='product-textarea' type="textarea" value={description || ''} name='description'id='description' onChange={(e)=> setDescription(e.target.value)}/>
      <label className='image-uploader' htmlFor="image-uploader"><i className="fa-solid fa-camera"></i>Upload Image</label>
      <input multiple className='image-input' type="file" name="image" id='image-uploader' onChange={(e)=> setImage(e.target.files)}/>
      <div className="btn-container">
      <button className='product-cancel-btn' onClick={()=> setModal(false)}>Cancel</button>
      <button type="button" className='product-save-btn' onClick={()=> updateSubmitProduct(item._id)}>Update</button>
      </div>
      </form>
      </div>
    }
    </div>
      ))
    }
    </div>
    </section>
  )
}
