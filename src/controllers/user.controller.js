import sequelize, { Op } from "sequelize";
import { User } from "../models";

export const user = async (req, res) => {};

export const profile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: { [Op.eq]: req.email },
      },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "image",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    });
    if (!user) {
      res.status(200).json({
        error: true,
        status: "404",
        message: "The user was not found.",
        user: null,
      });
    } else {
      res.status(200).json({
        error: false,
        status: "200",
        message: "User was successfully found.",
        user,
      });
    }
  } catch (error) {
    return res.status(200).json({
      error: true,
      status: "500",
      message: "An error occurred while searching for the user.",
      content: error,
    });
  }
};





//LIST USERS
export const list = async (req, res) => {
  try {
  const user = await User.findAll();
  if (!user) {
  res.status(400).json({
  message: "The user was not found.",
  user: [],
  error:true,
  status:"400"
  });
  }else{
  res.status(200).json({
  message:"Users was successfully found.",
  user,
  error:false,
  status: "200"
  })}

  }catch (error) {
  return res.status(500).json({
  message:"An error occurred while searching for the user.",
  user:[],
  error:true,
  status: "500",
  content: error,
  })}
};



//DELETE USER
export const userDelete = async (req,res) =>{
  const id = req.params.id;
  if(!id){
  res.status(400).json({
  message:"ID is not provided",
  error:true,
  status:"400"
  })
  }else{
  User.destroy({where:{id}})
  .then((result)=>{
  if(!result){
  res.status(404).json({message:"No user",status:"404",error:true});
  }else{
  res.status(200).json({message:"deleted users",result,status:"200",error:false});
  }})
  .catch((error)=>{
  res.status(400).json({message:error,status:"400",error:true});
  });
    
  }

}