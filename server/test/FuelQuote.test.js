const request = require("supertest");
const app = require("../app");
const pool = require('../database/dbCreds');

describe("API Tests", () => {

    test("GET/ Valid client", async () => {

        const response = await request(app).get("/quote/?username=quang&gallons=300");

        expect(response.statusCode).toBe(200);
    });

    test("GET/ Valid client with no profile data", async () => {

        const response = await request(app).get("/quote/?username=tom&gallons=300");

        expect(response.statusCode).toBe(403);
    });

    test("GET/ Invalid URL query", async () => {

        const response = await request(app).get("/quote/?dfgdfg=tom&gallons=300");

        expect(response.statusCode).toBe(400);
    });

    test("GET/ username does not exist", async () => {

        const response = await request(app).get("/quote/?username=sadsadad&gallons=300");

        expect(response.statusCode).toBe(500);
    });

})