import React,{ useContext, useEffect, useState}  from 'react'
import {GlobalState} from './GlobelState'
import '../Items/productitem.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import PaypalButton from './PaypalButton'

function Cart (){
    const state = useContext(GlobalState)
    const [cart,setCart] = state.userAPI.cart
    const [total,setTotal] = useState(0)
    const [token] = state.token
    const [product,setProducts] = useState([])

    useEffect(() =>{
        const getTotal =() =>{
            const total = cart.reduce((prev,item)=>{
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)

        }
        getTotal()
    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart',{cart},{
            headers: {Authorization:token}
        })
    }

    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){item.quantity +=1}
            
        });
        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
            
        });
        setCart([...cart])
        addToCart(cart)
    }

    const remove = id =>{
        if(window.confirm("Do you Want to Delete this Book?")){
            cart.forEach((item,index) => {
                if(item._id === id){
                    cart.splice(index,1)
                }
                
            });
            setCart([...cart])
            addToCart(cart)
        }
    }


    const transSuccess = async(payment) =>{
        const {paymentID,address} = payment;

        await axios.post('/api/payment',{cart,paymentID,address},{
            headers:{Authorization:token}
        })
        setCart([])
        addToCart([])
        alert("You Successfuly purchased")
        
    }




    if(cart.length === 0)
    return <h2 className="Cart">Cart emty</h2>



    
    const buyNow =(productId) =>{
        alert(product)

    }

    return(
        <div>
            {
              
                cart.map(product =>(

                    <div className="container details_cen" key={product._id}>
        <div className="row justify-content-center" >
        <div className="col-lg-6 my-3">
                <div className="card">
                <h3 className="card-title cent">{product.title}</h3>
                    
                <div className="card-body">
                <img src={product.images.url} alt="" className="card-img-top" height="300rem"/>
                
                <h6 className="card-text text-muted cen">${product.price * product.quantity}</h6>
                <p>{product.description}</p>
                <p>{product.content}</p>
                <p>Sold:{product.sold}</p>

                <>
                <button type="button" className="btn btn-primary" onClick={()=>decrement(product._id)}>-</button>
                <span>{product.quantity}</span>
                <button type="button" className="btn btn-primary"onClick={()=>increment(product._id)}>+</button>
                </>


        <div className="butt">
            
           
                <button type="button" className="btn btn-primary buy" onClick={()=>remove(product._id)}>Delete</button>
            
        </div>

</div>
</div>
</div></div></div>


                ))
            }

<div>
    <h3>Total : ${total}</h3>
    <PaypalButton onClick={()=>buyNow(product._id)}
    total={total}
    transSuccess={transSuccess} />

    {/* <Link to="#!"> 
        <button type="button" className="btn btn-primary buy"
         onClick={()=>buyNow(product._id)}>Payment</button>
    </Link> */}


</div>




        </div>
    )
}

export default Cart;
