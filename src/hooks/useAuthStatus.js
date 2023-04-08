import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect, useRef } from "react"



export const useAuthStatus = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    //this is like loading
    const [checkingStatus, setCheckingStatus] = useState(true)

    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            }, [isMounted])

        }
        return () => {
            isMounted.current = false
        }


    })
    return { loggedIn, checkingStatus }
}
