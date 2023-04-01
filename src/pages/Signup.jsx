import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase.config"
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilitiIcon from "../assets/svg/visibilityIcon.svg"
import { async } from "@firebase/util"




function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = formData
    const navigate = useNavigate();

    //
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,

        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name,
            })

            const formDataCopy = { ...formData }
            delete formData.password
            formDataCopy.timeStamp = serverTimestamp()


            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')
        } catch (error) {
            console.log(error);
        }

    }




    return (
        <>

            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome back!</p>
                </header>

                <form onSubmit={onSubmit}>


                    <input
                        type="text"
                        className="nameInput"
                        placeholder="Name"
                        id="name"
                        value={name}
                        onChange={onChange}
                    />
                    <input
                        type="email"
                        className="emailInput"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={onChange}
                    />
                    <div className="passwordInputDiv">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="passwordInput"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={onChange}
                        />

                        <img
                            src={visibilitiIcon}
                            alt="show password"
                            className="showPassword"
                            onClick={() => setShowPassword((prevState) => !prevState)}

                        />
                    </div>

                    <Link
                        to="/forgot-password"
                        className="forgotPasswordLink">
                        Forgot password
                    </Link>

                    <div className='signUpBar'>
                        <p className='signUpText'>Sign up</p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill='#ffffff' width='34px' height="34px" />
                        </button>
                    </div>
                </form>
                <Link to="/sign-in" className="registerLink" >
                    Sign In Instead
                </Link>
            </div>
        </>

    )
}

export default Signup