import React, { useState } from 'react';
import imagen from './imagen.jpg';

const CodigoArancelario = () => {
  const [showForm, setShowForm] = useState(false);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [codigoArancelario, setCodigoArancelario] = useState(null);
  const [arancelInfo, setArancelInfo] = useState(null);

  const products = [
    { name: 'Alfajores', code: 'alfajores' },
    { name: 'Mate', code: 'mate' },
    { name: 'Aceite de oliva', code: 'aceite' },
    { name: 'Vinos', code: 'vinos' }
  ];

  const productForms = {
    alfajores: [
      { name: 'hasFilling', label: '¿Tu alfajor tiene relleno?' },
      { name: 'isWheatFlourOnly', label: '¿Tu alfajor está elaborado exclusivamente con harina de trigo?' }
    ],
    mate: [
      { name: 'isFlavored', label: '¿Es mate saborizado?' },
      { name: 'isOrganic', label: '¿Es mate orgánico?' }
    ],
    aceite: [
      { name: 'isExtraVirgin', label: '¿Es aceite de oliva extra virgen?' },
      { name: 'isFlavored', label: '¿Es aceite de oliva saborizado?' }
    ],
    vinos: [
      { name: 'type', label: '¿Qué tipo de vino es?', options: ['Tinto', 'Blanco', 'Rosado'] },
      { name: 'isOrganic', label: '¿Es vino orgánico?' }
    ]
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
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setFormData({});
    setShowProductPopup(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateCodigoArancelario = () => {
    // Simulated calculation based on product and form data
    let codigo, info;
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
      case 'mate':
        codigo = formData.isFlavored === 'si' ? '0903.00.90.000B' : '0903.00.10.000N';
        info = {
          arancelComun: '10%',
          derechoExportacion: '5%',
          reintegroFueraMercosur: '2,5%',
          reintegroDentroMercosur: '2%',
        };
        break;
      case 'aceite':
        codigo = formData.isExtraVirgin === 'si' ? '1509.10.00.100P' : '1509.90.10.100V';
        info = {
          arancelComun: '12%',
          derechoExportacion: '3%',
          reintegroFueraMercosur: '3,5%',
          reintegroDentroMercosur: '3%',
        };
        break;
      case 'vinos':
        codigo = '2204.21.00.200W';
        info = {
          arancelComun: '20%',
          derechoExportacion: '2,5%',
          reintegroFueraMercosur: '4%',
          reintegroDentroMercosur: '3,5%',
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
    setCodigoArancelario(codigo);
    setArancelInfo(info);
  };

  const renderProductForm = () => {
    if (!selectedProduct) return null;
    return (
      <div style={styles.formContainer}>
        <h2>Preguntas para determinar el Código Arancelario de {products.find(p => p.code === selectedProduct).name}</h2>
        {productForms[selectedProduct].map((field) => (
          <label key={field.name}>
            {field.label}
            {field.options ? (
              <select
                name={field.name}
                onChange={handleInputChange}
                style={styles.select}
                value={formData[field.name] || ''}
              >
                <option value="" disabled>Selecciona una opción</option>
                {field.options.map(option => (
                  <option key={option} value={option.toLowerCase()}>{option}</option>
                ))}
              </select>
            ) : (
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
            )}
          </label>
        ))}
        <button style={styles.button} onClick={calculateCodigoArancelario}>
          Calcular Código Arancelario
        </button>
      </div>
    );
  };

  const renderRecommendations = () => {
    if (!selectedProduct) return null;
    const recommendations = {
      alfajores: "Para exportar alfajores, es crucial contar con un empaque resistente que proteja el producto durante el transporte internacional. Considera incluir información sobre la historia y tradición de los alfajores en Argentina en el empaque o en material promocional adjunto. Asegúrate de cumplir con las regulaciones de etiquetado del país de destino, incluyendo la lista de ingredientes en el idioma local si es necesario. Para mercados no familiarizados con los alfajores, podrías incluir sugerencias de consumo o maridaje.",
      mate: "Al exportar mate, es fundamental verificar las regulaciones fitosanitarias del país de destino, ya que algunos países tienen restricciones específicas para productos herbales. Incluye instrucciones detalladas de preparación y consumo, especialmente para mercados no familiarizados con la bebida. Considera ofrecer kits de iniciación que incluyan yerba mate, bombilla y mate (recipiente) para facilitar la adopción en nuevos mercados. Resalta los beneficios para la salud y las propiedades energizantes naturales del mate en tu material promocional.",
      aceite: "Para la exportación de aceite de oliva, utiliza botellas oscuras o envasados que protejan el producto de la luz para mantener su calidad. Considera obtener certificaciones de calidad internacional, como la denominación de origen, que pueden agregar valor a tu producto. Proporciona información sobre la región de producción y los métodos de cosecha y prensado. Incluye sugerencias de uso culinario y resalta los beneficios para la salud del aceite de oliva en el etiquetado o material promocional. Asegúrate de cumplir con las regulaciones de etiquetado específicas para aceites comestibles en el país de destino.",
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
          </div>
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
  },
  popupContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '500px',
	    margin: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
  
  introduction: {
    marginBottom: '30px',
  },
  list: {
    listStyleType: 'disc',
    marginLeft: '20px',
  },
};

export default CodigoArancelario;
