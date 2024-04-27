const usuarioService = require("../services/UsuarioService");
const jwt = require('jsonwebtoken');

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
    if(!body.nombre || !body.username || !body.password || !body.correo || !body.idRol || !body.activo){
        return;
    }
    const newUSer = {
        nombre: body.nombre,
        username: body.username,
        password: body.password,
        correo: body.correo,
        idRol: body.idRol,
        activo: body.activo
    }
    const createdUser = await usuarioService.createNewUser(newUSer);
    res.status(200).send({status: "OK", data: createdUser});
}

const updateUser = async (req, res) => {
    const { body } = req;
    if(!body.nombre || !body.username || !body.password || !body.correo || !body.idRol || !body.activo){
        return;
    }
    const newUSer = {
        idUsuario: req.params.userId,
        nombre: body.nombre,
        username: body.username,
        password: body.password,
        correo: body.correo,
        idRol: body.idRol,
        activo: body.activo
    }
    const createdUser = await usuarioService.updateUser(newUSer);
    res.status(200).send({status: "OK", data: createdUser});
}

const deleteUSer = async (req, res) => {
    const deletedUser = await usuarioService.deleteUser(req.params.userId);
    return deletedUser;
}

const login = async (req, res) => {
    const { body } = req;
    if( !body.username || !body.password ){
        return res.status(400).send('BAD REQUEST');
    }
    const data = {
        username: body.username,
        password: body.password
    }
    const user = (await usuarioService.login(data))[0];
    console.log(user);
    if (!user) {
        return res.status(404).send("USER NOT FOUND");
    }

    const accessToken = generateAccessToken(user);
    res.header('authorization', accessToken).json({message: "Usuario autenticado", token: accessToken});
}

function generateAccessToken(user){
    console.log(process.env.SECRET);
    return jwt.sign({user}, process.env.SECRET, {expiresIn: '30m'});
}

function validateToken(req, res, next){
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.send('Access denied');

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