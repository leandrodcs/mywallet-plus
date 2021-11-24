import jwt from "jsonwebtoken";
import * as financeRepository from "../repositories/financeRepository.js"

async function createFinance({value, type, token}) {
    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return '401';
    }

    if (!['INCOME', 'OUTCOME'].includes(type) || value < 0) {
      return '400';
    }

    return financeRepository.createFinance({user, value, type})
}

async function checkFinances({token}) {
    let user;
    
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return '401';
    }

    return financeRepository.getFinances({user})
}

async function sumFinances({token}) {
    let user;
    
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return '401';
    }

    const events = await financeRepository.getFinances({user});
    const result = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
    return result;
}

export {
    createFinance,
    checkFinances,
    sumFinances,
}