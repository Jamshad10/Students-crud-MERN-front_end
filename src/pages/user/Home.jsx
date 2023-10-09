import React, { useEffect, useState } from 'react';
import Header from '../../components/user/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteStudent, getStudents } from '../../redux/studentSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {

    const [search, setSearch] = useState('');
    // students from store
    const students = useSelector(state => state.students.students)
    console.log('stud', students);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000');
                dispatch(getStudents(response.data))
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [dispatch])

    //delete functionality
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");

        if (confirmDelete) {
            axios.delete(`http://localhost:8000/deletestudent/${id}`)
                .then(res => {
                    dispatch(deleteStudent({ id }));
                    console.log(res);
                    toast.success('Deleted Successfully');
                })
                .catch(err => console.log(err));
        }
    }

    //filteres students list for searching
    const filteredStudentsList = students.filter((item) =>
        item.firstName && item.firstName.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <>
            <Header />

            {/* Table Section Started */}
            <div className='w-full px-3 py-3 lg:px-20 lg:py-8'>
                <div className='flex items-center justify-center'>
                    <h1 className='p-4 text-4xl font-bold border-b-2 text-slate-800'>Students List</h1>
                </div>

                {/* Search Bar */}
                <div className='flex items-center justify-between py-4'>
                    <div className="flex justify-start items-center relative">
                        <input
                            className="text-sm leading-none text-left text-gray-600 px-4 py-3 w-full border rounded border-gray-300 outline-none"
                            type="text"
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <svg
                            className="absolute right-3 z-10 cursor-pointer"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                                stroke="#4B5563"
                                stroke-width="1.66667"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M21 21L15 15"
                                stroke="#4B5563"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <Link to={'/add'}>
                    <button className="bg-green-600 hover:bg-green-700 text-gray-50 font-bold py-2 px-4 rounded inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <span>Add New</span>
                    </button>
                    </Link>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg rounded-lg ">
                    <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date of Birth
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudentsList.map(student => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={student._id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {student.firstName}
                                        </th>
                                        <td className="px-6 py-4">
                                            {student.lastName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {student.dob}
                                        </td>
                                        <td className="px-6 py-4">
                                            {student.address}
                                        </td>
                                        <td className="px-6 py-4">

                                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                                <Link to={`/view/${student.id}`}>
                                                    <button
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-50 bg-green-500 border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>

                                                        View
                                                    </button>
                                                </Link>
                                                <Link to={`/edit/${student.id}`}>
                                                    <button
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-50 bg-blue-500 border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>

                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(student.id)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-50 bg-red-500 border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>

                                                    Delete
                                                </button>
                                            </div>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Table Section Ended */}
        </>
    )
}

export default Home;