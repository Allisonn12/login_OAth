const pool = require('../../models/config');

module.exports = {
    create: (data, callBack) => { // function to create new user
        pool.query(
            "INSERT INTO registration(firstName,lastName,gender,email,password,number)"+
            "VALUES(?,?,?,?,?,?)",
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, result, fields) =>{
                if (error){
                   return callBack(error);
                }
                return callBack(null, result)
            });
    }, 
    getUser: callBack => { // Function to select user
        // (id,firstName,lastName,gender,email, number)
        pool.query("SELECT * from registration",
        [],
        (error, result, fields) => {
            if (error){
                return callBack(error);
            }
            return callBack(null, result[0]);
        });
    },
    getUserById: (id, callBack) => { // Function to select user by ID
        // (id,firstName,lastName,gender,email, number)
        pool.query("SELECT * from registration WHERE id=?",
        [id],
        (error, result, fields) => {
            if (error){
                return callBack(error);
            }
            return callBack(null, result[0]);
        });
    },
    updateUsers: (data, callBack) => {// Function to update user
        pool.query("UPDATE registration SET firstName=?,"+
        "lastName=?,gender=?,email=?"+
        ",password=?,number=? WHERE id=?",
        [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
        ],
        (error, result, fields) =>{
            if (error){
               return callBack(error); // If update was unsuccessful, return reason 
            }
            if (!result){ 
                return res.json({
                    success: 0,
                    message: "Error updating"
                }); 
            }
            return callBack(null, result) // Else return true
        });
    },
    deleteUser: (data, callBack) => { // Funcion to Del user
       try{
        pool.query("DELETE FROM registration WHERE id=?",
        [data.id],
        (error, result, fields) => {
            if (error){
                return callBack(error);
            }
            return callBack(null, result[0]);
        });
       }catch(err){
        res.json({
            success: 0,
            message: err
        });
       }
    },
    authUserEmail: (email, callBack) => { // Athenticate user by email
        pool.query("SELECT * FROM registration WHERE email=?",
        [email],
        (error, result, fields) =>{
            if (error){
                callBack(error);
            }
            return callBack(null, result[0]);
        });
    }
};