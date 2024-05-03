 
import automobilesjson from "../json/automobiles.json";

const Marcamodelo = ({
  selectedMarca,
  setSelectedMarca,
  selectedModelo,
  setSelectedModelo,
}) => {
  

 
  const handleMarcaChange = (event) => {
    const selectedMarca = event.target.value;
    setSelectedMarca(selectedMarca);

    const marcaEncontrada = automobilesjson.find((marca) => marca.marca === selectedMarca);
    const modelos = marcaEncontrada && marcaEncontrada.modelo ? marcaEncontrada.modelo : [];

    if (modelos.length > 0) {
      setSelectedModelo(modelos[0]);
    } else {
      setSelectedModelo('');
    }
  };
  const handleModeloChange = (event) => {
    setSelectedModelo(event.target.value);
  };


  const marcasOptions = automobilesjson.map((marca, index) => (
    <option key={index} value={marca.marca}>
      {marca.marca}
    </option>
  ));

  const modelosOptions = automobilesjson.find((marca) => marca.marca === selectedMarca)?.modelo?.map((modelo, index) => (
    <option key={index} value={modelo}>
      {modelo}
    </option>
  ));
 

  return (
     <div>
        
        <div>
          <select className="form-control" name="marca" value={selectedMarca} onChange={handleMarcaChange}>
            <option value=""> Marque</option>
            {marcasOptions}
          </select>
        </div>
      

      
         
        <div>
          <select className="form-control" name="modelo" value={selectedModelo} onChange={handleModeloChange}>
            <option value="">Model</option>
            {modelosOptions}
          </select>
        </div>
      </div>
  
  );
};

export default Marcamodelo;

 