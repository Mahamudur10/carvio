import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://carvio.vercel.app";

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${baseUrl}/api/auth/google/callback`, // ✅ Dynamic
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenResponse.json();

    // ✅ Token error check
    if (!tokens.access_token) {
      console.error("Token error:", tokens);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const user = await userResponse.json();

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.picture,
      photoURL: user.picture,
    };

    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("user", encodeURIComponent(JSON.stringify(userData)));

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Google Auth Error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}