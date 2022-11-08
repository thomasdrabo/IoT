
# IoT


## Windows Installation :

 - **Nodejs** : https://nodejs.org/en
 - **Grafana** : https://grafana.com/grafana/download?platform=windows
 - **InfluxDB** : https://dl.influxdata.com/influxdb/releases/influxdb2-2.5.1-windows-amd64.zip
 - **InfluxDB** **CLI** on : https://docs.influxdata.com/influxdb/cloud/sign-up/?t=Windows#optional-download-install-and-use-the-influx-cli

After installing everything, open a command line prompt in **InfluxDB** folder and start influxd.exe to launch **InfluxDB**
Now you can connect on localhost:8086 and create a **API Token**

Open a command line prompt on the **InfluxDB CLI** folder, and type the following command to create a config:

```
    influx config create --config-name [your config name] --host-url [url to db wish is localhost in theis case] --org [your InfluxDB org name] --token [te token you generated]
````

Create a **Bucket** in **InfluxDB**
Create a **DBRP** mapping for **InfluxDB** :

```
    influx v1 dbrp create --db [db name] --rp [rp name] --bucket-id [bucket ID] --default
```

After installing the **DBRP**, start **Grafana** and open the browser in localhost:3000
Configure the Grafana Data Source to have :
  
  

 - URL to the InfluxDB
 - The custom HTTP Headers : Header: Autorization ; Value: Token [the
   API token generated]
 - All the InfluxDB details with the user and password

**Save** the settings and test.



## Mac Installation :

Use homebrew to install the dependecies :

 - **NodeJS** : `arch -arm64 brew install nodejs`
 - **Grafana** : `arch -arm64 brew install grafana`
 - **InfluxDB** : `arch -arm64 brew install influxdb`
 - **InfluxDB CLI** : `arch -arm64 brew install influxdb-cli`

To start **InfluxDB**, open a command line prompt : `influxd`
Now you can connect on localhost:8086 and create a  **API Token**
Config the **InfluxDB** with the following command in a command line prompt
```
    influx config create -n [your config name] -u [url to db wish is localhost in theis case] -o keyce -t [te token you generated]
```

Create a  **Bucket**  in  **InfluxDB**  
Create a  **DBRP**  mapping for  **InfluxDB**  with the following prompt:

```
    influx v1 dbrp create --db [db name] --rp [rp name] --bucket-id [bucket ID] --default
```

After installing the  **DBRP**, start  **Grafana** , you can start and stop with the following commands :
```
    brew services start grafana
```
```
    brew services stop grafana
```
Open **Grafana** in your browser with the url localhost:3000
Configure the **Grafana** Data Source to have :

-   URL to the **InfluxDB**
-   The custom HTTP Headers : Header: Autorization ; Value: Token [the  **API token** generated]
-   All the **InfluxDB** details with the user and password

**Save**  the settings and test.

## Launch project 

To launch the full solution you can prompt the following command lines at projects root:
```
    npm install
    node index.js
```
In Middleware/index.js, you must change values of variables : Token (with your token), Url, Org (with your organisation name) and Bucket (with your bucket ID).
