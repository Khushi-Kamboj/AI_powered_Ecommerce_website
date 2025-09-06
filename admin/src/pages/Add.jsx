import React, { useState, useContext } from 'react'
import axios from 'axios'
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import upload from '../assets/upload.avif'
import { authDataContext } from '../context/AuthContext';

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  let [name, setName] = useState('');
  let [desc, setDesc] = useState('');
  let [category, setCategory] = useState("Men");
  let [subCategory, setSubCategory] = useState("TopWear");
  let [bestSeller, setBestSeller] = useState(false);
  let [price, setPrice] = useState(0);
  let [size, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setMessage(null);

    // simple validation
    if (!name.trim() || !desc.trim()) {
      setMessage({ type: 'error', text: 'Please provide name and description.' });
      return;
    }
    if (!price || Number(price) <= 0) {
      setMessage({ type: 'error', text: 'Please provide a valid price.' });
      return;
    }
    if (!image1 && !image2 && !image3 && !image4) {
      setMessage({ type: 'error', text: 'Please upload at least one image.' });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      formData.append('name', name);
      formData.append('description', desc);
      formData.append('price', String(price));
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('sizes', JSON.stringify(size));
      formData.append('bestseller', String(bestSeller));

      const { data } = await axios.post(`${serverUrl}/api/product/addproduct`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setMessage({ type: 'success', text: `${data?.name || 'Product'} added successfully.` });
      // reset form
      setName('');
      setDesc('');
      setPrice(0);
      setSizes([]);
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);

    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Add product failed' });
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative'>
        <Nav/>
        <Sidebar/>

  <main className='w-[82%] ml-[18%] pt-[90px] p-4 md:p-12'>
          <form className='w-full md:w-[90%] max-w-3xl px-4 md:px-8 md:ml-8 md:mt-5 flex flex-col gap-8'>
            <h1 className='text-2xl md:text-4xl font-semibold text-white'>Add Product Page</h1>
            {message && (
              <div className={`px-4 py-2 rounded ${message.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                {message.text}
              </div>
            )}

            <section className='flex flex-col gap-4'>
              <p className='text-xl md:text-2xl font-semibold'>Upload Image</p>
              <div className='flex flex-wrap items-center gap-4'>
                <label htmlFor='image1' className='w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer hover:border-[#46d1f7] border rounded-md overflow-hidden'>
                  <img src={image1 ? URL.createObjectURL(image1) : upload} alt='' className='w-full h-full' />
                  <input type='file' id='image1' hidden onChange={(e) => setImage1(e.target.files[0])} required/>
                </label>

                <label htmlFor='image2' className='w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer hover:border-[#46d1f7] border rounded-md overflow-hidden'>
                  <img src={image2 ? URL.createObjectURL(image2) : upload} alt='' className='w-full h-full' />
                  <input type='file' id='image2' hidden onChange={(e) => setImage2(e.target.files[0])} required/>
                </label>

                <label htmlFor='image3' className='w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer hover:border-[#46d1f7] border rounded-md overflow-hidden'>
                  <img src={image3 ? URL.createObjectURL(image3) : upload} alt='' className='w-full h-full ' />
                  <input type='file' id='image3' hidden onChange={(e) => setImage3(e.target.files[0])} required/>
                </label>

                <label htmlFor='image4' className='w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer hover:border-[#46d1f7] border rounded-md overflow-hidden'>
                  <img src={image4 ? URL.createObjectURL(image4) : upload} alt='' className='w-full h-full' />
                  <input type='file' id='image4' hidden onChange={(e) => setImage4(e.target.files[0])} required/>
                </label>
              </div>
            </section>

            <section className='flex flex-col gap-2'>
              <label className='text-xl md:text-2xl font-semibold'>Product Name</label>
              <input type='text' placeholder='Type here' className='w-full md:max-w-md h-10 rounded-lg hover:border-black border-[2px] bg-gray-200 px-4 text-[18px] text-black placeholder:text-black' required onChange={(e) => setName(e.target.value)} value={name}/>
            </section>
            
            <section className='flex flex-col gap-2'>
              <label className='text-xl md:text-2xl font-semibold'>Product Description</label>
              <textarea type='text' placeholder='Type here' className='w-full md:max-w-full min-h-[80px] md:min-h-[120px] rounded-lg hover:border-black border-[2px] bg-gray-200 p-4 text-[18px] text-black placeholder:text-black' required onChange={(e) => setDesc(e.target.value)} value={desc}/>
            </section>

            <section className='flex flex-row gap-10 md:gap-12 flex-wrap'>
              <div className='flex flex-col gap-2'>
                <p className='text-xl md:text-2xl font-semibold'>Product Category</p>
                <select className='w-full md:max-w-md h-10 rounded-lg hover:border-black border-[2px] bg-gray-200 px-4 text-[18px] text-black placeholder:text-black' onChange={(e) => setCategory(e.target.value)}>
                  <option value='Men'>Men</option>
                  <option value='Women'>Women</option>
                  <option value='Kids'>Kids</option>
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-xl md:text-2xl font-semibold'>Sub Category</p>
                <select className='w-full md:max-w-md h-10 rounded-lg hover:border-black border-[2px] bg-gray-200 px-4 text-[18px] text-black placeholder:text-black' onChange={(e) => setSubCategory(e.target.value)}>
                  <option value='TopWear'>TopWear</option>
                  <option value='BottomWear'>BottomWear</option>
                  <option value='WinterWear'>WinterWear</option>
                </select>
              </div>
            </section>

            <section className='flex flex-col gap-2'>
              <label className='text-xl md:text-2xl font-semibold'>Product Price</label>
              <input type='number' placeholder='₹ 2000' className='w-full md:max-w-md h-10 rounded-lg hover:border-black border-[2px] bg-gray-200 px-4 text-[18px] text-black placeholder:text-black' onChange={(e) => setPrice(e.target.value)} required/>
            </section>

            <div className='flex flex-col gap-2'>
              <p className='text-xl md:text-2xl font-semibold'>Available Sizes</p>
              <div className='flex flex-row flex-wrap gap-4 w-full'>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                  <div
                    key={s}
                    role="checkbox"
                    tabIndex={0}
                    aria-checked={size.includes(s)}
                    className={`flex items-center justify-center px-4 py-2 rounded-md border cursor-pointer select-none min-w-[56px] transition-colors duration-150 ${size.includes(s) ? 'bg-[#46d1f7]/40 border-[#46d1f7] text-gray-200 shadow-sm' : 'bg-transparent text-white hover:bg-white/5'}`}
                    onClick={() => {
                      if (size.includes(s)) {
                        setSizes(size.filter((sz) => sz !== s));
                      } else {
                        setSizes([...size, s]);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (size.includes(s)) {
                          setSizes(size.filter((sz) => sz !== s));
                        } else {
                          setSizes([...size, s]);
                        }
                      }
                    }}
                  >
                    <span className='text-lg md:text-xl font-medium'>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <section className='flex items-center gap-4'>
              <input type='checkbox' id='bestseller' className='w-5 h-5 cursor-pointer' onChange={(e) => setBestSeller(e.target.checked)}/>
              <label htmlFor='bestseller' className='text-xl md:text-2xl font-semibold cursor-pointer'>Mark as Best Seller</label>
            </section>

            <button disabled={loading} type='submit' className={`w-full md:w-[40%] lg:w-[20%] h-10 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#46d1f7]/30 hover:bg-[#46d1f7]/50'} text-white font-semibold text-lg rounded-lg`} onClick={handleAddProduct}>
              {loading ? 'Adding...' : 'Add Product'}
            </button>

          </form>
        </main>
    </div>
  ) 
}

export default Add