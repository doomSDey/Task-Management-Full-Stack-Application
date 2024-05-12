const { authorizeJwt } = require( "../middleware" );
const notesController = require( "../controllers" ).notes;

module.exports = app => {
    app.get( "/notes/:noteId", notesController.show );
    app.post( "/notes", [ authorizeJwt.verifyToken ], notesController.create );
};
