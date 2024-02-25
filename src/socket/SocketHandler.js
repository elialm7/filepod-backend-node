const crypto = require('crypto');
const { saveFileInMemory } = require('../model/FileManager.js');
const getBaseLink = require('../config/Config.js');
require('log-timestamp');
const socketManager = (socket) => {

	socket.on('enviar-archivo', (filename, filedata) => {
		const uid = generateUID();
		savetoFileSystem(uid, filename, filedata);
		const link = genereateLink(uid);
		console.log(`Link generated: ${link}`);
		socket.emit('archivo-guardado', link);
	});

	socket.on('disconnect', () => {
		console.log(`User ${socket.id} has closed the connection.`);
	});

}

const genereateLink = (uid) => {
	return (getBaseLink() + '/' + uid).toString();
}

const savetoFileSystem = (id, filename, fileData) => {
	console.log(`Data to save: ${id} - ${filename}`);
	saveFileInMemory(id, filename, fileData);
}
const generateUID = () => {
	return crypto.randomBytes(16).toString('hex');
}

module.exports = socketManager;