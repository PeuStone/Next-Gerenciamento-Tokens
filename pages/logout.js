import { useRouter } from "next/router";
import { tokenService } from "../src/services/auth/tokenService"
import { HttpClient } from "../src/infra/HttpClient/HttpClient";
import React from "react";

export default function LogoutPage() {
    const router = useRouter();

    React.useEffect(async () => {
        try {
            await HttpClient('/api/refresh', {
                method: 'DELETE'
            })
            tokenService.delete();
            router.push('/');
        } catch(err) {
            alert(err.message)
        }

    }, []);

    return (
        <div>
            Você será redirecionado em instantes...
        </div>
    )
}