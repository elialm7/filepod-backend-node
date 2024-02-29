const { generateUID } = require('../shared/UIDGenerator.js');
const { subscribetoEvent, publishEvent } = require('../Events/EventManager.js');
const filestorage = require('../services/FileStorage.js');
const socketManager = (socket) => {
	subscribetoEvent((event, message, date) => {
		socket.emit('cliTerminal', { event, message, date });
	});
	publishEvent("Connection", `${socket.id} se ha conectado. `);

	handleClient(socket);
	handleTerminalClient(socket);
}
const handleTerminalClient = (socket) => {

	//handle terminal operations here.
}

const handleClient = (socket) => {
	socket.on('enviar-archivo', (filename, filedata) => {
		publishEvent("upload", `id ${socket.id} ha empezado una subida de archivo.`);
		const uid = generateUID();
		filestorage.saveFile({ uid, filename, filedata });
		publishEvent("uploadfinish", `id ${socket.id} ha finalizado la subida de archivo.`);
		socket.emit('archivo-guardado', uid);
		publishEvent("idsentback", `Se ha remitido el uid al id ${socket.id} para la descarga. `);
	});

	socket.on('disconnect', () => {
		publishEvent("Disconnection", `El id ${socket.id} se ha desconectado.`);
	});

}


module.exports = socketManager;