import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import imageUrl from "../../assets/blog-logo.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../context/DataProvider';
import toastr from 'toastr';

import 'toastr/build/toastr.min.css';


const Login = ({ setIsAuthenticated }) => {
    const { setAccount } = useContext(MyContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const UserLogin = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("http://localhost:3030/user/login",
                user
            )
            setIsAuthenticated(true)
            if (res.data.message) {
                toastr.success(res.data.message, 'Success');
                localStorage.setItem('token', res.data.token);
                setAccount({ username: user.username, name: res.data.name })
                setUser({
                    username: "",
                    password: "",
                });
                navigate('/')
            }
        } catch (error) {
            toastr.error(error.response.data.message, 'Error');
            navigate('/signup')
            console.log(error)

        }
    }
    return (
        <div className="flex justify-center items-center ">
            <div className="flex w-[500px] m-[20px] shadow-lg p-4">
                <div className="w-full flex flex-col items-center">
                    <img className="w-[250px] mb-4" src={imageUrl} alt="img" />
                    <div className="flex flex-col items-center mb-4">
                        <h1 className="text-3xl mb-2">Login to your account</h1>
                    </div>
                    <form className="flex flex-col items-center w-full" >
                        <input
                            type="text"
                            placeholder="Username"
                            name="email"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            required
                            className="m-2 p-2 border rounded w-full max-w-[400px]"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                            className="m-2 p-2 border rounded w-full max-w-[400px]"
                        />
                        <Button
                            type="submit"
                            onClick={UserLogin}
                            variant="contained"
                            className="mt-4 w-full max-w-[400px]"
                        >
                            LOGIN
                        </Button>
                    </form>
                    <div className="w-full text-center mt-4">
                        <p>or</p>
                        <Link to='/signup'>
                            <Button variant="outlined" className="mt-2">
                                CREATE AN ACCOUNT
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
