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
  whoReceived: { // Id de quien recibe , coincide con los idś de esa cita
    type: String,
    required: true
  },
  owner:{ // Id de quien comparte , coincide con los idś de esa cita y con el IdUpload de storage
    type: String,
    required: true
  },
  comments: {
    type: String
  },
  linkAWS: {
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
