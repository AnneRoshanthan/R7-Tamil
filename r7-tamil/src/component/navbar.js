import React,{ useContext}  from 'react'
import {GlobalState} from './GlobelState'
import {BrowserRouter as Router,NavLink,Route,Switch} from 'react-router-dom';


import Signup from './signup';
import Login from './login';
import '../App.css'
import Home from './home';
import notFound from './notfound'
import Books from './book'
import Details from './details';
import axios from 'axios';
import Cart from './cart'
import Categories from './createBook'
import OrderHistory from './orderHistory'
import OrderDetails from './orders'

    const  Navbar = () => { 

        const state = useContext(GlobalState)
        // console.log(state)

        const [isLogged] = state.userAPI.isLogged
        const [isAdmin]  = state.userAPI.isAdmin
        const [cart] = state.userAPI.cart
       

      const  logoutUser = async() =>{
          await axios.get('/user/logout')
          localStorage.removeItem('firstLogin')
          window.location.href="/books";
      }



        const adminRouter = () =>{
            return(
                <div className="navbar-nav">
                    <li className="nav-item"><NavLink to="/create_product"  className="nav-link" activeStyle={{backgroundColor:'blue'}}>Create books</NavLink></li>

                </div>
            )
        }

        const loggedRouter = () =>{
            return(
                <div className="navbar-nav ml-auto">
                    <li className="nav-item"><NavLink to="/history"  className="nav-link" activeStyle={{backgroundColor:'blue'}}>Orders</NavLink></li>
                    <li className="nav-item"><NavLink to="/logout"  onClick={logoutUser} className="nav-link" activeStyle={{backgroundColor:'blue'}}>Logout</NavLink></li>

                </div>
            )
        }


        const adRouter = () =>{
            return(
                <div className="navbar-nav ml-auto">
                    <li className="nav-item"><NavLink to="/books"  className="nav-link" exact activeStyle={{backgroundColor:'blue'}}>Admin Panal</NavLink></li>

                </div>
            )
        }



        return(
            
            <Router>
            
            <nav className="navbar  navbar-dark navbar-expand-md ">
        <div className="container-fluid bg-dark">
            <div className="navbar-header">
                <a href="#!" className="navbar-brand " id="Show" ><i className="R7">R7-<b>Tamil</b></i></a>
            </div>{/*<!--Nav-Header-->*/}

            <div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbarsExample09"> 
                <span className="navbar-toggler-icon"></span>
            </button>
            </div>

            <div className="navbar-collapse collapse" id="navbar" >
               
               
                {
                    isAdmin ? adRouter () :
                <div>
                     <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to='/'  className="nav-link" exact activeStyle={{backgroundColor:'blue'}}>Home</NavLink></li>
                    <li className="nav-item"><NavLink to='/books'  className="nav-link" activeStyle={{backgroundColor:'blue'}}>Books</NavLink></li>
                    </ul>
                    </div>           
    }
                

                {isAdmin && adminRouter()}{
                    isLogged ? loggedRouter () :
                <div className="navbar-nav ml-auto">
                    <li className="nav-item"><NavLink to='/login'  className="nav-link" activeStyle={{backgroundColor:'blue'}} activeStyle={{backgroundColor:'blue'}}>Log in</NavLink></li>
                    <li className="nav-item"><NavLink to='/signup'  className="nav-link" activeStyle={{backgroundColor:'blue'}} activeStyle={{backgroundColor:'blue'}}>Sign up</NavLink></li>
                </div>
    }

{
    isAdmin ? '' 

:<div className="navbar-nav ">
    <li className="nav-item"><NavLink to='/cart'  className="nav-link" activeStyle={{backgroundColor:'blue'}}>Shop <span style={{color:'green'}}>{cart.length}</span></NavLink></li>
 </div>

    }

            </div>{/* <!--Nav-collapse--> */}
            
            
            
        </div>{/* <!--container--> */}
    </nav>
    
    <Switch>
<Route exact path="/" component={Home} />
<Route exact path="/signup" component={isLogged ? notFound : Signup} />
 <Route exact path="/login" component={isLogged ? notFound : Login} />
 <Route exact path="/create_product" component={isAdmin ? Categories: notFound } />
 <Route exact path="/edit/:id" component={isAdmin ? Categories: notFound } />
 <Route exact path="/history" component={isLogged ? OrderHistory : notFound}  />
 <Route exact path="/history/:id" component={isLogged ? OrderDetails : notFound}  />
 
 <Route exact path="/books" component={Books} />
 <Route exact path="/cart" component={Cart} />
 <Route exact path="/detail/:id" component={Details} />
 <Route exact path="*" component={notFound} />


    </Switch>
    
</Router>
        )
    }

export default Navbar;


