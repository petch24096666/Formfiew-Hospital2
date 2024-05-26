import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import CTA from './Cta';

const WelcomePage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>

      <Navbar />

      <CTA />


    </Box>
  );
};

export default WelcomePage;
