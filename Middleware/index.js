const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const InfluxDB = require('@influxdata/influxdb-client').InfluxDB
const Point = require('@influxdata/influxdb-client').Point

let port = process.env.PORT || 5302;
const hexToDecimal = hex => parseInt(hex, 16);

const url = 'http://localhost:8086';
const token = 'U4R-iKUN3xiY-8D7Pe9lgOM58PngjiNHbXuQfAGZNkxh-OOp-vMq6kxtlOqgsqOqIf5I1jhQh4OcSAuXhlGTWA==';
const org = 'iot-org'
const bucket = '93f6d3982d3013a5'

const influxDB = new InfluxDB({ url, token })


app.use(bodyParser.json({ extended: true }));

app.get('/', (res) => {
  res.send('API is running...');
});

app.post('/temp', async (req) => {
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
});

app.post('/pression', async (req) => {
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
});

app.post('/mouv', async (req) => {
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
});

app.post('/hygro', async (req) => {
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
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});