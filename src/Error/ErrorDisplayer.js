const DisplayUidError = (uid) => {
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
        <h1>File Not Found</h1>
        <p>The file with the specified ID <b>${uid}</b> doesn't exist anymore on the server.</p>
        </div>
    </div>
    </body>
    </html>

    
    
    `;
}

module.exports = DisplayUidError; 