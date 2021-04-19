import React, {useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'


function Login () {
   
        const [user,setUser] = useState({
            email:'',password:''
        })
    const onChangeInput =e =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    }

        const loginSubmit = async e =>{
            e.preventDefault()
            try {
                
                await axios.post('/user/login',{...user}) 
                localStorage.setItem('firstLogin',true)
                window.location.href="/books";


            } catch (err) {
                alert(err.response.data.msg)
            }
        }


        return(

<div className="row justify-content-center" >
     <div id="center" >
       
            <div id="b"><b>Log In</b></div>
            
                <form onSubmit={loginSubmit} method="POST">

                    <div className="form-group">

                    <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">@</span>
                    <input id="email" type="email" name="email" placeholder="Email" className="form-control" 
                    aria-label="email" aria-describedby="addon-wrapping" value={user.email} required  onChange={onChangeInput}/>
                    
                </div>
                <small id="emaill"></small>
</div>

            <div className="form-group">
                    <div className="input-group flex-nowrap">
                    <span className="input-group-text glyphicon glyphicon-lock" id="addon-wrapping"> </span>
                    <input id="password" type="password" name="password" className="form-control" placeholder="Password" value={user.password} required  onChange={onChangeInput}/>
                </div><small id="passwordd" ></small>
            </div> 

            <div className="form-group" >
                {/*onclick="return val()"*/}    <button  type="submit" className="btn btn-success btn-block">Log in</button>
            </div>

                <div className="cen" >
                   <small>forgot Your password?</small><br/>
                    <span className="text-muted">Don/'t You have any account Yet?</span> <small className="si"><Link to="/signup">Sign up</Link> </small><br/>

                    {/* <small id="hr">or</small> */}
                </div>

                

            {/* <div className="form-group">
                <button className="btn btn-danger btn-block">
                    <a className="fb" href="">
                    <span> <img src="../Starter Assets/bootstrap/bootstrap-icons/google.svg" alt="google"/> </span>
                    Sign in with Google</a></button>
        </div> */}
                </form>
            

    </div>
    
</div>

)
    }

export default Login;
