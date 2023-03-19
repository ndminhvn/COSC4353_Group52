const request = require("supertest");
const app = require("../app");
const pool = require('../database/dbCreds');
const bcrypt = require("bcrypt");

describe("API Test", () => {
    
    test("POST/ Login successfully", async () => {

        await pool.query(`BEGIN TRANSACTION;`);

        // Register a mock account
        const username = "testUser";
        const password = "testPassword";
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(`
        INSERT INTO users (username, password) VALUES ('${username}', '${hashedPassword}');
        INSERT INTO users_info (username) VALUES ('${username}');
        `);
        // Login with correct credentials but no user profile data
        const newUserResponse = await request(app).post("/login").send({
            usernameLogin: username,
            passwordLogin: password  
        })
        // Load profile data for next test
        await pool.query(`UPDATE users_info SET fullname = 'Test User' WHERE username = '${username}';`);
        // Login with correct credentials AND has user profile data
        const oldUserResponse = await request(app).post("/login").send({
            usernameLogin: username,
            passwordLogin: password 
        })
        // Drop database to introduce server error
        await pool.query(`DROP TABLE users_info;`)
        const serverError = await request(app).post("/login").send({
            usernameLogin: username,
            passwordLogin: password 
        })

        await pool.query(`ROLLBACK;`);

        expect(newUserResponse.statusCode).toBe(200);
        expect(oldUserResponse.statusCode).toBe(200);
        expect(serverError.statusCode).toBe(500);
    })

    test("POST/ Incorrect Password or username and server error", async () => {

        await pool.query(`BEGIN TRANSACTION;`);

        // Register a mock user
        await request(app).post("/register").send({
            usernameRegister: "testUser",
            passwordRegister: "testPassword"  

        })
        // Getting response of wrong password request
        const incorrectPassword = await request(app).post("/login").send({
            usernameLogin: "testUser",
            passwordLogin: "wrongPassword"  

        })
        // Gettting response of wrong username request
        const incorrectUsername = await request(app).post("/login").send({
            usernameLogin: "wrongUser",
            passwordLogin: "testPassword"  

        })

        await pool.query(`ROLLBACK;`);

        expect(incorrectPassword.statusCode).toBe(400);
        expect(incorrectUsername.statusCode).toBe(404);

    })
})