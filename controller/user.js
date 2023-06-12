const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", { encoding: "utf-8" }));
const usersArr = data.users;

const getAllUsers = (req, res) => {
    res.json(usersArr);
}

const getUser = (req, res) => {
    const userId = Number(req.params.id);
    const user = usersArr.find((item) => item.id === userId);
    res.json(user);
  }

const createUser =(req, res) => {
    const newUser = req.body;
    usersArr.push(newUser);
    res.send(`The new product ${newUser.title} is created successfully.`);
  }

const replaceUser = (req, res) => {
    const userId = Number(req.params.id);
    const updateUser = req.body;
    const getUserIndex = usersArr.findIndex(
      (item) => item.id === userId
    );
    usersArr.splice(getUserIndex, 1, { id: userId, ...updateUser });
    res.sendStatus(200).send("Product update successfully.");
  }

const updateUser = (req, res) => {
    const userId = Number(req.params.id);
    const getUserIndex = usersArr.findIndex(
      (item) => item.id === userId
    );
    const user = usersArr[getUserIndex];
    usersArr.splice(getUserIndex, 1, { ...user, ...req.body });
    res.sendStatus(200).json();   
  }

const deleteUser = (req,res)=>{
    const userId = Number(req.params.id);
    const getUserIndex = usersArr.findIndex(
      (item) => item.id === userId
    );
    usersArr.splice(getUserIndex, 1);
    res.send("Product deleted successfully");
  }

module.exports = {getAllUsers,getUser,createUser,replaceUser,updateUser,deleteUser};