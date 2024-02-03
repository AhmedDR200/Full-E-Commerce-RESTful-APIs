# DEVLANT Full E-Commerce RESTful APIs

## Description

NodeJS - Full E-Commerce RESTful APIs

## Installation

Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd full-e-commerce-restful-apis
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

### Running the API

To start the development server, run the following command:

```bash
npm run start:dev
```

This will launch the server in development mode using `nodemon`, which automatically restarts the server when changes are detected.

For production deployment, you can use:

```bash
npm start
```

Ensure that you have set the `NODE_ENV` environment variable to "production" in your production environment.

### Accessing the API

Once the server is running, you can access the API at the following base URL:

```
http://localhost:your-port/
```

Replace `your-port` with the port number specified in your configuration.

### API Documentation

The API documentation is available using Swagger UI. Open the following URL in your browser:

```
http://localhost:your-port/api-docs
```

This will display an interactive documentation page where you can explore and test the API endpoints.

### Testing Endpoints

You can use tools like `curl`, Postman, or any API testing tool to interact with the API endpoints. Here's an example using `curl`:

```bash
curl -X GET http://localhost:your-port/api/your-endpoint
```

Replace `your-endpoint` with the specific endpoint you want to test.

## Scripts

- **Start development server:**

  ```bash
  npm run start:dev
  ```

- **Start production server:**

  ```bash
  npm start
  ```

## Dependencies

- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - ^2.4.3
- [colors](https://www.npmjs.com/package/colors) - ^1.4.0
- [compression](https://www.npmjs.com/package/compression) - ^1.7.4
- [cors](https://www.npmjs.com/package/cors) - ^2.8.5
- [dotenv](https://www.npmjs.com/package/dotenv) - ^16.3.1
- [express](https://www.npmjs.com/package/express) - ^4.18.2
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - ^1.2.0
- [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) - ^2.2.0
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - ^7.1.5
- [express-validator](https://www.npmjs.com/package/express-validator) - ^7.0.1
- [hpp](https://www.npmjs.com/package/hpp) - ^0.2.3
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - ^9.0.2
- [mongoose](https://www.npmjs.com/package/mongoose) - ^8.0.3
- [morgan](https://www.npmjs.com/package/morgan) - ^1.10.0
- [multer](https://www.npmjs.com/package/multer) - ^1.4.5-lts.1
- [nodemailer](https://www.npmjs.com/package/nodemailer) - ^6.9.8
- [sharp](https://www.npmjs.com/package/sharp) - ^0.33.2
- [slugify](https://www.npmjs.com/package/slugify) - ^1.6.6
- [stripe](https://www.npmjs.com/package/stripe) - ^14.14.0
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) - ^6.2.8
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) - ^5.0.0
- [uuid](https://www.npmjs.com/package/uuid) - ^9.0.1

## Node.js Version

This project is designed to run on Node.js version 20.11.0.

## License

This project is licensed under the [ISC License](LICENSE).


Feel free to customize this template further based on your specific needs!