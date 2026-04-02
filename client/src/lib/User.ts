import axios from "axios"
import Cookies from "js-cookie"

export const UserCheck = (setUser) => {
    const session = Cookies.get("session")
    if (!session) return false

    axios.get('http://localhost:4000/api/session/' + session).then(({ data }) => {
        if (data.status === 200)
            setUser({ session: session, email: data.email, name: data.email.split("@")[0] })
    })

}
