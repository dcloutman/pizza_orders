const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const auth = require("./auth");

const router = express.Router();
router.use(bodyParser.json());

// Register a new user
router.post("/register", (req, res) => {
    const { username, password, email, address, phone } = req.body;

    const hashedPassword = auth.hashPassword(password);

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to connect to database.");
        }

        const sql = "INSERT INTO users (username, password, email, address, phone) VALUES (?, ?, ?, ?, ?)";
        connection.query(sql, [username, hashedPassword, email, address, phone], (err, result) => {
            connection.release();
            if (err) {
                console.log(err);
                return res.status(500).send("Failed to register user.");
            }

            const user = { id: result.insertId, username, email, address, phone };
            const token = auth.createToken(user);
            res.status(201).send({ user, token });
        });
    });
});

// Authenticate a user
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to connect to database.");
        }

        const sql = "SELECT * FROM users WHERE username = ?";
        connection.query(sql, [username], (err, results) => {
            connection.release();
            if (err) {
                console.log(err);
                return res.status(500).send("Failed to authenticate user.");
            }

            if (results.length === 0 || !auth.comparePasswords(password, results[0].password)) {
                return res.status(401).send("Invalid username or password.");
            }

            const user = { id: results[0].id, username: results[0].username, email: results[0].email, address: results[0].address, phone: results[0].phone };
            const token = auth.createToken(user);
            res.status(200).send({ user, token });
        });
    });
});

// Get all users
router.get("/", (req, res) => {
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to connect to database.");
        }

        const sql = "SELECT id, username, email, address, phone FROM users";
        connection.query(sql, (err, results) => {
            connection.release();
            if (err) {
                console.log(err);
                return res.status(500).send("Failed to get users.");
            }

            res.status(200).send(results);
        });
    });
});

// Get a user by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to connect to database.");
        }

        const sql = "SELECT id, username, email, address, phone FROM users WHERE id = ?";
        connection.query(sql, [id], (err, results) => {
            connection.release();
            if (err) {
                console.log(err);
                return res.status(500).send("Failed to get user record");



// Get a user by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        const sql = "SELECT id, username, email, address, phone FROM users WHERE id = ?";
        connection.query(sql, [id], (err, results) => {
            connection.release();
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal Server Error" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const user = { id: results[0].id, username: results[0].username, email: results[0].email, address: results[0].address, phone: results[0].phone };
            res.status(200).json(user);
        });
    });
});

module.exports = router;


