import React, {useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

function Signup () {
   
    const [user,setUser] = useState({
        name:'',email:'',password:''
    })
const onChangeInput =e =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value})
}

    const signupSubmit = async e =>{
        e.preventDefault()
        try {
            
            await axios.post('/user/signup',{...user}) 
            localStorage.setItem('firstLogin',true)
            window.location.href="/books";


        } catch (err) {
            alert(err.response.data.msg)
        }
    }

        return(
            <div className="bg">
        <div className="row justify-content-center" >
         <div className="col-3.5" id="center">
        <div className="cen"><b>Sign up</b></div>
       
            <form onSubmit={signupSubmit} method="POST">


            <div className="form-group">

                <div className="input-group flex-nowrap">
                <span className="input-group-text glyphicon glyphicon-user" id="addon-wrapping" ></span>
                <input id="name" type="text" name="name" placeholder="Name" className="form-control" 
                aria-label="name" aria-describedby="addon-wrapping" required value={user.name}  onChange={onChangeInput}/>
                
            </div> <small id="namee"></small> 
            </div>


                <div className="form-group">

                <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping">@</span>
                <input id="email" type="email" name="email" placeholder="R7-Tamil@gmail.com" className="form-control" 
                aria-label="email" aria-describedby="addon-wrapping" required value={user.email}  onChange={onChangeInput}/>
            </div>  <small id="emaill"></small>
            </div>

            <div className="form-group">
                <div className="input-group flex-nowrap">
                <span className="input-group-text glyphicon glyphicon-lock" id="addon-wrapping"> </span>
                <input id="password" type="password" name="password" className="form-control" placeholder="Password" required value={user.password}  onChange={onChangeInput}/>
            </div><small id="passwordd"></small>
        </div>

<div className="cen">
        <small> <span className="text-muted">By clicking on Sign up,you agree to </span> terms&amp; <br/>conditions <span className="text-muted">and</span> privacy policy</small>
    </div>

        <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Sign up</button>
            </div>

            <div className="cen">
             <span className="text-muted">Already have an account?</span>  <small className="lo"><Link to="/login"> Log in </Link>now</small>
            </div>
</form>
        </div>
    </div>
</div>
        )
    }

export default Signup;