var crypto = require("crypto");

/**
 * 
 * @param {String} password Password to be hashed
 * @param {String | Number?} salt Salt to be used (string) or salt length (in bytes) to be generated (Number) (default: 32)
 * @param {String?} algorithm Algorithm that will be used (default: sha512)
 */
function Hash(password, salt, algorithm) {
    if (!algorithm)
        algorithm = "sha512";
    if (typeof salt != "string")
        salt = GenSalt(salt);
    return `${algorithm}:${salt}:${crypto.createHmac("sha512", salt).update(password).digest("base64")}`;
}

/**
 * 
 * @param {*} length Length of the salt (in bytes) (default: 32)
 */
function GenSalt(length) {
    if (length == undefined)
        length = 32;
    return crypto.randomBytes(length).toString("base64");
}

/**
 * 
 * @param {String} password The password the user typed
 * @param {String} passwordHash The salt+hash you stored with the method Hash
 * @returns {Boolean} Returns true if the password is a match
 */
function Check(password, passwordHash) {
    return passwordHash == Hash(password, passwordHash.split(":")[1], passwordHash.split(":")[0]);
}

module.exports = {
    Hash: Hash,
    Check: Check,
    GenSalt: GenSalt
}