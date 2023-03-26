const request = require("supertest");
const app = require("../app");
const pool = require('../database/dbCreds');

describe("API Test", () => {

    test("GET/ history", async () => {
    
        const response1 = await request(app).get("/history/quang");
        const response2 = await request(app).get("/history/null");

        expect(response1.statusCode).toBe(201);
        expect(response2.statusCode).toBe(404);
    })
})