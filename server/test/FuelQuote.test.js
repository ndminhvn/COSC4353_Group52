const request = require("supertest");
const app = require("../app");
const pool = require('../database/dbCreds');

describe("API Tests", () => {

    test("GET/ Sucessfully retrieved client data (with history)", async () => {

        const response = await request(app).get("/quote/?username=quang&gallons=300");

        expect(response.statusCode).toBe(200);
    });

    test("GET/ Sucessfully retrieved client data (without history)", async () => {

        const response = await request(app).get("/quote/?username=eli&gallons=300");

        expect(response.statusCode).toBe(200);
    });

    test("GET/ Valid client with no profile data", async () => {

        await pool.query(
            `
            BEGIN TRANSACTION;
            INSERT INTO users (username, password)
            VALUES ('tom', 'nodata');
            INSERT INTO users_info (username)
            VALUES ('tom');
            `
        )
        const response = await request(app).get("/quote/?username=tom&gallons=300");
        await pool.query(`ROLLBACK;`);

        expect(response.statusCode).toBe(403);
    });

    test("GET/ Invalid URL query", async () => {

        const response = await request(app).get("/quote/?dfgdfg=tom&gallons=300");

        expect(response.statusCode).toBe(500);
    });

    test("GET/ username does not exist", async () => {

        const response = await request(app).get("/quote/?username=sadsadad&gallons=300");

        expect(response.statusCode).toBe(404);
    });

    test("POST/ Successfully purchase fuel", async () => {

        await pool.query(`BEGIN TRANSACTION;`);
        const response = await request(app).post("/quote").send(
        {
            username: "quang",
            deliveryDate: "2023-03-01",
            deliveryAddress: "222 Main",
            unitCost: 1.99,
            gallons: 600,
            totalCost: 2000.22
        })
        await pool.query(`ROLLBACK;`);

        expect(response.statusCode).toBe(201);
    });

    test("POST/ Bad request", async () => {

        const response = await request(app).post("/quote").send(
        {
            badUsername: "quang",
            deliveryDate: "2023-03-01",
            deliveryAddress: "222 Main",
            unitCost: 1.99,
            gallons: 600,
            totalCost: 2000.22
        })

        expect(response.statusCode).toBe(400);
    });

})