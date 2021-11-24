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

export {
    createFinance,
}