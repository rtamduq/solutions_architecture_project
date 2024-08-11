// src/components/forms/BookForm.js
import React, { useState, useEffect } from 'react';
import './style.css';

const BookForm = ({ book, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (book) {
      setTitle(book.Title);
      setAuthors(book.Authors);
      setPublisher(book.Publisher);
      setYear(book.Year);
      setImageURL(book.ImageURL);
      setId(book.id);
    } else {
      setTitle('');
      setAuthors('');
      setPublisher('');
      setYear('');
      setImageURL('');
      setId(null);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: id || Date.now(), // Generate an ID if not provided
      Title: title,
      Authors: authors,
      Publisher: publisher,
      Year: year,
      ImageURL: imageURL || 'https://via.placeholder.com/100'
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
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
          <button type="submit">{book ? 'Update Book' : 'Add Book'}</button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
