import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
const AddDealButton = (props) => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [data, setData] = useState([])
    const [dataLength, setDataLength] = useState()


    const url = 'http://localhost:1003/deals';
    const [datas, setDatas] = useState({
        person: "",
        organisation: "",
        title: "",
        valuet: "",
        closeDate: "",
        tel: "",
        mail: "",


    })
    function submit(e) {
        e.preventDefault();

        axios.post(url, {
            person: datas.person,
            organisation: datas.organisation,
            title: datas.title,
            valuet: datas.valuet,
            closeDate: datas.closeDate,
            tel: datas.tel,
            mail: datas.mail,


        }).then(res => {


            toast.success("Succesful");
            navigate("/order")
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
        axios.get('http://localhost:1003/deals')

            .then(res => {
                setData(res.data)
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:1003/deals')

            .then(res => {
                setDataLength(res.data.length)
            }).catch(err => console.log(err))
    }, [])

    const Delete = (_id, e) => {
        const url = `http://localhost:1003/deals/${_id}`

        axios.delete(url)
            .then(res => {
                toast.success("Deleted")

            }).catch(err => toast.error(err))
    }
    function Update(_id) {

        props.history.push("/order" + _id)
        // navigate("/companyupdate")

    }
    return (
        <div><button onClick={onOpenModal} class="text-white bg-[#03a624] hover:bg-[#01801b]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
            + Deal
        </button>
            <Modal open={open} onClose={onCloseModal} center>
                <div>
                    <div className="container">
                        <div className="row ">
                            <div className=" py-7">
                                <div class="w-full max-w-xs">
                                    <h1 className='text-4xl text-center' style={{ 'color': '#EA744B', 'fontWeight': 'bold' }}>Add Deal</h1>
                                    <form enctype="multipart/form-data" method="post" onSubmit={(e) => submit(e)} class="bg-orange shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                <i className="fa-solid fa-user mx-3"></i> Contact Person
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="text" id="person" />
                                        </div>

                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                <i className="fa-solid fa-building mx-3">   </i>Organization
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="text" id="organisation" />
                                        </div>

                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Title
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="text" id="title" />
                                        </div>

                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Value
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="number" min='1' id="valuet" />
                                        </div>

                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Expected Close Date
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="date" id="closeDate" />
                                        </div>

                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Phone
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="text" id="tel" />
                                        </div>

                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Email
                                            </label>
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => handle(e)} value={data.value} required type="text" id="mail" />
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
            </Modal></div>
    )
}

export default AddDealButton