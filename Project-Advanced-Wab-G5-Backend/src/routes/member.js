var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const authorization = require('./../config/authorize')

var Schema = require("mongoose").Schema;
const memberScherma = Schema({
    id: String,
    type: String,
    name: String,
    detail: String,
    phone: String,
    img: String,
}, {
    collection: 'members'
});

let Member
try {
    Member = mongoose.model('members')
} catch (error) {
    Member = mongoose.model('members', memberScherma);
}

const makeHash = async (plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

const insertMember = (dataMember) => {
    return new Promise((resolve, reject) => {
        var new_member = new Member({
            id: dataMember.id,
            type: dataMember.type,
            name: dataMember.name,
            detail: dataMember.detail,
            phone: dataMember.phone,
            img: dataMember.img
        });
        new_member.save((err, data) => {
            if (err) {
                reject(new Error('Cannot insert member to DB!'))
            } else {
                resolve({ message: 'member added successfully' });
            }
        });
    });
}
router.route('/addmember').post(authorization,(req, res) => {
    console.log('add');

    insertMember(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
})

const getMember = () => {
    return new Promise(
        (resolve, reject) => {
            Member.find({}, (err, data) => {
                if (err) {
                    reject(new Error('Cannot get members!'));
                } else {
                    if (data) {
                        resolve(data)
                    } else {
                        reject(new Error('Cannot get members!'))
                    }
                }
            })
        }
    );
}

router.route('/getmember').get(authorization, (req, res) => {
    console.log('get');
    getMember().then(result => {
        res.status(200).json(result);
    })
        .catch(err => {
            console.log(err);
        })
})

const deleteMember = (MemberID) => {
    return new Promise((resolve, reject) => {
        var new_member = new Member(
            MemberID
        );
        new_member.deleteOne(MemberID, (err, data) => {

            if (err) {
                reject(new Error('Cannot delete member!'));
            } else {
                if (data) {
                    resolve(data)
                } else {
                    reject(new Error('Cannot delete member!'))
                }
            }
        }
        );
    });
}

router.route('/deletemember').post( authorization , (req,res)=>{
    console.log("express delete member");
    console.log(req.body._id);

    deleteMember({_id:req.body._id}).then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})



module.exports = router