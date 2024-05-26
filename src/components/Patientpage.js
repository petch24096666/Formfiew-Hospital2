import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fhir/Patient');
        setPatients(response.data.entry || []);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleEditClick = (patient) => {
    navigate('/update-patient', { state: { patient } });
  };

  const handleViewClick = (patient) => {
    navigate('/view-patient', { state: { patient } });
  };

  const handleJsonClick = (patient) => {
    navigate('/view-json', { state: { patient } });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/fhir/Patient/${id}`);
      setPatients(patients.filter(patient => patient.resource.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-8 p-4">

        <h1 className="text-3xl font-bold mb-4">All Patients</h1>
        <p className="text-gray-600 mb-4 text-xl">Use the navigation bar to create, update, or delete.</p>

        <div className="rounded-lg p-4 flex flex-col gap-4">

          {patients.map((entry) => (
            <div key={entry.resource.id} className = "border-b last:border-b-0 bg-white p-2 rounded-md shadow hover:scale-105 duration-300">
              <div className="flex justify-between items-center py-4">
                <div className='flex flex-row gap-2 items-center'>
                  <div className="text-gray-600 font-bold text-xl">ID: {entry.resource.id}</div>
                  <div className="text-lg font-medium">{`${entry.resource.name[0].family}, ${entry.resource.name[0].given.join(' ')}`}</div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleViewClick(entry.resource)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={() => handleEditClick(entry.resource)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDeleteClick(entry.resource.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => handleJsonClick(entry.resource)}
                  >
                    JSON
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
