import supertest from "supertest";
import { serverRun, PORT } from "../server";
import { IUser } from "./../helpers/interfaceTS";

const app = serverRun.listen(PORT);

const invalidData = `{username: "Pete", age: 10,,,,}`;
let idUser: string;
let secondIdUser: string;
const exampleUser = {
  username: "Alex",
  age: 11,
  hobbies: ["sport"],
};
const unValidateInform = {
  username: "Michael",
  age: 4,
  hobbies: [1, 2, 3],
};
let newUser: IUser;
let secondnewUser: IUser;
let allUsers: IUser[] = [];
const unknownId = "9b6421e9-6c92-4809-aaee-d83f4e4cb177";

describe("*** №1 ***  -------Check request---------", () => {
  const notValidData = {
    username: "Pete",
    age: 10,
    hobbies: [1, 2, 3],
  };

  it("GET with url=/api/users request =>  []", async () => {
    const response = await supertest(app).get("/api/users");
    expect(response.body).toEqual([]);
    expect(response.statusCode).toBe(200);
  });
  it("GET with url=/api/users request => message Request not found", async () => {
    const response = await supertest(app).copy("/api/users");
    expect(JSON.parse(response.text).message).toBe("Request not found");
    expect(response.statusCode).toBe(400);
  });
  it("GET with url=/invalid request => message Page not found", async () => {
    const response = await supertest(app).get("/invalid");
    expect(JSON.parse(response.text).message).toBe("Page not found");
    expect(response.statusCode).toBe(404);
  });
  it("Post with url=/api/users and with invalid request body request => message Page not found", async () => {
    const response = await supertest(app).post("/api/users").send(notValidData);
    expect(JSON.parse(response.text).message).toBe(
      "Invalid data. Check information: username must be a string, age must be a number and more than 0, hobbies must be an array with or without string information",
    );
    expect(response.statusCode).toBe(400);
  });
});

describe("*** №2 ***  -------- Get, post, delete and valid incoming data about user -------------", () => {
  it("GET with object about new User and url=/api/users request =>  [{new User}]", async () => {
    const response = await supertest(app).post("/api/users").send(exampleUser);
    const body = await response.body;
    idUser = body[0].id;
    newUser = { id: idUser, ...exampleUser };
    allUsers.push(newUser);
    expect(response.body).toEqual(allUsers);
    expect(response.statusCode).toBe(201);
  });

  it("GET with object about new User and url=/api/users request =>  [{new User}]", async () => {
    const response = await supertest(app).post("/api/users").send(exampleUser);
    const body = await response.body;
    secondIdUser = body[1].id;
    secondnewUser = { id: secondIdUser, ...exampleUser };
    allUsers.push(secondnewUser);
    const responseNewBody = await supertest(app).get("/api/users");
    expect(responseNewBody.body.length).toBe(2);
    expect(response.statusCode).toBe(201);
  });

  it("GET with url=/api/users request => [newUser, secondnewUser]", async () => {
    const response = await supertest(app).get("/api/users");
    expect(response.body).toEqual(allUsers);
    expect(response.statusCode).toBe(200);
  });
  it("GET with url=/api/users/${userId} request => {User with userId}]", async () => {
    const id = idUser;
    const response = await supertest(app).get(`/api/users/${id}`);
    expect(response.body).toEqual(newUser);
    expect(response.statusCode).toBe(200);
  });
  it("POST with url=/api/users and with invalid request body request => message Invalid incoming data", async () => {
    const response = await supertest(app).post("/api/users").send(invalidData);
    expect(JSON.parse(response.text).message).toBe("Invalid incoming data");
    expect(response.statusCode).toBe(500);
  });
  it("POST with url=/api/users and with unvalidate information about user request => message Invalid data. Check information: username must be a string, age must be a number and more than 0, hobbies must be an array with or without string information", async () => {
    const response = await supertest(app)
      .post("/api/users")
      .send(unValidateInform);
    expect(JSON.parse(response.text).message).toBe(
      "Invalid data. Check information: username must be a string, age must be a number and more than 0, hobbies must be an array with or without string information",
    );
    expect(response.statusCode).toBe(400);
  });

  it("DELETE with url=/api/users/userId request => []", async () => {
    const responseDelete = await supertest(app).delete(`/api/users/${idUser}`);
    expect(responseDelete.statusCode).toBe(204);
    const response = await supertest(app).get("/api/users");
    expect(response.body).toEqual([secondnewUser]);
  });
});

describe("*** №3 ***  -------- Get and delete unknown user -----------", () => {
  it("DELETE with invalid Id url=/api/users/userIdInvalid  request => []", async () => {
    const responseDelete = await supertest(app).delete(`/api/users/12358`);
    expect(JSON.parse(responseDelete.text).message).toBe("UserId is invalid");
    expect(responseDelete.statusCode).toBe(400);
  });
  it("Get with invalid Id url=/api/users/userIdInvalid  request => []", async () => {
    const response = await supertest(app).get(`/api/users/12358`);
    expect(JSON.parse(response.text).message).toBe("UserId is invalid");
    expect(response.statusCode).toBe(400);
  });
  it("Get with invalid Id url=/api/users/userIdInvalid  request => []", async () => {
    const response = await supertest(app).get(`/api/users/${unknownId}`);
    expect(JSON.parse(response.text).message).toBe("User not found");
    expect(response.statusCode).toBe(404);
  });
});

afterAll(() => {
  app.close();
});
