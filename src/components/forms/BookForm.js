import React, { useState, useEffect } from 'react';
import './style.css';

const BookForm = ({ book, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.Title);
      setAuthors(book.Authors);
      setPublisher(book.Publisher);
      setYear(book.Year);
      setImage(book.image);
    } else {
      setTitle('');
      setAuthors('');
      setPublisher('');
      setYear('');
      setImage('');
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      Title: title,
      Authors: authors,
      Publisher: publisher,
      Year: year,
      image: image || 'https://via.placeholder.com/100'
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-header">{book ? 'Edit Book' : 'Add Book'}</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button type="submit">{book ? 'Update Book' : 'Add Book'}</button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
