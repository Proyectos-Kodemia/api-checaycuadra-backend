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
          let preference = {
            items: [
              {
                title: req.body.title,
                unit_price: parseInt(req.body.price),
                quantity: req.body.quantity,
              },
            ],
          };

          mercadopago.preferences
            .create(preference)
            .then(function (response) {
              // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
              console.log(response.body)

              res.redirect(response.body.init_point)

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