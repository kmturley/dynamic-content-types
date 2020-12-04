# dynamic-content-types

Example API using JSON Schemas to validate content types:

* NodeJS 14.x
* Express 4.17.x

## Installation

Install dependencies using:

    npm install


## Usage

Run an example locally using:

    npm start

Create a schema version:

    curl -X POST -H "Content-Type: application/json" --data @examples/person.schema.json http://localhost:3000/schema/person/versions/1

Get a schema version:

    curl -X GET http://localhost:3000/schema/person/versions/1

Update a schema version:

    curl -X PUT -H "Content-Type: application/json" --data @examples/person.schema.json http://localhost:3000/schema/person/versions/1

Delete a schema version:

    curl -X DELETE http://localhost:3000/schema/person/versions/1


## Contact

For more information please contact kmturley
