import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilitiIcon from "../assets/svg/visibilityIcon.svg"




function Signin() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData
    const navigate = useNavigate();

    const onChange = onChange();

    return (
        <>

            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome back!</p>
                </header>
                <form>
                    <input type="email" className="emailInput"
                        placeholder="Email" id="email" value={email} onChange={onChange()} />
                </form>


            </div>


        </>

    )
}

export default Signin