import{ useContext, useState,useEffect } from 'react'
import {GlobalState} from '../component/GlobelState'
import axios from 'axios'
import{useHistory,useParams} from 'react-router-dom'
import Loading from '../loader/loader'  
import '../css/createBook.css'

const initialState = {
    product_id:'',
    title:'',
    price:'',
    description:'',
    content:'',
    category:'',
    _id:''

}

function Categories(){
    const state = useContext(GlobalState)
    const [categories] = state.createBookAPI.categories
    const [category,setCategory] = useState('')
    const [token] = state.token
    const [callback,setCallback] = state.createBookAPI.callback
    const [onEdit,setOnEdit] = useState(false)
    const [id,setID] = useState('')

    const [product,setProduct] = useState(initialState)
    const [images,setImages] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [onEditt,setOnEditt] = useState(false)
    const param = useParams()
    const[products] = state.ProductsAPI.products

    const history = useHistory()
    const [loading,setLoading] = useState(false)
    const [calback,setCalback] = state.ProductsAPI.calback

   
    useEffect(()=>{
        if(param.id){
            setOnEdit(true)
            products.forEach(product =>{
                if(product._id === param.id){
                setProduct(product)
                setImages(product.images)
                }
            })
            
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[param.id,products])


    const createCategory = async e =>{
        e.preventDefault()

        try {
            if(onEditt){

                const res = await axios.put(`/api/category/${id}`,{name:category},{
                    headers:{Authorization:token}
                })
                
                alert(res.data.msg)

            }else{
                const res = await axios.post('/api/category',{name:category},{
                    headers:{Authorization:token}
                })
                
                alert(res.data.msg)
    
            }
            setOnEditt(false)
            setCategory('')
            setCallback(!callback)

            
        } catch (err) {
            alert(err.response.data.msg)
        }

    }

    const editCategory= async (id,name) =>{
        setID(id)
        setCategory(name)
        setOnEditt(true)
    }

    const deleteCategory =async (id) =>{
        if(window.confirm("Do You want to delete?"))
         {
            const res = await axios.delete(`/api/category/${id}`,{
                headers : {Authorization: token}
            
            })

            alert(res.data.msg)
            setCallback(!callback)

        }
    }

    const Upload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) 
            return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("file not found")

            if(file.size >1024*1024) return alert("Size is to large")

            if(file.type !=='image/jpeg' && file.type !== 'image/png') return alert("Incorrect file format")


            let formData = new FormData()
            formData.append('file',file)

            setLoading(true)
            const res = await axios.post('/api/upload',formData,{
                headers:{'content-type':'multipart/form-data',Authorization:token}
            })
            setLoading(false)
           setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    const ChangeInput = e =>{
        const {name,value} = e.target
        setProduct({...product,[name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You are not an Amin")
            if(!images) return alert("No image Upload")

            if(onEdit){

            await axios.put(`/api/products/${product._id}`,{...product,images},{
                headers:{Authorization:token}
            })

            }else{

            await axios.post('/api/products',{...product,images},{
                headers:{Authorization:token}
            })

            }
            setCalback(!calback)
            history.push("/")
            window.location.href="/books";

        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    const Destroy = async () =>{
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy',{public_id: images.public_id},{
                headers:{Authorization:token}
            })
            setLoading(false)
            setImages(false)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const Style={
        display: images ? "block" : "none"
    }

    return(
        <div>
            <div className="container-fluid Add">
            <form onSubmit={createCategory}>
            <label htmlFor="category"><h2>Add a Category</h2></label><br />
            <input type="text" name="category" value={category} onChange={e =>setCategory(e.target.value)} required/>
            <button type="submit" className="btn btn-primary">{onEditt ? "Update" : "Save"}</button>
      
            </form>
            </div>
            <div className="container-fluid Add"> 

                {
                    categories.map(category =>(
                        <div key={category._id}>
                            <h3>{category.name}</h3>

                        <button className="btn btn-info ml-2" onClick={() => editCategory(category._id,category.name)}>Edit</button>
                        <button className="btn btn-info ml-2" onClick={() =>deleteCategory(category._id)}>Delete</button> <br /><br />
                        

                        </div>
                    ))
                }
            </div>
<br />

<div className="border">
<h2 className=" center">Create a Book </h2>

<div className="create">

    <div className="upload">
    <input type="file" name="file" onChange={Upload} id="file"></input>
  {
      loading ? <div id="img"> <Loading style="load"/> </div>
      :<div id="img" style={Style}>
      <img src={images ? images.url : ''} alt="" ></img>
      <button className="btn" onClick={Destroy}>X</button>
      </div>
  
  }
   </div>

</div>

<div className="container my-3">
    

<form onSubmit={handleSubmit} id="form">
 
    <label htmlFor="produoct_id">Product ID:- </label>
    <input type="text" name="product_id" required value={product.product_id} onChange = {ChangeInput} disabled={onEdit}/>  <br />

    <label htmlFor="title" id='One'>Title:- </label>
    <input type="text" name="title" required value={product.title} onChange = {ChangeInput}/>  <br />


    <label htmlFor="price">Price:- </label>
    <input type="number" name="price" required value={product.price} onChange = {ChangeInput}/>  <br />

    <label htmlFor="description">Desceription:- </label>
    <textarea type="text" name="description" required value={product.description}  rows="3" onChange = {ChangeInput}/>  <br />

    <label htmlFor="content">Content:- </label>
    <textarea type="text" name="content" required value={product.content} rows="3" onChange = {ChangeInput}/>  <br />
    
    <label htmlFor="category">Category:- </label>
<div id="category">
    <select name="category" value={product.category} onChange = {ChangeInput}>
        <option value=""> Select Category </option>
        {
            categories.map(category =>(
                <option value={category._id} key={category._id}>
                    {category.name}
                </option>
            ))
        }
    </select>
    </div>
     <br /> <br />
<button className="btn btn-primary ml" type="submit">{onEdit ? "Update" : "Create"}</button>

</form>
</div>
</div>







        </div>
    )
}

export default Categories