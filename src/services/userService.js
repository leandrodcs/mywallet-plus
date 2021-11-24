import bcrypt from "bcrypt";
import * as userRepository from '../repositories/userRepository.js';

async function createUser({name, email, password}) {

    const userExists = await userRepository.consultUser({email});
    if(userExists) {
        return 'exists';
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    return userRepository.createUser({name, email, password: hashedPassword});

}

export {
    createUser,
}