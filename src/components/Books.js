// src/components/Books.js

import React, { useState } from 'react';
import '../assets/styles/App.css'; // Asegúrate de que esta ruta sea correcta

// Importa las imágenes
import automationDevOpsImg from '../assets/images/automationDevOps.jpg';
import awsCookbookImg from '../assets/images/awsCookbook.jpg';
import serverlessAWSImg from '../assets/images/serverlessAWS.png';
import scalableAppsImg from '../assets/images/scalableApps.jpg';
import terraformCookbookImg from '../assets/images/terraformCookbook.jpg';
import awsInActionImg from '../assets/images/awsInAction.png';

// Datos iniciales de los libros
const initialBooks = [
  {
    Title: "Automating DevOps with GitLab CI/CD Pipelines",
    Authors: "Christopher Cowell, Nicholas Lotz and Chris Timberlake",
    Publisher: "Packt Publishing",
    Year: 2023,
    image: automationDevOpsImg // Usa la imagen importada
  },
  {
    Title: "AWS Cookbook",
    Authors: "John Culkin and Mike Zazon",
    Publisher: "O'Reilly Media",
    Year: 2021,
    image: awsCookbookImg // Usa la imagen importada
  },
  {
    Title: "Serverless Development on AWS",
    Authors: "Sheen Brisals and Luke Hedger",
    Publisher: "O'Reilly Media",
    Year: 2024,
    image: serverlessAWSImg // Usa la imagen importada
  },
  {
    Title: "Building Scalable Apps with Redis and Node.js",
    Authors: "Joshua Johanan",
    Publisher: "Packt Publishing",
    Year: 2014,
    image: scalableAppsImg // Usa la imagen importada
  },
  {
    Title: "Terraform Cookbook",
    Authors: "Kerim Satirli and Taylor Dolezal",
    Publisher: "O'Reilly Media",
    Year: 2024,
    image: terraformCookbookImg // Usa la imagen importada
  },
  {
    Title: "Amazon Web Services in Action",
    Authors: "Michael Wittig and Andreas Wittig",
    Publisher: "Manning Publications",
    Year: 2023,
    image: awsInActionImg // Usa la imagen importada
  }
];

const Books = () => {
  const [books, setBooks] = useState(initialBooks);
  const [currentBook, setCurrentBook] = useState({ Title: '', Authors: '', Publisher: '', Year: '', image: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddOrUpdateBook = (event) => {
    event.preventDefault();
    if (isEditing) {
      setBooks(books.map(book =>
        book.Title === currentBook.Title ? currentBook : book
      ));
      setIsEditing(false);
    } else {
      setBooks([...books, { ...currentBook, image: currentBook.image || 'https://via.placeholder.com/100' }]);
    }
    setCurrentBook({ Title: '', Authors: '', Publisher: '', Year: '', image: '' });
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setIsEditing(true);
  };

  const handleDelete = (title) => {
    setBooks(books.filter(book => book.Title !== title));
  };

  return (
    <div>
      <h2>Books List</h2>
      <form onSubmit={handleAddOrUpdateBook}>
        <input
          type="text"
          placeholder="Title"
          value={currentBook.Title}
          onChange={(e) => setCurrentBook({ ...currentBook, Title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Authors"
          value={currentBook.Authors}
          onChange={(e) => setCurrentBook({ ...currentBook, Authors: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Publisher"
          value={currentBook.Publisher}
          onChange={(e) => setCurrentBook({ ...currentBook, Publisher: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={currentBook.Year}
          onChange={(e) => setCurrentBook({ ...currentBook, Year: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={currentBook.image}
          onChange={(e) => setCurrentBook({ ...currentBook, image: e.target.value })}
        />
        <button type="submit">{isEditing ? 'Update Book' : 'Add Book'}</button>
      </form>

      <div className="books-container">
        {books.map(book => (
          <div key={book.Title} className="book-item">
            {book.image && <img src={book.image} alt={book.Title} />}
            <h3>{book.Title}</h3>
            <p>by {book.Authors}</p>
            <p>Publisher: {book.Publisher}</p>
            <p>Year: {book.Year}</p>
            <button onClick={() => handleEdit(book)}>Edit</button>
            <button onClick={() => handleDelete(book.Title)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
