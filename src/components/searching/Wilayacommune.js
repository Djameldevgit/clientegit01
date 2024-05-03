import React from 'react'
import communesjson from "../json/communes.json";
const Wilayacommune = ({selectedWilaya,setSelectedWilaya,selectedCommune,setSelectedCommune}) => {

    const handleWilayaChange = (event) => {
        const selectedWilaya = event.target.value;
        setSelectedWilaya(selectedWilaya);

        const wilayaEncontrada = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya);
        const communes = wilayaEncontrada && wilayaEncontrada.commune ? wilayaEncontrada.commune : [];

        if (communes.length > 0) {
            setSelectedCommune(communes[0]);
        } else {
            setSelectedCommune('');
        }
    };
    const handleCommuneChange = (event) => {
        setSelectedCommune(event.target.value);
    };

    const wilayasOptions = communesjson.map((wilaya, index) => (
        <option key={index} value={wilaya.wilaya}>
            {wilaya.wilaya}
        </option>
    ));

    const communesOptions = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya)?.commune?.map((commune, index) => (
        <option key={index} value={commune}>
            {commune}
        </option>
    ));

    return (


        <div>
            <div>
                <select className="form-control" name="wilaya" value={selectedWilaya} onChange={handleWilayaChange}>
                    <option value="">Wilaya</option>
                    {wilayasOptions}
                </select>
            </div>




            <div>
                <select className="form-control" name="commune" value={selectedCommune} onChange={handleCommuneChange}>
                    <option value="">Commune</option>
                    {communesOptions}
                </select>
            </div>
        </div>



    )
}

export default Wilayacommune
