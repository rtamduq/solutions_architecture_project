import React, { useState, useEffect, useContext } from 'react';
import BookForm from './forms/BookForm';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "./../Authentication/AuthContext"
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/App.css'; // Ensure the path is correct

const apiURL = 'https://ropcvmc5y3.execute-api.us-east-1.amazonaws.com/dev/books';

const Books = () => {
  const { user } = useContext(AuthContext)
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      const booksFromAPI = data.books.Items.map(book => ({
        ...book,
        image: book.ImageURL // Map API image URL to the expected image property
      }));
      setBooks(booksFromAPI);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Error fetching books.');
    }
  };

  const openModal = (book = null) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentBook(null);
    setIsModalOpen(false);
  };

  const updateBook = async (book) => {
    try {
      const updates = [
        { key: 'Title', value: book.Title },
        { key: 'Authors', value: book.Authors },
        { key: 'Publisher', value: book.Publisher },
        { key: 'YOP', value: book.YOP },  // Updated key
        { key: 'ImageURL', value: book.ImageURL },
      ];
  
      for (const { key, value } of updates) {
        const response = await fetch(apiURL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: book.id,
            updateKey: key,
            updateValue: value,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update ${key}.`);
        }
      }

      const updatedBooks = books.map(b => 
        b.id === book.id ? { ...b, image: book.ImageURL } : b
      );
      setBooks(updatedBooks);
      toast.success('Book updated successfully.');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Error updating book.');
    }
  };


  const handleFormSubmit = async (book) => {
    try {
      if (currentBook) {
        await updateBook(book);
      } else {
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: new Date().getTime(), // You might want to change this to a more reliable id
            Authors: book.Authors,
            Publisher: book.Publisher,
            Title: book.Title,
            YOP: book.YOP,  // Updated key
            ImageURL: book.ImageURL,
          }),
        });

        if (response.ok) {
          const newBook = { ...book, image: book.ImageURL };
          setBooks([...books, newBook]);
          toast.success('Book added successfully.');
        } else {
          throw new Error('Failed to add book.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error: ${error.message}`);
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(apiURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setBooks(books.filter(book => book.id !== id));
        toast.success('Book deleted successfully.');
      } else {
        throw new Error('Failed to delete book.');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Error deleting book.');
    }
  };

  return (
    <div>
      <h2>Books List</h2>
      <h4 style={{color: "#fefefe"}}>Welcome user - {user?.email}</h4>
      <h4 style={{color: "#fefefe"}}>UserId - {user?.username}</h4>
      <button onClick={() => openModal()}>Add Book</button>
      <div className="books-container">
        {books.map(book => (
          <div key={book.id} className="book-item">
            {book.image && <img src={book.image} alt={book.Title} />}
            <h3>{book.Title}</h3>
            <p>by {book.Authors}</p>
            <p>Publisher: {book.Publisher}</p>
            <p>Year: {book.YOP}</p>  {/* Updated key */}
            <div className="button-group">
              <button onClick={() => openModal(book)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
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
      <ToastContainer />
    </div>
  );
};

export default Books;
