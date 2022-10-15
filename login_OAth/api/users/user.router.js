const { createUser,getUser, getUserById, updateUsers,deleteUser, loginAuth} = require("./user.controller");
const router = require("express").Router(); // Create new route object to handle requests 
const { checkToken } = require("../../auth/token_validation");
// Use CRUD to handle data in our database
router.post("/",checkToken, createUser); // Create User
router.get("/",checkToken, getUser); // Reteive All Users
router.get("/:id",checkToken,getUserById); // retrieve Spacific User by ID
router.patch("/",checkToken, updateUsers); // Update users
router.delete("/",checkToken, deleteUser);// Delete users
router.get("/login", loginAuth); // Authenticate user

module.exports = router; 