
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import jQuery from 'jquery';
import Posts from '../components/homePost/Posts';
import { logout } from '../redux/actions/authAction';
import Avatar from '../components/Avatar';
let scroll = 0;
const Home = () => {

    const { homePostsReducer, auth } = useSelector((state) => state);

    const dispatch = useDispatch()
    const avatarSrc = auth?.user?.avatar;
    const username = auth?.user?.username;
    window.addEventListener('scroll', () => {
        if (window.location.pathname === '/') {
            scroll = window.pageYOffset
            return scroll;
        }
    })

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: scroll, behavior: 'smooth' })
        }, 100)
    }, [])
    useEffect(() => {
        jQuery(function ($) {

            $(".sidebar-dropdown > a").click(function () {
                $(".sidebar-submenu").slideUp(200);
                if (
                    $(this)
                        .parent()
                        .hasClass("active")
                ) {
                    $(".sidebar-dropdown").removeClass("active");
                    $(this)
                        .parent()
                        .removeClass("active");
                } else {
                    $(".sidebar-dropdown").removeClass("active");
                    $(this)
                        .next(".sidebar-submenu")
                        .slideDown(200);
                    $(this)
                        .parent()
                        .addClass("active");
                }
            });

            $("#close-sidebar").click(function () {
                $(".page-wrapper").removeClass("toggled");
            });
            $("#show-sidebar").click(function () {
                $(".page-wrapper").addClass("toggled");
            });
        });
    }, [])


    const userLink = () => {
        return (
            <div>
                <div className="page-wrapper chiller-theme toggled">
                    <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                        <i className="fas fa-bars" />
                    </a>
                    <nav id="sidebar" className="sidebar-wrapper">
                        <div className="sidebar-content">
                            <div className="sidebar-brand">
                                <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>

                                    <span style={{ fontSize: '16px' }}>Tassili Web</span>
                                </Link>
                                <div id="close-sidebar">
                                    <i className="fas fa-times" />
                                </div>
                            </div>
                            <div className="sidebar-header">
                            <div className="user-pic">
                            <img className="img-responsive img-rounded" src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="User picture" />
                        </div>
                                <div className="user-info">
                                    
                                   
                                    <span className="user-status">
                                        <i className="fa fa-circle text-danger" />
                                        <span>Ofline</span>
                                    </span>
                                </div>
                            </div>

                            <div className="sidebar-search">
                                <div>
                                    <div className="input-group">
                                        <input type="text" className="form-control search-menu" placeholder="Search..." />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fa fa-search" aria-hidden="true" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-menu">
                                <ul>


                            
                                    <li className="sidebar-dropdown">


                                        <li className="sidebar-dropdown">
                                            <Link className="dropdown-item" to="/login">
                                                <i className="fa fa-sign-in-alt text-green" />
                                                <span>Se connecter</span>
                                            </Link>
                                        </li>
                                        <li className="sidebar-dropdown">
                                            <Link className="dropdown-item" to="/register">
                                                <i className="fa fa-user-plus text-green" />
                                                <span>S'inscrire</span>
                                            </Link>
                                        </li>



                                    </li>


                                    <li className="header-menu">
                                        <span>Catégories</span>
                                    </li>

                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/salasfiestas">
                                            <i className="fas fa-gem"></i>
                                            <span>Salle des fêtes</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/cervicios">
                                            <i className="fas fa-tools"></i>
                                            <span>Services</span>
                                        </Link>
                                    </li>



                                </ul>
                            </div>

                        </div>

                        <div className="sidebar-footer">
                            s<span>hhhhhhhhhhhhh</span>
                        </div>
                    </nav>

                    <main className="page-content">
                        <hr />

                        <div className='home'>
                            {homePostsReducer.result === 0 && (!homePostsReducer.posts?.length || homePostsReducer.posts.length === 0) ? (
                                <h2 className="text-center">Aucun résultat trouvé pour cette recherche</h2>
                            ) : (
                                <Posts />
                            )}
                        </div>
                    </main>

                </div>

            </div>

        )

    }

    const userauthLink = () => {
        return (
            <div>
                <div className="page-wrapper chiller-theme toggled">
                    <a id="show-sidebar" className="btn btn-sm btn-dark"  >
                        <i className="fas fa-bars" />
                    </a>
                    <nav id="sidebar" className="sidebar-wrapper">
                        <div className="sidebar-content">
                            <div className="sidebar-brand">
                                <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>

                                    <span style={{ fontSize: '16px' }}>Tassili Web</span>
                                </Link>
                                <div id="close-sidebar">
                                    <i className="fas fa-times" />
                                </div>
                            </div>
                            <div className="sidebar-header">
                                <div className="user-pic" style={{ marginRight: '10px' }}>
                                    {avatarSrc && <Avatar src={avatarSrc} className="img-responsive img-rounded" />}
                                </div>
                                <div className="user-info">
                                    <span className="user-name">Nom: {auth.user && auth.user.username &&
                                        <span className="user-name">
                                            <strong className="user-name">{auth.user.username}</strong>
                                        </span>
                                    }
                                    </span>
                                    <span className="user-name">
                                        {auth.user && auth.user.role &&
                                            <span>role: {auth.user.role}</span>
                                        }
                                    </span>
                                    <span className="user-status">
                                        <i className="fa fa-circle text-sucess" />
                                        <span>Online</span>
                                    </span>
                                </div>
                            </div>

                            <div className="sidebar-search">
                                <div>
                                    <div className="input-group">
                                        <input type="text" className="form-control search-menu" placeholder="Search..." />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fa fa-search" aria-hidden="true" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-menu">
                                <ul>
                                    <li className="header-menu">
                                        <span>Mon Compte</span>
                                    </li>

                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                                            <i className="fas fa-plus-circle"></i>
                                            <span>Ajouter Annonce</span>
                                        </Link>
                                    </li>


                                    <li className="sidebar-dropdown">
                                        <a href="#">
                                            <i className="fa fa-user-alt" />
                                            <span>Profil</span>
                                            <span className="badge badge-pill badge-warning"></span>
                                        </a>
                                        <div className="sidebar-submenu">
                                            <ul>
                                                <li className=" ">
                                                    <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                                                        <i className="fa fa-user-alt text-green" />
                                                        <span>Mon profil</span>
                                                    </Link>
                                                </li>
                                                <li className=" ">
                                                    <Link className="dropdown-item" to="/login">
                                                        <i className="fa fa-user-alt text-green" />
                                                        <span>Editer Mon Profil</span>
                                                    </Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <a href="#">
                                            <i className="fa fa-tachometer-alt" />
                                            <span>Annonces</span>
                                            <span className="badge badge-pill badge-warning"></span>
                                        </a>
                                        <div className="sidebar-submenu">
                                            <ul>
                                                <li className=" ">
                                                    <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                                                        <i className="fa fa-sign-in-alt text-green" />
                                                        <span>Mes Annonces</span>
                                                    </Link>
                                                </li>
                                                <li className=" ">
                                                    <Link className="dropdown-item" to="/login">
                                                        <i className="fa fa-sign-in-alt text-green" />
                                                        <span>Ajouter Annonce</span>
                                                    </Link>
                                                </li>

                                            </ul>
                                        </div>
                                        <li className="sidebar-dropdown">
                                            <a href="#">
                                                <i className="fa fa-tachometer-alt" />
                                                <span>Administration</span>
                                                <span className="badge badge-pill badge-warning"></span>
                                            </a>
                                            <div className="sidebar-submenu">
                                                <ul>
                                                    <li className=" ">
                                                        <Link className="dropdown-item" to="/pages/administracion/administrationmensajes/mensajess">
                                                            <i className="fa fa-envelope  text-info" />
                                                            <span>
                                                                Messages</span>
                                                        </Link>
                                                    </li>
                                                    <li className=" ">
                                                        <Link className="dropdown-item" to="/login">
                                                            <i className="fa fa-envelope text-success" />
                                                            <span>Envoyer un Message</span>
                                                        </Link>
                                                    </li>
                                                    <li className=" ">
                                                        <Link className="dropdown-item" to="/login">
                                                            <i className="fa fa-bell badge-warning " />
                                                            <span>Notification</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="sidebar-dropdown">
                                            <a href="#">
                                                <i className="fa fa-tachometer-alt" />
                                                <span>Authentification</span>
                                                <span className="badge badge-pill badge-warning"></span>
                                            </a>
                                            <div className="sidebar-submenu">
                                                <ul>
                                                    <li className=" ">
                                                        <Link className="dropdown-item" to="/pages/administracion/autentication/autenticationn">
                                                            <i className="fa fa-envelope  text-info" />
                                                            <span>
                                                            Authentification et activation</span>
                                                        </Link>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="sidebar-dropdown">
                                            <Link

                                                to="/"
                                                onClick={() => dispatch(logout())}
                                            >
                                                <i className="fa fa-power-off" style={{ color: 'red' }}></i>
                                                <span> Se Déconnecter</span>
                                            </Link>
                                        </li>

                                    </li>


                                    <li className="header-menu">
                                        <span>Catégories</span>
                                    </li>

                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/salasfiestas">
                                            <i className="fas fa-gem"></i>
                                            <span>Salle des fêtes</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/cervicios">
                                            <i className="fas fa-tools"></i>
                                            <span>Services</span>
                                        </Link>
                                    </li>



                                </ul>
                            </div>

                        </div>

                        <div className="sidebar-footer">
                           <span>hhhhhhhhhhhhh</span>
                        </div>
                    </nav>

                    <main className="page-content">
                        <hr />

                        <div className='home'>
                            {homePostsReducer.result === 0 && (!homePostsReducer.posts?.length || homePostsReducer.posts.length === 0) ? (
                                <h2 className="text-center">Aucun résultat trouvé pour cette recherche</h2>
                            ) : (
                                <Posts />
                            )}
                        </div>
                    </main>

                </div>

            </div>
        )
    }

    const adminauthLink = () => {
        return (
            <div>
                <div className="page-wrapper chiller-theme toggled">
                    <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                        <i className="fas fa-bars" />
                    </a>
                    <nav id="sidebar" className="sidebar-wrapper">
                        <div className="sidebar-content">
                            <div className="sidebar-brand">
                                <Link to="/pages/administracion/index" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>

                                    <span style={{ fontSize: '16px' }}>Administration</span>
                                </Link>
                                <div id="close-sidebar">
                                    <i className="fas fa-times" />
                                </div>
                            </div>
                            <div className="sidebar-header">
                                <div className="user-pic" style={{ marginRight: '10px' }}>
                                    {avatarSrc && <Avatar src={avatarSrc} className="img-responsive img-rounded" />}
                                </div>
                                <div className="user-info">
                                    <span className="user-name">Nom: {auth.user && auth.user.username &&
                                        <span className="user-name">
                                            <strong className="user-name">{auth.user.username}</strong>
                                        </span>
                                    }
                                    </span>
                                    <span className="user-name">
                                        {auth.user && auth.user.role &&
                                            <span>role: {auth.user.role}</span>
                                        }
                                    </span>
                                    <span className="user-status">
                                        <i className="fa fa-circle text-sucess" />
                                        <span>Online</span>
                                    </span>
                                </div>
                            </div>

                            <div className="sidebar-search">
                                <div>
                                    <div className="input-group">
                                        <input type="text" className="form-control search-menu" placeholder="Search..." />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fa fa-search" aria-hidden="true" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-menu">
                                <ul>
                                    

                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                                            <i className="fas fa-plus-circle"></i>
                                            <span>Ajouter Annonce</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                                        <i className="fas fa-plus-circle"></i>
                                        <span>Ajouter Annonce</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/administracion/fechadeexpiracionuser">
                                        <i className="fas fa-plus-circle"></i>
                                        <span>fehca expiracion</span>
                                    </Link>
                                </li>

                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/administracion/postspendientes">
                                        <i className="fa fa-plus-circle" />
                                        <span>Aprouve salle fetes</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/administracion/serviciospendientes">
                                        <i className="fa fa-plus-circle" />
                                        <span>Aprouve services</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/users/usersposts">
                                        <i className="fa fa-plus-circle" />
                                        <span>Liste Utilizateurs</span>
                                    </Link>
                                </li>

                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/roles/userrole">
                                        <i className="fa fa-plus-circle" />
                                        <span>Liste Roles</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/bloqueos/blockposts">
                                        <i className="fa fa-plus-circle" />
                                        <span>Block post</span>
                                    </Link>
                                </li>
                                <li className="sidebar-dropdown">
                                    <Link className="dropdown-item" to="/pages/bloqueos/blockcomments">
                                        <i className="fa fa-plus-circle" />
                                        <span>Block comment</span>
                                    </Link>
                                </li>

                                    <li className="sidebar-dropdown">
                                        <a href="#">
                                            <i className="fa fa-user-alt" />
                                            <span>Profil</span>
                                            <span className="badge badge-pill badge-warning"></span>
                                        </a>
                                        <div className="sidebar-submenu">
                                            <ul>
                                                <li className=" ">
                                                    <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                                                        <i className="fa fa-user-alt text-green" />
                                                        <span>Mon profil</span>
                                                    </Link>
                                                </li>
                                                <li className=" ">
                                                    <Link className="dropdown-item" to="/login">
                                                        <i className="fa fa-user-alt text-green" />
                                                        <span>Editer Mon Profil</span>
                                                    </Link>
                                                </li>

                                            </ul>
                                        </div>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <a href="#">
                                            <i className="fa fa-tachometer-alt" />
                                            <span>Annonces</span>
                                            <span className="badge badge-pill badge-warning"></span>
                                        </a>
                                        <div className="sidebar-submenu">
                                            <ul>
                                                <li className=" ">
                                                    <Link className="dropdown-item" to="/pages/categoriaslista/cervices">
                                                        <i className="fa fa-sign-in-alt text-green" />
                                                        <span>Mes Annonces</span>
                                                    </Link>
                                                </li>
                                                <li className=" ">
                                                    <Link className="dropdown-item" to="/login">
                                                        <i className="fa fa-sign-in-alt text-green" />
                                                        <span>Ajouter Annonce</span>
                                                    </Link>
                                                </li>

                                            </ul>
                                        </div>
                                        <li className="sidebar-dropdown">
                                            <a href="#">
                                                <i className="fa fa-tachometer-alt" />
                                                <span>Administration</span>
                                                <span className="badge badge-pill badge-warning"></span>
                                            </a>
                                            <div className="sidebar-submenu">
                                                <ul>
                                                    <li className=" ">
                                                        <Link className="dropdown-item" to="/pages/administracion/mensajes/mensajess">
                                                            <i className="fa fa-envelope  text-info" />
                                                            <span>
                                                                Mes Messages</span>
                                                        </Link>
                                                    </li>
                                                    <li className=" ">
                                                        <Link className="dropdown-item" to="/login">
                                                            <i className="fa fa-envelope text-success" />
                                                            <span>Envoyer un Message</span>
                                                        </Link>
                                                    </li>
                                                    <li className=" ">
                                                        <Link className="dropdown-item" to="/login">
                                                            <i className="fa fa-bell badge-warning " />
                                                            <span>Notification</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                        <li className="sidebar-dropdown">
                                            <Link className="dropdown-item" to="/login">
                                                <i className="fa fa-sign-in-alt text-Success" />
                                                <span>Se connecter</span>
                                            </Link>
                                        </li>
                                        <li className="sidebar-dropdown">
                                            <Link className="dropdown-item" to="/register">
                                                <i className="fa fa-user-plus text-warning" />
                                                <span>S'inscrire</span>
                                            </Link>
                                        </li>


                                        <li className="sidebar-dropdown">
                                            <Link

                                                to="/"
                                                onClick={() => dispatch(logout())}
                                            >
                                                <i className="fa fa-power-off" style={{ color: 'red' }}></i>
                                                <span> Se Déconnecter</span>
                                            </Link>
                                        </li>

                                    </li>


                                    <li className="header-menu">
                                        <span>Catégories</span>
                                    </li>

                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/salasfiestas">
                                            <i className="fas fa-gem"></i>
                                            <span>Salle des fêtes</span>
                                        </Link>
                                    </li>
                                    <li className="sidebar-dropdown">
                                        <Link className="dropdown-item" to="/pages/cervicios">
                                            <i className="fas fa-tools"></i>
                                            <span>Services</span>
                                        </Link>
                                    </li>



                                </ul>
                            </div>

                        </div>

                        <div className="sidebar-footer">
                            s<span>hhhhhhhhhhhhh</span>
                        </div>
                    </nav>

                    <main className="page-content">
                        <hr />

                        <div className='home'>
                            {homePostsReducer.result === 0 && (!homePostsReducer.posts?.length || homePostsReducer.posts.length === 0) ? (
                                <h2 className="text-center">Aucun résultat trouvé pour cette recherche</h2>
                            ) : (
                                <Posts />
                            )}
                        </div>
                    </main>

                </div>

            </div>

        )
    }

    return (
        <div>
            {auth.user ?
                auth.user.role === "admin" ?
                    adminauthLink()
                    : userauthLink()
                : userLink()}
        </div>



    );
}

export default Home;

