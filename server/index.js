require('dotenv').config()

const axios = require('axios')
const cors = require('cors')
const express = require('express')

let axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_POWER_SPIKE_API_ENDPOINT
})

const app = express()

app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/', (req, res) => {
  axiosInstance.get('', {
    headers: {
      'Authorization': req.headers['authorization']
    }
  }).then(response => {
    res.status(200).send({ todos: response.data })
  }).catch(err => {
    console.log(err)
    res.status(400).send({ message: 'Something went wrong. Please try again' })
  })
})

app.post('/new', (req, res) => {
  axiosInstance.post('/new', req.body, {
    headers: {
      'Authorization': req.headers['authorization']
    }
  }).then(response => {
    res.status(201).send(response.data)
  }).catch(err => {
    console.log(err)
    res.status(400).send({ message: 'Something went wrong. Please try again' })
  })
})

app.delete('/delete/:id', (req, res) => {
  axiosInstance.delete(`/delete/${req.params.id}`, {
    headers: {
      'Authorization': req.headers['authorization']
    }
  }).then(response => {
    res.status(204).send(response.data)
  }).catch(err => {
    console.log(err)
    res.status(400).send({ message: 'Something went wrong. Please try again' })
  })
})

app.listen(3000, () => console.log('App running on port 3000'))
