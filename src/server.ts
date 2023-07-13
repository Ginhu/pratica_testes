import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
import app from "./app";

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
