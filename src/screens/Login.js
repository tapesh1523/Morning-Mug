import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Login() {
    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })

        });
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials");
        }
        if (json.success) {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/");
        }
    }
    return (
        <div style={{backgroundImage: 'url("https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/01/30154330/shutterstock_525495457-1.jpg")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50  m-auto mt-5 rounded text-white' style={{backgroundImage: 'url("https://wallpapers.com/images/hd/black-blur-background-ai0plsbfayz8go0c.jpg")', height: '40vh', backgroundSize: 'cover', opacity:'70%' }} onSubmit={handleSubmit}>
          <div className="p-3 pt-4">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone.</div>
          </div>
          <div className="p-3 pt-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className="m-3 mx-1 btn btn-danger">New User</Link>
        </form>

      </div>
    </div>
    )
}
