import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, TextField, Button, MenuItem, Container } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';

const UpdatePatient = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  const [firstName, setFirstName] = useState(patient ? patient.name[0].given.join(' ') : '');
  const [lastName, setLastName] = useState(patient ? patient.name[0].family : '');
  const [gender, setGender] = useState(patient ? patient.gender : '');
  const [birthDate, setBirthDate] = useState(patient ? patient.birthDate : '');
  const [line, setLine] = useState(patient ? patient.address[0].line[0] : '');
  const [city, setCity] = useState(patient ? patient.address[0].city : '');
  const [state, setState] = useState(patient ? patient.address[0].state : '');
  const [postalCode, setPostalCode] = useState(patient ? patient.address[0].postalCode : '');
  const [country, setCountry] = useState(patient ? patient.address[0].country : '');
  const [phone, setPhone] = useState(patient ? patient.telecom.find(t => t.system === 'phone').value : '');
  const [email, setEmail] = useState(patient ? patient.telecom.find(t => t.system === 'email').value : '');

  if (!patient) {
    return <Typography variant="h6">No patient selected</Typography>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedPatient = {
      resourceType: 'Patient',
      id: patient.id,
      name: [
        {
          family: lastName,
          given: firstName.split(' '),
        },
      ],
      gender,
      birthDate,
      address: [
        {
          use: 'home',
          line: [line],
          city,
          state,
          postalCode,
          country,
        },
      ],
      telecom: [
        {
          system: 'phone',
          value: phone,
          use: 'home',
        },
        {
          system: 'email',
          value: email,
          use: 'home',
        },
      ],
    };

    try {
      await axios.put(`http://localhost:8080/fhir/Patient/${patient.id}`, updatedPatient);
      alert('Patient updated successfully!');
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Failed to update patient.');
    }
  };

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
                Update Patient
              </span>
            </div>
          </li>
        </ol>
      </nav>


      <Container sx={{
        mt: 4,
        minHeight: '100vh',
        padding: '16px',
      }}>
        <form onSubmit={handleUpdate} className='bg-white p-4 rounded-md shadow'>
          <h1 className='text-3xl font-bold'>
            Update Patient
          </h1>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            fullWidth
            margin="normal"
            select
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </TextField>
          <TextField
            label="Birth Date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address Line"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ID"
            value={patient.id}
            fullWidth
            margin="normal"
            disabled
          />

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
            Update
          </button>

        </form>
      </Container>
    </Box>
  );
};

export default UpdatePatient;
