This is a backend API a simple checkout process built with [Node Js](https://nodejs.org/en) and [Express](https://expressjs.com/) framework. [MongoDB](https://www.mongodb.com) is used as the database and [Stripe](https://stripe.com) is used as the online payment processing.

## Getting Started

Clone the project
```
git clone git@github.com:uferekalu/swipepay_backend.git
```
Then change the directory to swipepay_backend
```
cd swipepay_backend
```

Install the dependencies by running npm install in the root directory:
```
npm install
```

To start the project, run this at the root of the project:
```
npm start
``

To run the project locally and connect to the [MongoDB](https://www.mongodb.com) database and use [Stripe](https://stripe.com) payment integration, create a .env file and add the following:
```
MONGODB_URI="Your MongoDB Connection string"
jwtSecret="choose a strong jwt secret"
stripeSecretKey="Your stripe secret key"
```