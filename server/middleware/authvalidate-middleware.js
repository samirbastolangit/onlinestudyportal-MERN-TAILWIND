const authvalidateMiddleware = (schema) => async (req,res,next)=>{
 try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
 } catch (err) {
        console.log(`type of err: ${typeof(err)} and value of err:${err.issues[0].message}`);
        res.status(400).json({
                message:err.issues[0].message
        });
 }
}
module.exports = authvalidateMiddleware;