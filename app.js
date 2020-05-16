require("dotenv").config();
const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const favicon = require("serve-favicon");

const app = express();
const httpServer = http.createServer(app);
const io = socketio.listen(httpServer);

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.set("view engine", "pug");
app.use("/", express.static(path.join(__dirname, "/public")));

const clock1 = require("./scripts/default");
const clock2 = require("./scripts/gbn");
const clock3 = require("./scripts/gbm");
const clock4 = require("./scripts/cbm-sameUnits");
const clock5 = require("./scripts/cbm-differentUnits");
const clock6 = require("./scripts/ask");

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
