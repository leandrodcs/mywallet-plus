import connection from "../database.js";
import * as financeService from "../services/financeService.js"

async function postFinances(req, res) {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];
    const { value, type } = req.body;

    try {
        if (!token) {
            return res.sendStatus(401);
        }
        if (!value || !type) {
            return res.sendStatus(400);
        }
        const finance = await financeService.createFinance({value, type, token});

        if(finance === '401') return res.sendStatus(401);
        if(finance === '400') return res.sendStatus(400);
    
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
        
    }
}

export {
    postFinances,
}