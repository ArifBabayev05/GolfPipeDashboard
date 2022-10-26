import { useTable, useSortBy } from "react-table";
import useColumns from "../data/hooks/useColumns";
import useRows from "../data/hooks/useRows";
import "../styles/Table.css";
import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';

export default function Orders(props) {
  const columns = useColumns();
  const data = useRows();
  const table = useTable({ columns, data }, useSortBy);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = table;
  const [query, setQuery] = useState("")
  const [Ddata, setData] = useState([])
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
  return (
    <div className="container">
      <div className='flex'>
        <div className='p-2 w-100 bg-white justify-between rounded-3xl dark:bg-secondary-dark-bg' style={{ 'display': 'content', 'width': '100%' }}>
          <div className='card-header px-5 flex justify-between' style={{ 'width': '100%' }}>
            <button onClick={onOpenModal} class="text-white bg-[#03a624] hover:bg-[#01801b]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
              + Deal
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
            <h1 className='text-3xl text-center text-orange-400 underline	justify-items-center block fs-1'>Deal Table</h1>

            <div className='flex'>
              <h1 className='text mx-2 text-center text-gray-600  flex	items-center fs-1'>1000$</h1>
              <h1 className='text mx-2 text-center text-gray-600  flex	items-center fs-1'>10 Deal</h1>

            </div>
          </div>

        </div>
      </div>
      {/* Apply the table props */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  }
                >

                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}

        {/* TODO: Get and Write Datas from API to here */}

        <tbody {...getTableBodyProps()}>
          {
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            cell.render("Cell")

                          }

                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}
