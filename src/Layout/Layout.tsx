import {ReactNode} from "react";
import {NavLink, useLocation} from "react-router-dom";

interface Props {
    children: ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
    const location = useLocation();

    return (
        <>
            <header>
                <nav className="navbar bg-body-tertiary border-bottom border-2 mb-5">
                    <div className="container-fluid">
                        <a className="navbar-brand fs-4" href="#">
                            <img src="https://i.pinimg.com/736x/c5/19/d4/c519d4838c10d0c8ebfa7721f41705e3.jpg" alt="Logo" width="30" height="24"
                                 className="d-inline-block align-text-top ms-1"/>
                            Pizza
                        </a>

                        {
                            location.pathname.startsWith('/admin') ? (
                            <div className="d-flex align-items-center gap-2">
                                <NavLink to="admin/dishes" className="nav-link">Dishes</NavLink>
                                <NavLink to="admin/orders" className="nav-link">Orders</NavLink>
                            </div>
                            ) : null
                        }

                    </div>
                </nav>
            </header>
            <main className="container-fluid">
                {children}
            </main>
        </>
    );
};

export default Layout;