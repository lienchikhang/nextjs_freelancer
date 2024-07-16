import http from "../http/http";
import Cookies from "js-cookie";

class ButtonObject {
    public static async checkExpired(): Promise<boolean> {

        const cookieStore = Cookies.get('token');

        console.log('cookie in button', cookieStore);

        //call api check expired
        const rs = await fetch('/api/check', {
            method: 'POST',
            body: JSON.stringify({
                name: 'token',
                value: cookieStore,
            })
        }).then((res) => res.json()).catch((error) => {
            console.log('error', error);
            return false;
        });

        console.log('rs in button', rs);

        return rs.content;
    }
}

export default ButtonObject;