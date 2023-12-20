import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';


export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            {/* <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            
              <h2>Quote 1</h2>
              <p>Your quote here</p>
            
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                {/* <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} /> */}
                {/* <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button> */}
              {/* </div> */}
            {/* </div>  */}
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/900x700/?coffee" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
              <div className="carousel-caption">
                <div style={{marginBottom:"100px"}}>
                  <h1 style={{opacity:"70%", fontSize:"60px"}}>Bringing the flavor game to a whole new level</h1>
                  
                </div>

                <div className="d-flex justify-content-center align-items-center flex-column">  
                  <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?cafe" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
              <div className="carousel-caption">
                <div style={{marginBottom:"100px"}}>
                  <h1 style={{opacity:"70%", fontSize:"60px"}}>Indulging in flavors that make life delicious</h1>            
                </div>

                <div className="d-flex justify-content-center align-items-center flex-column">  
                  <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
              <div className="carousel-caption">
                <div style={{marginBottom:"100px"}}>
                  <h1 style={{opacity:"70%", fontSize:"60px"}}>Feasting my way through life, one bite at a time</h1>
                  
                </div>

                <div className="d-flex justify-content-center align-items-center flex-column">  
                  <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </div>
              </div>
            </div>
          </div>  
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {foodCat.length !== 0
          ? foodCat.map((data) => (
            <div className='row mb-3' key={data._id}>
              <div className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              {foodItem.length !== 0
                ? foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((filterItems) => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
                : <div>No data found</div>}
            </div>
          ))
          : <div></div>}

      </div>
      <Footer />
    </div>
  );
}
