const express = require('express');
const FetchData = require('./Routes/fetchData')
const axios = require('axios')
const cors = require('cors')

const app = express();
app.use(cors());
// <------------ Function the are fecthing data from Public API ------> 

app.get('/', async (req, res) => {
    try {
        const URL = 'https://jsonplaceholder.typicode.com/users';
        const response = await axios.get(URL);
        res.json(response.data);
        // <-------------- Error handling while feching data from API ------>        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while fetching the data' });

    }
})

// <------------- PORT where our Server Running --------->

app.listen(5000, () => {
    console.log("Sever is running on port 5000")
})