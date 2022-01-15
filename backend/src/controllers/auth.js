const {user, profile} = require('../../models');

// bcrypt package
const bcrypt = require('bcrypt');

// joi package
const joi = require('joi');

const jwt = require("jsonwebtoken")

// Login
exports.login = async (req, res)=>{

    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).required()
    })

    const {error} = schema.validate(req.body);

    if(error){
        return res.send({
            error : error.details[0].message
        })
    }
    try {
        const {email, password} = req.body;
        const userData = await user.findOne({
            where : {
                email
            }
        })
    
        if(!userData){
            return(
            res.status(400).send({
                status : 'failed',
                message : "email & password not match"
            })
            )
        }
        
        const isMatching = await bcrypt.compare(password, userData.password);
        if(!isMatching){
            return(
            res.status(400).send({
                status : 'failed',
                message : "email & password not match"
            })
            )
        }
    
        const SECRET_KEY = "waysfood-batch28";
        const payload = {
            id : userData.id,
            email : userData.email,
            name : userData.name,
            role : userData.role,
        }

        const token = jwt.sign(payload, SECRET_KEY);

        res.status(200).send({
            status : "success",
            message : "Login success",
            data : {
                name : userData.name,
                email : userData.email,
                role : userData.role,
                token
            }
        })
        
    } catch (error) {
            console.log(error);
            res.status(500).send({
                status : "failed",
                message : "server error"
            })
        }
    }
    // Register
exports.register = async (req, res)=>{

        const schema = joi.object({
            email : joi.string().email().required(),
            password : joi.string().min(4).required(),
            name : joi.string().min(2).required(),
            gender : joi.string().required(),
            phone : joi.string().required(),
            role : joi.string().required()
        })

        const {error} = schema.validate(req.body);

        if(error){
            return res.send({
                error: error.details[0].message
            })
        }
        try {

            // we generate salt (random value) with 10 rounds
            const salt = await bcrypt.genSalt(10);

            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            
            const createdData = await user.create({
                email : req.body.email,
                password : hashedPassword,
                name : req.body.name,
                gender : req.body.gender,
                phone : req.body.phone,
                role : req.body.role,
            });

            await profile.create({
                userID : createdData.id,
                location : null,
                image : "profile.png"
            })
            
            const SECRET_KEY = "waysfood-batch28";
            const payload = {
                id : createdData.id,
                email : createdData.email,
                name : createdData.name,
                role : createdData.role,
            }
    
            const token = jwt.sign(payload, SECRET_KEY);
            res.status(200).send({
            status : "success",
            message : "user have been register",
            data : {
                name : createdData.name,
                token,
                email : createdData.email,
            }
            })
        } catch(err) {
            console.log(err)
            res.status(500).send({
            status : "failed",
            message : "server error"
            })
        }
} 
    

exports.checkAuth = async (req, res)=>{
    try {
        const id = req.user.id;

        const data = await user.findOne({
            where:{
                id
            },
            attributes:{
                exclude : ['createdAt', 'updatedAt', 'password']
            }
        })

        if(!data){
            res.status(404).send({
                status : 'failed',
                message : 'no user data'
            })
        }
        res.status(200).send({
            status : "success",
            data
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status : "failed",
            message:"server error"
        })
    }
}