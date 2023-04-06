const request = require("supertest");
const app = require("../app");
const pool = require('../database/dbCreds');

describe("API Test", () => {
    
    test("POST/ Taken username", async () => {

        const response = await request(app).post("/register").send({
            usernameRegister: "quang"
        })

        expect(response.statusCode).toBe(400);
    })

    test("POST/ Error status 500", async () => {

        const response = await request(app).post("/register").send({
            wrongKey: "jimmy"
        }) 

        expect(response.statusCode).toBe(500);
    })

    test("POST/ Sucessfully register", async () => {

        await pool.query(`BEGIN TRANSACTION;`)
        const response = await request(app).post("/register").send({
            usernameRegister: "neverSeenBefore",
            passwordRegister: "newPassword"  

        })
        await pool.query(`ROLLBACK;`);

        expect(response.statusCode).toBe(200);
    })

    test("POST/ Query Error", async () => {
    
        await pool.query(
            `BEGIN TRANSACTION;
            DROP TABLE users_info;`)
        const response = await request(app).post("/register").send({
            usernameRegister: "neverSeenBefore",
            passwordRegister: "newPassword"  
        })

        expect(response.statusCode).toBe(201);
    })
})


