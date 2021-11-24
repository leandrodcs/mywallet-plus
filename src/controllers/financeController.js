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

        let user;

        try {
          user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
          return res.sendStatus(401);
        }

        if (!value || !type) {
            return res.sendStatus(400);
        }

        const finance = await financeService.createFinance({value, type, user});
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

        let user;

        try {
          user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
          return res.sendStatus(401);
        }

        const events = await financeService.checkFinances({user})
    
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

        let user;

        try {
          user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
          return res.sendStatus(401);
        }

        const sum = await financeService.sumFinances({user})
    
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