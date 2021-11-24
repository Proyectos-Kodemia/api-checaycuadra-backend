const Cita = require("../../models/cita");

const getAll = async () => {
    return await Cita.model.find({}).exec();
};

const getById = async (idCita) => {
    return await Cita.model.findById(idCita).exec();
};

const getByUser = async (usuario) => {
    return await Cita.model.findOne(usuario).exec();
};

const update=async(postId,postData)=>{
    const {fecha,hora,servicio,totalPago} = postData
    return await Cita.model.findByIdAndUpdate(postId,{fecha,servicio,hora,totalPago}).exec()
}


module.exports ={
    getAll,
	getById,
	getByUser,
	update,
}