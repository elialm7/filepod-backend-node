const UidNotonServer = (uid) => {
    return `
    
        
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Not Found</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        }
        .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        }
        .message {
        text-align: center;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="message">
        <h1>Archivo no Encontrado</h1>
        <p>El archivo con  ID <b>${uid}</b> ya no existe en el servidor.</p>
        </div>
    </div>
    </body>
    </html>

    
    
    `;
}

const undefinedUId = (uid) => {

    return `
    
         <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Not Found</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        }
        .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        }
        .message {
        text-align: center;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="message">
        <h1>Identificador Unico No Definido.</h1>
        <p>No se ha pasado un identificador en el request.</p>
        </div>
    </div>
    </body>
    </html>

    
    `;

}

module.exports = { UidNotonServer, undefinedUId }; 