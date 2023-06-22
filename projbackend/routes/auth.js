const express = require('express')
const router = express.Router()
const {signout,signup,signin,isSignedIn} = require("../controllers/auth")
const{check,validationResult}=require('express-validator');

router.post("/signup",[
  check("name","name should be atleast 3 char").isLength({min:3}),
  check("email","Email is require").isEmail(),
  check("password","password should be atleast 3 char").isLength({min:3})
], signup);

router.post(
  "/signin",
[
  check("email","Email is require").isEmail(),
  check("password","password field is required").isLength({min:1})
], 
signin);

router.get("/signout", signout );

router.get("/testroute", isSignedIn, (req,res)=>{
   res.json(req.auth);
});

module.exports = router;
