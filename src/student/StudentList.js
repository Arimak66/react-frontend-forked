import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { NavLink, Link } from 'react-router-dom';

const StudentList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [iserror, setIsError] = useState('');
    const [imagename, setImagename]=useState('');

    const getStudents = () => {
        setLoading(true);
        setIsError(false);
        axios.get(apiURL + '/student',{
        auth: {
            username:localStorage.getItem('username'),
            password:localStorage.getItem('password')
        }
        })
            .then(res => {
                console.log(res.data);
                setData(res.data);
                //console.log(data);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    useEffect(() => {
        getStudents();
    }, []);



    return (
        <div className="container">
            <Link to='/addstudent'><button className='btn btn-primary'>Add Student</button></Link>
            <br/> <br/>
            <img src={imagename} width="300"/> <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='table-info'>
                        <th>idstudent</th><th>start_date</th><th>graduate_date</th><th>Select</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(student => (
                        <tr key={student.idstudent}>
                            <td>{student.idstudent}</td>
                            <td>{student.start_date.slice(0,10)}</td>
                            <td>{student.graduate_date.slice(0,10)}</td>
                            <td><NavLink to={`selectedstudent/${student.idstudent}`}>
                                <button className="btn btn-primary">Select({student.idstudent})</button>
                                </NavLink>
                            </td>
                            <td><NavLink to={`deletestudent/${student.idstudent}`}>
                                <button className="btn btn-danger">Delete({student.idstudent})</button>
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>{iserror}</p>
        </div>
    )
}

export default StudentList;