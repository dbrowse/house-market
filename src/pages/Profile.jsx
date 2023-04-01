
import { getAuth } from "firebase/auth"
import { useEffect } from "react"

function Profile() {

    const auth = getAuth()
    useEffect(() => {
        console.log(auth);

    }, [])

    return (
        <div>
            <h1>Profile</h1>

        </div>
    )
}

export default Profile