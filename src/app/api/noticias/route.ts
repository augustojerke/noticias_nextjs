import { NextResponse } from "next/server";

export async function GET(req: Request) {
    let data = await fetch("https://jsonplaceholder.typicode.com/posts")
    data = await data.json()
    return NextResponse.json(data);
}
