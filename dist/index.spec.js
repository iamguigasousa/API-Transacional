"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("./index");
describe("server", () => {
    const request = supertest_1.default.agent(index_1.server);
    afterAll((done) => {
        index_1.server.close(done);
    });
    it("should get /", async () => {
        const res = await request.get("/");
        expect(res.status).toBe(200);
        expect(res.body).toEqual("Welcome!");
    });
});
//# sourceMappingURL=index.spec.js.map