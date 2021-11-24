import connection from "../database.js";
import jwt from "jsonwebtoken";
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

async function getFinances(req, res) {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];

    try {
        if (!token) {
          return res.sendStatus(401);
        }

        const events = await financeService.checkFinances({token})
        if (events === '401') return res.sendStatus(401);
    
        res.send(events);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function sumFinances(req, res) {
    const authorization = req.headers.authorization || "";
    const token = authorization.split('Bearer ')[1];

    try {
        if (!token) {
          return res.sendStatus(401);
        }
        const sum = await financeService.sumFinances({token})
        if (sum === '401') return res.sendStatus(401);
    
        res.send({ sum });
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export {
    postFinances,
    getFinances,
    sumFinances,
}