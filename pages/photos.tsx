import {
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { storage } from "../data/firebase";

const Photos = () => {
  const [downloadUrls, setDownloadUrls] = useState<string[]>([]);

  const [imagesToUpload, setImagesToUpload] = useState<FileList | []>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    fetchDownloadUrls();
  }, []);

  useEffect(() => {
    if (imagesToUpload.length < 1) return;
    const newImageUrls = [];
    for (let i = 0; i < imagesToUpload.length; i++) {
      newImageUrls.push(URL.createObjectURL(imagesToUpload[i]));
    }
    setPreviewUrls(newImageUrls);
  }, [imagesToUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImagesToUpload(e.target.files);
    }
  };

  const fetchDownloadUrls = async () => {
    const storageRef = ref(storage, `photos`);
    const { items }: { items: StorageReference[] } = await listAll(storageRef);
    setDownloadUrls(
      await Promise.all(
        items.map((r) => {
          return getDownloadURL(r);
        })
      )
    );
  };

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (imagesToUpload.length < 1) return;
    for (let i = 0; i < imagesToUpload.length; i++) {
      uploadPhoto(imagesToUpload[i]);
    }
  };

  const uploadPhoto = (file: File) => {
    const storageRef = ref(storage, `photos/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      setImagesToUpload([]);
      setPreviewUrls([]);
      fetchDownloadUrls();
    });
  };

  const renderPhotos = (photoUrls: string[]) => {
    return photoUrls.map((url) => (
      <div className="photo-frame">
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="left top"
          src={url}
        />
      </div>
    ));
  };

  return (
    <Layout>
      <Head>
        <title>{"Byron's Photos"}</title>
      </Head>
      <div className="grid">
        {downloadUrls.length > 0 ? renderPhotos(downloadUrls) : "No photos"}
      </div>
      <div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <div>
          Photo Previews
          {renderPhotos(previewUrls)}
        </div>
        <button onClick={handleClick}>Upload Photos</button>
      </div>
    </Layout>
  );
};

export default Photos;
