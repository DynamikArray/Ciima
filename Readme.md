# Ciima

Comic Issue Inventory Media Application

## Installation / Configuration

.env file required

```
NODE_ENV=
PORT=
APP_NAME=CIIMA

CLOUDAMQP_URL=

MYSQL_CONN=
#Production Only
JAWSDB_URL=
# These are used by the worker and should be the MYSQL connction pieces
MYSQL_HOST=rxxxxxxxxxxxxxxz.cxxxxxxxxxxb.us-east-1.rds.amazonaws.com
MYSQL_USER=exxxxxxxxxxxxxxw
MYSQL_PASS=vxxxxxxxxxxxxxxy
MYSQL_DB=yxxxxxxxxxxxxxx3

LOGDNA_KEY=["2fxxxxxxxxxxxxxxxxxxxxxxxxxxxx5e"]

LINNWORKS_APPLICATION_ID=
LINNWORKS_APPLICATION_SECRET=
LINNWORKS_APPLICATION_TOKEN=
LINNWOKRS_API_URL=https://api.linnworks.net/api
```

## Notes

Database scripts were run to normalize bad data characters against the titles table.
Remove ?'s from the image urls so they match the file structer on the server.

```
UPDATE slc_issues SET imageUrl = REPLACE(imageUrl,'\?','-') WHERE imageUrl LIKE'%\?%';
```
