import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){
    //Token will exist if the user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { href } = req.nextUrl;
    console.log(req.nextUrl, "huhu")
    //Aloow request if the following is true
    // 1.) if token exists
    if(href.includes('/api/auth') || token){
        return NextResponse.next();
    }

    //Redirect to login if they dont have token and are requesting protected route
    if(!token && href!="http://localhost:3000/Login"){
        return NextResponse.rewrite(`${href}`);
    }
}