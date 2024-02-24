const crypto = require('crypto');
const {saveFile, getFile} = require('../model/FileManager.js');
const getBaseLink = require('../config/Config.js');
const socketManager = (socket) =>{
	
	socket.on('enviar-archivo', (filename, filedata)=>{
		
		const uid = generateUID();
		savetoFileSystem(uid, filename, filedata);
		const link = genereateLink(uid);
		socket.emit('archivo-guardado', link);
	});
	
	socket.on('disconnect', ()=>{
		console.log("A client has leave the connection.");
	});
	
}

const genereateLink = (uid)=>{
	return (getBaseLink()+'/'+uid).toString(); 
}

const savetoFileSystem = ( id, filename, fileData) =>{
	saveFile(id, filename, fileData);
}
const generateUID = ()=>{
	return crypto.randomBytes(16).toString('hex');
}

module.exports = socketManager;