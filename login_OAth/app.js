require("dotenv").config();
const hlabi = require('express');
const app = hlabi();
const userRouter = require('./api/users/user.router');
 

app.use(hlabi.json());
app.use("/api/users",userRouter);



// Return web token to user after OAUth
// create middleware to evaluate web token


app.listen(process.env.APP_PORT, ()=>{
    console.log("Server up and running on port: ", process.env.APP_PORT);
});