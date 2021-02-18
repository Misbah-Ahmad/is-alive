const fs = require('fs');

const writeNewFile = (filePath, data, callback) => {
    fs.open(filePath, 'wx', (err, descriptor) => {
        if (descriptor) {
            fs.writeFile(descriptor, JSON.stringify(data), (writeError) => {
                if (writeError) {
                    callback('Write error');
                } else {
                    fs.close(descriptor, (error) => {
                        if (error) {
                            callback('Could not close the file');
                        } else {
                            callback(null);
                        }
                    });
                }
            });
        } else {
            callback('Could not open/create the file');
        }
    });
};

const readFile = (filePath, callback) => {
    fs.readFile(filePath, 'utf-8', (readError, data) => {
        if (readError) {
            callback('Could not read the file', null);
        } else {
            callback(null, data);
        }
    });
};

const updateFile = (filePath, data, callback) => {
    fs.open(filePath, 'r+', (error, descriptor) => {
        if (error) {
            callback('Could not open the file');
        } else {
            fs.writeFile(descriptor, JSON.stringify(data), (writeError) => {
                if (writeError) {
                    callback('Could write to the file');
                } else {
                    fs.close(descriptor, (closeError) => {
                        if (closeError) {
                            callback('Could not close the file');
                        } else {
                            callback(null);
                        }
                    });
                }
            });
        }
    });
};

const fileExists = (filePath, callback) => {
    fs.access(filePath, fs.constants.F_OK, (error) => callback(!error));
};

const deleteFile = (filePath, callback) => {
    fs.unlink(filePath, (error) => callback(error));
};
module.exports = {
    writeNewFile,
    readFile,
    updateFile,
    fileExists,
    deleteFile,
};
/*
    Usage:

    const filePath = `${__dirname}/../.data/data.json`;

    writeNewFile(filePath, { a: 2 }, (error) => console.log(error));

    readFile(filePath, (error, data) => console.log(error, data));

    updateFile(filePath, { yoo: 'yoo' }, (error) => console.log(error));

    fileExists(filePath, (error) => {
        if (!error) {
            deleteFile(filePath, (deleteError) => {
                console.log(!deleteError ? 'deleted' : 'could not delete');
            });
        } else {
            console.log('file does not exist');
        }
    });

*/
