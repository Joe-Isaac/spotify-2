import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

let count = 0;
console.count("Middleware executed again")

export async function middleware(req){
    //Token will exist if the user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET });


    const { pathname, origin, href} = req.nextUrl;
    // 1.) if token exists
    if(token && pathname.includes('/api/auth') || token){
        console.log("href: logged in", href)
        console.log("logged in", token)
        return NextResponse.next();
    }
    if(token === null && href==='http://localhost:3000/Login/'){
        //console.log("Youre supposed to be logged out mate")
        console.log("href:logged out", href)
        console.log("logged out", token)
        return NextResponse.redirect("http://localhost:3000/Login/");
    }
    if(token === null && href==="http://localhost:3000/Login/"){
        console.log("Youre at the log in page and your token is null")
        return NextResponse.next();
    }
}