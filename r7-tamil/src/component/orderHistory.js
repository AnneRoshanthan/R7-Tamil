import React, { useContext,useEffect } from 'react'
import {GlobalState} from './GlobelState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory(){
    const state = useContext(GlobalState)
    const [history,setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    

    useEffect(()=>{
        if(token){
            const getHistory = async()=>{
                if(isAdmin){
                    const res = await axios.get('/api/payment',{
                        headers:{Authorization:token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history',{
                        headers:{Authorization:token}
                    })
                    setHistory(res.data)
                }


                
            }
            getHistory()
        }
    },[token,isAdmin,setHistory])


    return(
        <div>
           <h2>History</h2>
           <h3>You have {history.length} orders</h3>

        <table>
            <thead>
        <tr>
            <th>Payment ID</th>
            <th>Purchased Date</th>
            <th>Purchased Time</th>
            <th></th>
        </tr>
        </thead>

        <tbody>

                {
                    history.map(items =>(
                        <tr key={items._id}>

                        <td>{items.paymentID}</td>
                        <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(items.createdAt).toLocaleTimeString()}</td>
                        <td><Link to={`/history/${items._id}`}>View</Link></td>

                        </tr>
                    ))
                }
        </tbody>

        </table>

        </div>
    )
}

export default OrderHistory