const mongoose = require("mongoose");
const request = require("supertest");
const { Outflow } = require("../../models/outflow");
const { User } = require("../../models/user");

let server;

describe("/api/genres");
