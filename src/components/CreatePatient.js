// CreatePatient.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  Container,
  FormControl,
  InputLabel,
} from '@mui/material';
import Navbar from './Navbar';

const CreatePatient = ({ onPatientAdded }) => {
  const navigate = useNavigate();
  const [family, setFamily] = useState('');
  const [given, setGiven] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [line, setLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = {
      resourceType: 'Patient',
      name: [
        {
          family,
          given: given.split(' '),
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
      const response = await axios.post('http://localhost:8080/fhir/Patient', patientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Add Patient:', JSON.stringify(response.data, null, 2));
      onPatientAdded(); // เรียก callback เพื่ออัปเดตรายการผู้ป่วย
      setStatus('Patient created successfully.');
      navigate('/patients');
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
                Create Patient
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <Container sx={{ mt: 4 }}>

        <form onSubmit={handleSubmit} className='bg-white p-4 rounded-md shadow'>
          <h1 className='text-3xl font-bold'>
            Create Patient
          </h1>
          <TextField
            label="นามสกุล"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ชื่อ"
            value={given}
            onChange={(e) => setGiven(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>เพศ</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="เพศ"
            >
              <MenuItem value="male">ชาย</MenuItem>
              <MenuItem value="female">หญิง</MenuItem>
              <MenuItem value="other">อื่นๆ</MenuItem>
              <MenuItem value="unknown">ไม่ทราบ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="วันเกิด"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="ที่อยู่"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="เมือง"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="รัฐ/จังหวัด"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="รหัสไปรษณีย์"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ประเทศ"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="โทรศัพท์"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />

          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
            Create Patient
          </button>

          {status && <Typography variant="body1" color={status.includes('successfully') ? 'green' : 'red'}>{status}</Typography>}
        </form>
      </Container>
    </Box>
  );
};

export default CreatePatient;
