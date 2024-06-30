import { NextResponse } from 'next/server'
const { OAuth2Client } = require('google-auth-library');
const { v4: uuidv4, v5: uuidv5 } = require('uuid');
import { MongoClient } from 'mongodb';
require('dotenv').config();
async function verify(token, client) {
    const ticket = await client.verifyIdToken({
        idToken: token["credential"],
        audience: "462138463214-4l9jq8sfghtvbas7doduamnicdbo1emp.apps.googleusercontent.com"
    });
    const payload = ticket.getPayload();
    return payload
}



export async function POST(req) {
    const client = new OAuth2Client();
    const data = await req.json()
    const result = await verify(data["token"], client)
    const mongoClient = new MongoClient(process.env.DB_URI);
    const db = mongoClient.db('authentication');
    const collection = db.collection('user_credentials');
    await mongoClient.connect()
    const info = await collection.find({ email: result["email"] }).toArray()
    if (info.length === 0) {
        const ack = await collection.insertOne({
            "email": result["email"],
            "sub": result["sub"],
            "name": result["name"],
            "api_key": uuidv4()
        })
        mongoClient.close()
        if (!ack.acknowledged) {
            return NextResponse.json({ reason: 'some error occured try again' }, { status: 500 })
        }
    }
    const response = NextResponse.json({ message: 'Successfully Signed In' }, { status: 200 })
    response.cookies.set({
        name: 'auth_token',
        value: data["token"]["credential"],
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 3, // 3 days
    })
    return response
}