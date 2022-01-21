const express = require('express')
const { authHandler, userHandler } = require('../middlewares/authHandlers')
const config = require("../lib/config")
const router = express.Router()

// SDK de Mercado Pago
const mercadopago= require('mercadopago')

// middleware


// agregar credenciales
const secretMercadoPago = config.mercadopago.secret

mercadopago.configure({
  access_token: secretMercadoPago
})

// Route

router.post('/checkout', async (req, res, next) => {
    try {
          // Traer información del servicio a comprar

          // Parametros de la compra
          console.log(req)

          console.log(req.body)
          // const request = JSON.parse(req.body)

          let preference = {
            items: [
              {
                title: req.body.title,
                unit_price: parseInt(req.body.unit_price),
                quantity: parseInt(req.body.quantity)
                
              }
            ],
            back_urls:{ // Va al front para señalar cual fue el status del pago
              success:"http://localhost:4000/principal/Cita",
              failure:"http://localhost:4000/principal/Cita",
              pending:"http://localhost:4000/principal/Cita"
            },
            auto_return:'approved',
          };

          console.log(preference)

          mercadopago.preferences
            .create(preference)
            .then(function (response) {
              // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
              console.log(response.body)

              res.json(response.body.sandbox_init_point)

            })
            .catch(function (error) {
              console.log(error);
            });
      
    
        
      // res.status(200).json({
      //   ok: true,
      //   payload: {
          
      //   }
      // })
    }catch (err) {
      next(err)
      console.log(err)
    }
  })






module.exports = router