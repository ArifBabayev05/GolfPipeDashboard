import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Table.css'
import { SiGmail } from 'react-icons/si';
import { FaPhoneAlt } from 'react-icons/fa'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Employees = (props) => {
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  const [dataLength, setDataLength] = useState()

  const url = 'http://localhost:1003/products';
  const [datas, setDatas] = useState({
    name: "",
    mail: "",
    tel: "",
    leadSource: "",

  })
  function submit(e) {
    e.preventDefault();

    axios.post(url, {
      name: datas.name,
      tel: datas.tel,
      mail: datas.mail,
      leadSource: datas.leadSource,

    }).then(res => {


      toast.success("Succesful");
      navigate("/employees")
    }).catch(() => {
      toast.error("Error");
    })
  }

  function handle(e) {

    const newData = { ...datas }
    newData[e.target.id] = e.target.value;
    setDatas(newData);
  }
  useEffect(() => {
    axios.get('http://localhost:1003/products')

      .then(res => {
        setData(res.data)
      }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:1003/products')

      .then(res => {
        setDataLength(res.data.length)
      }).catch(err => console.log(err))
  }, [])

  const Delete = (_id, e) => {
    const url = `http://localhost:1003/products/${_id}`

    axios.delete(url)
      .then(res => {
        toast.success("Deleted")

      }).catch(err => toast.error(err))
  }
  function Update(_id) {

    props.history.push("/company" + _id)
    // navigate("/companyupdate")

  }
  const array = data.filter((value) => {
    if (query === "") {
      return value;
    }
    else if (value.name.toLowerCase().includes(query.toLowerCase())) {
      return value;
    }

  }).map((data, index) => {
    return (
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {data.name}
          </th>
          <td class="py-4 px-6">
            <p className='flex '><span className='mx-2'><SiGmail /></span> {data.mail}</p>
            <p className='flex'><span className='mx-2'><FaPhoneAlt /></span>{data.tel}</p>

          </td>
          <td class="py-4 px-6">
            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              {data.leadSource}
            </button>

          </td>

          <td class="py-4 px-6 text-right">
            <a class="font-medium text-blue-600 dark:text-red-500 hover:underline"> <Link to={`/employeedetail/${data._id}`} onClick={() => Update(data._id)} className='btn mx-4 btn-info update'>Details</Link></a>

            <button href="#" onClick={(e) => Delete(data._id, e)} class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>

          </td>
        </tr>

      </tbody>
    )
  })


  return (
    <div>
      <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg'>

        <div>
          <div className="container-fluid">
            <div className="row flex-nowrap">

              <div className="col py-3">
                <div className='row'>
                  <div className='col-md-9 col-sm-6 col-lg-12 d-flex mb-3 justify-content-between'>
                    <div className='flex justify-between'>
                      <h3 className='text-4xl mb-4'>{dataLength} Leads</h3>
                      <div className='d-flex mb-4 mt-2'>
                        {/* <a type="button" href='/employees/add' >

                        </a> */}


                        <button onClick={onOpenModal} class="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
                          Create Leads
                        </button>
                        <Modal open={open} onClose={onCloseModal} center>
                          <div>
                            <div className="container-fluid">
                              <div className="row flex-nowrap">
                                <div className="col py-7">
                                  <div class="w-full max-w-xs">
                                    <h1 className='text-4xl text-center' style={{ 'color': '#EA744B', 'fontWeight': 'bold' }}>Creaete Lead</h1>
                                    <form enctype="multipart/form-data" method="post" onSubmit={(e) => submit(e)} class="bg-orange shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                      <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                          Name
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="name" id="name" />
                                      </div>
                                      <div class="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                          Mail
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="name" id="mail" />
                                      </div>
                                      <div class="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                          Tel Number
                                        </label>
                                        <input className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="name" id="tel" />
                                      </div>
                                      <div class="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                                          Lead Source
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="name" id="leadSource" />
                                      </div>
                                      <div class="flex items-center justify-between">
                                        <button className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded leading-tight bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 focus:outline-none focus:shadow-outline " type="submit">
                                          Create
                                        </button>
                                      </div>
                                    </form>

                                  </div>




                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal>

                      </div>
                    </div>
                    <form class="flex items-center">
                      <label for="simple-search" class="sr-only">Search</label>
                      <div class="relative w-full">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" onChange={(event) => setQuery(event.target.value)} id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required="" />
                      </div>

                    </form>

                  </div>


                </div>
                <div style={{ 'overflow-x': 'auto' }}>

                  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="py-3 px-6">
                            Lead name
                          </th>
                          <th scope="col" class="py-3 px-6">
                            Contact
                          </th>
                          <th scope="col" class="py-3 px-6">
                            Lead Source
                          </th>

                          <th scope="col" class="py-3 px-6">
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>

                      {array}


                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Employees