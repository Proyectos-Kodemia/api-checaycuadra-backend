const Account =require ("../../models/account")

const get=async()=>{
    return await Account.model.find({}).exec()
}

module.exports={get}