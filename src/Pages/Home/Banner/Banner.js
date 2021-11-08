import React from 'react';
import Grid from '@mui/material/Grid';
import chair from '../../../images/chair.png';
import Box from '@mui/material/Box';
import bg from '../../../images/bg.png';
import { Button, Typography, Container } from '@mui/material';


const bannerBg ={
    background : `url(${bg})`,
}

const verticalCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 400
}



const Banner = () => {
    return (
        <Container style={bannerBg} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid style={{...verticalCenter,textAlign: 'left'}} item xs={12} md={6}>
                    <Box>
                        <Typography variant='h3'>
                            Your New Smile <br /> Starts Here
                        </Typography>
                        <Typography variant='h6' sx={{fontSize:13, my:3, fontWeight:250, color:'gray'}}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta officiis quasi expedita numquam perferendis aliquid doloremque suscipit omnis? Quae voluptates alias, sed officia odio aliquid.
                        </Typography>
                        <Button variant="contained" style={{backgroundColor:'#5CE7ED'}}>Get Appointment</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} style={verticalCenter}>
                    <img style={{width:'350px'}} src={chair} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Banner;