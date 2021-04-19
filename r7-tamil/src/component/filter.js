import React, { useContext } from 'react'
import {GlobalState} from '../component/GlobelState'

function Filters() {

    const state = useContext(GlobalState)
    const [categories] = state.createBookAPI.categories
    const [category,setCategory] = state.ProductsAPI.category
    const [sort,setSort] = state.ProductsAPI.sort
    const [search,setSearch] = state.ProductsAPI.search
    
    const handleCategory = e =>{
        setCategory(e.target.value)
        setSearch('')
    }
    
    return(
        <div>
            <span>Categories:-</span>
            <select name="category" value={category} onChange={handleCategory}>
                <option value=''>All Books</option>
                {
                    categories.map(category =>(
                        <option value={"category=" + category._id} key={category._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>

                <div>
            <input  value={search} type="text"  className="form-control" placeholder="Search..."
                onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
            />
                </div>

        </div>
    )
}

export default Filters