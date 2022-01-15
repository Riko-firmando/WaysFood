
const fs = require('fs')
const { object } = require('joi');
const { json } = require('sequelize/dist');
// import "../../uploads"


const { product ,user } = require('../../models')

exports.addProduct = async (req, res ) => {
    try {
        if(req.user.role == 'customer'){
            return res.send({
                message :"access denied"
            })
        }
        const {id} = req.user;
        const newData = req.body;

        const data = await product.create({
            ...newData,
            image: req.file.filename,
            userID : id
        });

        const newProduct = await product.findOne({
            where:{
                id: data.id
            },
            attributes:{
                exclude : ["createdAt", "updatedAt", "userID"] 
            },
            include:{ 
                model:user,
                as : "user",
                attributes:{
                    exclude : ["createdAt", "updatedAt", "gender", "phone", "password"] 
                },
            }
        })
        res.send({
            status : "success",
            newProduct
        })
        
        } catch (err) {
        console.log(err)
        res.send({
            status : "failed",
            message : "server error"
        })
    }
}

exports.getProducts = async (req, res ) => {
    try {

        let data = await product.findAll({
            attributes:{
                exclude : ['createdAt', "updatedAt" , "userID"]
            },
            include : {
                model : user,
                as : "user",
                attributes:{
                    exclude : ["password",'createdAt', "updatedAt"]
                },
            }
        });

        const path = "http://localhost:5000/uploads/";

        data = JSON.parse(JSON.stringify(data))

        data = data.map(item=>{
            return {
                ...item,
                image: path + item.image
            }
        })        

        res.send({
            status : "success",
            type : typeof data,
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
// get product by user id

exports.getProductByUser = async (req, res ) => {
    try {
        const {id} = req.params;
        let data = await product.findAll({
            where :{
                userID : id
            },
            attributes:{
                exclude : ['createdAt', "updatedAt", "userID"]
            }
        });

        const owner = await user.findOne({
            where:{
                id
            }, 
            attributes:{
                exclude : ['createdAt', "updatedAt", "password"]
            }
        })

        const path = "http://localhost:5000/uploads/";

        data = JSON.parse(JSON.stringify(data))

        data = data.map(item=>{
            return {
                ...item,
                image: path + item.image
            }
        })        

        res.send({
            status : "success",
            owner,
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

exports.getProduct = async (req, res ) => {
    try {
        const {id} = req.params;
        const data = await product.findOne({
            where :{
                id
            },
            attributes:{
                exclude : ['createdAt', "updatedAt", "userID"]
            },
            include : {
                model : user,
                as : "user",
                attributes:{
                    exclude : ["password",'createdAt', "updatedAt"]
                },
            }
        });

        const path = "http://localhost:5000/uploads/";
    
        data.image = path + data.image;

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

exports.updateProduct = async (req, res ) => {
    try {
        if(req.user.role == 'customer'){
            return res.send({
                message :"access denied"
            })
        }
        const {id} = req.params;

        const file = req.file.filename;

            let latestFile = await product.findOne({
                where: {
                    id
                }
            })

            const path = "./uploads/"
            latestFile.image = path + latestFile.image;
            fs.unlink(latestFile.image,  (err) => {
                if (err) throw err;
                console.log('file was deleted');
                });

            var newData = {
                ...req.body,
                image : file
            };

        await product.update(newData,{
            where :{
                id
            }
        });
        
        const data = await product.findOne({
            where :{
                id
            },
            attributes:{
                exclude : ['createdAt', "updatedAt", "userID"]
            },
            include : {
                model : user,
                as : "user",
                attributes:{
                    exclude : ["password",'createdAt', "updatedAt"]
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

exports.deleteProduct = async (req, res) => {
        try {
            const {id} = req.params;

            data = await product.findOne({
                where:{
                    id
                }
            })

            const path = "./uploads/";
    
            data.image = path + data.image;

            fs.unlink(data.image,  (err) => {
                if (err) throw err;
                console.log('path/file.txt was deleted');
                });

            await product.destroy({
                where : {
                id
                }
            });

            res.send({
                status : "success",
                message : `product with id = ${id} have been delete`
            })
            
        } catch (err) {
            console.log(err)
            res.send({
                status : "failed",
                message : "server error"
            })
        }
}
    
    
