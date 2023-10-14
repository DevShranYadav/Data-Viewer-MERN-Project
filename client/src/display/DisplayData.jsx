import React, { useEffect, useState } from 'react';
import { Card, Button } from 'semantic-ui-react'
import axios from 'axios';
import '../display/Display.css'



function DisplayData() {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [search, setSearch] = useState([])
  const [showDiv, setShowDiv] = useState({});
  
  useEffect(() => {
    // <---------- Data fetched from the Backend ---------->
    axios.get('http://localhost:5000')
      .then(response => {
        setData(response.data);
        setTotalData(response.data)
      })
      // <------------ Error handling while retrive data from backend ------>
      .catch(error => {
        console.log(error);
      })
  }, [])

  const serachData = (e) => {
    setSearch(e.target.value)
    let data1 = [...totalData];
    let newData = data1.filter((item) => {
      if (item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.address.city.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }
    });
    setData(newData);
  }



  return (
    // <---------Display Data on Browser----->
    <>
      <h2 style={{ marginLeft: 450, marginTop: 30 }}>Searching For Specific Result </h2>
      <div >
        <input style={{ marginLeft: 450, marginTop: 10, height: 23, width: 270 }}
          type="text" placeholder="Search Here" value={search} onChange={serachData} />
      </div>

      {
        data.map((item) => (
          <div>
            <div className='flex-container'
              style={{
                display: 'flex', marginTop: 20, marginRight: 50, marginLeft: 200, borderRadius: 5, height: 130, width: 1000,
                textAlign: 'center', borderStyle: 'solid', borderColor: 'gray'
              }}>
              <div style={{ marginLeft: 30, marginTop: 15, width: 250 }}>NAME <p style={{ marginTop: 30 }}>{item.name}</p></div>
              <div style={{ marginLeft: 30, width: 250, marginTop: 15 }}>CONTACT<p style={{ marginTop: 30 }}>{item.phone}</p></div>
              <div style={{ marginLeft: 30, width: 250, marginTop: 15 }}>CITY<p style={{ marginTop: 30 }}>{item.address.city}</p></div>
              <div style={{ marginLeft: 70, width: 100, marginTop: 50, color: 'blue' }} onClick={() => setShowDiv({ ...item })}>View Details</div>
            </div>
            {
              Object.keys(showDiv).length > 0 && showDiv?.id === item.id && <div>
                <div>
                  {console.log(showDiv)}
                  <div className='flex-container'
                    style={{
                      display: 'flex', marginTop: 20, marginRight: 50, marginLeft: 200, borderRadius: 5, height: 130, width: 1000,
                      textAlign: 'center', borderColor: 'gray'
                    }}>
                    <div style={{ marginLeft: 30, marginTop: 15, width: 250 }}> <p style={{ marginTop: 30 }}>{item.name}</p></div>
                    <div style={{ marginLeft: 30, width: 250, marginTop: 15 }}>CONTACT<p style={{ marginTop: 30 }}>{item.phone}</p></div>
                    <div style={{ marginLeft: 30, width: 250, marginTop: 15 }}>CITY<p style={{ marginTop: 30 }}>{item.address.city}</p></div>
                    <div style={{ marginLeft: 70, width: 100, marginTop: 50, color: 'red' }} onClick={() => setShowDiv({})}>Hide Details</div>
                  </div>
                  <div style={{ marginLeft: 320, marginTop: 5, width: 250 }}>Website<p style={{ marginTop: 10 }}>{item.website}</p></div>
                  <div style={{ display: 'flex' }}>
                    <div style={{ marginLeft: 320, marginTop: 2, width: 250 }}>Adress<p style={{ marginTop: 10 }}>{item.address.street + " " + item.address.suite + " " + item.address.city + " " + item.address.zipcode}</p></div>
                    <div style={{ marginLeft: 320, marginTop: 2, width: 250 }}>Contact Person<p style={{ marginTop: 10 }}>{item.username}</p></div>
                  </div >
                  <div style={{ display: 'flex' }}>
                    <div style={{ marginLeft: 320, marginTop: 2, width: 250 }}>Email<p style={{ marginTop: 10 }}>{item.email}</p></div>
                    <div style={{ marginLeft: 320, marginTop: 2, width: 250 }}>Company<p style={{ marginTop: 10 }}>{item.company.name}</p></div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div style={{ marginLeft: 320, marginTop: 2, width: 250 }}>Phone<p style={{ marginTop: 10 }}>{item.phone}</p></div>
                    <div style={{ marginLeft: 320, marginTop: 2, width: 250 }}>Company Type<p style={{ marginTop: 10 }}>{item.company.catchPhrase}</p></div>
                  </div>

                </div>
              </div>}
          </div >
        ))}

    </>
  )
}

export default DisplayData