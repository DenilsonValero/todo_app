import jwt from "jsonwebtoken"

const Secret_Key ="Clave_secreta"

const auth = (req,res, next) =>{
    const  token = req.header("Autorizacion")?.repalce("");
    if (!token) {
        res.status(401).json({mensaje: "Acceso no autorizado, no hay token"})
    }

    try {
     const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).json({mensaje: "token invalido"})
    }
}

export default auth;