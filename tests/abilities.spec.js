// https://pokeapi.co/docs/v2#abilities

const request = require("supertest")("https://pokeapi.co");
const expect = require("chai").expect;

// Response var gets populated after request is sent.
let response;

describe("GET */api/v2/ability", function () {
    describe("No 'limit' Query Parameter Provided", function () {
        before(async function () {
            response = await request.get("/api/v2/ability")
        });
        it("returns a Status Code of 200", function () {
            expect(response.status).to.eql(200);
        });
        it("returns a count of at least 1", function () {
            expect(response.body.count).to.be.at.least(1);
        });
        it("number of results returned matches the default 'limit' of 20", function () {
            expect(response.body.results).to.have.length(20);
        });
        it("expects the first Ability returned to be 'Stench'", function () {
            expect(response.body.results[0]).to.have.property("name", "stench");
        });
    });
    describe("'limit' Query Parameter Provided", function () {
        const limit = 9;
        before(async function () {
            response = await request.get(`/api/v2/ability?limit=${limit}`)
        });
        it("returns a Status Code of 200", function () {
            expect(response.status).to.eql(200);
        });
        it("returns a count of at least 1", function () {
            expect(response.body.count).to.be.at.least(1);
        });
        it(`expects the number of results returned matches the 'limit' query parameter of '${limit}'`, function () {
            expect(response.body.results).to.have.length(limit);
        });
        it("expects the first Ability returned to be 'Stench'", function () {
            expect(response.body.results[0]).to.have.property("name", "stench");
        });
        it("expects the last Pokemon returned to be 'Static'", function () {
            expect(response.body.results[8]).to.have.property("name", "static");
        });
    });
    describe("'limit' Query Parameter Provided as 0", function () {
        const limit = 0;
        before(async function () {
            response = await request.get(`/api/v2/ability?limit=${limit}`)
        });
        it("returns a Status Code of 200", function () {
            expect(response.status).to.eql(200);
        });
        it("returns a count of at least 1", function () {
            expect(response.body.count).to.be.at.least(1);
        });
        it("number of results returned matches the default 'limit' of 20", function () {
            expect(response.body.results).to.have.length(20);
        });
        it("expects the first Ability returned to be 'Stench'", function () {
            expect(response.body.results[0]).to.have.property("name", "stench");
        });
        it("expects the last Ability returned to be 'Own-Tempo'", function () {
            expect(response.body.results[19]).to.have.property("name", "own-tempo");
        });
    });
});
describe("GET */api/v2/ability/:name", function () {
    describe("Valid Ability name", function () {
        const abilityData = {
            "id": 49,
            "name": "flame-body"
        };
        before(async function () {
            response = await request.get(`/api/v2/ability/${abilityData.name}`)
        });
        it("returns a Status Code of 200", function () {
            expect(response.status).to.eql(200);
        });
        it("returns the expected Pokemon 'name' and Pokedex 'id'", function () {
            expect(response.body).to.have.property("name", abilityData.name);
            expect(response.body).to.have.property("id", abilityData.id);
        });
    });
    describe("Invalid Ability name", function () {
        const abilityData = {
            "id": 49,
            "name": "cheese"
        };
        before(async function () {
            response = await request.get(`/api/v2/ability/${abilityData.name}`)
        });
        it("returns a Status Code of 404", function () {
            expect(response.status).to.eql(404);
        });
    });
    describe("Valid Ability name using Camel Case", function () {
        const abilityData = {
            "name": "flameBody"
        };
        before(async function () {
            response = await request.get(`/api/v2/ability/${abilityData.name}`)
        });
        it("returns a Status Code of 404", function () {
            expect(response.status).to.eql(404);
        });
    });
    describe("Valid Ability name using French version", function () {
        const abilityData = {
            "name": "corps-de-flamme"
        };
        before(async function () {
            response = await request.get(`/api/v2/ability/${abilityData.name}`)
        });
        it("returns a Status Code of 404", function () {
            expect(response.status).to.eql(404);
        });
    });
});