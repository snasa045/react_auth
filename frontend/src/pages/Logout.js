import { redirect } from "react-router";

export const logoutAction = () => {
    localStorage.removeItem('token');
    return redirect('/auth');
}