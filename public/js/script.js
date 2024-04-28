// Handle form submission
const socket = io();
const form = document.getElementById('uploadForm');

// Function to read file data as base64
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const downloads = document.getElementById('downloads').value;
    const file = document.getElementById('file').files[0];

    const formData = new FormData();    
    formData.append('downloads', downloads);
    formData.append('file', file);

    const fileData = {
        filename: file.name,
        filesize: file.size,
        downloads: downloads,
        filedata: await readFileAsBase64(file), // Assuming you have a function to read file data as base64
    };

    try {

        socket.emit('enviar-archivo', fileData);

        socket.on('archivo-recibido', ({uid, pin})=>{
            alert(`pin: ${pin} || uid: ${uid}`);
        });

    } catch (error) {
        console.error('Error al enviar formulario:', error);
    }
});
