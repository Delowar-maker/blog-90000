// import { NextResponse } from "next/server";
// import { VerifyToken } from "@/utility/JWTTokenHelper";

// export async function middleware(req, res) {
//   if (req.nextUrl.pathname.startsWith("/dashboard")) {
//     try {
//       let token = req.cookies.get("token");
//       let payload = await VerifyToken(token["value"]);

//       const requestHeader = new Headers(req.headers);
//       requestHeader.set("email", payload["email"]);
//       requestHeader.set("id", payload["id"]);

//       return NextResponse.next({
//         request: { headers: requestHeader },
//       });
//     } catch (e) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }
// }



import { NextResponse } from "next/server";
import { VerifyToken } from "@/utility/JWTTokenHelper";

export async function middleware(req, res) {
  // Check if the URL path starts with "/dashboard"
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      // Retrieve the token from the "token" cookie
      const token = req.cookies.token;

      // Verify the token and get the payload
      const payload = await VerifyToken(token);

      // Create a new request object with custom headers
      const newRequest = {
        ...req,
        headers: {
          ...req.headers,
          email: payload.email,
          id: payload.id,
        },
      };

      return NextResponse.next(newRequest);
    } catch (error) {
      // Redirect to the "/login" page in case of an error
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If the URL path doesn't start with "/dashboard," continue with the next middleware or handler
  return NextResponse.next();
}
