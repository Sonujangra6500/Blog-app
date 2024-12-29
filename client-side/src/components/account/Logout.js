import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from "../Spinner"

const Logout = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        const LogoutUser = async () => {
            try {
                const res = await axios.post("http://localhost:3030/user/logout", {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                if (res.data.success) {
                    localStorage.removeItem("token");
                }
                navigate('/login')
            }
            catch (error) {
                console.log(error)
            }
        }
        LogoutUser();
    }, [])
    return (
        <div>
        <Spinner/> 
        </div>
    )
}

export default Logout
