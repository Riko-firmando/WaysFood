const { user, product, profile } = require('../../models')
const joi = require('joi');
const bcrypt = require('bcrypt');



exports.getUsers = async (req, res ) => {
  try {

    const data = await user.findAll({
      attributes : {
        exclude : ['password', "createdAt", "updatedAt"]
      },
      include:{
        model : product,
        as : "products",
        attributes : {
          exclude : ["createdAt", "updatedAt", "userID"]
        },
      }
    });
    res.send({
      status : "success",
        data 
    })
    
  } catch (err) {
    console.log(err)
    res.send({
      status : "failed",
      message : "server error"
    })
  }
}

exports.getUser = async (req, res ) => {
  try {
    const {id} = req.user;
    const data = await user.findOne({
      where : {
        id
      },
      attributes : {
        exclude : ['password', "createdAt", "updatedAt"]
      },
      include:[{
        model : product,
        as : "products",
        attributes : {
          exclude : ["createdAt", "updatedAt", "userID"]
        },
      },{
        model : profile,
        as : "profile",
        attributes : {
          exclude : ["createdAt", "updatedAt", "userID"]
        },
      }]
    });

    const path = "http://localhost:5000/uploads/";
    
    data.profile.image = path + data.profile.image;
    res.send({
      status : "success",
        data
    })
    
  } catch (err) {
    console.log(err)
    res.send({
      status : "failed",
      message : "server error"
    })
  }
}

// update user
exports.updateUser = async (req, res ) => {
  try {
    

    const {id} = req.user;
    const data = req.body;
    
    await user.update(data, {
      where : {
        id
      }
    });
    res.send({
      status : "success",
      data: {
        user: {
          name : req.body.name,
          email : req.body.email
        }
      }
    })
    
  } catch (err) {
    console.log(err)
    res.send({
      status : "failed",
      message : "server error"
    })
  }
}

// delete user

exports.deleteUser = async (req, res ) => {
  try {
    const {id} = req.params;
    await user.destroy({
      where : {
        id
      }
    });
    res.send({
      status : "success",
      message : "user data have been delete"
    })
    
  } catch (err) {
    console.log(err)
    res.send({
      status : "failed",
      message : "server error"
    })
  }
}

