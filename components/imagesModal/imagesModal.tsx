'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Image from 'next/image';
import {
  PhotoIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { getImages } from '@/requests/unsplash';
import { Result } from '@/types/unsplash';
import { createClient } from '@/utils/supabase/client';

type ImagesModalProps = {
  query: string;
  onSelect: (image: string) => void;
};

const ImagesModal = ({ query, onSelect }: ImagesModalProps) => {
  const [images, setImages] = useState<Result[]>([]);
  const [imageSearch, setImageSearch] = useState(query);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // const [uploadError, setUploadError] = useState('');

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (query) fetchImages(query);
  }, []);

  const fetchImages = async (search: string) => {
    const data = await getImages(search, 1);
    setImages(data.results);
    setIsLoading(false);
  };

  const onSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0) {
      setIsLoading(true);
      fetchImages(event.target.value);
      setImageSearch(event.target.value);
    }
  };

  const onFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files) {
        const file = event.target.files[0];
        const supabase = createClient();
        const { data, error } = await supabase.storage
          .from('meals')
          .upload(file.name, file);
        if (error) throw error;
        if (data) {
          onSelect(data.path);
          setSelectedImage(URL.createObjectURL(file));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mb-8">
      {!selectedImage ? (
        <div className="w-full flex justify-center gap-16">
          <button
            type="button"
            className="btn btn-secondary btn-square btn-lg relative rounded-box p-16 w-fit h-fit"
            onClick={open}
          >
            {' '}
            <MagnifyingGlassIcon className="w-24 h-24" />
          </button>
          <label
            htmlFor="fileInput"
            className="btn btn-secondary btn-square btn-lg relative rounded-box p-16 w-fit h-fit"
          >
            {' '}
            <PhotoIcon className="w-24 h-24" />
          </label>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={onFileUpload}
          />
        </div>
      ) : (
        <div className="border border-transparent relative aspect-square mx-auto w-56 h-56">
          <Image
            src={selectedImage}
            alt="selected image"
            fill
            className="object-cover aspect-square rounded-box "
            quality={100}
          />
          <button
            type="button"
            onClick={() => {
              setSelectedImage('');
            }}
            className="opacity-0 hover:opacity-100 absolute w-full h-full z-20"
          >
            {' '}
            <XMarkIcon className="w-16 h-16 mx-auto" />
          </button>
        </div>
      )}
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-opacity-45 bg-black">
          <div className="flex items-center h-full p-4">
            <DialogPanel className="modal-box bg-secondary max-w-none w-full h-4/5 flex flex-col items-center">
              <DialogTitle
                as="h3"
                className="text-xl mb-4 font-medium text-white"
              >
                Select an image
              </DialogTitle>
              <input
                value={imageSearch}
                onChange={onSearch}
                className="input bg-background text-white placeholder:text-white w-full focus:outline-0 text-lg font-light"
                placeholder="E.g. Chicken breast"
              />
              {isLoading && images.length > 0 && (
                <span className="loading loading-spinner loading-lg mx-auto h-full" />
              )}
              {images.length > 0 && !isLoading && (
                <div className="grid grid-cols-5 gap-4 h-full mt-4">
                  {images.map((image) => {
                    return (
                      <button
                        className="relative h-full aspect-square"
                        type="button"
                        onClick={() => {
                          onSelect(image.urls.full);
                          setSelectedImage(image.urls.full);
                        }}
                      >
                        <label className="modal-backdrop" htmlFor="my_modal_7">
                          {' '}
                          <Image
                            src={image.urls.small}
                            alt={image.alt_description}
                            fill
                            className="object-cover rounded-box cursor-pointer"
                            quality={100}
                          />
                        </label>
                      </button>
                    );
                  })}
                </div>
              )}
              {images.length === 0 && (
                <div className="my-auto flex flex-col">
                  <span className="text-lg mb-4">
                    Search for an image or upload one
                  </span>
                </div>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ImagesModal;
