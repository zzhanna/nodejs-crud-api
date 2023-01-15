import supertest from "supertest";
import { serverRun } from "../index";

const app = serverRun();

describe("Server testing", () => {
  it("Requests to non-existing endpoints", async () => {
    const response = await supertest(app).get("/invalid");
    expect(response.statusCode).toBe(404);
  });
  it("Requests to non-existing endpoints", async () => {
    const response = await supertest(app).get("/api/users");
    expect(response.body).toEqual([]);
    expect(response.statusCode).toBe(200);
  });
  afterAll(() => app.close());
});
