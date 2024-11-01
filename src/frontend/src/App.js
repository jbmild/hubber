import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import MisNormativas from 'components/misNormativas';
import { isAuthenticated, logOut, getUser } from './services/authService';
import {tieneNuevasNotificaciones} from 'services/notificacionesService';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';

import BackgroundLetterAvatars from './components/avatarColor';

import { Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";


import Home from './pages/home/index';
import Chat from './pages/chat';
import Login from './pages/login';
import Exportar from './pages/exportar';
import Profile from './pages/profile';
import PrivateRoute from './components/privateRoute';
import { Grid } from '@mui/material';
import Browser from 'pages/browser';
import Markets from 'pages/markets';
import MisIntereses from 'pages/misIntereses';
import MisAlertas from 'pages/misAlertas';
import ProductClassifier from 'pages/clasificarProductos';
import Sugerencias from 'pages/sugerencias';
import Equivalencias from 'pages/equivalencias';

import ExportProcess from './pages/exportar/ExportProcess';
import ExportRegimes from './pages/exportar/ExportRegimes';
import ExportRequirements from './pages/exportar/ExportRequirements';
import Incoterms from './pages/exportar/Incoterms';
import PaymentsAndReimbursements from './pages/exportar/PaymentsAndReimbursements';
import ExportCosts from './pages/exportar/ExportCosts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YourProduct from './pages/exportar/YourProduct';
import ErrorPage from 'pages/error';
import ErrorBoundary from 'components/errorBoundary';

function App() {

  const [hasAlerts, setHasAlerts] = useState(false);

  return (
    <>
      <ToastContainer />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout hasAlerts={hasAlerts} setHasAlerts={setHasAlerts}/>} >
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/error' element={<ErrorPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/buscador' element={<Browser />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/clasificarProductos' element={<ProductClassifier />} />
              <Route path='/exportar' element={<Exportar />} />
              <Route path='/mercados' element={<Markets />} />
              <Route path='/sugerencias' element={<Sugerencias />} />
              <Route path='/exportar/proceso' element={<ExportProcess />} />
              <Route path='/exportar/regimenes' element={<ExportRegimes />} />
              <Route path='/exportar/requisitos' element={<ExportRequirements />} />
              <Route path='/exportar/incoterms' element={<Incoterms />} />
              <Route path='/exportar/cobros' element={<PaymentsAndReimbursements />} />
              <Route path='/exportar/costos' element={<ExportCosts />} />
              <Route path='/exportar/tu-producto' element={<YourProduct />} />
              <Route path='/misNormativas' element={<MisNormativas />} />
              <Route path='/equivalencias' element={<Equivalencias />} />
              <Route path='/misIntereses' element={<MisIntereses />} />
              <Route path='/misAlertas' element={<MisAlertas setHasAlerts={setHasAlerts}/>} />
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}

function Layout({hasAlerts, setHasAlerts}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [myUsername, setUsername] = useState('');

  let location = useLocation();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElExport, setAnchorElExport] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [roleAdmin, setRoleAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth);
      if(auth){
        const nombre = await getUser();
        const notificaciones = await tieneNuevasNotificaciones();
        setHasAlerts(notificaciones);
        setUsername(nombre.username);
        setRoleAdmin(nombre.esAdmin);
      } else {
        setRoleAdmin(false);
      }
    };
    checkAuth();
  }, [location.pathname]);

  useEffect(() => {
    const checkUser = async () => {
      if(authenticated){
        const nombre = await getUser();
        setUsername(nombre);
      }
    };
    checkUser();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (to) => {
    setAnchorElNav(null);
    if (to) navigate(to);
  };

  const handleOpenExportMenu = (event) => {
    setAnchorElExport(event.currentTarget);
  };

  const handleCloseExportMenu = (to) => {
    setAnchorElExport(null);
    if (to) navigate(to);
  };

  const handleLogoutClick = () => {
    setAnchorElUser(null);
    setAnchorElNav(null);
    setHasAlerts(false);
    logOut();
    setRoleAdmin(false);
    setAuthenticated(false);
    navigate('/');
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (to) => {
    setAnchorElUser(null);
    if (to) navigate(to);
  };


  const exportMenuItems = [
    { label: 'Proceso de una exportación', path: '/exportar/proceso' },
    { label: 'Regímenes vigentes', path: '/exportar/regimenes' },
    { label: 'Requisitos básicos y documentación obligatoria', path: '/exportar/requisitos' },
    { label: 'Incoterms', path: '/exportar/incoterms' },
    { label: 'Cobros y reintegros', path: '/exportar/cobros' },
    { label: 'Costos', path: '/exportar/costos' },
    { label: 'Tu Producto', path: '/exportar/tu-producto' },
  ];

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#fff" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack direction="row" spacing={0} display={'flex'} width={'100%'}>
              <Box onClick={() => { navigate('/');}} sx={{cursor: 'pointer'}}>
               <img src="/images/logo.png" className="_b9923f60" alt="11.svg" width={"100px"}></img>
              </Box>

              <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => { navigate('/'); }}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'inline-flex', lg: 'inline-flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none',
                  paddingTop: '2rem',
                  cursor: "pointer"
                }}
              >
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'inline-flex', lg: 'inline-flex', justifyContent: 'flex-end' } }}>
                {!roleAdmin ? (<><Button
                  key={'btn-exportar-menu'}
                  onClick={handleOpenExportMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}

                >
                  Información General
                </Button>
                <Menu
                  anchorEl={anchorElExport}
                  open={Boolean(anchorElExport)}
                  onClose={() => handleCloseExportMenu()}
                >
                  {exportMenuItems.map((item) => (
                    <MenuItem key={item.path} onClick={() => handleCloseExportMenu(item.path)}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>

                <Button
                  key={'btn-productos-menu'}
                  onClick={() => { handleCloseNavMenu('/buscador') }}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Buscar Normativas
                </Button>

                <Button key={'btn-mercados-menu'}
                  onClick={() => { handleCloseNavMenu('/mercados') }}
                  sx={{ my: 2, color: 'black', display: 'block' }}>
                  Recomendar mercados
                </Button>

                <Button
                  key={'btn-chat-menu'}
                  onClick={() => { handleCloseNavMenu('/chat') }}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Soporte por chat
                </Button>
                <Button
                  key={'btn-dir-menu'}
                  onClick={() => { handleCloseNavMenu('/clasificarProductos') }}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Clasifica tu Producto
                </Button></>):(
                  <>

                  <Button
                  
                  key={'btn-eqv-menu'}
                  
                  onClick={() => { handleCloseNavMenu('/equivalencias') }}
                  
                  sx={{ my: 2, color: 'black', display: 'block' }}
                  
                  >
                  
                  Gestionar Equivalencias
                  
                  </Button></>
                )}
                {!authenticated && (
                  <Button
                    key={'btn-login-menu'}
                    onClick={() => { handleCloseNavMenu('/login') }}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    Ingresar
                  </Button>
                )}
                {authenticated && (
                <Box sx={{display: 'flex', flexWrap: 'wrap', alignContent: 'center'}}>
                  <Button
                    key={'btn-user-menu'}
                    onClick={handleOpenUserMenu}
                    disableRipple= {true}
                    sx={{    my: 2, color: 'black', display: 'flex', borderRadius: '100%',
                      '&:hover': {
                          background: 'none',
                      },
                  } }
                  >
                    <BackgroundLetterAvatars onClick={handleOpenUserMenu} name = {myUsername} hasAlerts = {hasAlerts}/>
                  </Button>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={() => handleCloseUserMenu()}
                  >
                   { !roleAdmin && 
                    <Box>
                      <MenuItem key={'/misNormativas'} onClick={() => handleCloseUserMenu('/misNormativas')}>
                        Mis Normativas
                      </MenuItem>
                      <MenuItem key={'/misIntereses'} onClick={() => handleCloseUserMenu('/misIntereses')}>
                        Mis Intereses
                      </MenuItem>
                      <MenuItem key={'/misAlertas'} onClick={() => handleCloseUserMenu('/misAlertas')}>
                        Notificaciones
                          {hasAlerts && (
                            <Badge color="error" variant="dot"              
                          style={{ marginLeft: '8px'}}>
                                <NotificationsActiveRoundedIcon  fontSize="small" />
                            </Badge>)}
                      </MenuItem>
                      <MenuItem key={'/sugerencias'} onClick={() => handleCloseUserMenu('/sugerencias')}>
                        Sugerencias
                      </MenuItem>
                    </Box>}
                    <MenuItem
                      key={'btn-register-menu'}
                      onClick={handleLogoutClick}
                      sx={{ color: 'black', display: 'block', backgroundColor: 'rgb(206 206 206)' }}
                    >
                      Salir
                    </MenuItem>
                  </Menu>
                </Box>)}
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', lg: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="black"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={() => { handleCloseNavMenu(null) }}
                  sx={{
                    display: { xs: 'block', md: 'none', lg: 'none' },
                  }}
                >
                  {!roleAdmin ? (
                    <Box>
                      <MenuItem
                        key={'btn-exportar-menu'}
                        onClick={handleOpenExportMenu}
                      >
                        <Typography textAlign="center">
                          Información General
                        </Typography>
                      </MenuItem>
                      {exportMenuItems.map((item) => (
                        <MenuItem key={item.path} onClick={() => handleCloseExportMenu(item.path)} sx={{ pl: 4 }}>
                          <Typography textAlign="center">{item.label}</Typography>
                        </MenuItem>
                      ))}
                      <MenuItem
                        key={'btn-productos-menu'}
                        onClick={() => { handleCloseNavMenu('/buscador') }}
                      >
                        <Typography textAlign="center">
                          Buscar Normativas
                        </Typography>
                      </MenuItem>

                      <MenuItem
                        key={'btn-mercados-menu'}
                        onClick={() => { handleCloseNavMenu('/mercados') }}
                      >
                        <Typography textAlign="center">
                          Recomendar mercados
                        </Typography>
                      </MenuItem>


                      <MenuItem
                        key={'btn-chat-menu'}
                        onClick={() => { handleCloseNavMenu('/chat') }}
                      >
                        <Typography textAlign="center">
                          Soporte por chat
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        key={'btn-dir-menu'}
                        onClick={() => { handleCloseNavMenu('/clasificarProductos') }}
                      >
                        <Typography textAlign="center">
                          Clasifica tu Producto
                        </Typography>
                      </MenuItem>
                    </Box>) : <MenuItem

                      key={'btn-equivalencias'}

                      onClick={() => { handleCloseNavMenu('/equivalencias') }}

                      >

                      <Typography textAlign="center">

                      Gestionar Equivalencias

                      </Typography>

                      </MenuItem>}
                  {(authenticated && !roleAdmin ) && (
                    <Box>
                      <MenuItem
                        key={'btn-mis-normativas'}
                        onClick={() => { handleCloseNavMenu('/misNormativas') }}
                      >
                        <Typography textAlign="center">
                          Mis Normativas
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        key={'btn-mis-intereses'}
                        onClick={() => { handleCloseNavMenu('/misIntereses') }}
                      >
                        <Typography textAlign="center">
                          Mis Intereses
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        key={'btn-mis-alertas'}
                        onClick={() => { handleCloseNavMenu('/misAlertas') }}
                      >
                        <Typography textAlign="center">
                          Notificaciones
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        key={'btn-mis-sugerencias'}
                        onClick={() => { handleCloseNavMenu('/sugerencias') }}
                      >
                        <Typography textAlign="center">
                          Sugerencias
                        </Typography>
                      </MenuItem>
                    </Box>
                  )}
                  <Divider sx={{ my: 0.5 }} />
                  {!authenticated && (
                    <MenuItem
                      key={'btn-login-menu'}
                      onClick={() => { handleCloseNavMenu('/login') }}
                    >
                      <Typography textAlign="center">
                        Ingresar
                      </Typography>
                    </MenuItem>
                  )}
                  {authenticated && (
                    <MenuItem
                      key={'btn-register-menu'}
                      onClick={handleLogoutClick}
                    >
                      <Typography textAlign="center">
                        Salir
                      </Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>

              <Typography
                variant="h5"
                noWrap
                component="a"
                onClick={() => { navigate('/'); }}
                sx={{
                  mr: 2,
                  display: { xs: 'inline-flex', md: 'none', lg: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: "none",
                  boxShadow: "none",
                  verticalAlign: 'middle',
                  paddingTop: '2rem',
                  cursor: "pointer"
                }}
              >
                HUBBER
              </Typography>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />

<footer className="_c4b89fde">
  <div className="wr">
    <div className="_bea1daea">
      <Grid container justifyContent="flex-end" style={{ paddingLeft: "350px" }}>
        <Grid item xs={12} md={3} style={{ textAlign: "right" }}>
          <span className="_c0e4633f">© 2024 Hubber</span>
        </Grid>
        <Grid item xs={12} md={9} style={{ textAlign: "right" }}>
          <ul className="_d1a0a8ea">
            <li className="_0fc50e27">
              <h4 className="_31f6b92b">Contacto</h4>
              <ul className="_91687afc">
                <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Twitter</a></li>
                <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Instagram</a></li>
                <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">YouTube</a></li>
                <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Mail</a></li>
              </ul>
            </li>
            <li className="_0fc50e27">
              <h4 className="_31f6b92b">Legal</h4>
              <ul className="_91687afc">
                <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/privacy-policy" className="_c288f4a7">Política de Privacidad</a></li>
                <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/terms-of-use" className="_c288f4a7">Términos de Uso</a></li>
                <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/cookie-policy" className="_c288f4a7">Política de Cookies</a></li>
              </ul>
            </li>
          </ul>
        </Grid>
      </Grid>
    </div>
  </div>
</footer>

    </>
  );
}


export default App;
