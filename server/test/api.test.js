const request = require("supertest");
const app = require("../app");

describe("Register Route", () => {
    
    test("GET/ Taken username", async () => {
        const response = await request(app).post("/register").send({
            usernameRegister: "quang"
        })
        expect(response.statusCode).toBe(400);
    })

    test("POST/ Bad data received", async () => {
        const response = await request(app).post("/register").send({
            wrongKey: "jimmy"
        }) 
        expect(response.statusCode).toBe(500);
    })
})

describe("Fuel Quote Route", () => {

    test("GET/ Valid client", async () => {
        const response = await request(app).get("/quote/?username=quang&gallons=300");
        expect(response.statusCode).toBe(200);
    });

    test("POST/ Bad data received", async () => {
        const response = await request(app).post("/quote/").send({
            badKey: "jimmy",
            missingKey: "333"
        }) 
        expect(response.statusCode).toBe(400);
    })

})