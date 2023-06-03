import React from "react";
import appFirebase from "../credenciales";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase);

const Form = () => {
  let urlImg;

  const guardarInfo = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const precio = e.target.precio.value;

    const newComida = {
      nombre: nombre,
      precio: precio,
      imagen: urlImg,
    };

    //funcion de guardado
    try {
      await addDoc(collection(db, "comidas"), {
        ...newComida,
      });
    } catch (error) {
      console.log(error);
    }

    e.target.nombre.value = "";
    e.target.precio.value = "";
    e.target.file.value = "";
  };

  const fileHandler = async (e) => {
    //detectar el archivo
    const archivoImg = e.target.files[0];
    //cargar esto al storage
    const refArchivo = ref(storage, `documentos/${archivoImg.name}`);
    await uploadBytes(refArchivo, archivoImg);
    //obtener la url de la imagen
    urlImg = await getDownloadURL(refArchivo);
  };

  return (
    <div className="card card-body mt-2">
      <h3 className="text-center">Agregar comidas</h3>
      <form onSubmit={guardarInfo}>
        <label>Nombre: </label>
        <div className="form-group">
          <input
            type="text"
            placeholder="ingresar el nombre de la comida"
            id="nombre"
            className="form-control mt-1"
            required
          />
        </div>
        <label>Precio: </label>
        <div className="form-group">
          <input
            type="text"
            placeholder="ingresar el precio"
            id="precio"
            className="form-control mt-1"
            required
          />
        </div>
        <label>Agregar Imagen: </label>
        <input
          type="file"
          id="file"
          placeholder="agregar imagen"
          className="form-control"
          onChange={fileHandler}
        />

        <button className="btn btn-primary mt-3 form-control">Guardar</button>
      </form>
    </div>
  );
};

export default Form;
