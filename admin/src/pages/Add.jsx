import React, { useState } from 'react'
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import upload from '../assets/upload.avif'

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative'>
        <Nav/>
        <Sidebar/>

        <main className='w-full md:w-[82%] pl-[25%] md:pl-[18%] pt-[90px] p-6 md:p-12'>
          <form className='w-full md:w-[90%] max-w-3xl pl-8 md:pl-24 md:ml-[35px] md:mt-[20px] flex flex-col gap-8'>
            <h1 className='text-2xl md:text-4xl font-semibold text-white'>Add Product Page</h1>

            <section className='flex flex-col gap-4'>
              <p className='text-xl md:text-2xl font-semibold'>Upload Image</p>
              <div className='flex flex-wrap items-center gap-4'>
                <label htmlFor='image1' className='w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer hover:border-[#46d1f7] border rounded-md overflow-hidden'>
                  <img src={image1 ? URL.createObjectURL(image1) : upload} alt='' className='w-full h-full' />
                  <input type='file' id='image1' hidden onChange={(e) => setImage1(e.target.files[0])} />
                </label>

                <label htmlFor='image2' className='w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer hover:border-[#46d1f7] border rounded-md overflow-hidden'>
                  <img src={image2 ? URL.createObjectURL(image2) : upload} alt='' className='w-full h-full' />
                  <input type='file' id='image2' hidden onChange={(e) => setImage2(e.target.files[0])} />
                </label>

                <label htmlFor='image3' className='w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer hover:border-[#46d1f7] border rounded-md overflow-hidden'>
                  <img src={image3 ? URL.createObjectURL(image3) : upload} alt='' className='w-full h-full ' />
                  <input type='file' id='image3' hidden onChange={(e) => setImage3(e.target.files[0])} />
                </label>

                <label htmlFor='image4' className='w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer hover:border-[#46d1f7] border rounded-md overflow-hidden'>
                  <img src={image4 ? URL.createObjectURL(image4) : upload} alt='' className='w-full h-full' />
                  <input type='file' id='image4' hidden onChange={(e) => setImage4(e.target.files[0])} />
                </label>
              </div>
            </section>

            <section className='flex flex-col gap-2'>
              <label className='text-xl md:text-2xl font-semibold'>Product Name</label>
              <input type='text' placeholder='Type here' className='w-full max-w-md h-10 rounded-lg hover:border-[#46d1f7] border-[2px] bg-slate-600 px-4 text-[18px] placeholder:text-[#ffffffc2]' />
            </section>
          </form>
        </main>
    </div>
  ) 
}

export default Add