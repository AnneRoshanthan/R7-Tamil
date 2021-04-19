import React, { useContext } from 'react'
import {GlobalState} from '../component/GlobelState'


function LoadMore() {
    
    const state = useContext(GlobalState)
    const [page,setPage] = state.ProductsAPI.page
    const [result] = state.ProductsAPI.result
    
    return(
            <div>

                {
                    result<page *9 ? ""
                    :<button onClick={() => setPage(page+1)} className="btn btn-primary">Next</button>
                }

            </div>
    )
}

export default LoadMore