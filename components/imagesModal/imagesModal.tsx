'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { getImages } from '@/requests/unsplash';
import { Result } from '@/types/unsplash';

type ImagesModalProps = {
  query: string;
  onSelect: (image: string) => void;
};

const ImagesModal = ({ query, onSelect }: ImagesModalProps) => {
  const [images, setImages] = useState<Result[]>([]);
  const [imageSearch, setImageSearch] = useState(query);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

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

  return (
    <div className="flex mb-8">
      <label
        htmlFor="my_modal_7"
        className="btn btn-secondary btn-square btn-lg relative rounded-box w-56 h-56 mx-auto"
      >
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="selected image"
            fill
            className="object-cover w-full aspect-square rounded-box"
            quality={100}
          />
        ) : (
          <PhotoIcon className="w-24 h-24" />
        )}
      </label>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box min-w-[80%] bg-secondary h-4/5 flex flex-col items-center">
          <h3 className="font-bold text-lg mb-2">Select an image</h3>
          <input
            value={imageSearch}
            onChange={onSearch}
            className="input bg-background text-white placeholder:text-white w-full focus:outline-0 text-lg font-light"
          />
          {isLoading && images.length > 0 ? (
            <span className="loading loading-spinner loading-lg mx-auto h-full" />
          ) : (
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
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          {' '}
        </label>
      </div>
    </div>
  );
};

export default ImagesModal;
