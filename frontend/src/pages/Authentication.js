import { redirect } from "react-router";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const authAction = async ({ request }) => {
  const searchParam = new URL(request.url).searchParams;
  const mode = searchParam.get("mode") || "login";
  const method = request.method;
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  let url = "http://localhost:8080/login";

  if (mode === "signup") {
    url = "http://localhost:8080/signup";
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not authenticate!" }), {
      status: 500,
    });
  }

  const resData = await response.json();
  const { token } = resData;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect("/");
};
