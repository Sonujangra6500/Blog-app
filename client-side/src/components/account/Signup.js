import { Button } from '@mui/material';
import imageUrl from "../../assets/blog-logo.png";
import { Link } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import { useState } from 'react';


const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpassword: "",
    });
    const UserRegister = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("https://blog-app-4w77.onrender.com/user/signup",
                user
            )
            if (res.data.message) {
                toastr.success(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            toastr.error(error.response.data.message)
            if (error.response.data.success) {
                navigate('/login')
            }
        }
        finally {
            setUser({
                firstname: "",
                lastname: "",
                username: "",
                password: "",
                confirmpassword: "",
            });
        }
    }
    return (
        <div className="flex justify-center">
            <div className="flex w-[500px]  shadow-lg py-4  bg-white">
                <div className="w-full flex flex-col items-center">
                    <img className="w-[150px] mb-2" src={imageUrl} alt="img" />
                    <div className="flex flex-col items-center mb-4">
                        <h1 className="text-3xl mb-2">Create an account</h1>
                        <p>
                            Already have an account?
                            <Link className="text-blue-600 underline ml-2" to="/login">Log in</Link>
                        </p>
                    </div>
                    <form className="flex flex-wrap justify-center">
                        <input
                            type="text"
                            placeholder="First name"
                            name="firstname"
                            value={user.firstname}
                            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                            required
                            className="m-1 p-2 border rounded w-full max-w-[400px]"
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            name="lastname"
                            value={user.lastname}
                            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                            required
                            className="m-1 p-2 border rounded w-full max-w-[400px]"
                        />
                        <input
                            type="text"
                            placeholder="UserName"
                            name="username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            required
                            className="m-1 p-2 border rounded w-full max-w-[400px]"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                            className="m-1 p-2 border rounded w-full max-w-[400px]"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmpassword"
                            value={user.confirmpassword}
                            onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                            required
                            className="m-1 mb-2 p-2 border rounded w-full max-w-[400px]"
                        />
                        <p>

                        </p>
                        <Button type="submit" onClick={UserRegister} variant="contained" className="  w-full max-w-[400px]">
                            SIGNUP
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
