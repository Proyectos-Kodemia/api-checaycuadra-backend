const mongoose = require('mongoose')
const { Schema } = mongoose

const DocumentSchema = new Schema({

  nameDocument: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  whoSent: {
    type: String,
    enum: ['user', 'account']
  },
  comments: {
    type: String
  }
}, {
  timestamp: true
})

module.exports = DocumentSchema

/*
Idea actual
Los archivos se guardan, los envies o no.
Cuando se envian, ya no hay vuelta atrás

Idea 1
Los archivo se guardan, los envies o no, y se comparte la autorización.
En un punto dado se puede quitar la autorización

Idea 2
Los archivos se envian y se guardan solo los que envias

A considerar:
- Tiempos de desarrollo
- Campo WhoSent, permanecerío o no de acuerdo a la idea
- Doccuments estaría agregado a la cita o no?
- Agregar ambos ids usuario y contador, se llenará el correspondiente se cree un documento
el contrario, parmenecerá vacío

*/
