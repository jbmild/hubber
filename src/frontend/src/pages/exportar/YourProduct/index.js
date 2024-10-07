import React, { useState } from 'react';
import imagen from './imagen.jpg';

const CodigoArancelario = () => {
  const [showForm, setShowForm] = useState(false);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [codigoArancelario, setCodigoArancelario] = useState(null);
  const [arancelInfo, setArancelInfo] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // Para manejar los pasos en vinos

  const products = [
    { name: 'Alfajores', code: 'alfajores' },
    { name: 'Vinos', code: 'vinos' },
    { name: 'Miel', code: 'miel' },
  ];

  const productForms = {
    alfajores: [
      { name: 'hasFilling', label: '¿Tu alfajor tiene relleno?' },
      { name: 'isWheatFlourOnly', label: '¿Tu alfajor está elaborado exclusivamente con harina de trigo?' }
    ],
    // El cuestionario de vinos se maneja por pasos, no se define aquí
    vinos: [],
    miel: [
      { name: 'isEnvased25', label: '¿El contenido neto del envase es menor o igual a 2,5 kg?' },
      { name: 'isGranel', label: '¿Es miel a granel?' }
    ],
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setShowProductPopup(true);
    } else {
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setFormData({});
    setCodigoArancelario(null);
    setArancelInfo(null);
    setCurrentStep(1); // Resetear el paso al cerrar el formulario
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setFormData({});
    setCodigoArancelario(null);
    setArancelInfo(null);
    setShowProductPopup(false);
    setCurrentStep(1); // Iniciar en el paso 1 para vinos
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (selectedProduct === 'vinos') {
      if (currentStep === 1 && formData.isSparkling === 'si') {
        // Vino espumoso, calcular código inmediatamente
        calculateCodigoArancelario();
        setCurrentStep(currentStep + 1); // Avanzar para mostrar resultados
      } else if (currentStep === 3 && formData.isMistela === 'no') {
        // Si no es mistela, avanzar al paso 4 para preguntar si es varietal
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const calculateCodigoArancelario = () => {
    let codigo, info;

    if (selectedProduct === 'vinos') {
      // Lógica para vinos basada en los pasos
      const { isSparkling, containerType, isMistela, isVarietal } = formData;

      if (isSparkling === 'si') {
        codigo = '2204.10';
      } else {
        if (containerType === 'menor_igual_2') {
          if (isMistela === 'si') {
            codigo = '2204.21.00.100';
          } else if (isVarietal === 'si') {
            codigo = '2204.21.00.200';
          } else {
            codigo = '2204.21.00.900';
          }
        } else if (containerType === '2_a_10') {
          if (isVarietal === 'si') {
            codigo = '2204.22.11.100';
          } else {
            codigo = '2204.22.11.900';
          }
        } else if (containerType === 'mayor_10') {
          if (isVarietal === 'si') {
            codigo = '2204.29.10.100';
          } else {
            codigo = '2204.29.10.900';
          }
        } else {
          codigo = 'N/A';
        }
      }

      // Información arancelaria ficticia para vinos
      info = {
        arancelComun: '20%',
        derechoExportacion: '0%',
        reintegroFueraMercosur: '7%',
        reintegroDentroMercosur: '7%',
      };
    } else {
      // Lógica existente para otros productos
      switch (selectedProduct) {
        case 'alfajores':
          codigo = formData.hasFilling === 'si' ? '1905.90.90.490B' : '1905.90.90.490A';
          info = {
            arancelComun: '18%',
            derechoExportacion: '4,5%',
            reintegroFueraMercosur: '1,25%',
            reintegroDentroMercosur: '1,25%',
          };
          break;
        case 'miel':
          codigo = formData.isEnvased25 === 'si' ? '0409.00.001' : (formData.isGranel === 'si' ? '0409.00.0091' : '0409.00.009');
          info = {
            arancelComun: '10%',
            derechoExportacion: '0%',
            reintegroFueraMercosur: '5%',
            reintegroDentroMercosur: '5%',
          };
          break;
        default:
          codigo = 'N/A';
          info = {
            arancelComun: 'N/A',
            derechoExportacion: 'N/A',
            reintegroFueraMercosur: 'N/A',
            reintegroDentroMercosur: 'N/A',
          };
      }
    }

    setCodigoArancelario(codigo);
    setArancelInfo(info);
  };

  const renderVinosForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={styles.formContainer}>
            <h2>Cuestionario para Determinar el Código Arancelario del Vino</h2>
            <label style={styles.label}>
              ¿Tu vino es espumoso?
              <select
                name="isSparkling"
                onChange={handleInputChange}
                style={styles.select}
                value={formData.isSparkling || ''}
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </label>
            <button
              style={styles.button}
              onClick={handleNextStep}
              disabled={!formData.isSparkling}
            >
              Siguiente
            </button>
          </div>
        );
      case 2:
        if (formData.isSparkling === 'si') {
          // Vino espumoso, ya se determinó el código
          return (
            <div style={styles.formContainer}>
              <p style={styles.text}>
                El código arancelario para tu vino espumoso es <strong>2204.10</strong>.
              </p>
              <button
                style={styles.button}
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Finalizar
              </button>
            </div>
          );
        }
        return (
          <div style={styles.formContainer}>
            <label style={styles.label}>
              ¿En qué tipo de envase se encuentra tu vino?
              <select
                name="containerType"
                onChange={handleInputChange}
                style={styles.select}
                value={formData.containerType || ''}
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="menor_igual_2">Menor o igual a 2 litros</option>
                <option value="2_a_10">Superior a 2 litros pero menor o igual a 10 litros</option>
                <option value="mayor_10">Superior a 10 litros</option>
              </select>
            </label>
            <button
              style={styles.button}
              onClick={handleNextStep}
              disabled={!formData.containerType}
            >
              Siguiente
            </button>
          </div>
        );
      case 3:
        if (formData.containerType === 'menor_igual_2') {
          return (
            <div style={styles.formContainer}>
              <label style={styles.label}>
                ¿Es una mistela?
                <select
                  name="isMistela"
                  onChange={handleInputChange}
                  style={styles.select}
                  value={formData.isMistela || ''}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </label>
              <button
                style={styles.button}
                onClick={handleNextStep}
                disabled={!formData.isMistela}
              >
                Siguiente
              </button>
            </div>
          );
        } else {
          // Para envases de 2 a 10 litros y mayor a 10 litros
          return (
            <div style={styles.formContainer}>
              <label style={styles.label}>
                ¿Es un vino varietal o de calidad preferente?
                <select
                  name="isVarietal"
                  onChange={handleInputChange}
                  style={styles.select}
                  value={formData.isVarietal || ''}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </label>
              <button
                style={styles.button}
                onClick={() => {
                  calculateCodigoArancelario();
                  setCurrentStep(currentStep + 1);
                }}
                disabled={!formData.isVarietal}
              >
                Calcular Código Arancelario
              </button>
            </div>
          );
        }
      case 4:
        if (formData.containerType === 'menor_igual_2' && formData.isMistela === 'no') {
          return (
            <div style={styles.formContainer}>
              <label style={styles.label}>
                ¿Es un vino varietal o de calidad preferente?
                <select
                  name="isVarietal"
                  onChange={handleInputChange}
                  style={styles.select}
                  value={formData.isVarietal || ''}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </label>
              <button
                style={styles.button}
                onClick={() => {
                  calculateCodigoArancelario();
                  setCurrentStep(currentStep + 1);
                }}
                disabled={!formData.isVarietal}
              >
                Calcular Código Arancelario
              </button>
            </div>
          );
        }
        return null; // Otros casos ya han calculado el código
      default:
        return null;
    }
  };

  const renderProductForm = () => {
    if (!selectedProduct) return null;

    if (selectedProduct === 'vinos') {
      return renderVinosForm();
    }

    return (
      <div style={styles.formContainer}>
        <h2>Preguntas para determinar el Código Arancelario de {products.find(p => p.code === selectedProduct).name}</h2>
        {productForms[selectedProduct].map((field) => (
          <label key={field.name} style={styles.label}>
            {field.label}
            <select
              name={field.name}
              onChange={handleInputChange}
              style={styles.select}
              value={formData[field.name] || ''}
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </label>
        ))}
        <button style={styles.button} onClick={calculateCodigoArancelario}>
          Calcular Código Arancelario
        </button>
      </div>
    );
  };

  const renderRecommendations = () => {
    if (!selectedProduct || !codigoArancelario) return null; // Mostrar recomendaciones solo si se ha calculado el código

    const recommendations = {
      alfajores: "Para exportar alfajores, es crucial contar con un empaque resistente que proteja el producto durante el transporte internacional. Considera incluir información sobre la historia y tradición de los alfajores en Argentina en el empaque o en material promocional adjunto. Asegúrate de cumplir con las regulaciones de etiquetado del país de destino, incluyendo la lista de ingredientes en el idioma local si es necesario. Para mercados no familiarizados con los alfajores, podrías incluir sugerencias de consumo o maridaje.",
      miel: "Para exportar miel, es fundamental garantizar que el producto cumpla con las normativas fitosanitarias del país de destino. Utiliza envases herméticos y resistentes para preservar la calidad y evitar derrames durante el transporte. Considera obtener certificaciones orgánicas o de origen que puedan agregar valor a tu producto en mercados internacionales. Incluye etiquetas claras con la lista de ingredientes y las indicaciones de uso en el idioma local si es necesario. Promociona las propiedades naturales y beneficios para la salud de la miel en tu material de marketing.",
      vinos: "Al exportar vinos, es crucial cumplir con las regulaciones de etiquetado de bebidas alcohólicas del país de destino, incluyendo advertencias de salud y contenido alcohólico. Considera participar en ferias y concursos internacionales de vinos para ganar reconocimiento y promocionar tu producto. Proporciona información detallada sobre la región vinícola, las variedades de uva utilizadas y el proceso de vinificación. Incluye notas de cata y sugerencias de maridaje en el etiquetado o en material promocional adjunto. Para vinos premium, considera opciones de empaque especiales que realcen la presentación del producto."
    };
    return (
      <div style={styles.recommendations}>
        <h2>Recomendaciones para Exportar {products.find(p => p.code === selectedProduct).name}</h2>
        <p style={styles.text}>{recommendations[selectedProduct]}</p>
      </div>
    );
  };

  const renderProductPopup = () => {
    if (!showProductPopup) return null;
    return (
      <div style={styles.popup}>
        <div style={styles.popupContent}>
          <h2>Selecciona tu producto:</h2>
          <div>
            {products.map((product) => (
              <button 
                key={product.code}
                style={styles.productButton}
                onClick={() => handleProductSelect(product.code)}
              >
                {product.name}
              </button>
            ))}
			<p><em>¿Tu producto no aparece en esta lista? </em> <a href="http://localhost:3000/clasificarProductos"> Clasifica tu producto aquí</a></p>
          </div>
          <button style={styles.closeButton} onClick={() => setShowProductPopup(false)}>
            Cerrar
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Código Arancelario para Productos Regionales</h1>
      <p style={styles.text}>
        Un código arancelario es un número que se utiliza para clasificar
        productos en el comercio internacional. Este código se utiliza para
        determinar los aranceles, impuestos y restricciones que se aplican a un
        producto específico cuando es importado o exportado.
      </p>
      <div style={styles.introduction}>
        <ul style={styles.list}>
          <li>Determina los aranceles e impuestos aplicables a un producto en su importación o exportación.</li>
          <li>Facilita la recopilación de estadísticas comerciales a nivel mundial.</li>
          <li>Ayuda a identificar restricciones o regulaciones específicas aplicables a ciertos productos.</li>
          <li>Permite una comunicación clara entre aduanas, exportadores e importadores sobre la naturaleza de los productos.</li>
          <li>Es esencial para completar correctamente la documentación aduanera y de exportación.</li>
        </ul>
        <img 
          src={imagen} 
          alt="Banner sobre logística internacional" 
          style={{ 
            width: '100%', 
            height: '60%', 
            marginTop: '20px', 
            display: 'block', 
            marginLeft: 'auto', 
            marginRight: 'auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Sombra suave
          }} 
        />
        <p style={styles.text}>
          El código arancelario suele constar de 6 a 10 dígitos, donde los primeros 6 son estándar internacionalmente, y los siguientes pueden variar según las especificaciones de cada país o región comercial.
        </p>
      </div>
      <button style={styles.button} onClick={handleFormToggle}>
        {showForm ? 'Ocultar Formulario' : 'Encuentra el Código de tu Producto'}
      </button>

      {showForm && (
        <div>
          {renderProductForm()}
          {codigoArancelario && (
            <div style={styles.result}>
              <p style={styles.codigo}>
                <strong>Código Arancelario:</strong> {codigoArancelario}
              </p>
              <p style={styles.arancelSmall}>
                <strong>Arancel Externo Común:</strong> {arancelInfo.arancelComun}
              </p>
              <p style={styles.arancelSmall}>
                <strong>Derecho de Exportación:</strong> {arancelInfo.derechoExportacion}
              </p>
              <p style={styles.arancelSmall}>
                <strong>Reintegro fuera del Mercosur:</strong> {arancelInfo.reintegroFueraMercosur}
              </p>
              <p style={styles.arancelSmall}>
                <strong>Reintegro dentro del Mercosur:</strong> {arancelInfo.reintegroDentroMercosur}
              </p>
              <p style={styles.arancelSmall}>
                Los porcentajes de retenciones y reintegros se aplican al valor FOB (Free On Board) de la mercancía exportada. El valor FOB representa el valor de la mercancía en el puerto de embarque, excluyendo los costos de transporte y seguros después del puerto.
              </p>
            </div>
          )}
          {renderRecommendations()}
        </div>
      )}
      {renderProductPopup()}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    position: 'relative', // Asegura que los elementos hijos posicionados se basen en este contenedor
    zIndex: 1, // Define una capa base
  },
  title: {
    fontSize: '2em',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.1em',
    lineHeight: '1.6',
    marginBottom: '15px',
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    fontSize: '1em',
    cursor: 'pointer',
    marginTop: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  formContainer: {
    marginTop: '30px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  select: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  result: {
    fontSize: '1.1em',
    marginTop: '20px',
  },
  codigo: {
    color: '#27ae60',
    fontSize: '1.3em',
    marginBottom: '10px',
  },
  arancelSmall: {
    color: '#2980b9',
    fontSize: '0.9em',
    marginBottom: '5px',
  },
  recommendations: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
  },
  popup: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Asegura que el popup esté por encima de otros elementos, incluido el footer
  },
  popupContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '90%', // Asegura que el contenido sea responsivo
    margin: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  productButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '1.1em',
    color: '#fff',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1em',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  },
  introduction: {
    marginBottom: '30px',
  },
  list: {
    listStyleType: 'disc',
    marginLeft: '20px',
  },
};

export default CodigoArancelario;
