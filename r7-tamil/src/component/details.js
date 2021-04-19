import React,{useContext,useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'
import {GlobalState} from '../component/GlobelState'


function Details (){

    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.ProductsAPI.products
    const addCart = state.userAPI.addCart
    const [productDetail,setProductDetail] = useState([])   
    
    useEffect(()=>{
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setProductDetail(product)
            
            });
        }
    },[params.id,products])
    
    if (productDetail.length === 0) return null
    
    // console.log(productDetail)



return(
    <div>
        {/* <img src={productDetail.images.url} /> */}

<div className="container details_cen">
        <div className="row justify-content-center" >
        <div className="col-lg-6 my-3">
                <div className="card">
                <h3 className="card-title cent">{productDetail.title}</h3>
                    
                <div className="card-body">
                <img src={productDetail.images.url} alt="" className="card-img-top" height="300rem"/>
                
                <h6 className="card-text text-muted cen">${productDetail.price}</h6>
                <p>{productDetail.description}</p>
                <p>{productDetail.content}</p>
                <p>Sold:{productDetail.sold}</p>


        <div className="butt">
            
            <Link to="#!"> 
                <button type="button" className="btn btn-primary buy" onClick={()=>addCart(productDetail)}>Buy Now</button>
            </Link>

            
        </div>


            </div>
            </div>
            
</div>
</div>





</div>


     </div>
)
}

export default Details