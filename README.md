# DEVLANT Full E-Commerce RESTful APIs

![Project Logo/Photo](./logo.png)

## Description

DEVLANT Full E-Commerce RESTful APIs is a robust Node.js-based solution designed to empower developers in building comprehensive and scalable e-commerce applications. This API suite encompasses essential functionalities for managing product information, user accounts, orders, and more, providing a solid foundation for creating a feature-rich online shopping experience.

## Key Features

- **Brand Management:** Efficiently organize and manage product brands with detailed information and logos.

- **Category and Subcategory:** Categorize products seamlessly with support for subcategories, offering a structured browsing experience.

- **Product Listings:** Easily handle products with details such as name, description, price, and association with brands and categories.

- **User Authentication:** Secure user registration and authentication with hashed passwords for enhanced security.

- **Shopping Cart and Checkout:** Implement a fully functional shopping cart, enabling users to add, update, and remove items before seamless checkout.

- **Order Processing:** Facilitate order creation, track orders, and calculate the total amount for a streamlined purchasing process.

- **Review and Rating:** Allow users to submit reviews and ratings for products, fostering user engagement and trust.

- **Wishlist Management:** Enable users to create and manage wishlists for a personalized shopping experience.

- **Coupon System:** Implement a coupon system with unique codes and percentage-based discounts.

## Getting Started

To set up DEVLANT Full E-Commerce RESTful APIs locally and explore its features, follow the installation steps provided in the [Installation](#installation) section of the documentation.

## Installation

Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

1. Clone the repository:

   ```bash
   git clone https://github.com/AhmedDR200/Full-E-Commerce-RESTful-APIs.git
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

## API Routes

The following routes are available for interacting with the API:

- **Categories:**
  - `/cats` - [GET, POST, PUT, DELETE]

- **Subcategories:**
  - `/subCats` - [GET, POST, PUT, DELETE]

- **Brands:**
  - `/brands` - [GET, POST, PUT, DELETE]

- **Products:**
  - `/products` - [GET, POST, PUT, DELETE]

- **Users:**
  - `/users` - [GET, POST, PUT, DELETE]

- **Authentication:**
  - `/auth` - [POST]

- **Reviews:**
  - `/reviews` - [GET, POST, PUT, DELETE]

- **Wishlist:**
  - `/wishlist` - [GET, POST, DELETE]

- **Addresses:**
  - `/addresses` - [GET, POST, PUT, DELETE]

- **Coupons:**
  - `/coupons` - [GET, POST, PUT, DELETE]

- **Cart:**
  - `/cart` - [GET, POST, PUT, DELETE]

- **Orders:**
  - `/orders` - [GET, POST, PUT, DELETE]

### Mounting Routes

The routes are mounted using the `mountRoutes` function in `server.js`.

# Models

## Brand Model

- **Properties:**
  - `name` (String, required): The name of the brand.
  - `description` (String): A brief description of the brand.
  - `logoUrl` (String): URL to the brand's logo.
  - and others ...

## Category Model

- **Properties:**
  - `name` (String, required): The name of the category.
  - `description` (String): A brief description of the category.
  - and others ...

## Cart Model

- **Properties:**
  - `userId` (String, required): The ID of the user associated with the cart.
  - `items` (Array): An array of objects representing items in the cart.
  - and others ...

## Coupon Model

- **Properties:**
  - `code` (String, required): The coupon code.
  - `discountPercentage` (Number, required): The percentage discount offered by the coupon.
  - and others ...

## Order Model

- **Properties:**
  - `userId` (String, required): The ID of the user placing the order.
  - `items` (Array, required): An array of objects representing items in the order.
  - `totalAmount` (Number, required): The total amount for the order.
  - and others ...

## Product Model

- **Properties:**
  - `name` (String, required): The name of the product.
  - `description` (String): A brief description of the product.
  - `price` (Number, required): The price of the product.
  - `brandId` (String, required): The ID of the brand associated with the product.
  - `categoryId` (String, required): The ID of the category associated with the product.
  - and others ...

## Review Model

- **Properties:**
  - `productId` (String, required): The ID of the product being reviewed.
  - `userId` (String, required): The ID of the user who submitted the review.
  - `rating` (Number, required): The rating given by the user.
  - `comment` (String): Additional comments provided by the user.
  - and others ...

## Subcategory Model

- **Properties:**
  - `name` (String, required): The name of the subcategory.
  - `categoryId` (String, required): The ID of the category to which the subcategory belongs.
  - and others ...

## User Model

- **Properties:**
  - `username` (String, required): The username of the user.
  - `email` (String, required): The email address of the user.
  - `password` (String, required): The hashed password of the user.
  - `role` (String): The role of the user (e.g., "customer" or "admin").
  - and others ...

# Validation Layers

To enhance data integrity and security, DEVLANT Full E-Commerce RESTful APIs incorporates validation layers for each model. These layers ensure that incoming data adheres to predefined criteria, preventing malformed or unauthorized information from entering the system.

## Brand Model Validation

Validates brand information to meet specified criteria.

## Category Model Validation

Ensures that category details align with predefined standards.

## Cart Model Validation

Validates shopping cart data for correctness and security.

## Coupon Model Validation

Defines constraints for coupon-related information.

## Order Model Validation

Ensures proper validation of order details.

## Product Model Validation

Validates product data to maintain consistency.

## Review Model Validation

Enforces rules for review-related information.

## Subcategory Model Validation

Validates subcategory data for accuracy and security.

## User Model Validation

Ensures the integrity and security of user-related information.

These validation layers contribute to a more secure and reliable data processing system within DEVLANT Full E-Commerce RESTful APIs.

# Stripe Integration

DEVLANT Full E-Commerce RESTful APIs integrates seamlessly with Stripe to enable secure online payments. This integration simplifies the payment process, ensuring a secure and efficient transaction experience for users.

## Key Points

- **Account Setup:** Create a Stripe account to obtain API keys.

- **API Integration:** Incorporate the Stripe Node.js package and configure API keys for server-side logic.

- **Server-Side Charge Creation:** When a user initiates a payment, the server utilizes the Stripe secret key to create a charge.

- **Webhooks:** Implement webhooks to handle payment-related events, ensuring proper event handling.

- **Testing:** Utilize Stripe's test environment during development for validation without real transactions.

- **Security Considerations:** Stripe.js securely handles sensitive card information on the client side, and HTTPS is enforced for secure data transmission.

By integrating Stripe on the server side, DEVLANT Full E-Commerce RESTful APIs provides a secure and streamlined solution for online payments, enhancing the user shopping experience.

# Authentication System

DEVLANT Full E-Commerce RESTful APIs feature a robust authentication system designed to handle user registration, login, and password management securely. The system is structured around key components:

## Routes

### User Registration (/signup)

- **HTTP Method:** POST
- **Functionality:** Handles user registration.
- **Controller Function:** Invokes the `signup` function in the auth controller.

### User Login (/login)

- **HTTP Method:** POST
- **Functionality:** Manages user login.
- **Controller Function:** Invokes the `login` function in the auth controller.

### Forgot Password (/forgotPassword)

- **HTTP Method:** POST
- **Functionality:** Initiates the password reset process.
- **Controller Function:** Invokes the `forgotPassword` function in the auth controller.

### Verify Reset Code (/verifyResetCode)

- **HTTP Method:** POST
- **Functionality:** Verifies the reset code during password recovery.
- **Controller Function:** Invokes the `verifyPasswordCode` function in the auth controller.

### Reset Password (/resetPassword)

- **HTTP Method:** PUT
- **Functionality:** Updates the user's password after successful code verification.
- **Controller Function:** Invokes the `resetPassword` function in the auth controller.

## Controller Functions

The authentication system relies on specific controller functions for each route to execute the necessary business logic. These functions handle user registration, login, and password management.

## HTTP Methods

Routes adhere to RESTful conventions, utilizing different HTTP methods (POST and PUT) based on the actions they perform.

This concise overview outlines the core functionality of the authentication system within DEVLANT Full E-Commerce RESTful APIs, focusing on routes, controller functions, and HTTP methods.

# Image Processing with Sharp

In DEVLANT Full E-Commerce RESTful APIs, we leverage the powerful `sharp` module for efficient and flexible image processing. This section provides a brief overview of how image processing is implemented using the `sharp` package.

## Installation

To integrate `sharp` into your project, ensure you have it installed by running:

```bash
npm install sharp



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