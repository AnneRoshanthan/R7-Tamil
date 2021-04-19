import React,{useContext} from 'react'
import './productitem.css'
import {Link} from 'react-router-dom'
import {GlobalState} from '../component/GlobelState'


 function ProductItem({product,isAdmin,deleteProduct,handleCheck}){
     
    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart
    // const [loading,setLoading] = useState(false)

   

   
    // if(loading) return <Loading />


     return(
         <div>
                

<div className="row">
           
            <div className="col-11 cmy">

            {
                    isAdmin && <input type="checkbox" checked={product.checked}
                    onChange={()=> handleCheck(product._id)}/>
                }
                <div className="card cardd">
                
                    <img src={product.images.url} alt="" className="card-img-top" height="300rem"/>
                    
                 



                <div className="card-body">
                <h6 className="card-title cen">{product.title}</h6>
                <h6 className="card-text text-muted cen">${product.price}</h6>
                <p className="over">{product.description}</p>

{ isAdmin ?

        <div className="butt">

            <Link to={`/edit/${product._id}`}>
                <button type="button" className="btn btn-primary my-3 right"> Edit </button>
             </Link>

            <Link to="#!"> 
                <button type="button" className="btn btn-primary buy" onClick={()=>deleteProduct(product._id,product.images.public_id)}>Delete</button>
            </Link>
        </div>


        :<div className="butt">

            <Link to={`/detail/${product._id}`}>
                <button type="button" className="btn btn-primary my-3 right"> Details </button>
             </Link>

            <Link to="#!" onClick={() =>addCart(product)}> 
                <button type="button" className="btn btn-primary buy">Buy</button>
            </Link>
        </div>
 }
            </div>
            </div>
            
            </div>
    
             
                
        
    </div>
    
<br /><br />

      </div>

     )
 }

 export default ProductItem