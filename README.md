# UH-Spring2023 COSC4353: Software Design
## Team 52 Members
- Quang Du
- Han Hoang
- Minh Nguyen
- Elinnoel Nuñez

# <p align="center"> Fuel Quote Rate Prediction </p>
<!-- ## <p align="center"> [LIVE WEB APP] </p> -->

## Description
Will fill in the description
> [Project detail document](/doc/Project.pdf) - Will update later with requirements
## Technology Stack
- Frontend: [ReactJS](https://reactjs.org/)
- Backend: [ExpressJS](https://expressjs.com/)
- Database: [PostgreSQL](https://www.postgresql.org/)
- Libraries:
    - Components: [Material UI](https://mui.com/)
  - Styling: [Bootstrap](https://github.com/twbs/bootstrap)
  - Request: [Axios](https://github.com/axios/axios)
  - Unit Testing: [Jest](https://jestjs.io/)

## Demo
- Walk-through video: [link video if we make one]
## Installation
- Requirements:
  - Git
  - Visual Studio Code (or other IDEs or code editors)
  - [Node v18](https://nodejs.org/en/)
  - We use [npm](https://docs.npmjs.com/) as our package manager
  - PostgreSQL
- Install:
  - Clone this repository: `git clone https://github.com/ndminhvn/COSC4353_Group52`
  - Frontend:
    - Go to client folder: `cd client`
    - Install dependencies: `npm install`
    - Create a new `.env` file: `cp .env.example .env`
    - Fill in the `.env` file
    - Start server: `npm start`
  - Backend:
    - Go to server folder: `cd server`
    - Install dependencies: `npm install`
    - Create a new `.env` file: `cp .env.example .env`
    - Fill in the `.env` file
    - Start server: `npm start`
    - Start unit-test: `npm test`
    - Database:
      - Install Postgres 15 on your computer and start the database: `https://www.postgresql.org/download/`
      - pgAdmin as database manager: `https://www.pgadmin.org/download/`
        - Register a new server, make sure the `name` in general and `hostname` are the same, everything else can stay the same.
        - Create the server.
        - Go to your `.env` file and enter in your local settings.
      - If successfully connected, prompt will display during `npm start`
