var express = require('express');
var router = express.Router();
const user = require('../../Model/user');

router.post("/Register",async function(req,res){
    let User= await user.findOne({Email:req.body.Email});
        if(User) 
            return res.status(400).send("User with Given Name is already exist");
        User= new user();
        User.FirstName=req.body.FirstName;
        const Usersave=await User.save();
        console.log(Usersave);
});

router.post("/Login",async function(req,res){
    let User;
      try {
        User = await user.findOne({ Email: req.body.Email });
        if (!User) 
            User = await user.findOne({ PhoneNumber: req.body.PhoneNumber });
        const validatedUser = await bcrypt.compare(
          req.body.password, User.password
        );
       if(!validatedUser) return res.status(403).send("Wrong Credientials!");
      } catch (error) {
          res.status(404).json("Something went Wrong at server!");
    }
    var token = jwt.sign({ _id: User._id,Email:User.Email,role:User.role }, "webtokensecret");
    res.send(token);
});
router.get("/",async function(req,res){
    var getuser = await user.find();
    return res.send(getuser);
})
router.delete('/:id', async function(req, res) {
    var UserData = await user.findByIdAndDelete(req.params.id);
    return res.send(UserData);
});
module.exports=router;