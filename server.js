const express = require("express");
const app = express();
const uuid = require("uuid");
const { User } = require("./config");

app.listen(3000);
app.use(express.json());

const endPoints = [
  {
    "get-list-of-users": "https://user-management-ddau.onrender.com/users",
    "request-method": "GET",
  },
  {
    "add-user": "https://user-management-ddau.onrender.com/add",
    "request-method": "POST",
  },
  {
    "update-user-by-id": "https://user-management-ddau.onrender.com/update/:id",
    "request-method": "PUT",
  },
  {
    "get-user-by-id": "https://user-management-ddau.onrender.com/user/:id",
    "request-method": "GET",
  },
  {
    "delete-user-by-id": "https://user-management-ddau.onrender.com/delete/:id",
    "request-method": "DELETE",
  },
];

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      message: "You can explore this website using following endpoints",
      success: true,
      Endpoints: endPoints,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    if (users != null) {
      res
        .status(200)
        .json({ message: "Users retrieved", success: true, users: users });
    } else {
      res.status(404).json({ success: false, message: "Users not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user === undefined || user === null) {
      res.status(404).json({ message: "User not found", success: false });
    } else {
      if (req.body.email != null) {
        user.email = req.body.email;
      } else if (req.body.firstName != null) {
        user.firstName = req.body.firstName;
      }
      const updatedUser = await user.save();
      res
        .status(200)
        .json({ message: "User updated", success: true, updatedUser });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

app.post("/add", async (req, res) => {
  try {
    if (
      req.body == "" ||
      !req.body.email ||
      !req.body.firstName ||
      req.body.email == "" ||
      req.body.firstName == ""
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid Input",
      });
    } else {
      try {
        await User.create({
          id: uuid.v4(),
          email: req.body.email,
          firstname: req.body.firstName,
        });
        res.status(201).json({
          message: "User added",
          success: true,
          users,
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: "Facing Error while creating User",
        });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await findById(userId);
    if (user === undefined || user === null) {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      res
        .status(200)
        .json({ success: true, user: user, message: "User Found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const deleteUser = await User.findById(req.params.id);
    if (deleteUser == undefined || deleteUser == null) {
      res.status.json({ success: false, message: "user Not found" });
    } else {
      try {
        await User.findByIdAndRemove(req.params.id);
        res
          .status(200)
          .json({ success: true, message: "User Deletes Successfully" });
      } catch (err) {
        res
          .status(500)
          .json({ success: false, message: "Internal server Error" });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
});
