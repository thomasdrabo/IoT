const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const InfluxDB = require('@influxdata/influxdb-client').InfluxDB
const Point = require('@influxdata/influxdb-client').Point

let port = process.env.PORT || 5302;
const hexToDecimal = hex => parseInt(hex, 16);

const url = 'http://localhost:8086';
const token = '5KEJZcwi4OGdNdOB0dIWOJfCe92PYrPj8qXOLd7NTOBblNP1_1pJj14feACxuM2cWfxTSVJfzqY0TIAmRYqCvQ==';
const org = 'keyce'
const bucket = '14e1295425dd0e08'

const influxDB = new InfluxDB({ url, token })







app.use(bodyParser.json({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.post('/temp', async (req, res) => {
  const writeApi = influxDB.getWriteApi(org, bucket)

  writeApi.useDefaultTags({ region: 'euw' })

  const temp = {
    "code": hexToDecimal(req.body.data.substring(0, 2)),
    "temp": hexToDecimal(req.body.data.substring(3, req.body.data.length)) / 10,
    "valid" : Math.random() < 0.5
  }

  console.log(temp);

  const point1 = new Point('temperature')
    .tag('code', temp.code)
    .tag('valid', temp.valid)
    .tag('capteurId', req.body.capteurId)
    .floatField('value', temp.temp)

  writeApi.writePoint(point1)

  /**
   * Flush pending writes and close writeApi.
   **/
  writeApi.close().then(() => {
    console.log('WRITE FINISHED')
  })
  //res.status(200).json({url: url, points : req.body.points});
});

app.post('/pression', async (req, res) => {
  const writeApi = influxDB.getWriteApi(org, bucket)

  writeApi.useDefaultTags({ region: 'euw' })

  const temp = {
    "code": hexToDecimal(req.body.data.substring(0, 2)),
    "pression": hexToDecimal(req.body.data.substring(3, req.body.data.length)),
    "status" : hexToDecimal(req.body.data.substring(3, req.body.data.length)) < 1000 ? "low" : hexToDecimal(req.body.data.substring(3, req.body.data.length)) > 1100 ? "high" : "normal",
  }

  console.log(temp);

  const point1 = new Point('pression')
    .tag('code', temp.code)
    .tag('status', temp.status)
    .tag('capteurId', req.body.capteurId)
    .floatField('value', temp.pression)

  writeApi.writePoint(point1)

  /**
   * Flush pending writes and close writeApi.
   **/
  writeApi.close().then(() => {
    console.log('WRITE FINISHED')
  })
  //res.status(200).json({url: url, points : req.body.points});
});

app.post('/mouv', async (req, res) => {
  const writeApi = influxDB.getWriteApi(org, bucket)

  writeApi.useDefaultTags({ region: 'euw' })

  const temp = {
    "code": hexToDecimal(req.body.data.substring(0, 2)),
    "movement": Boolean(req.body.data.substring(3, req.body.data.length)),
  }

  console.log(temp);

  const point1 = new Point('movement')
    .tag('code', temp.code)
    .tag('capteurId', req.body.capteurId)
    .booleanField('movement', temp.movement)

  writeApi.writePoint(point1)

  /**
   * Flush pending writes and close writeApi.
   **/
  writeApi.close().then(() => {
    console.log('WRITE FINISHED')
  })
  //res.status(200).json({url: url, points : req.body.points});
});

app.post('/hygro', async (req, res) => {
  const writeApi = influxDB.getWriteApi(org, bucket)

  writeApi.useDefaultTags({ region: 'euw' })

  const temp = {
    "code": hexToDecimal(req.body.data.substring(0, 2)),
    "humidity": hexToDecimal(req.body.data.substring(3, req.body.data.length)),
    "status" : hexToDecimal(req.body.data.substring(3, req.body.data.length)) < 40 ? "low" : hexToDecimal(req.body.data.substring(3, req.body.data.length)) > 60 ? "high" : "normal",
  }

  console.log(temp);

  const point1 = new Point('hygrometry')
    .tag('code', temp.code)
    .tag('status', temp.status)
    .tag('capteurId', req.body.capteurId)
    .floatField('value', temp.humidity)

  writeApi.writePoint(point1)

  /**
   * Flush pending writes and close writeApi.
   **/
  writeApi.close().then(() => {
    console.log('WRITE FINISHED')
  })
  //res.status(200).json({url: url, points : req.body.points});
});



//--------------------------------------------------------------------------------------------------------------


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});