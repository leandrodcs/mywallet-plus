import * as userService from '../services/userService.js'

async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
          return res.sendStatus(400);
        }

        const user = await userService.createUser({name, email, password});
        if(!user) {
            return res.sendStatus(500);
        }
        if(user === 'exists') {
            return res.sendStatus(409);
        }
    
        res.sendStatus(201);
        
    } catch (error) {
        console.log(error);
        resizeBy.sendStatus(500);
    }
}

export {
    signUp,
}