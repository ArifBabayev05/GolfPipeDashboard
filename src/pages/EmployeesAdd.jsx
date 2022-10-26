import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const EmployeesAdd = () => {
    const navigate = useNavigate();

    const url = 'http://localhost:1003/products';
    const [data, setData] = useState({
        name: "",
        mail: "",
        tel: "",
        leadSource: "",

    })
    function submit(e) {
        e.preventDefault();

        axios.post(url, {
            name: data.name,
            tel: data.tel,
            mail: data.mail,
            leadSource: data.leadSource,

        }).then(res => {


            toast.success("Succesful");
            navigate("/employees")
        }).catch(() => {
            toast.error("Error");
        })
    }

    function handle(e) {

        const newData = { ...data }
        newData[e.target.id] = e.target.value;
        setData(newData);
    }
    return (
        <div>

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



        </div>
    )
}

export default EmployeesAdd