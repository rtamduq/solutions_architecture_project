import React from 'react'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const Navigate=useNavigate();
    return (
        <>
            <div className='home'>
                <Typography variant='h3' style={{color: "#f9f9f9"}}>Welcome To Book Application</Typography>
                <div className='homeButtons'>
                    <Button style={{margin:'10px'}} variant='contained' onClick={()=>Navigate('/signup')}>
                        Signup
                    </Button>
                    <Button style={{margin:'10px'}} variant='contained' onClick={()=>Navigate('/login')}>
                        Login
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Home