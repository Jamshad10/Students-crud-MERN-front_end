import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
    name: 'students',
    initialState: {
        students: []
    },
    reducers: {
        getStudents: (state, action) => {
            state.students = action.payload.map(student => {
                return {
                    id: student._id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    dob: student.dob,
                    address: student.address
                }
            })
        },

        addStudent: (state, action) => {
            state.students.push(action.payload)
        },

        updateStudent: (state, action) => {
            const student = state.students.findIndex(student => student.id === action.payload.id)
            state.students[student] = {
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                dob: action.payload.dob,
                address: action.payload.address
            }
        },

        deleteStudent: (state, action) => {
            const id = action.payload.id;
            state.students = state.students.filter(user => user.id !== id)
        }
    }
});

export const { getStudents, addStudent, updateStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;