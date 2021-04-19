import React, { Component } from 'react'
import Loading from '../loader/loader' 

class Home extends Component{
    render(){
        return(
            <div>
            <h2> this is home</h2>
            <Loading />
            </div>
        )
    }
}
export default Home;