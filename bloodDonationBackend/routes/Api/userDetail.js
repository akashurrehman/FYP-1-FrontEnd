var express = require('express');
var router = express.Router();
const user = require('../../Model/user');
const Image=require('../../Model/ImageSchema');
const path=require('path');
const multer = require("multer");
const validatePicture=require('../../Middlewares/validatePicture');


var maxSize = 2097152;

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const error =
        file.mimetype === "image/jpeg" || file.mimetype === "image/png"
          ? null
          : new Error("Please, Select file with Jpeg or png format");
      cb(error, "./public/images");
      console.log(file.mimetype);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    console.log(file.originalname)
    },
});
  
const upload = multer({
    storage: Storage,
}).single("image");

router.post("/upload", upload, async (req, res) => {
    console.log("Upload",upload);
    const picture = new Image({
      image: req.file.filename,
      imagePath: req.file.path,
      userName: req.body.userName,
    });
    try {
      await picture.save();
      res.send(picture);
      console.log("Picture saved",picture);
    } catch (err) {
      console.log(err);
    }
  });
  router.get('/images/:userName', async (req, res) => {
    try {
      //const imageId = req.params.id;
      const UserName = req.params.userName;
      //const image = await Image.findById(imageId);
      const image=await Image.findOne({userName:UserName});
      if (!image) {
        return res.status(404).send({ error: 'Image not found' });
      }
      res.send(image);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: 'Failed to fetch image' });
    }
  });  
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
    res.send(token);
});
router.get("/",async function(req,res){
    var getuser = await user.find();
    console.log(getuser);
    return res.send(getuser);
})
router.delete('/:id', async function(req, res) {
    var UserData = await user.findByIdAndDelete(req.params.id);
    return res.send(UserData);
});
module.exports=router;