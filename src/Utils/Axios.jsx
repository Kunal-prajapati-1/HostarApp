/* eslint-disable no-unused-vars */
import axios from 'axios'
import React from 'react'

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWVhOGM4NWRiY2M3M2UwZTU5Zjg0Y2YxNjc5YzkyYSIsIm5iZiI6MTcxOTY2MDAxOC4yOTAxNzIsInN1YiI6IjY2N2ZjYWJkNmViYzA4MzlhZmFmZTQ0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.psvKNSFDPzttkqDCDyhLk4B-7RNeJ8aRegPDrwt9nTA'
      }}
)

export default instance