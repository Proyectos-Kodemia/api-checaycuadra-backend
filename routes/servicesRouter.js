const express = require('express')
const services = require('../usercases/services')

//get
router.get('/', async (request, response, next) => {
	try {
		const servicess = await services.get()
		response.json({
			ok: true,
			message: 'Done',
			payload: { servicess }
		})
	} catch (error) {
		next(error)
	}
})

//get by id
router.get('/', async (request, response, next) => {
	const { id } = request.params
	try {
		const servicesById = await services.getById(id)
		response.json({
			ok: true,
			message: 'Done',
			payload: { servicesById }
		})
	} catch (error) {
		next(error)
	}
})

//post
router.post('/' async (request, next) => {
	try {
	  const servicesData = request.body;
	  const servicesCreated = await services.create(servicesData);
  
	  response.status(201).json({
		ok: true,
		message: 'Creado satisfactoriamente',
		payload: {
		  services: servicesCreated,
		},
	  });
	} catch (error) {
	  next(error);
	}
  });

  //patch
router.patch("/:id", (request, response,) => {
	const { id } = request.params;
	const { services } = request.body;
  
	if (id == 99) {
	  response.status(404).json({
		ok: false,
		message: "El servicio no fue encontrado ",
	  });
	} else {
	  response.status(201).json({
		ok: true,
		message: `EL servicio ${id} fue actualizado satisfactoriamente`,
		payload: {
		  services,
		},
	  });
	}
  });

  //delete
router.delete("/:id", (request, response) => {
	const { id } = request.params;
	response.status(202).json({
	  ok: true,
	  message: `El servicio ${id} fue eliminado satisfactoriamente`,
	});
  });
  
module.exports = router;