import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import {useCart } from './ContextReducer';

import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from './Cart';
export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    }
    const items=useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand fs-3 fst-italic custom-brand" to="/"><span className='text-warning '>M</span>orning<span className='text-warning'>M</span>ug</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    <ul className="navbar-nav me-auto ">
                        {(localStorage.getItem('authToken')) ?
                            <li className="nav-item">
                                <Link className="nav-link active fs-5 " to="/" aria-current="page"><span className='text-white fs-3'>|</span> My Orders</Link>
                            </li>
                            : ""}
                    </ul>
                    {(!localStorage.getItem("authToken")) ?
                        <div className='d-flex me-2'>
                            <Link className="btn text-white " to="/login"><span className='text-warning '>L</span>ogin</Link>
                            <div className='text-white fs-3'>|</div>
                            <Link className="btn text-white" to="/createuser"><span className='text-warning '>S</span>ign Up</Link>
                        </div>
                        :
                        <div>
                            <div className='btn text-white' onClick={() => { setCartView(true) }}>
                                My Cart {" "}
                                <Badge pill bg="danger">{items.length}</Badge>
                                {cartView ? (
                                <Modal onClose={() => setCartView(false)}>
                                    <Cart />
                                </Modal>
                            ) : null}
                            <div className='btn text-white mx-2' onClick={handleLogout}>
                                Logout
                            </div>
                            </div>
                        </div>
                    }
                </div>
            </nav>
        </div>
    )
}
