  
  import React,{useEffect} from 'react'
    import jQuery from 'jquery';
 
const Dashboard = () => {



   
    useEffect(() => {
        jQuery(function ($) {
    
            $(".sidebar-dropdown > a").click(function() {
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
        
        $("#close-sidebar").click(function() {
          $(".page-wrapper").removeClass("toggled");
        });
        $("#show-sidebar").click(function() {
          $(".page-wrapper").addClass("toggled");
        });
        });
    }, [])
    
    
        return(  
        <div>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        {/*---- Include the above in your HEAD tag --------*/}
           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
        <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
        <div className="page-wrapper chiller-theme toggled">
          <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
            <i className="fas fa-bars" />
          </a>
          <nav id="sidebar" className="sidebar-wrapper">
            <div className="sidebar-content">
              <div className="sidebar-brand">
                <a href="#">pro sidebar</a>
                <div id="close-sidebar">
                  <i className="fas fa-times" />
                </div>
              </div>
              <div className="sidebar-header">
                <div className="user-pic">
                  <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg" alt="User picture" />
                </div>
                <div className="user-info">
                  <span className="user-name">Jhon
                    <strong>Smith</strong>
                  </span>
                  <span className="user-role">Administrator</span>
                  <span className="user-status">
                    <i className="fa fa-circle" />
                    <span>Online</span>
                  </span>
                </div>
              </div>
              {/* sidebar-header  */}
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
              {/* sidebar-search  */}
              <div className="sidebar-menu">
                <ul>
                  <li className="header-menu">
                    <span>General</span>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="fa fa-tachometer-alt" />
                      <span>Dashboard</span>
                      <span className="badge badge-pill badge-warning">New</span>
                    </a>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">Dashboard 1
                            <span className="badge badge-pill badge-success">Pro</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">Dashboard 2</a>
                        </li>
                        <li>
                          <a href="#">Dashboard 3</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="fa fa-shopping-cart" />
                      <span>E-commerce</span>
                      <span className="badge badge-pill badge-danger">3</span>
                    </a>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">Products
                          </a>
                        </li>
                        <li>
                          <a href="#">Orders</a>
                        </li>
                        <li>
                          <a href="#">Credit cart</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="far fa-gem" />
                      <span>Components</span>
                    </a>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">General</a>
                        </li>
                        <li>
                          <a href="#">Panels</a>
                        </li>
                        <li>
                          <a href="#">Tables</a>
                        </li>
                        <li>
                          <a href="#">Icons</a>
                        </li>
                        <li>
                          <a href="#">Forms</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="fa fa-chart-line" />
                      <span>Charts</span>
                    </a>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">Pie chart</a>
                        </li>
                        <li>
                          <a href="#">Line chart</a>
                        </li>
                        <li>
                          <a href="#">Bar chart</a>
                        </li>
                        <li>
                          <a href="#">Histogram</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="sidebar-dropdown">
                    <a href="#">
                      <i className="fa fa-globe" />
                      <span>Maps</span>
                    </a>
                    <div className="sidebar-submenu">
                      <ul>
                        <li>
                          <a href="#">Google maps</a>
                        </li>
                        <li>
                          <a href="#">Open street map</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="header-menu">
                    <span>Extra</span>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-book" />
                      <span>Documentation</span>
                      <span className="badge badge-pill badge-primary">Beta</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-calendar" />
                      <span>Calendar</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-folder" />
                      <span>Examples</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* sidebar-menu  */}
            </div>
            {/* sidebar-content  */}
            <div className="sidebar-footer">
              <a href="#">
                <i className="fa fa-bell" />
                <span className="badge badge-pill badge-warning notification">3</span>
              </a>
              <a href="#">
                <i className="fa fa-envelope" />
                <span className="badge badge-pill badge-success notification">7</span>
              </a>
              <a href="#">
                <i className="fa fa-cog" />
                <span className="badge-sonar" />
              </a>
              <a href="#">
                <i className="fa fa-power-off" />
              </a>
            </div>
          </nav>
          {/* sidebar-wrapper  */}
          <main className="page-content">
            <div className="container-fluid">
              <h2>Pro Sidebar</h2>
              <hr />
              <div className="row">
                <div className="form-group col-md-12">
                  <p>This is a responsive sidebar template with dropdown menu based on bootstrap 4 framework.</p>
                  <p> You can find the complete code on <a href="https://github.com/azouaoui-med/pro-sidebar-template" target="_blank">
                      Github</a>, it contains more themes and background image option</p>
                </div>
                <div className="form-group col-md-12">
                  <iframe src="https://ghbtns.com/github-btn.html?user=azouaoui-med&repo=pro-sidebar-template&type=star&count=true&size=small" frameBorder={0} scrolling={0} width="90px" height="30px" />
                  <iframe src="https://ghbtns.com/github-btn.html?user=azouaoui-med&repo=pro-sidebar-template&type=fork&count=true&size=small" frameBorder={0} scrolling={0} width="90px" height="30px" />
                </div>
                <div className="form-group col-md-12">
                  <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">New !</h4>
                    <p>New react pro sidebar library is now available on <a href="https://www.npmjs.com/package/react-pro-sidebar" target="_blank">npm</a> <a href="https://github.com/azouaoui-med/react-pro-sidebar" target="_blank">
                        <img alt="GitHub stars" src="https://img.shields.io/github/stars/azouaoui-med/react-pro-sidebar?style=social" />
                      </a></p>
                    <a href="https://github.com/azouaoui-med/react-pro-sidebar" target="_blank" className="btn btn-sm btn-primary mr-2">
                      Github</a>
                    <a href="https://azouaoui-med.github.io/react-pro-sidebar" target="_blank" className="btn btn-sm btn-success">
                      Demo</a>
                  </div>
                </div>
              </div>
              <h5>More templates</h5>
              <hr />
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                  <div className="card rounded-0 p-0 shadow-sm">
                    <img src="https://user-images.githubusercontent.com/25878302/58369568-a49b2480-7efc-11e9-9ca9-2be44afacda1.png" className="card-img-top rounded-0" alt="Angular pro sidebar" />
                    <div className="card-body text-center">
                      <h6 className="card-title">Angular Pro Sidebar</h6>
                      <a href="https://github.com/azouaoui-med/angular-pro-sidebar" target="_blank" className="btn btn-primary btn-sm">Github</a>
                      <a href="https://azouaoui-med.github.io/angular-pro-sidebar/demo/" target="_blank" className="btn btn-success btn-sm">Preview</a>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                  <div className="card rounded-0 p-0 shadow-sm">
                    <img src="https://user-images.githubusercontent.com/25878302/58369258-33f20900-7ef8-11e9-8ff3-b277cb7ed7b4.PNG" className="card-img-top rounded-0" alt="Angular pro sidebar" />
                    <div className="card-body text-center">
                      <h6 className="card-title">Angular Dashboard</h6>
                      <a href="https://github.com/azouaoui-med/lightning-admin-angular" target="_blank" className="btn btn-primary btn-sm">Github</a>
                      <a href="https://azouaoui-med.github.io/lightning-admin-angular/demo/" target="_blank" className="btn btn-success btn-sm">Preview</a>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <footer className="text-center">
                <div className="mb-2">
                  <small>
                    © 2020 made with <i className="fa fa-heart" style={{color: 'red'}} /> by - <a target="_blank" rel="noopener noreferrer" href="https://azouaoui.netlify.com">
                      Mohamed Azouaoui
                    </a>
                  </small>
                </div>
                <div>
                  <a href="https://github.com/azouaoui-med" target="_blank">
                    <img alt="GitHub followers" src="https://img.shields.io/github/followers/azouaoui-med?label=github&style=social" />
                  </a>
                  <a href="https://twitter.com/azouaoui_med" target="_blank">
                    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/azouaoui_med?label=twitter&style=social" />
                  </a>
                </div>
              </footer>
            </div>
          </main>
          {/* page-content" */}
        </div>
       
      </div>
       )
    }
    export default Dashboard; 