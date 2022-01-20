import { listAll, ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { storage } from "../data/firebase";

const Photos = () => {
  const [imagesDownloaded, setImagesDownloaded] = useState<FileList | []>([]);
  const [imagesToUpload, setImagesToUpload] = useState<FileList | []>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const storageRef = ref(storage, `photos`);
    listAll(storageRef).then((res) => {
      console.log(res.items);
    });
  }, []);

  useEffect(() => {
    if (imagesToUpload.length < 1) return;
    const newImageUrls = [];
    for (let i = 0; i < imagesToUpload.length; i++) {
      newImageUrls.push(URL.createObjectURL(imagesToUpload[i]));
    }
    setImageUrls(newImageUrls);
  }, [imagesToUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImagesToUpload(e.target.files);
    }
  };

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //get the blob from fs component
    if (imagesToUpload.length < 1) return;
    for (let i = 0; i < imagesToUpload.length; i++) {
      uploadPhoto(imagesToUpload[i]);
    }
  };

  const uploadPhoto = (file: File) => {
    const storageRef = ref(storage, `photos/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      setImagesToUpload([]);
      setImageUrls([]);
    });
  };

  const renderPhotoPreviews = () => {
    return imageUrls.map((url) => <img key={url} src={url} />);
  };

  return (
    <Layout>
      <Head>
        <title>{"Byron's Photos"}</title>
      </Head>
      <div>{"I'm gonna upload some photos here later"}.</div>
      <div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        {renderPhotoPreviews()}
        <button onClick={handleClick}>Upload Photos</button>
      </div>
    </Layout>
  );
};

export default Photos;
