import React, {useState} from 'react';

function Upload({setFile, url, setUrl}) {

    const [selectedFile, setSelectedFile] = useState({});

    const handleImageChange = (e) => {

        let reader = new FileReader();

        let file = e.target.files[0];

        setSelectedFile(e.target.files[0]);

        reader.onloadend = () => {

            setFile(file);

            setUrl(reader.result)

        }

        reader.readAsDataURL(file)

    }

    return (

        <div className="preview">

            <input className="fileInput"
                   type="file"
                   onChange={handleImageChange}/>

            <div className="preview__image">

                {url !== null ?

                    <>
                        <img src={url}
                             alt="preview__upload"/>
                        {selectedFile.name
                            ?
                            <div className="photo-upload__data">
                                <p><strong>Naam foto:</strong> <em>{selectedFile.name}</em></p>
                                <p><strong>Bestandstype:</strong> <em>{selectedFile.type}</em></p>
                                <p><strong>Grootte in bytes:</strong> <em>{selectedFile.size}</em>
                                </p>
                                <p>
                                    <strong>Datum van uploaden:</strong>
                                    <em>{selectedFile.lastModifiedDate
                                    && selectedFile.lastModifiedDate.toLocaleDateString()}</em>
                                </p>
                            </div>
                            :
                            <p>Selecteer eerst een foto</p>
                        }

                    </>

                    :

                    <div className="preview__text">
                        <p>Selecteer eerst een foto</p>
                    </div>

                }

            </div>

        </div>

    )

}

export default Upload;