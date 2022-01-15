const {profile} = require('../../models');
const fs = require('fs');

exports.updateProfile = async (req, res)=>{
    try {
        const {id} = req.user;

        let latestFile = await profile.findOne({
            where: {
                userID : id
            }
        })
        if(latestFile.image != "profile.png"){
            const path = "./uploads/"
            latestFile.image = path + latestFile.image;
            fs.unlink(latestFile.image,  (err) => {
                if (err) throw err;
                console.log('file was deleted');
                });
        }

        const data = {
            location : req.body.location,
            image : req.file.filename
        }

        await profile.update(data, {
            where:{
                userID : id
            }
        })

        res.send({
            data : latestFile.image
        })

    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message : "server error"
        })
    }
}