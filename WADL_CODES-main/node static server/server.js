// Import required modules
const http = require('http'); // HTTP module for creating HTTP server
const fs = require('fs');     // File System module for reading files
const path = require('path'); // Path module for working with file paths

// Create HTTP server
const server = http.createServer((req, res) => {
    // Construct the file path based on the requested URL
    let filePath = './public' + req.url;
    console.log("URl", req.url);

    // If URL is just "/", serve index.html
    if (filePath == './public/')
        filePath = './public/index.html';

    // Determine the file extension to set proper content type
    // It extracts the extension from a file path.
    let extname = path.extname(filePath);

    // Default content type is HTML
    let contentType = 'text/html';

    // Map file extensions to content types
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    // Read the requested file
    //asynchronously reading the contents of a file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // File not found, return 404
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                // Server error, return 500
                // This method sends a response header to the request. 
                res.writeHead(500);
                res.end('500 Internal Server Error: ' + err.code);
            }
        } else {
            // File found, send the content with appropriate content type
            res.writeHead(200, { 'Content-Type': contentType });
            // This method signals to the server that all of the response headers and body have been sent. This method must be called on each response.
            res.end(content, 'utf-8');
        }
    });

});

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
