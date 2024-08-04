// src/components/Books.js
import React, { useState } from 'react';
import BookForm from './forms/BookForm';
import '../assets/styles/App.css'; // Ensure the path is correct

// Import images
import automationDevOpsImg from '../assets/images/automationDevOps.jpg';
import awsCookbookImg from '../assets/images/awsCookbook.jpg';
import serverlessAWSImg from '../assets/images/serverlessAWS.png';
import scalableAppsImg from '../assets/images/scalableApps.jpg';
import terraformCookbookImg from '../assets/images/terraformCookbook.jpg';
import awsInActionImg from '../assets/images/awsInAction.png';

// Initial book data
const initialBooks = [
  {
    Title: "Automating DevOps with GitLab CI/CD Pipelines",
    Authors: "Christopher Cowell, Nicholas Lotz and Chris Timberlake",
    Publisher: "Packt Publishing",
    Year: 2023,
    image: automationDevOpsImg // Use imported image
  },
  {
    Title: "AWS Cookbook",
    Authors: "John Culkin and Mike Zazon",
    Publisher: "O'Reilly Media",
    Year: 2021,
    image: awsCookbookImg // Use imported image
  },
  {
    Title: "Serverless Development on AWS",
    Authors: "Sheen Brisals and Luke Hedger",
    Publisher: "O'Reilly Media",
    Year: 2024,
    image: serverlessAWSImg // Use imported image
  },
  {
    Title: "Building Scalable Apps with Redis and Node.js",
    Authors: "Joshua Johanan",
    Publisher: "Packt Publishing",
    Year: 2014,
    image: scalableAppsImg // Use imported image
  },
  {
    Title: "Terraform Cookbook",
    Authors: "Kerim Satirli and Taylor Dolezal",
    Publisher: "O'Reilly Media",
    Year: 2024,
    image: terraformCookbookImg // Use imported image
  },
  {
    Title: "Amazon Web Services in Action",
    Authors: "Michael Wittig and Andreas Wittig",
    Publisher: "Manning Publications",
    Year: 2023,
    image: awsInActionImg // Use imported image
  }
];

const Books = () => {
  const [books, setBooks] = useState(initialBooks);
  const [currentBook, setCurrentBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (book = null) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentBook(null);
    setIsModalOpen(false);
  };

  const handleFormSubmit = (book) => {
    if (currentBook) {
      // Update book
      setBooks(books.map(b => b.Title === currentBook.Title ? book : b));
    } else {
      // Add new book
      setBooks([...books, book]);
    }
    closeModal();
  };

  const handleDelete = (title) => {
    setBooks(books.filter(book => book.Title !== title));
  };

  return (
    <div>
      <h2>Books List</h2>
      <button onClick={() => openModal()}>Add Book</button>
      <div className="books-container">
        {books.map(book => (
          <div key={book.Title} className="book-item">
            {book.image && <img src={book.image} alt={book.Title} />}
            <h3>{book.Title}</h3>
            <p>by {book.Authors}</p>
            <p>Publisher: {book.Publisher}</p>
            <p>Year: {book.Year}</p>
            <div className="button-group">
              <button onClick={() => openModal(book)}>Edit</button>
              <button onClick={() => handleDelete(book.Title)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <BookForm
          book={currentBook}
          onSubmit={handleFormSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Books;
