const BookCatalog = (function () {
  // Private variables - not accessible from the outside
  let books = [];
  let nextId = 1;

  // Private helper functions
  function generateUniqueId() {
    return `book_${nextId++}`;
  }

  function validateBook(book) {
    if (!book || typeof book !== "object") {
      throw new Error("The book must be an object.");
    }

    if (
      !book.title ||
      typeof book.title !== "string" ||
      book.title.trim() === ""
    ) {
      throw new Error(
        "Book title is required and must not be an empty string.",
      );
    }

    if (
      !book.author ||
      typeof book.author !== "string" ||
      book.author.trim() === ""
    ) {
      throw new Error(
        "Book author is required and must not be an empty string.",
      );
    }

    if (book.year && (typeof book.year !== "number" || book.year < 0)) {
      throw new Error("The year of publication must be a positive number.");
    }

    if (book.year && book.year > new Date().getFullYear()) {
      throw new Error("The publication year cannot be in the future.");
    }

    return true;
  }

  function findBookIndexById(id) {
    return books.findIndex((book) => book.id === id);
  }

  // Public module API
  return {
    /**
     * Add a new book to the catalog
     * @param {Object} bookData - Book data
     * @returns {Object} - Added book with ID
     */
    addBook: function (bookData) {
      try {
        validateBook(bookData);

        const newBook = {
          id: generateUniqueId(),
          title: bookData.title.trim(),
          author: bookData.author.trim(),
          year: bookData.year || null,
          genre: bookData.genre || null,
          isbn: bookData.isbn || null,
          addedDate: new Date().toISOString(),
        };

        books.push(newBook);
        console.log(
          `Book "${newBook.title}" successfully added with ID: ${newBook.id}`,
        );
        return { ...newBook }; // Returning a copy
      } catch (error) {
        console.error(`Error adding book: ${error.message}`);
        return null;
      }
    },

    /**
     * Delete book by ID
     * @param {string} bookId - Book ID
     * @returns {boolean} - Whether the book was deleted
     */
    removeBook: function (bookId) {
      const index = findBookIndexById(bookId);

      if (index === -1) {
        console.error(`Book with ID "${bookId}" not found`);
        return false;
      }

      const removedBook = books.splice(index, 1)[0];
      console.log(`Book "${removedBook.title}" successfully removed`);
      return true;
    },

    /**
     * Search for books by title
     * @param {string} title - Part of the title to search
     * @returns {Array} - Found books
     */
    searchByTitle: function (title) {
      if (!title || typeof title !== "string") {
        console.error("The name to search for must be a string.");
        return [];
      }

      const searchTerm = title.toLowerCase().trim();
      const results = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm),
      );

      console.log(`Found ${results.length} books by title "${title}"`);
      return results.map((book) => ({ ...book })); // Returning a copy
    },

    /**
     * Search for books by author
     * @param {string} author - Author name to search
     * @returns {Array} - Found books
     */
    searchByAuthor: function (author) {
      if (!author || typeof author !== "string") {
        console.error("Author to search must be a string");
        return [];
      }

      const searchTerm = author.toLowerCase().trim();
      const results = books.filter((book) =>
        book.author.toLowerCase().includes(searchTerm),
      );

      console.log(`Found ${results.length} books by author "${author}"`);
      return results.map((book) => ({ ...book })); // Returning a copy
    },

    /**
     * Search for books by year of publication
     * @param {number} year - Year of publication
     * @returns {Array} - Found books
     */
    searchByYear: function (year) {
      if (!year || typeof year !== "number") {
        console.error("Year must be a number");
        return [];
      }

      const results = books.filter((book) => book.year === year);
      console.log(`Found ${results.length} books of year ${year}`);
      return results.map((book) => ({ ...book }));
    },

    /**
     * Get book by ID
     * @param {string} bookId - Book ID
     * @returns {Object|null} - Book or null
     */
    getBookById: function (bookId) {
      const book = books.find((b) => b.id === bookId);

      if (!book) {
        console.error(`Book with ID "${bookId}" not found`);
        return null;
      }

      return { ...book }; // Return a copy
    },

    /**
     * Get all books
     * @returns {Array} - A copy of the array of all books
     */
    getAllBooks: function () {
      console.log(`Total number of books in the directory: ${books.length}`);
      return books.map((book) => ({ ...book })); // Return copies
    },

    /**
     * Get library statistics
     * @returns {Object} - Statistics
     */
    getStatistics: function () {
      const totalBooks = books.length;
      const booksByYear = {};
      const authors = new Set();

      books.forEach((book) => {
        authors.add(book.author);

        if (book.year) {
          booksByYear[book.year] = (booksByYear[book.year] || 0) + 1;
        }
      });

      return {
        totalBooks,
        uniqueAuthors: authors.size,
        oldestBook:
          totalBooks > 0
            ? Math.min(...books.filter((b) => b.year).map((b) => b.year))
            : null,
        newestBook:
          totalBooks > 0
            ? Math.max(...books.filter((b) => b.year).map((b) => b.year))
            : null,
        booksByYear,
      };
    },

    /**
     * Clear Catalog
     * @returns {number} - Number of books deleted
     */
    clearCatalog: function () {
      const count = books.length;
      books = [];
      nextId = 1;
      console.log(`Catalog cleared. ${count} books deleted`);
      return count;
    },
  };
})();

// export default BookCatalog;

// Filter and sort module (extension)
const BookFilters = (function (bookCatalog) {
  // Private methods
  function sortByProperty(array, property, ascending = true) {
    return [...array].sort((a, b) => {
      const aVal = a[property];
      const bVal = b[property];

      if (aVal === bVal) return 0;

      const comparison = aVal < bVal ? -1 : 1;
      return ascending ? comparison : -comparison;
    });
  }

  // Public API
  return {
    /**
     * Sort books by title
     * @param {boolean} ascending - Sort from A to Z (true) or from Z to A (false)
     * @returns {Array} - Sorted books
     */
    sortByTitle: function (ascending = true) {
      const books = bookCatalog.getAllBooks();
      return sortByProperty(books, "title", ascending);
    },

    /**
     * Sort books by author
     * @param {boolean} ascending - Sort from A to Z (true) or from Z to A (false)
     * @returns {Array} - Sorted books
     */
    sortByAuthor: function (ascending = true) {
      const books = bookCatalog.getAllBooks();
      return sortByProperty(books, "author", ascending);
    },

    /**
     * Sort books by year of publication
     * @param {boolean} ascending - Ascending (true) or descending (false)
     * @returns {Array} - Sorted books
     */
    sortByYear: function (ascending = true) {
      const books = bookCatalog.getAllBooks();
      return sortByProperty(books, "year", ascending);
    },

    /**
     * Filter books by genre
     * @param {string} genre - Genre to filter
     * @returns {Array} - Filtered books
     */
    filterByGenre: function (genre) {
      const books = bookCatalog.getAllBooks();
      return books.filter(
        (book) =>
          book.genre && book.genre.toLowerCase() === genre.toLowerCase(),
      );
    },

    /**
     * Filter books by year range
     * @param {number} startYear - Starting year
     * @param {number} endYear - Ending year
     * @returns {Array} - Filtered books
     */
    filterByYearRange: function (startYear, endYear) {
      const books = bookCatalog.getAllBooks();
      return books.filter(
        (book) => book.year && book.year >= startYear && book.year <= endYear,
      );
    },
  };
})(BookCatalog);

// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = {
//     BookCatalog,
//     BookFilters
//   };
// }

export { BookCatalog, BookFilters };
