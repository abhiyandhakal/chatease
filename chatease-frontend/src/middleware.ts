import { NextRequest, NextResponse, URLPattern } from "next/server";

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};

export const publicRoutes = ["/", "/signup"];

export default function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const url = req.nextUrl.clone();

  const pattern = new URLPattern();
  const pageName = pattern.exec(url)?.pathname.input.split(/\/\d/)[0];
  if (!pageName) {
    return NextResponse.next();
  }

  if (url.pathname === "/") {
    return NextResponse.next();
  }
  if (accessToken) {
    if (url.pathname.startsWith("/chats")) return NextResponse.next();
    else if (url.pathname.startsWith("/signup")) {
      url.pathname = "/chats";
      return NextResponse.redirect(url);
    }
  } else {
    if (url.pathname.startsWith("/chats")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }
}
