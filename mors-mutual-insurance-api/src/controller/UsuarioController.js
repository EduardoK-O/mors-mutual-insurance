const usuarioService = require("../services/UsuarioService");
const jwt = require('jsonwebtoken');
const {createHash} = require('crypto');
const { log } = require("console");

const getAllUsers = async (req, res) => {
    const allUsers = await usuarioService.getAllUsers();
    res.status(200).send(allUsers);
}

const getUserById = async (req, res) => {
    const user = await usuarioService.getUserById(req.params.userId);
    res.status(200).send(user);
}

const createNewUser = async (req, res) => {
    const { body } = req;
    if(!body.nombre || !body.username || !body.password || !body.correo || !body.idRol){
        return res.status(400).send('BAD REQUEST');
    }
    const newUSer = {
        nombre: body.nombre,
        username: body.username,
        password: createHash('sha256').update(body.password).digest('hex'),
        correo: body.correo,
        idRol: body.idRol,
        activo: body.activo
    }
    const createdUser = await usuarioService.createNewUser(newUSer);
    res.status(200).send({status: "OK", data: createdUser});
}

const updateUser = async (req, res) => {
    const { body } = req;
    if(!body.nombre || !body.username || !body.password || !body.correo || !body.idRol){
        return res.status(400).send('BAD REQUEST');
    }
    const newUSer = {
        idUsuario: req.params.userId,
        nombre: body.nombre,
        username: body.username,
        password: createHash('sha256').update(body.password).digest('hex'),
        correo: body.correo,
        idRol: body.idRol
    }
    const createdUser = await usuarioService.updateUser(newUSer);
    res.status(200).send({status: "OK", data: createdUser});
}

const deleteUSer = async (req, res) => {
    console.log("entró la wea");
    const deletedUser = await usuarioService.deleteUser(req.params.userId);
    res.status(200).send({status: "OK", data: deleteUSer});
}

const login = async (req, res) => {
    const { body } = req;
    if( !body.username || !body.password ){
        return res.status(400).send('BAD REQUEST');
    }
    const data = {
        username: body.username,
        password: createHash('sha256').update(body.password).digest('hex'),
    }
    const user = (await usuarioService.login(data))[0];
    if (!user) {
        return res.status(404).send("USER NOT FOUND");
    }

    const accessToken = generateAccessToken(user);
    res.header('authorization', accessToken).json({message: "Usuario autenticado", token: accessToken, usuario:user});
}

function generateAccessToken(user){
    return jwt.sign({user}, process.env.SECRET, {expiresIn: '30m'});
}

function validateToken(req, res, next){
    let accessToken = req.headers['authorization'];
    const withBearer = accessToken.split(' '); 
    accessToken = withBearer[1];
    
    if(!accessToken) res.status(401).send('Access denied');


    jwt.verify(accessToken, process.env.SECRET, (err, user)=>{
        if(err){
            res.status(401).send("Access denied, token expired or incorrect");
        }else {
            next();
        }
    });
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUSer,
    login,
    validateToken
}