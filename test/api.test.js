import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js"; // Adjusted to ES Module

describe("API Testing", () => {
  it("should return all items", (done) => {
    request(app)
      .get("/api/items")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.at.least(1);
        done();
      });
  });

  it("should create a new item", (done) => {
    const newItem = { name: "Item 3" };
    request(app)
      .post("/api/items")
      .send(newItem)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("name", "Item 3");
        done();
      });
  });

  it("should update an existing item", (done) => {
    const updatedItem = { name: "Updated Item 1" };
    request(app)
      .put("/api/items/1")
      .send(updatedItem)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("name", "Updated Item 1");
        done();
      });
  });

  it("should update an existing item with new data", (done) => {
    const newItemData = { name: "New Data Item 1" };
    request(app)
      .put("/api/items/1")
      .send(newItemData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("name", "New Data Item 1");
        done();
      });
  });

  it("should delete an existing item", (done) => {
    request(app)
      .delete("/api/items/2")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property(
          "message",
          "Item deleted successfully"
        );
        done();
      });
  });

  it("should return 404 when deleting a non-existing item", (done) => {
    request(app)
      .delete("/api/items/999")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message", "Item not found");
        done();
      });
  });

  it("should return 404 when updating a non-existing item", (done) => {
    const updatedItem = { name: "Non Existing Item" };
    request(app)
      .put("/api/items/999")
      .send(updatedItem)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message", "Item not found");
        done();
      });
  });
});
