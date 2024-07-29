const express = require('express');
const axios = require('axios');

const app = express();
const port = 8080;  // Cambia esto si necesitas usar otro puerto

app.get('/metrics', async (req, res) => {
    try {
        // Solicita los datos desde tu API
        const response = await axios.get('http://192.168.1.73:5000/actuator/metrics');
        const data = response.data;
        console.log("=======================================");
        // Transforma los datos JSON al formato de Prometheus
        let metrics = '';

        data.names.forEach(name => {
            metrics += `metric_name{name="${name}"} 1\n`;  // Ajusta según sea necesario
        });

        res.set('Content-Type', 'text/plain');
        res.send(metrics);
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).send('Error fetching metrics');
    }
});

app.listen(port, () => {
    console.log(`Exporter running at http://localhost:${port}/metrics`);
});
