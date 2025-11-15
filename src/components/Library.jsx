import { useEffect, useState } from "react";

export default function Library() {
  const STORAGE_KEY = "library_books_v2";
  const THEME_KEY = "library_theme";

  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortType, setSortType] = useState("title_asc");
  const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY) || "dark");

  // Form data
  const [form, setForm] = useState({
    id: null,
    title: "",
    author: "",
    category: "General",
    year: ""
  });

  // Load saved books
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setBooks(saved);
  }, []);

  // Save automatically
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  // Theme toggle
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Add or update book
  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    if (form.id === null) {
      // Add
      setBooks([
        {
          id: Date.now(),
          title: form.title,
          author: form.author,
          category: form.category,
          year: form.year
        },
        ...books
      ]);
    } else {
      // Edit
      setBooks(
        books.map((b) =>
          b.id === form.id ? { ...form } : b
        )
      );
    }

    resetForm();
  }

  function resetForm() {
    setForm({
      id: null,
      title: "",
      author: "",
      category: "General",
      year: ""
    });
  }

  function editBook(book) {
    setForm(book);
    window.scrollTo(0, 0);
  }

  function removeBook(id) {
    if (!confirm("Remove this book?")) return;
    setBooks(books.filter((b) => b.id !== id));
  }

  // Search + filter + sort
  const filteredBooks = books
    .filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
    )
    .filter((b) =>
      categoryFilter === "All" ? true : b.category === categoryFilter
    )
    .sort((a, b) => {
      let valA = a[sortType.split("_")[0]];
      let valB = b[sortType.split("_")[0]];

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (sortType.endsWith("asc")) return valA > valB ? 1 : -1;
      else return valA < valB ? 1 : -1;
    });

  return (
    <div className="library-container">
      <header className="header">
        <h1>Library Management</h1>
        <button
          className="theme-btn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* FORM */}
      <form className="form" onSubmit={handleSubmit}>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Book Title *"
        />
        <input
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          placeholder="Author"
        />
        <input
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          placeholder="Year"
          type="number"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>General</option>
          <option>Programming</option>
          <option>Science</option>
          <option>Fiction</option>
          <option>History</option>
        </select>

        <button className="add-btn">
          {form.id === null ? "Add Book" : "Save Changes"}
        </button>

        {form.id !== null && (
          <button className="cancel-btn" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* SEARCH CONTROLS */}
      <div className="controls">
        <input
          className="search"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All</option>
          <option>General</option>
          <option>Programming</option>
          <option>Science</option>
          <option>Fiction</option>
          <option>History</option>
        </select>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="title_asc">Title (A → Z)</option>
          <option value="title_desc">Title (Z → A)</option>
          <option value="author_asc">Author (A → Z)</option>
          <option value="author_desc">Author (Z → A)</option>
          <option value="year_asc">Year (Old → New)</option>
          <option value="year_desc">Year (New → Old)</option>
        </select>
      </div>

      {/* BOOK LIST */}
      <div className="books">
        {filteredBooks.map((b) => (
          <div className="book" key={b.id}>
            <div>
              <h3>{b.title}</h3>
              <p>{b.author || "Unknown"} • {b.category}</p>
              <small>{b.year}</small>
            </div>
            <div className="actions">
              <button onClick={() => editBook(b)}>Edit</button>
              <button className="remove" onClick={() => removeBook(b.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}

        {filteredBooks.length === 0 && <p>No books found.</p>}
      </div>
    </div>
  );
}
