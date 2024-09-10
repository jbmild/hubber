import React, {useState, useEffect} from 'react';
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

import { Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";


import Home from './pages/home/index';
import Chat from './pages/chat';
import Login from './pages/login';
import Register from './pages/register';
import Exportar from './pages/exportar';
import Profile from './pages/profile';
import PrivateRoute from './components/privateRoute';
import { isAuthenticated, logOut } from 'services/authService';
import { Grid } from '@mui/material';
import Browser from 'pages/browser';
import Markets from 'pages/markets';

import ExportProcess from './pages/exportar/ExportProcess';
import ExportRegimes from './pages/exportar/ExportRegimes';
import ExportRequirements from './pages/exportar/ExportRequirements';
import ProductPreparation from './pages/exportar/ProductPreparation';
import Incoterms from './pages/exportar/Incoterms';
import PaymentsAndReimbursements from './pages/exportar/PaymentsAndReimbursements';
import ExportCosts from './pages/exportar/ExportCosts';

function App() {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />}/>  
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route element={<PrivateRoute />}>
          <Route path='/buscador' element={<Browser />} />    
          <Route path='/chat' element={<Chat />} />
		  <Route path='/directorio' element={<Home />} />
		  <Route path='/exportar' element={<Exportar />} />
	  <Route path='/mercados' element={<Markets />} />  
          <Route path='/exportar/proceso' element={<ExportProcess />} />
          <Route path='/exportar/regimenes' element={<ExportRegimes />} />
          <Route path='/exportar/requisitos' element={<ExportRequirements />} />
          <Route path='/exportar/preparacion' element={<ProductPreparation />} />
          <Route path='/exportar/incoterms' element={<Incoterms />} />
          <Route path='/exportar/cobros' element={<PaymentsAndReimbursements />} />
          <Route path='/exportar/costos' element={<ExportCosts />} />
          </Route>
        </Route>
      </Routes>

    </>
  );
}

function Layout() {
  const [authenticated, setAuthenticated] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElExport, setAnchorElExport] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth);
    };
    checkAuth();
  }, [location.pathname]);

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
    setAnchorElNav(null);
    logOut();
    setAuthenticated(false);
    navigate('/');
  };

  const exportMenuItems = [
    { label: 'Proceso de una exportación', path: '/exportar/proceso' },
    { label: 'Regímenes vigentes', path: '/exportar/regimenes' },
    { label: 'Requisitos básicos y documentación obligatoria', path: '/exportar/requisitos' },
    { label: '¿Cómo preparar tu producto?', path: '/exportar/preparacion' },
    { label: 'Incoterms', path: '/exportar/incoterms' },
    { label: 'Cobros y reintegros', path: '/exportar/cobros' },
    { label: 'Costos', path: '/exportar/costos' },
  ];

  return (
    <>
      <AppBar position="static" style={{backgroundColor: "#fff"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack direction="row" spacing={0} display={'flex'} width={'100%'}>
              <img src="/images/logo.png" className="_b9923f60" alt="11.svg" width={"100px"}></img>

              <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => {navigate('/');}}
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
                <Button
                  key={'btn-exportar-menu'}
                  onClick={handleOpenExportMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                  
                >
                  Empieza a Exportar
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
                  onClick={() => {handleCloseNavMenu('/buscador')}}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Buscar Normativas
                </Button>
                <Button
                  key={'btn-chat-menu'}
                  onClick={() => {handleCloseNavMenu('/chat')}}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                <Button key={'btn-mercados-menu'}
                  onClick={() => {handleCloseNavMenu('/mercados')}}
                  sx={{ my: 2, color: 'black', display: 'block' }}>
                  Recomendador de Mercados
                </Button>
                  Soporte por chat
                </Button>
                <Button
                  key={'btn-dir-menu'}
                  onClick={() => {handleCloseNavMenu('/directorio')}}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Nuestro Directorio
                </Button>
                {!authenticated && (
                  <Button
                    key={'btn-login-menu'}
                    onClick={() => {handleCloseNavMenu('/login')}}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    Ingresar
                  </Button>
                )}
                {authenticated && (
                  <Button
                    key={'btn-register-menu'}
                    onClick={handleLogoutClick}
                    sx={{ my: 2, color: 'black', display: 'block', backgroundColor: 'rgb(206 206 206)' }}
                  >
                    Salir
                  </Button>
                )}                
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
                  onClose={() => {handleCloseNavMenu(null)}}
                  sx={{
                    display: { xs: 'block', md: 'none', lg: 'none' },
                  }}
                >
                  <MenuItem 
                    key={'btn-exportar-menu'}
                    onClick={handleOpenExportMenu}
                  >
                    <Typography textAlign="center">
                      Empieza a Exportar
                    </Typography>
                  </MenuItem>
                  {exportMenuItems.map((item) => (
                    <MenuItem key={item.path} onClick={() => handleCloseExportMenu(item.path)} sx={{ pl: 4 }}>
                      <Typography textAlign="center">{item.label}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem 
                    key={'btn-productos-menu'}
                    onClick={() => {handleCloseNavMenu('/buscador')}}
                  >
                    <Typography textAlign="center">
                      Buscar Normativas
                    </Typography>
                  </MenuItem>

                    <MenuItem 
                    key={'btn-mercados-menu'}
                    onClick={() => {handleCloseNavMenu('/mercados')}}
                  >
                    <Typography textAlign="center">
                      Recomendar mercados
                    </Typography>
                  </MenuItem>

		    
                  <MenuItem 
                    key={'btn-chat-menu'}
                    onClick={() => {handleCloseNavMenu('/chat')}}
                  >
                    <Typography textAlign="center">
                      Soporte por chat
                    </Typography>
                  </MenuItem>
                  <MenuItem 
                    key={'btn-dir-menu'}
                    onClick={() => {handleCloseNavMenu('/directorio')}}
                  >
                    <Typography textAlign="center">
                      Nuestro Directorio
                    </Typography>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  {!authenticated && (
                    <MenuItem 
                      key={'btn-login-menu'}
                      onClick={() => {handleCloseNavMenu('/login')}}
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
                onClick={() => {navigate('/');}}
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
            <Grid container>
              <Grid item xs={12} md={3}>
                <span className="_c0e4633f">© 2024 Hubber</span>
                <div className="_a6d0f97b" style={{scale:0.5}}>
                  <div className="_379aefea">
                    <a href="https://www.facebook.com/" className="_77e6fd5c">
                      <svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24"
                        className="um-icon _2cd4f8c5">
                        <path
                          d="M448 56.7v398.5a24.7 24.7 0 0 1-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7A24.8 24.8 0 0 1 0 455.3V56.7A24.8 24.8 0 0 1 24.7 32h398.5A24.8 24.8 0 0 1 448 56.7z"
                          fill="currentColor"></path>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/" className="_77e6fd5c">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512" width="24" height="24" className="um-icon _2cd4f8c5">
                        <path
                          d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6a74.8 74.8 0 1 1 .1-149.3 74.8 74.8 0 0 1-.1 149.3zm146.4-194.3a26.7 26.7 0 1 1-53.6 0 26.8 26.8 0 0 1 53.6 0zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388a75.6 75.6 0 0 1-42.6 42.6c-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9A75.6 75.6 0 0 1 49.4 388c-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1A75.6 75.6 0 0 1 92 81.2c29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9a75.6 75.6 0 0 1 42.6 42.6c11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                          fill="currentColor"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/" className="_77e6fd5c">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512" width="24" height="24" className="um-icon _2cd4f8c5">
                        <path
                          d="M459.4 151.7c.3 4.6.3 9.1.3 13.7 0 138.7-105.6 298.5-298.6 298.5A296.5 296.5 0 0 1 0 417a217 217 0 0 0 25.3 1.2c49 0 94.3-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8a111 111 0 0 0 47.4-2 105 105 0 0 1-84.1-103v-1.2c14 7.8 30.2 12.6 47.4 13.3A104.9 104.9 0 0 1 35.7 67.2a298.3 298.3 0 0 0 216.4 109.9 104.9 104.9 0 0 1 179-95.8 206.6 206.6 0 0 0 66.6-25.4 104.7 104.7 0 0 1-46.1 57.8c21-2.3 41.6-8.1 60.4-16.2a225.6 225.6 0 0 1-52.6 54.2z"
                          fill="currentColor"></path>
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/" className="_77e6fd5c">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512" width="24" height="24" className="um-icon _2cd4f8c5">
                        <path
                          d="M549.7 124a68.6 68.6 0 0 0-48.3-48.5C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 25-48.3 48.6C15 167 15 256.4 15 256.4s0 89.4 11.4 132.3a67.6 67.6 0 0 0 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5a67.6 67.6 0 0 0 48.3-47.8C561 345.8 561 256.4 561 256.4s0-89.5-11.4-132.3zM232 337.7V175.2l143 81.2-143 81.2z"
                          fill="currentColor"></path>
                      </svg>
                    </a>
                  </div>
                  <div className="_370825cf umsoPluginTarget"></div>
                </div>
              </Grid>              
              <Grid item xs={12} md={9}>
                <ul className="_d1a0a8ea">
                  <li className="_0fc50e27">
                    <h4 className="_31f6b92b">Características</h4>
                    <ul className="_91687afc">
                      <li className="_e0485177">
                        <a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Algo genial</a>
                      </li>
                      <li className="_e0485177">
                        <a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Otra cosa</a></li>
                      <li className="_e0485177">
                        <a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Tantas características</a>
                      </li>
                      <li className="_e0485177">
                        <a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Es asombroso</a>
                      </li>
                    </ul>
                  </li>
                  <li className="_0fc50e27">
                    <h4 className="_31f6b92b">Empresa</h4>
                    <ul className="_91687afc">
                      <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Blog</a></li>
                      <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Sobre nosotros</a></li>
                      <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Contacto</a></li>
                      <li className="_e0485177"><a href="https://v2nfosz0pa4o0t8w.umso.co/" className="_c288f4a7">Trabajos</a></li>
                    </ul>
                  </li>
                  <li className="_0fc50e27">
                    <h4 className="_31f6b92b">Legal</h4>
                    <ul className="_91687afc">
                      <li className="_e0485177">
                        <a href="https://v2nfosz0pa4o0t8w.umso.co/privacy-policy" className="_c288f4a7">Privacidad Política</a>
                      </li>
                      <li className="_e0485177">
                        <a href="https://v2nfosz0pa4o0t8w.umso.co/terms-of-use" className="_c288f4a7">Términos de uso</a>
                      </li>
                      <li className="_e0485177">
                        <a href="https://v2nfosz0pa4o0t8w.umso.co/cookie-policy" className="_c288f4a7">Politica de Cookie</a>
                      </li>
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
