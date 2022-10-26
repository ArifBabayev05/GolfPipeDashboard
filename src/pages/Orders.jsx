import { useTable, useSortBy } from "react-table";
import useColumns from "../data/hooks/useColumns";
import useRows from "../data/hooks/useRows";
import "../styles/Table.css";
import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import AddDealButton from "../components/AddDealButton";

export default function Orders(props) {
  const columns = useColumns();
  const data = useRows();
  const table = useTable({ columns, data }, useSortBy);
  const [open, setOpen] = useState(false);
  const [Tdata, setData] = useState([])
  const [query, setQuery] = useState("")
  const navigate = useNavigate();
  const [dataLength, setDataLength] = useState()
  
  useEffect(() => {
    axios.get('http://localhost:1003/deals')

      .then(res => {

        setDataLength(res.data.length)
      }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:1003/deals')

      .then(res => {

        setData(res.data)
      }).catch(err => console.log(err))
  }, [])
  const Delete = (_id, e) => {
    const url = `http://localhost:1003/deals/${_id}`

    axios.delete(url)
      .then(res => {
        toast.success("Deleted")

      }).catch(err => toast.error(err))
  }
  const array = Tdata.filter((value) => {
    if (query === "") {
      return value;
    }
    else if (value.name.toLowerCase().includes(query.toLowerCase())) {
      return value;
    }

  }).map((Tdata, index) => {
    return (
      <tr>
        <td>{Tdata.title}</td>
        <td>{Tdata.valuet}</td>
        <td>{Tdata.organisation}</td>
        <td>{Tdata.person}</td>
        <td>{Tdata.tel}</td>
        <td>{Tdata.mail}</td>
        <td>{Tdata.closeDate.slice(0,10)}</td>

        <td><button onClick={(e) => Delete(Tdata._id, e)} className='btn btn-danger delete'>Delete</button></td>

      </tr>
    )
  })
  
  const sum = Tdata.map((Tdata, index) => {
    let result = 0;
    result = parseInt(Tdata.valuet) + result;
    return (
      <h1>{Tdata.valuet} and {result}</h1>
    

    )
  })

  return (
    <div className="container">
      <div className='flex'>
        <div className='p-2 w-100 bg-white justify-between rounded-3xl dark:bg-secondary-dark-bg' style={{ 'display': 'content', 'width': '100%' }}>
          <div className='card-header px-5 flex justify-between' style={{ 'width': '100%' }}>
            <AddDealButton />
            <h1 className='text-3xl text-center text-orange-400 underline	justify-items-center block fs-1'>Deal Table</h1>

            <div className='flex'>
              <h1 className='text mx-2 text-center text-gray-600  flex	items-center fs-1'>{sum}$</h1>
              <h1 className='text mx-2 text-center text-gray-600  flex	items-center fs-1'>{dataLength} Deal</h1>

            </div>
          </div>

        </div>
      </div>
      {/* Apply the table props */}

      <div className="container">
        <table>
          <tr>
            <th>Title</th>
            <th>Value</th>
            <th>Organization</th>
            <th>Contact Person</th>
            <th>Telephone Number</th>
            <th>Email Adress</th>
            <th>Expected Close Day</th>
            <th className='text-danger'>Events</th>
          </tr>
          {array}
        </table>
      </div>
    </div>
  );
}
