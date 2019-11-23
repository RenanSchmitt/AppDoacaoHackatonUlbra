var fs = require("fs");

/**
 * Extracts just digits from string
 * @param {String} input 
 * @returns {Number}
 */
function JustNumbers(input) {
    return input.replace(/\D/g, "");
}

/**
 * 
 * @param {Response} res 
 * @param {String} arquivo 
 * @param {Object} info 
 */
function RenderFileToRequest(res, arquivo, info) {
    return new Promise((resolve, reject) => {
        RenderFile(arquivo, info).then(data => {
            res.send(data);
            resolve();
        }).catch(reject);
    });
}

/**
 * 
 * @param {String} data 
 * @param {Object} info 
 */
function Render(data, info) {
    for (var key in info)
        data = data.replace(new RegExp(`\\\$\\{${key}\\}`, "gi"), info[key]);
    return data;
}

/**
 * 
 * @param {String} arquivo 
 * @param {Object} info 
 */
function RenderFile(arquivo, info) {
    return new Promise((resolve, reject) => {
        fs.readFile(arquivo, (err, data) => {
            if (err) return reject(err);
            resolve(Render(data.toString(), info));
        });
    });
}

module.exports = {
    JustNumbers: JustNumbers,
    Render: Render,
    RenderFile: RenderFile,
    RenderFileToRequest: RenderFileToRequest
}