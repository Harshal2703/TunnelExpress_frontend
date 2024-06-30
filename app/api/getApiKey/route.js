import { NextResponse } from 'next/server'
const { OAuth2Client } = require('google-auth-library');
import { MongoClient } from 'mongodb';
import { cookies } from 'next/headers';
require('dotenv').config();
async function verify(token, client) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "462138463214-4l9jq8sfghtvbas7doduamnicdbo1emp.apps.googleusercontent.com"
    });
    const payload = ticket.getPayload();
    return payload
}



export async function GET(req) {
    const client = new OAuth2Client();
    const cookieStore = cookies();
    const data = cookieStore.get("auth_token");
    if (!data) {
        const response = NextResponse.json({ message: 'no token' }, { status: 400 })
        return response
    }
    const result = await verify(data["value"], client)
    const mongoClient = new MongoClient(process.env.DB_URI);
    const db = mongoClient.db('authentication');
    const collection = db.collection('user_credentials');
    await mongoClient.connect()

    const info = await collection.find({ email: result["email"] }).toArray()
    mongoClient.close()
    if (info.length === 1) {
        const payload = {
            "api_key": info[0]["api_key"],
            "picture": result["picture"],
            "name": result["name"]
        }
        const response = NextResponse.json(payload, { status: 200 })
        return response
    }
    const response = NextResponse.json({ message: 'user does not exists' }, { status: 400 })
    return response
}