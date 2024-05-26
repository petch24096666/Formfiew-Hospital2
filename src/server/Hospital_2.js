const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const FHIR_SERVER = 'http://localhost:8080/fhir';
const HOSPITAL1_SERVER = 'http://localhost:3001';

app.post('/create-patient', async (req, res) => {
    const { name, gender, birthDate, address, telecom } = req.body;

    // สร้าง Patient resource
    const patientResource = {
        resourceType: "Patient",
        name: [
            {
                use: "official",
                family: name.family,
                given: name.given
            }
        ],
        gender: gender,
        birthDate: birthDate,
        address: address,
        telecom: telecom
    };

    try {
        // ส่งคำร้องขอไปยัง FHIR server
        const response = await axios.post(`${FHIR_SERVER}/Patient`, patientResource);
        res.status(201).json(response.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            res.status(500).json({ error: 'No response received from FHIR server' });
        } else {
            res.status(500).json({ error: 'Error creating patient resource' });
        }
    }
});

app.get('/get-patient/:id', async (req, res) => {
    const patientID = req.params.id;

    try {
        const response = await axios.get(`${FHIR_SERVER}/Patient/${patientID}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        try {
            const response = await axios.get(`${HOSPITAL1_SERVER}/get-patient/${patientID}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching patient resource' });
        }
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Hospital 2 Server is running on port ${PORT}`);
});
