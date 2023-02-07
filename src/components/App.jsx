/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMore from './Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
};

export default function App() {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    setStatus(Status.PENDING);

    fetch(
      `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=32602486-88d6814d0d09c23868840d0fe&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        setImages([...images, ...data.hits]);
        setStatus(Status.RESOLVED);
      });
  }, [page, searchValue]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleFormSubmit = data => {
    setImages([]);
    setPage(1);
    setSearchValue(data);
  };

  if (status === Status.IDLE) {
    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
      </Container>
    );
  }

  if (status === Status.PENDING) {
    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        <Loader />
      </Container>
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} />
        {images.length !== 0 && <LoadMore onClick={handleLoadMore}></LoadMore>}
      </Container>
    );
  }
}
