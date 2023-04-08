import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { dov, setDoc, getDoc, doc, serverTimestamp } from "firebase/firestore"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { db } from "../firebase.config"
import googleIcon from "../assets/svg/googleIcon.svg"


function OAuth() {

    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            //check to firestore if user exist 
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            //What if user does not exist ? create it !
            if (!docSnap.exist) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timeStamp: serverTimestamp()

                })
            }
            navigate('/')
        } catch (error) {
            toast.error("Could not authorize with Google")

        }

    }

    return (
        <div className="socialLogin">
            <p>Sing in {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
            <button className="socialIconDiv" onClick={onGoogleClick}>
                <img className="socialIconImg" src={googleIcon} alt="google" />

            </button>

        </div>
    )
}

export default OAuth