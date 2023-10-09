import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ErrorPage from './404';
import Header from '../../components/user/Header';

const StudentView = () => {

    //get student id from params
    const { id } = useParams();

    // Get the student with the  ID from the Redux store
    const student = useSelector((state) =>
        state.students.students.find((student) => student.id === id)
    );

    if (!student) {
        return (
            <div>
                <ErrorPage />
            </div>
        )
    };

    return (
        <div>
            <Header />
            <div className='flex items-center justify-center m-8'>
                <div className="max-w-sm rounded-xl overflow-hidden shadow-lg">
                    <img className="w-60 h-60 p-4 mx-6" src="https://img.freepik.com/free-vector/one-happy-boy-with-brown-backpack_1308-36695.jpg?w=360&t=st=1696828944~exp=1696829544~hmac=78fe6cce667a0c42e1f4f06d69b60c3c500b9de858b7f94983b7187cb4f2e65d" alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{student.firstName} {student.lastName}</div>
                        <h3 className="text-gray-700 text-base font-semibold">
                            DOB : <span className='font-normal'>{student.dob}</span>
                        </h3>
                        <h3 className="text-gray-700 text-base font-semibold">
                            Address : <span className='font-normal'>{student.address}</span>
                        </h3>
                    </div>
                    <div className="px-6 pb-4">
                        <Link to={'/'}>
                            <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
                                Back
                            </button>
                        </Link>
                        <Link to={`/edit/${student.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4">
                            Edit
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentView;
