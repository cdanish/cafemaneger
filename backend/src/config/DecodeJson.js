import jwt from 'jsonwebtoken';

export async function tokenDecode(req, res, next) {
  try {
    const token = req.cookies?.token;
    const secret = process.env.jwt || 'secrect';

   // console.log(token);
    if (!token) {
      return res.status(400).json({
        message: 'Please login',
        error: true,
        success: false,
      });
    }

    //const me = jwt.verify(token,secret);
    //console.log("me",me);
    jwt.verify(token, secret, (err, decoded) => {
        //console.log(err);
       // console.log(decoded);

      if (err || !decoded) {
        return res.status(401).send({
          message: 'Invalid token',
          error: true,
          success: false,
        });
      }

      req.id = decoded.id;
      next(); 
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
