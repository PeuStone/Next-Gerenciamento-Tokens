import { useRouter } from "next/router";
import { authService } from "./authService";
import React from "react";

export function withSession(funcao) {
    return async (ctx) => {
        try {
            const session = await authService.getSession(ctx);
            const modifiedCtx = {
                ...ctx,
                req: {
                    ...ctx.req,
                    session,
                }
            };
            return funcao(modifiedCtx);
        } catch (error) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/?error=401',
                }
            }
        }
    }
}

export function useSession() {
    const [session, setSession] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        authService.getSession()
            .then((userSession) => {
                setSession(userSession)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return {
        data: {
            session
        },
        error,
        loading,
    }
}

export function withSessionHOC(Component) {
    return function Wrapper(props) {
        const router = useRouter()
        const session = useSession();

        if (!session.loading && session.error) {
            router.push('/?error=401')
        }

        const modifiedProps = {
            ...props,
            session: session.data.session,
        }

        return (
            <Component {...modifiedProps} />
        )
    }
}