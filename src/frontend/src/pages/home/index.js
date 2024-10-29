import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import { ExpandMoreSharp } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const featuresRef = React.useRef(null);
    const scrollToFeatures = () => {
        featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // Estado para controlar el diálogo de información
    const [open, setOpen] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState({ title: '', content: '', icon: null });

    const handleClickOpen = (title, content, icon) => {
        setDialogContent({ title, content, icon });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Estado para el popup de advertencia
    const [openWarning, setOpenWarning] = React.useState(!localStorage.getItem('afipWarningDismissed'));

    const handleCloseWarning = () => {
        setOpenWarning(false);
        localStorage.setItem('afipWarningDismissed', 'true');
    };

    // Definición de los iconos
    const iconBusqueda = (
        <svg xmlns="http://www.w3.org/2000/svg" className="um-icon _ac2e304b" fill="currentColor"
            width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z">
            </path>
        </svg>
    );

    const iconMercados = (
        <svg xmlns="http://www.w3.org/2000/svg" className="um-icon _ac2e304b" fill="currentColor"
            width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z">
            </path>
        </svg>
    );

    const iconInformacion = (
        <svg xmlns="http://www.w3.org/2000/svg" className="um-icon _ac2e304b" fill="currentColor"
            width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z">
            </path>
        </svg>
    );

    return (
        <>
            {/* Popup de Advertencia */}
            <Dialog open={openWarning} onClose={handleCloseWarning}>
                <DialogTitle style={{ color: 'black' }}>
                    <WarningIcon color="error" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Importante: Disolución de la AFIP
                </DialogTitle>
                <DialogContent>
                    <p>
                        Estimado usuario, a partir del anuncio emitido por el gobierno argentino sobre la disolución de la Administración Federal de Ingresos Públicos (AFIP), así como también la creación de la Agencia de Recaudación y Control Aduanero (ARCA) a través del Decreto 953/2024,
                        Hubber se compromete a mantener su base de normativas y guías completamente actualizadas. A medida que surja nueva información sobre el nuevo organismo, la plataforma le notificará los cambios para su tranquilidad.
                    </p>
                    <Button onClick={handleCloseWarning} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                        Muchas gracias
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Diálogo de Información */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ color: 'black' }}>
                    {dialogContent.icon && (
                        <span style={{ verticalAlign: 'middle', marginRight: '8px' }}>
                            {dialogContent.icon}
                        </span>
                    )}
                    {dialogContent.title}
                </DialogTitle>
                <DialogContent>
                    <p>{dialogContent.content}</p>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        style={{ backgroundColor: 'grey', color: 'white', marginTop: '16px' }}
                    >
                        Cerrar
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Sección principal */}
            <section className="_af0513fc">
                <div className="wr">
                    <div className="_4b9aaa61">
                        <div className="_e8505e7a">
                            <span className="_fb1368e7">Empezar ahora — Explorar sitio</span>
                            <header className="_a1bbfd8f">
                                <h1 className="_5b389614">Bienvenido a Hubber</h1>
                                <p className="_8ee384e7">
                                    Revolucionando el comercio global para los productores con nuestra plataforma exportadora integral.
                                </p>
                            </header>
                            <div className="_6c87fcd2">
                                <button id="btn_xqm3sgxmge" className="_8bff3155 btn" onClick={() => navigate('/login')}><span>Únete a nosotros hoy</span></button>
                                <button id="btn_dgh9dpr5i1" className="_8bff3155 btn" onClick={scrollToFeatures}>
                                    <span>Vea cómo funciona</span>
                                </button>
                            </div>
                        </div>
                        <div className="_b6f1be9a">
                            <img src="./images/6572431.jpeg" className="_1c65393e" alt="Imagen principal"></img>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Funciones potentes */}
            <section className="_0ea537f6">
                <div className="wr">
                    <div className="_e770eff3">
                        <div className="_077a4d59">
                            <header className="_cf577ed5">
                                <h2 className="_c6a68e66">Funciones potentes</h2>
                                <p className="_9adc270f">
                                    Todo lo que necesita para navegar por las complejidades del comercio global al alcance de su mano.
                                </p>
                            </header>
                            <ul className="_981e10dd">
                                <li className="_1c339cf6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="um-icon _2868fba1" fill="currentColor"
                                        width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z">
                                        </path>
                                    </svg>
                                    <div className="_a7316ad2">
                                        <span className="_91b672d2">
                                            Las tendencias del mercado
                                        </span>
                                        <span className="_bd5edd4d">
                                            Manténgase a la vanguardia identificando las tendencias de los mercados emergentes
                                            con nuestro módulo de tendencias.
                                        </span>
                                    </div>
                                </li>
                                <li className="_1c339cf6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="um-icon _2868fba1" fill="currentColor"
                                        height="24" width="24" viewBox="0 0 512 512">
                                        <path
                                            d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z">
                                        </path>
                                    </svg>
                                    <div className="_a7316ad2">
                                        <span className="_91b672d2">
                                            Exportar de forma segura
                                        </span>
                                        <span
                                            className="_bd5edd4d">Aprenda el paso a paso y la documentación necesaria para exportar un producto desde Argentina.
                                        </span>
                                    </div>
                                </li>
                                <li className="_1c339cf6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="um-icon _2868fba1" fill="currentColor"
                                        width="24" height="24" viewBox="0 0 24 24">
                                        <path
                                            d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z">
                                        </path>
                                    </svg>
                                    <div className="_a7316ad2">
                                        <span className="_91b672d2">
                                            Descubra compradores
                                        </span>
                                        <span className="_bd5edd4d">
                                            Utilice nuestros módulos de intereses y recomendación de mercados para encontrar nuevas oportunidades para sus productos en
                                            todo el mundo.
                                        </span>
                                    </div>
                                </li>
                            </ul>
                            
                        </div>
                        <div className="_54282ce1">
                          <img src="./images/trigo.jpg" className="_c2a4b729" alt="Funciones potentes" style={{ width: '100%', height: '100%', maxWidth: '600px', maxHeight: '300px', objectFit: 'cover',marginTop: '100px', borderRadius: '0'  }}></img>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Estadísticas */}
            <section className="_8241a5aa">
                <div className="wr">
                    <div className="_391d4a2b">
                        <header className="_85151876">
                            <h2 className="_dcfc28df">Estadísticas de la plataforma</h2>
                            <p className="_9e97a860">Nuestro impacto en cifras. Sea testigo de la influencia de Hubber en el comercio internacional.
                            </p>
                        </header>
                        <div className="_e169a136">
                            <div className="_36ee58b3">
                                <div className="_bbf320fc">
                                    <span data-value="200000" className="countup">
                                        +200.000
                                    </span>
                                </div>
                                <span className="_85dc032f">Mercados potenciales</span>
                            </div>
                            <div className="_36ee58b3">
                                <div className="_bbf320fc">
                                    <span data-value="35" className="countup">+35</span>
                                </div>
                                <span className="_85dc032f">Países alcanzados</span>
                            </div>
                            <div className="_36ee58b3">
                                <div className="_bbf320fc">
                                    <span data-value="5000" className="countup">+5.000</span>
                                </div>
                                <span className="_85dc032f">Productos listados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Características principales */}
            <section ref={featuresRef} className="_dd888f26">
                <div className="wr">
                    <header className="_88764ad9">
                        <h2 className="_f7571d74">Características principales</h2>
                        <p className="_9ed92dee">
                            Explore las herramientas esenciales que hacen de Hubber la aplicación de exportación
                            definitiva para productores.
                        </p>
                    </header>
                    <div className="_33751d42">
                        <div className="_1f204cd4">
                            {iconBusqueda}
                            <h3 className="_a28adcc4">Búsqueda inteligente</h3>
                            <span className="_9123e15d">
                                Encuentre rápidamente normativas y regulaciones con nuestro módulo de búsqueda intuitivo. Consulte también nuestro chatbot de inteligencia artificial para una experiencia interactiva.
                            </span>
                            <button
                                id="btn_7ayqwludij"
                                className="_a38e689d btn"
                                onClick={() => handleClickOpen(
                                    'Búsqueda inteligente',
                                    'Una de las principales barreras a la hora de exportar es estar al tanto de la innumerable cantidad de normativas y regulaciones a cumplir. Hubber permite a traves de su buscador inteligente optimizar su tiempo y recursos. Nosotros recopilamos por usted todo el marco regulatorio que debe cumplir su producto para salir del país y llegar al extranjero. Encuentre los tramites que son necesarios realizar y añádalos a su perfil para tener un seguimiento. ',
                                    iconBusqueda
                                )}
                            >
                                <span>Descubra cómo</span>
                            </button>
                        </div>
                        <div className="_1f204cd4">
                            {iconMercados}
                            <h3 className="_a28adcc4">Mercados Potenciales</h3>
                            <span className="_9123e15d">
                                Descubra en qué países su modelo de negocio podría convertirse en una oportunidad con nuestro módulo de recomendación de mercados.
                            </span>
                            <button
                                id="btn_5dcksxnryc"
                                className="_a38e689d btn"
                                onClick={() => handleClickOpen(
                                    'Mercados Potenciales',
                                    'Puede que tenga pensado un país de destino para su producto. ¿Pero qué otras oportunidades que no conocía podrían estar ahi fuera? Nuestro recomendador de mercados integrado al Indice de Mercados Atractivos (IMA) le proporcionará información sobre que otros paises son favorables para sus exportaciones.',
                                    iconMercados
                                )}
                            >
                                Aprende más
                            </button>
                        </div>
                        <div className="_1f204cd4">
                            {iconInformacion}
                            <h3 className="_a28adcc4">Información actualizada</h3>
                            <span className="_9123e15d">Reciba notificaciones sobre nuevas normativas o actualizaciones recientes del comercio exterior argentino con nuestro sistema de alertas.</span>
                            <button
                                id="btn_xyppnk6o3n"
                                className="_a38e689d btn"
                                onClick={() => handleClickOpen(
                                    'Información actualizada',
                                    'Uno de los desafíos a la hora de exportar implica estar al tanto de modificaciones o nuevas normativas que puedan alterar sus operaciones. Hubber ofrece un sistema de alertas para brindarle actualizaciones de las normativas que usted necesite seguir para mantenerlo al día.',
                                    iconInformacion
                                )}
                            >
                                Más información
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de FAQs */}
            <section className="_6f1d4e36">
                <div className="wr">
                    <header className="_f42fe586">
                        <h2 className="_15ac944c">FAQs</h2>
                        <p className="_4b7e2f3b">Encuentre respuestas a preguntas comunes sobre el uso de Hubber y la expansión de su
                            negocio Internacionalmente.
                        </p>
                    </header>
                    <div className="_991c2a56">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreSharp />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                ¿Qué es Hubber?
                            </AccordionSummary>
                            <AccordionDetails>
                                Hubber es una plataforma digital diseñada para potenciar a los productores argentinos y de economías regionales en su acceso a mercados internacionales. Con un enfoque en las necesidades específicas del sector productivo local, Hubber brinda herramientas avanzadas que simplifican el proceso de exportación, asegurando operaciones seguras y conectando a productores con compradores globales de manera eficiente. Nuestra plataforma impulsa el crecimiento y la competitividad de las economías regionales, facilitando la internacionalización de sus productos.
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreSharp />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                ¿Cómo me uno a Hubber?
                            </AccordionSummary>
                            <AccordionDetails>
                                Comience registrándose en nuestro sitio web, configurando su perfil, y explorando el apartado de <b>Información General.</b>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreSharp />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                ¿Qué productos puedo exportar?
                            </AccordionSummary>
                            <AccordionDetails>
                                Hubber prioriza las principales economías regionales argentinas. La plataforma también permite obtener información sobre más de 1000 productos de otras industrias para conocer las barreras comerciales y mercados a los que se exponen. Utilice nuestro clasificador de Código Arancelario para encontrar su producto a exportar.
                            </AccordionDetails>
                        </Accordion>
						 <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreSharp />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                ¿Cuales son las fuentes de información que utiliza Hubber?
                            </AccordionSummary>
                            <AccordionDetails>
                                Las normativas y guías de exportación que puede consultar en la plataforma se basan en datos proporcionados por la Agencia de Recaudación y Control Aduanero (ARCA o ex-AFIP), la Organización Mundial del Comercio (OMS), la Conferencia de las Naciones Unidas para el Comercio y el Desarrollo (UNCTAD), y el Sistema de Información de Comercio Exterior de la Organización de los Estados Americanos (SICE).
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;

function Marquee() {
    return (
        <>
            <section className="_03763288">
                <header className="_94212cd5">
                    <h2 className="_e44ebc81">Socios de confianza</h2>
                    <p className="_c98db934">Marcas y agencias líderes que confían en Hubber para expandir su alcance global.</p>
                </header>
                <div className="_ac090958">
                    <div className="_4d32de78 umso-marquee" style={{ width: " 6633px", speed: 0.4 }}>
                        <div style={{ animationDuration: "87.0472s" }} className="_ef9f47ee">
                            <div className="_d673d676">
                                <img src="./images/6ovw3a4z6o5mtfzb.svg" className="_307f224b" alt="palletfish.svg"></img>
                                <img src="./images/crl58tr3aum5qqxt.svg" className="_307f224b" alt="m.c.p..svg"></img>
                                <img src="./images/f2akjzux5n6kt1hq.svg" className="_307f224b" alt="epism.svg"></img>
                                <img src="./images/0dt47g3t2ffy7r28.svg" className="_307f224b" alt="lecoid.svg"></img>
                                <img src="./images/m94w5tqxbjg8vdoy.svg" className="_307f224b" alt="unwined.svg"></img>
                                <img src="./images/4rgex0ascb7yrgsa.svg" className="_307f224b" alt="pallace.svg"></img>
                                <img src="./images/ucqelacyxyc68bvz.svg" className="_307f224b" alt="chiabele.svg"></img>
                                <img src="./images/0dt47g3t2ffy7r28.svg" className="_307f224b" alt="lecoid.svg"></img>
                                <img src="./images/133ugvf43x0psc82.svg" className="_307f224b" alt="lancelite.svg"></img>
                                <img src="./images/2yrc335q2nikn4cc.svg" className="_307f224b" alt="hivebill.svg"></img>
                                <img src="./images/2a8vrw51vy1lz6ab.svg" className="_307f224b" alt="frescon.svg"></img>
                                <img src="./images/cftx5x40cssur9er.svg" className="_307f224b" alt="carassava.svg"></img>
                            </div>
                            <div className="_bce3d2ba" aria-hidden="true">
                                <div className="_d673d676">
                                    <img src="./images/6ovw3a4z6o5mtfzb.svg" className="_307f224b" alt="palletfish.svg"></img>
                                    <img src="./images/crl58tr3aum5qqxt.svg" className="_307f224b" alt="m.c.p..svg"></img>
                                    <img src="./images/f2akjzux5n6kt1hq.svg" className="_307f224b" alt="epism.svg"></img>
                                    <img src="./images/0dt47g3t2ffy7r28.svg" className="_307f224b" alt="lecoid.svg"></img>
                                    <img src="./images/m94w5tqxbjg8vdoy.svg" className="_307f224b" alt="unwined.svg"></img>
                                    <img src="./images/4rgex0ascb7yrgsa.svg" className="_307f224b" alt="pallace.svg"></img>
                                    <img src="./images/ucqelacyxyc68bvz.svg" className="_307f224b" alt="chiabele.svg"></img>
                                    <img src="./images/0dt47g3t2ffy7r28.svg" className="_307f224b" alt="lecoid.svg"></img>
                                    <img src="./images/133ugvf43x0psc82.svg" className="_307f224b" alt="lancelite.svg"></img>
                                    <img src="./images/2yrc335q2nikn4cc.svg" className="_307f224b" alt="hivebill.svg"></img>
                                    <img src="./images/2a8vrw51vy1lz6ab.svg" className="_307f224b" alt="frescon.svg"></img>
                                    <img src="./images/cftx5x40cssur9er.svg" className="_307f224b" alt="carassava.svg"></img>
                                </div>
                                <div className="_d673d676">
                                    <img src="./images/6ovw3a4z6o5mtfzb.svg" className="_307f224b" alt="palletfish.svg"></img>
                                    <img src="./images/crl58tr3aum5qqxt.svg" className="_307f224b" alt="m.c.p..svg"></img>
                                    <img src="./images/f2akjzux5n6kt1hq.svg" className="_307f224b" alt="epism.svg"></img>
                                    <img src="./images/0dt47g3t2ffy7r28.svg" className="_307f224b" alt="lecoid.svg"></img>
                                    <img src="./images/m94w5tqxbjg8vdoy.svg" className="_307f224b" alt="unwined.svg"></img>
                                    <img src="./images/4rgex0ascb7yrgsa.svg" className="_307f224b" alt="pallace.svg"></img>
                                    <img src="./images/ucqelacyxyc68bvz.svg" className="_307f224b" alt="chiabele.svg"></img>
                                    <img src="./images/0dt47g3t2ffy7r28.svg" className="_307f224b" alt="lecoid.svg"></img>
                                    <img src="./images/133ugvf43x0psc82.svg" className="_307f224b" alt="lancelite.svg"></img>
                                    <img src="./images/2yrc335q2nikn4cc.svg" className="_307f224b" alt="hivebill.svg"></img>
                                    <img src="./images/2a8vrw51vy1lz6ab.svg" className="_307f224b" alt="frescon.svg"></img>
                                    <img src="./images/cftx5x40cssur9er.svg" className="_307f224b" alt="carassava.svg"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
