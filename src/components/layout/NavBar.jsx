import { useContext, useEffect } from 'react'

import AuthContext from '../../context/authentication/authContext'

const NavBar = () => {
    const authContext = useContext(AuthContext)
    const { user, logout } = authContext


    return(
        <header className="app-header">
            {user ? <p className="nombre-usuario">Welcome <span>{user.name}!</span></p> : null}
            
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={logout}
                >
                    Logout
                </button>
            </nav>
        </header>
    )
}

export default NavBar