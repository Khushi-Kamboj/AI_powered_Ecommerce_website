import React, { useContext, useState , useEffect} from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

const Lists = () => {
  let [list , setList] = useState([]);
  let [error, setError] = useState(null);
  let {serverUrl} = useContext(authDataContext)

  const fetchList = async() =>{
    try{
        let res = await axios.get(serverUrl + "/api/product/list");
        setList(res.data);
  setError(null);
    }catch(error){
  console.error("Fetch list error:", error);
  setError(error?.response?.data?.message || error.message || 'Fetch list error');
  setList([]);
    }
  }

  useEffect(() =>{
    fetchList();
  } , []) 

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative'>
      <Nav/>
      <div className='w-[100%] min-h-[100vh] flex items-center justify-start'>
        <Sidebar/>
        <div className='w-[82%] min-h-[100vh] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]'>
          <h1 className='text-[25px] font-semibold pl-[20px]'>All Listed Items</h1>
          {error && (
            <div className='px-4 py-2 rounded bg-red-600 text-white w-[90%] ml-[20px]'>
              {error}
            </div>
          )}
          {list ? list.length > 0 ?
            <div className='w-[95%] min-h-[300px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px] px-[20px]'>
              {list.map((item , index) =>(  
                <div key={index} className='w-[100%] min-h-[350px] border border-gray-300 rounded-lg flex flex-col
                  hover:scale-[1.02] duration-300'>
                    <img src={item.image1} alt={item.name} className='w-[100%] h-[200px] object-cover rounded-t-lg'/>     
                    <div className='w-[100%] min-h-[150px] flex flex-col gap-2 p-3'>
                        <h1 className='text-[18px] font-semibold'>{item.name}</h1>
                        <p className='text-[14px] text-gray-300'>{item.description.length > 100 ? item.description.slice(0, 100) + "..." : item.description}</p>    
                        <p className='text-[16px] font-semibold'>${item.price}</p>
                        <p className='text-[14px] text-gray-400'>Category: {item.category}</p>
                        <p className='text-[14px] text-gray-400'>Sub-category: {item.subCategory}</p> 
                        <p className='text-[14px] text-gray-400'>Sizes: {item.sizes.join(", ")}</p>
                    </div>
                </div>  
              ))} 
            </div>  
            : <h1 className='text-[20px] font-semibold pl-[20px]'>No items listed yet</h1>
            : <h1 className='text-[20px] font-semibold pl-[20px]'>Loading...</h1>
          }
        </div>
    </div>
    </div>
  )
}

export default Lists