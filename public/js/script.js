// Connect to the server via Socket.io
const socket = io();

// Handle form submission
const form = document.getElementById('uploadForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const downloads = document.getElementById('downloads').value;
    const file = document.getElementById('file').files[0];

    const formData = new FormData();    
    formData.append('downloads', downloads);
    formData.append('file', file);

    try {
        // Send form data to the server using Socket.io
        socket.emit('upload', formData);
        socket.on('success', (result)=>{
            alert(result);
        });
    } catch (error) {
        console.error('Error al enviar formulario:', error);
    }
});
