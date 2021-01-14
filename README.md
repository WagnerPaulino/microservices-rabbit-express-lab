# microservices-rabbit-express-lab

Project to study microservices with rabbitmq

* Start rabbitmq
```bash
$ docker build -t rabbit rabbit-image/
$ docker run -p 5672:5672 -p 15672:15672 --name rabbit rabbit
```

* Start postgres
```bash
$ docker run -p 5432:5432 -e POSTGRES_USER="admin" -e POSTGRES_PASSWORD="1" -e POSTGRES_DB="test" --name postgres postgres
```

* In the `api-1` folder, execute
```bash
$ npm i
$ npm start
```

* In the `service-1` folder, execute
```bash
$ npm i
$ npm start
```

* Use the endpoint in `api-1` to send a message to `service-1`
```bash
curl -X GET http://localhost:3000/api/posts
```
