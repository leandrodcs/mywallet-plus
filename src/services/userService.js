import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from '../repositories/userRepository.js';

async function createUser({name, email, password}) {
    const userExists = await userRepository.consultUser({email});

    if(userExists) {
        return 'exists';
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    return userRepository.createUser({name, email, password: hashedPassword});
}

async function login({email, password}) {
    const user = await userRepository.consultUser({email});
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return false;
    }
  
    const token = jwt.sign({
    id: user.id
    }, process.env.JWT_SECRET);

    return token;
}

export {
    createUser,
    login,
}