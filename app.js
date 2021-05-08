import "dotenv/config";

import { fileURLToPath } from "node:url";
import http from "node:http";
import path from "node:path";
import express from "express";
import { Server } from "socket.io";
import favicon from "serve-favicon";

import clock1 from "./scripts/default/index.js";
import clock2 from "./scripts/gbn/index.js";
import clock3 from "./scripts/gbm/index.js";
import clock4 from "./scripts/cbm-sameUnits/index.js";
import clock5 from "./scripts/cbm-differentUnits/index.js";
import clock6 from "./scripts/ask/index.js";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(favicon(path.join(path.dirname(fileURLToPath(import.meta.url)), "public", "favicon.ico")));
app.set("view engine", "pug");
app.use("/", express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "/public")));

app.get("/", (req, res) => res.render("landing", { title: "cbmjs demo" }));
app.get("/1", (req, res) => res.render("clock_1", { title: "Default JavaScript" }));
app.get("/2", (req, res) => res.render("clock_2", { title: "Get by name" }));
app.get("/3", (req, res) => res.render("clock_3", { title: "Get by meaning" }));
app.get("/4", (req, res) => res.render("clock_4", { title: "Call by meaning with existing units" }));
app.get("/5", (req, res) => res.render("clock_5", { title: "Call by meaning with different units" }));
app.get("/6", (req, res) => res.render("clock_6", { title: "Just Ask" }));

app.get("*", (req, res) => res.status(404).send("Hmm... How did you end up here?"));

let io1;
io.of("/1").on("connection", (socket) => {
	socket.on("clock1", () => {
		io1 = setInterval(() => {
			const times = clock1();
			io.of("/1").emit("data1", times);
		}, 1000);
	});
	socket.on("disconnect", () => clearInterval(io1));
});

let io2;
io.of("/2").on("connection", (socket) => {
	socket.on("clock2", () => {
		io2 = setInterval(async () => {
			const times = await clock2();
			io.of("/2").emit("data2", times);
		}, 1000);
	});
	socket.on("disconnect", () => clearInterval(io2));
});

let io3;
io.of("/3").on("connection", (socket) => {
	socket.on("clock3", () => {
		io3 = setInterval(async () => {
			const times = await clock3();
			io.of("/3").emit("data3", times);
		}, 1000);
	});
	socket.on("disconnect", () => clearInterval(io3));
});

let io4;
io.of("/4").on("connection", (socket) => {
	socket.on("clock4", () => {
		io4 = setInterval(async () => {
			const times = await clock4();
			io.of("/4").emit("data4", times);
		}, 1000);
	});
	socket.on("disconnect", () => clearInterval(io4));
});

let io5;
io.of("/5").on("connection", (socket) => {
	socket.on("clock5", () => {
		io5 = setInterval(async () => {
			const times = await clock5();
			io.of("/5").emit("data5", times);
		}, 1000);
	});
	socket.on("disconnect", () => clearInterval(io5));
});

let io6;
io.of("/6").on("connection", (socket) => {
	socket.on("clock6", () => {
		io6 = setInterval(async () => {
			const times = await clock6();
			io.of("/6").emit("data6", times);
		}, 1000);
	});
	socket.on("disconnect", () => clearInterval(io6));
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => console.log("Server started at http://localhost:%s. Have fun. 😀", port));
