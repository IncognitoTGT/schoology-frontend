import { cookies } from "next/headers";
//  used until i addd error handling for the wrong api key
export function GET(){
    cookies().delete("credentials");
    return Response.json({ success: true, message: "Logged out" })
}