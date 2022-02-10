import { async } from "@firebase/util";
import { FormEvent, useEffect, useState } from "react";
import * as C from "./App.styles";
import PhotoItem from "./components/PhotoItem";
import * as PhotosService from "./services/photos";
import { Photo } from "./types/Photo";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getPhotos = async () => {
      console.log("parou em 1:02 https://www.youtube.com/watch?v=ss4BXa-WfgI");
      setLoading(true);
      setPhotos(await PhotosService.getAll());
      setLoading(false);
    };

    getPhotos();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await PhotosService.insert(file);
      setUploading(false);
      if(result instanceof Error){
        alert(`${result.name} - ${result.message}`);
      }else{
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  };

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Fotos</C.Header>
        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && "⌛️ Enviando ..."}
        </C.UploadForm>

        {loading && (
          <C.ScreenWarning>
            <div className="emoji">🖐</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        )}
        {!loading && photos.length > 0 && (
          <C.PhotoList>
            {photos.map((item, index) => (
              <PhotoItem key={index} photoItem={item} />
            ))}
          </C.PhotoList>
        )}

        {!loading && photos.length === 0 && (
          <C.ScreenWarning>
            <div className="emoji">😞</div>
            <div>Não há fotos cadastradas.</div>
          </C.ScreenWarning>
        )}
      </C.Area>
    </C.Container>
  );
};

export default App;
