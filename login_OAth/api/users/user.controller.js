const {create,getUser, getUserById, updateUsers,deleteUser, authUserEmail} = require("./user.service");
const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const {sign} = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, result) =>{
            if (err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: result
            });
        });
    },
    getUserById: (req, res) =>{
        const id = req.params.id;
        getUserById(id, (err, result) => {
            if (err){
                console.log(err);
                return;
            }
            if (!result){
                return res.json({
                    success: 0,
                    message: "Records not found"
                });
            }
            return res.json({
                success: 1,
                data: result
            });
        });
    },
    getUser: (req, res) => {
        getUser((err, result) =>{
            if (err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: result
            });

        })
    },
    updateUsers: (req, res) => {
        const body = req.body; // Get data and store in the body var
        const salt = genSaltSync(10); // Generate a salt password
        body.password = hashSync(body.password ,salt); // Hash the password
        updateUsers(body, (err, result) =>{
            if (err){
                console.log(err); // If there is an error in updating query, console the error.
                return;
            }
            return res.json({ // Else return true
                success: 1,
                message: "Updated successfully"
            });
        });
    },
    deleteUser: (req, res)=> {
        const data = req.body;
        deleteUser(data, (err, result) => { // deleteUser, a method from our user.service.js file takes 2 arguments
            // Pass the data in the body of our API call, and RESULT
            if (err){
                console.log(err);
                return;
            }
            if (!result){
                res.json({
                    success: 0,
                    message: "Could not find records" // Echo message if call back was unsuccessful
                });
            }
            return res.json({
                success: 1,
                message: "Record deleted successfully"
            });
        })
    },
    loginAuth: (req,res) => {
        const body = req.body;
        authUserEmail(body.email, (err, result) =>{
            if (err){
                console.log(err);
            }
            if (!result){
                return res.json({
                    success: 0,
                    data: "invalid Email or Password"
                });
            }
            const getResults = compareSync(body.password, result.password);
            if (getResults){
                result.password = undefined;
                const token = sign({results: getResult}, "abc123", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login was successful",
                    token: token
                });
            }else{
                return res.json({
                    success: 0,
                    message: "Invalide email or password"
                });
            }
        });
    }
};