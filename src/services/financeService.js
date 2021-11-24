import * as financeRepository from "../repositories/financeRepository.js"

async function createFinance({value, type, user}) {

    if (!['INCOME', 'OUTCOME'].includes(type) || value < 0) {
      return '400';
    }

    return financeRepository.createFinance({user, value, type})
}

async function checkFinances({user}) {
    return financeRepository.getFinances({user})
}

async function sumFinances({user}) {
    const events = await financeRepository.getFinances({user});
    const result = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
    return result;
}

export {
    createFinance,
    checkFinances,
    sumFinances,
}