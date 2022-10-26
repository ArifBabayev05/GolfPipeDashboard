import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const EmployeeDetail = () => {


  const { id } = useParams()
  const url = `http://localhost:1003/products/${id}`
  const [product, setProduct] = useState({
    loading: false,
    data: null,
    error: false
  })



  let content = null

  useEffect(() => {
    setProduct({
      loading: true,
      data: null,
      error: false

    })

    axios.get(url)
      .then(response => {
        setProduct({
          loading: false,
          data: response.data,
          error: false
        })

          .catch(() => {
            setProduct({
              loading: false,
              data: null,
              error: true
            })
          })
      })
  }, [url])




  if (product.error) {
    content = <p>Restart Page Please.</p>
  }
  if (product.data) {
    content =

      <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg'>
        <div className='card-header'>
          <h1 className='text-4xl text-center' style={{ 'color': '#EA744B', 'fontWeight': 'bold' }}>Lead Detail</h1>
          <div className='d-flex' style={{'margin-top':'50px'}}>
            <div className=' flex headerImage me-4 my-3 mb-3'>
              <label htmlFor='Id' className='rounded-full text-white col-lg-5' style={{'backgroundColor':'#ff5e26','padding':'5px 20px'}}>Id:</label>
              <h1 className='mx-4 flex rounded-xl text-white col-lg-5' style={{"align-items":"center","display":"flex",'backgroundColor':'#a3a3a3','padding':'5px 20px'}}> {product.data._id}</h1>
            </div>
            <div className=' flex headerImage me-4 my-3 mb-3'>
              <label htmlFor='Id' className='rounded-full text-white col-lg-5' style={{'backgroundColor':'#ff5e26','padding':'5px 20px'}}>Name:</label>
              <h1 className='mx-4 flex rounded-xl text-white col-lg-5' style={{"align-items":"center","display":"flex",'backgroundColor':'#a3a3a3','padding':'5px 20px'}}> {product.data.name}</h1>
            </div>
            <div className=' flex headerImage me-4 my-3 mb-3'>
              <label htmlFor='Id' className='rounded-full text-white col-lg-5' style={{'backgroundColor':'#ff5e26','padding':'5px 20px'}}>Mail:</label>
              <h1 className='mx-4 flex rounded-xl text-white col-lg-5' style={{"align-items":"center","display":"flex",'backgroundColor':'#a3a3a3','padding':'5px 20px'}}> {product.data.mail}</h1>
            </div>
            <div className=' flex headerImage me-4 my-3 mb-3'>
              <label htmlFor='Id' className='rounded-full text-white col-lg-5' style={{'backgroundColor':'#ff5e26','padding':'5px 20px'}}>Tel Number:</label>
              <h1 className='mx-4 flex rounded-xl text-white col-lg-5' style={{"align-items":"center","display":"flex",'backgroundColor':'#a3a3a3','padding':'5px 20px'}}> {product.data.tel}</h1>
            </div>
            <div className=' flex headerImage me-4 my-3 mb-3'>
              <label htmlFor='Id' className='rounded-full text-white col-lg-5' style={{'backgroundColor':'#ff5e26','padding':'5px 20px'}}>Lear Source:</label>
              <h1 className='mx-4 flex rounded-xl text-white col-lg-5' style={{"align-items":"center","display":"flex",'backgroundColor':'#a3a3a3','padding':'5px 20px'}}> {product.data.leadSource}</h1>
            </div>

            
      
            <div class="flex items-center justify-between">
                                        <a href='/employees' className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded leading-tight " style={{"margin-top":'40px'}} type="submit">
                                            Go Back
                                        </a>
                                    </div>
    


          </div>

        </div>


        <div className='card-body'>
          <div className='top_infos d-flex'>
            {/* <p className='me-2'>{product.data.city.name}</p>
            <p>{product.data.company.name}</p> */}

          </div>



        </div>



      </div>

  }

  return (
    <div className='container'>

      <div>{content}</div>
    </div>


  )
}

export default EmployeeDetail