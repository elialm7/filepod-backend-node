
const { subscribetoEvent, publishEvent } = require('../Events/EventManager.js');
const filestorage = require('../services/FileStorage.js');
const generateuid = require('../shared/UIDGenerator.js');
const socketManager = (socket) => {
	publishEvent("Connection", `${socket.id} se ha conectado. `);
	handleClient(socket);
	handleTerminalClient(socket);
}

const handleTerminalClient = (socket) => {

	socket.on('RegisterTerminalRequest', (token, type) => {
		if (isValidToken(token)) {
			publishEvent("AdminTerminalRegistration", `${socket.id} es una terminal de admin valida y puede registrarse. `);
			if (type === 'listener') {
				subscribetoEvent((event, message, date) => {
					socket.emit('BackendListener', { event, message, date });
				});
			}
			socket.emit('RegisterTerminalResponse', `Terminal admin con id ${socket.id} registrado exitosamente.`);
		} else {
			socket.emit('InvalidToken', "El token es invalido, no puede registrarse como terminal de admin.");
			publishEvent("InvalidAdminTerminal", `${socket.id} es una terminal con token invalido, y no puede conectarse.`);
		}

	});

	socket.on('FileStatusRequest', (token) => {
		if (isValidToken(token)) {
			publishEvent('FileStatus', "admin ha pedido el estado de los archivos en memoria");
			socket.emit('FileStatusResponse', filestorage.getNumberOfFiles());
		} else {
			socket.emit('InvalidToken', "El token de operacion es invalido.");
		}

	});
	socket.on('CleanFilesRequest', (token) => {

		if (isValidToken(token)) {
			publishEvent('CleanFilesRequest', `Terminal Admin con id: ${socket.id} ha pedido la limpieza de archivos en memoria.`);
			let cache = filestorage.getNumberOfFiles();
			filestorage.cleanfiles();
			socket.emit('CleanFileResponse', cache);
		} else {
			socket.emit('InvalidToken', "El token de operacion es invalido.");
		}


	});
	socket.on('DeleteByIdRequest', (id, token) => {
		if (isValidToken(token)) {
			if (filestorage.getFilebyUID(id)) {
				publishEvent('DeleteByIdRequest', `Terminal Admin con id: ${socket.id} ha pedido la limpieza del archivo con id: ${socket.it} `);
				filestorage.deleteFilebyUID(id);
				socket.emit('deletebyid', `El archivo con id: ${id} ha sido eliminado correctamente`);
			} else {
				publishEvent('TerminaldeleteById', `Terminal Admin con id ${socket.id} ha intentado borrar un archivo que ya no existe en el servidor.`);
				socket.emit('deletebyid', `El archivo con id: ${id} no existe, por lo tanto no se puede borrar. `);
			}

		} else {
			socket.emit('InvalidToken', "El token de operacion es invalido.");
		}

	});
}

const handleClient = (socket) => {
	socket.on('enviar-archivo', (filename, filedata) => {
		publishEvent("upload", `id ${socket.id} ha empezado una subida de archivo.`);
		const uid = generateuid();
		filestorage.saveFile({ uid, filename, filedata });
		publishEvent("uploadfinish", `id ${socket.id} ha finalizado la subida de archivo.`);
		socket.emit('archivo-guardado', uid);
		publishEvent("idsentback", `Se ha remitido el uid al id ${socket.id} para la descarga. `);
	});

	socket.on('disconnect', () => {
		publishEvent("Disconnection", `El id ${socket.id} se ha desconectado.`);
	});

}

const isValidToken = (token) => {
	return token === process.env.TOKEN;
}

module.exports = socketManager;