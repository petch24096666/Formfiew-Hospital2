import React from 'react';
import { Typography, Box, Button, Grid, Paper, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const ViewPatient = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  if (!patient) {
    return <Typography variant="h6">No patient data available</Typography>;
  }

  const { name, gender, birthDate, address, telecom, id } = patient;
  const fullName = name ? `${name[0].given.join(' ')} ${name[0].family}` : 'N/A';

  return (
    <Box sx={{ flexGrow: 1 }} >


      <Navbar />

      <nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li class="inline-flex items-center">
            <a href="/patients" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Patients List
            </a>
          </li>

          <li aria-current="page">
            <div class="flex items-center">
              <svg class="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
              </svg>
              <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Patient Observation
              </span>
            </div>
          </li>
        </ol>
      </nav>


      <div className="container mx-auto mt-8 p-4"
      style={{minHeight: '100vh', maxWidth: '800px'}}
      >


        <div className='p-4 bg-white shadow rounded-md'>
          <h1 className='text-2xl font-bold'>
            Patient Basic Information
          </h1>

          <hr className='my-4' />

          <div className="grid grid-cols-2 gap-4 text-start">
            <div className="col-span-1">
              <p className="text-base mb-2">
                <strong>Name:</strong> {fullName}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-base mb-2">
                <strong>ID:</strong> {id}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-base mb-2">
                <strong>Gender:</strong> {gender || 'N/A'}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-base mb-2">
                <strong>Birth Date:</strong> {birthDate || 'N/A'}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-base mb-2">
                <strong>Address:</strong> {address ? `${address[0].line[0]}, ${address[0].city}, ${address[0].state}, ${address[0].postalCode}, ${address[0].country}` : 'N/A'}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-base mb-2">
                <strong>Phone:</strong> {telecom && telecom.find(t => t.system === 'phone') ? telecom.find(t => t.system === 'phone').value : 'N/A'}
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-base mb-2">
                <strong>Email:</strong> {telecom && telecom.find(t => t.system === 'email') ? telecom.find(t => t.system === 'email').value : 'N/A'}
              </p>
            </div>
          </div>




        </div>
      </div>
    </Box>
  );
};

export default ViewPatient;
