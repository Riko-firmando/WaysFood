const {transaction, user, order, product, profile} = require("../../models");

exports.getTransactions = async (req,res)=>{
    try {
        
        const {id} = req.user;

        const data = await transaction.findAll({
            where : {
                sellerID : id
            },
            attributes :{
                exclude :["updatedAt", "userID", "sellerID"]
            },
            include :[{
                model : user,
                as : "user",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password", "phone", "role"]
                },include : {
                    model : profile,
                    as : "profile",
                    attributes :{
                        exclude :["createdAt", "updatedAt", "userID"]
                    },
                },

            },
            {
                model : user,
                as : "seller",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password", "phone", "image", "role"]
                }
            },
            {
                model : order,
                as : "orders",
                attributes :{
                    exclude :["createdAt", "updatedAt", "productID", "transactionID"]
                },include : {
                    model : product,
                    as : "product",
                    attributes :{
                        exclude :["createdAt", "updatedAt", "userID"]
                    },
                },
            }]
        })

        res.send({
            status : "success",
            data
        })

    } catch (error) {
        console.log(error);
        res.send({
            status : "failed",
            message : "server error"
        })
    }
}

// By ID
exports.getTransaction = async (req,res)=>{
    try {
        
        const {id} = req.params;
        const data = await transaction.findOne({
            where:{
                id
            },
            attributes :{
                exclude :["updatedAt", "userID"]
            },
            include :[{
                model : user,
                as : "user",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password", "phone", "role"]
                }
            },
            {
                model : order,
                as : "orders",
                attributes :{
                    exclude :["createdAt", "updatedAt", "productID", "transactionID"]
                },include : {
                    model : product,
                    as : "product",
                    attributes :{
                        exclude :["createdAt", "updatedAt", "userID"]
                    },
                },
            }]
        })

        res.send({
            status : "success",
            data
        })

    } catch (error) {
        console.log(error);
        res.send({
            status : "failed",
            message : "server error"
        })
    }
}

exports.addTransaction = async (req,res)=>{
    try {
        if(req.user.role == "owner"){
            return res.send({
                message : "status denied"
            })
        }
        const {id} = req.user;
        const newData = await transaction.create({
            userID : id,
            sellerID : req.body.sellerID,
            price : req.body.price,
            status : "pending"
        });


        const data = await transaction.findOne({
            where:{
                id : newData.id
            },
            attributes :{
                exclude :["createdAt", "updatedAt", "userID"]
            },
            include :[{
                model : user,
                as : "user",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password", "phone", "image", "role"]
                }
            },
            {
                model : order,
                as : "orders",
                attributes :{
                    exclude :["createdAt", "updatedAt", "productID", "transactionID"]
                },include : {
                    model : product,
                    as : "product",
                    attributes :{
                        exclude :["createdAt", "updatedAt", "userID"]
                    },
                },
            }]
        })
        res.send({
            status : "success",
            data
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message : "server error"
        })
    }
}

exports.updateTransaction = async (req,res)=>{
    try {
        const {id} = req.params;
        
        await transaction.update(req.body, {
            where :{
                id
            }
        });
        const newData = await transaction.findOne({
            where:{
                id
            },
            attributes:{
                exclude:['createdAt', 'updatedAt', 'userID']
            },
            include :[{
                model : user,
                as : "user",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password", "phone", "image", "role"]
                }
            },
            {
                model : order,
                as : "orders",
                attributes :{
                    exclude :["createdAt", "updatedAt", "productID", "transactionID"]
                },include : {
                    model : product,
                    as : "product",
                    attributes :{
                        exclude :["createdAt", "updatedAt", "userID"]
                    },
                },
            }]
        })
        res.send({
            status : "success",
            message : "update transaction finished",
            data : newData
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message : "server error"
        })
    }
}


exports.deleteTransaction = async (req,res)=>{
    try {
        const {id} = req.params;
        await transaction.destroy({
            where :{
                id
            }
        });
        res.send({
            status : "success",
            message : `delete transaction with id = ${id} finished`
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message : "server error"
        })
    }
}

// user transactions
exports.userTransactions = async (req,res)=>{
    try {
        const {id} = req.user;
        const data = await transaction.findAll({
            where :{
                userID : id
            },
            attributes : {
                exclude : [ "updatedAt", "userID", "sellerID"]
            },
            include :[{
                model : user,
                as : "user",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password"]
                },
            },{
                model : user,
                as : "seller",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password"]
                },
            },{
                model : order,
                as : "orders",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "transactionID", "productID"]
                },
                include : {
                    model : product,
                    as : "product",
                    attributes : {
                        exclude : ["createdAt", "updatedAt", "userID"]
                    } 
                }
            }]
        });
        res.send({
            status : "success",
            data
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message : "server error"
        })
    }
}
