// src/app.js
import express from "express";
import { getItems, createItem, updateItem, deleteItem } from "./controller.js"; // Import named exports

const app = express();
const port = 3000;

app.use(express.json());

// Routes
app.get("/api/items", getItems);
app.post("/api/items", createItem);
app.put("/api/items/:id", updateItem);
app.delete("/api/items/:id", deleteItem); // Delete route

// Start the server
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});

export default app;
