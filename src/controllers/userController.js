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
        res.sendStatus(500);
    }
}

async function signIn(req,res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
          return res.sendStatus(400);
        }

        const token = await userService.login({email, password});

        if(!token) {
            return res.sendStatus(401);
        }

        res.send({
          token
        });
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    signUp,
    signIn,
}