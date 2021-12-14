// https://pokeapi.co/docs/v2#pokemon

const request = require("supertest")("https://pokeapi.co");
const expect = require("chai").expect;

// Response var gets populated after request is sent.
let response;

describe("GET */api/v2/pokemon", function () {
    describe("No 'limit' Query Parameter Provided", function () {
        before(async function () {
            response = await request.get("/api/v2/pokemon");
        });
        it("returns a Status Code of 200", function () {
            expect(response.status).to.eql(200);
        });
        it("returns a count of at least 1", function () {
            expect(response.body.count).to.be.at.least(1);
        });
        it("number of Pokemon returned matches the default 'limit' of 20", function () {
            expect(response.body.results).to.have.length(20);
        });
        it("expects the first Pokemon returned to be 'Bulbasaur'", function () {
            expect(response.body.results[0]).to.have.property("name", "bulbasaur");
        });
    });
    describe("'limit' Query Parameter Provided", function () {
        const limit = 9;
        before(async function () {
            response = await request.get(`/api/v2/pokemon?limit=${limit}`)
        });
        it("returns a Status Code of 200", function () {
            expect(response.status).to.eql(200);
        });
        it("returns a count of at least 1", function () {
            expect(response.body.count).to.be.at.least(1);
        });
        it(`expects the number of Pokemon returned matches the 'limit' query parameter of '${limit}'`, function () {
            expect(response.body.results).to.have.length(limit);
        });
        it("expects the first Pokemon returned to be 'Bulbasaur'", function () {
            expect(response.body.results[0]).to.have.property("name", "bulbasaur");
        });
        it("expects the last Pokemon returned to be 'Blastoise'", function () {
            expect(response.body.results[8]).to.have.property("name", "blastoise");
        });
    });
    describe("'limit' Query Parameter Provided as 0", function () {
        const limit = 0;
        before(async function () {
            response = await request.get(`/api/v2/pokemon?limit=${limit}`)
        });
        it("returns a Status Code of 200", function () {
            expect(response.status).to.eql(200);
        });
        it("returns a count of at least 1", function () {
            expect(response.body.count).to.be.at.least(1);
        });
        it("number of Pokemon returned matches the default 'limit' of 20", function () {
            expect(response.body.results).to.have.length(20);
        });
        it("expects the first Pokemon returned to be 'Bulbasaur'", function () {
            expect(response.body.results[0]).to.have.property("name", "bulbasaur");
        });
        it("expects the last Pokemon returned to be 'Blastoise'", function () {
            expect(response.body.results[8]).to.have.property("name", "blastoise");
        });
    });
});
describe("GET */api/v2/pokemon/:name", function () {
    describe("Valid Pokemon name", function () {
        const pkmnData = {
            "id": 104,
            "name": "cubone",
            "weight": 65,
            "height": 4
        };
        before(async function () {
            response = await request.get(`/api/v2/pokemon/${pkmnData.name}`)
        });
        it("returns a Status Code of 200", function () {
            expect(response.status).to.eql(200);
        });
        it("returns the expected Pokemon 'name' and Pokedex 'id'", function () {
            expect(response.body).to.have.property("name", pkmnData.name);
            expect(response.body).to.have.property("id", pkmnData.id);
        });
        it(`returns the expected 'weight' of '${pkmnData.name}'`, function () {
            expect(response.body).to.have.property("weight", pkmnData.weight);
        });
        it(`returns the expected 'height' of '${pkmnData.name}'`, function () {
            expect(response.body).to.have.property("height", pkmnData.height);
        });
        it(`returns the 'moves' array with a list of available moves for '${pkmnData.name}'`, function () {
            expect(response.body).to.have.property("moves");
            expect(response.body.moves).to.not.be.empty;
        });
    });
    describe("Invalid Pokemon name", function () {
        const pkmnData = {
            "name": "cheese",
        };
        before(async function () {
            response = await request.get(`/api/v2/pokemon/${pkmnData.name}`)
        });
        it("returns a Status Code of 404", function () {
            expect(response.status).to.eql(404);
        });
    });
    describe("Valid Pokemon name using Camel Case", function () {
        const pkmnData = {
            "name": "Cubone",
        };
        before(async function () {
            response = await request.get(`/api/v2/pokemon/${pkmnData.name}`)
        });
        it("returns a Status Code of 404", function () {
            expect(response.status).to.eql(404);
        });
    });
    describe("Valid Pokemon name using French version", function () {
        const pkmnData = {
            "name": "osselait",
        };
        before(async function () {
            response = await request.get(`/api/v2/pokemon/${pkmnData.name}`)
        });
        it("returns a Status Code of 404", function () {
            expect(response.status).to.eql(404);
        });
    });
});
describe("GET */api/v2/pokemon/:id", function () {
    describe("Valid Pokemon ID", function () {
        const pkmnData = {
            "id": 104,
            "name": "cubone",
            "weight": 65,
            "height": 4
        };
        before(async function () {
            response = await request.get(`/api/v2/pokemon/${pkmnData.id}`)
        });
        it("returns a Status Code of 200", function () {
            expect(response.status).to.eql(200);
        });
        it("returns the expected Pokemon 'name' and Pokedex 'id'", function () {
            expect(response.body).to.have.property("name", pkmnData.name);
            expect(response.body).to.have.property("id", pkmnData.id);
        });
        it(`returns the expected "weight" of '${pkmnData.name}'`, function () {
            expect(response.body).to.have.property("weight", pkmnData.weight);
        });
        it(`returns the expected "height" of '${pkmnData.name}'`, function () {
            expect(response.body).to.have.property("height", pkmnData.height);
        });
        it(`returns the 'moves' array with a list of available moves for '${pkmnData.name}'`, function () {
            expect(response.body).to.have.property("moves");
            expect(response.body.moves).to.not.be.empty;
        });
    });
    describe("Invalid Pokemon ID", function () {
        const pkmnData = {
            "id": 0,
        };
        before(async function () {
            response = await request.get(`/api/v2/pokemon/${pkmnData.id}`)
        });
        it("returns a Status Code of 404", function () {
            expect(response.status).to.eql(404);
        });
    });
});