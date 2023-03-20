const request = require("supertest");
const app = require("../app");
const pool = require('../database/dbCreds');

describe("API Tests", () => {

    test("GET/ User's profile data", async () => {

        const response = await request(app).get("/account/han");

        expect(response.statusCode).toBe(200);
    });

    test("GET/ Unknown username", async () => {

        const response = await request(app).get("/account/notexisted");

        expect(response.statusCode).toBe(404);
    });

    test("PUT/ Sucess/Fail updating user's info", async () => {

        await pool.query('BEGIN TRANSACTION;')

        const sucessResponse = await request(app).put("/account/han").send(
        {
            fullname: 'Han Hoang',
            address1: "999 New",
            address2: "Borling",
            city: "Houston",
            state: "CA",
            zipcode: 77072
        })

        const failResponse = await request(app).put("/account/nonexist").send()

        await pool.query('ROLLBACK;')

        expect(sucessResponse.statusCode).toBe(201);
        expect(failResponse.statusCode).toBe(404);
    });

})