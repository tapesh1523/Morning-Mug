import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let [address, setAddress] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save the auth toke to local storage and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/login")

        }
        else {
            alert("Enter Valid Credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                <form className='w-50  m-auto mt-5 rounded text-white' style={{ backgroundImage: 'url("https://wallpapers.com/images/hd/black-blur-background-ai0plsbfayz8go0c.jpg")', height: '80vh', backgroundSize: 'cover', opacity: '70%' }} onSubmit={handleSubmit}>
                <div className="p-3 pt-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="p-3 pt-4">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="p-3 pt-4">
                        <label htmlFor="address" className="form-label">Address</label>
                        <fieldset>
                            <input type="text" className="form-control" name="geolocation" placeholder='"Enter your Delivery Adress"' value={credentials.geolocation} onChange={onChange} aria-describedby="emailHelp" />
                        </fieldset>
                    </div>
                    <div className="p-3 pt-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>

            </div>
            
        </div>
    )
}
