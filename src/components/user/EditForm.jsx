import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { updateStudent } from '../../redux/studentSlice';
import { toast } from "react-toastify";
import Header from './Header';

export default function EditForm() {

    const { id } = useParams();
    console.log('id', id);
    const students = useSelector(state => state.students.students)
    console.log('students', students);
    const currentStudent = students.find(student => student.id === id)
    console.log('current', currentStudent);

    const [firstName, setFirstName] = useState(currentStudent.firstName);
    const [lastName, setLastName] = useState(currentStudent.lastName);
    const [dob, setDob] = useState(currentStudent.dob);
    const [address, setAddress] = useState(currentStudent.address);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/editstudent/${id}`, { id, firstName, lastName, dob, address })
            .then(res => {
                dispatch(updateStudent({ id, firstName, lastName, dob, address }))
                console.log(res)
                navigate('/')
                toast.success('Student updated successfully');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div >
            <Header/>
            <form className='px-4 py-4 lg:px-8 lg:py-4 lg:w-fit mx-auto border rounded-xl shadow my-4 lg:my-8 bg-white' onSubmit={handleUpdate}>

                <h1 className='flex justify-center mx-auto p-4 rounded-xl items-center text-2xl bg-gray-800 font-bold text-slate-50'>Edit Student</h1>

                <div className="space-y-12 mt-8">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        autoComplete="name"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        autoComplete="name"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                    Date of Birth
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="dob"
                                        id="dob"
                                        autoComplete="date"
                                        required
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows={5}
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to={'/'}>
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
