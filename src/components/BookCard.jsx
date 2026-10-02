import Link from "next/link";

export default function BookCard({bookId, book, leftContent, rightContent}) {

    return <div className="book-card">
        {leftContent}
        <Link href={`/book/${bookId ? bookId : book.id}`}><img src={book.image} alt={book.name} /></Link>
        <div className="book-content">
            <strong className="book-title">{book.name}</strong>
            <p className="book-meta"><span>{book.writer}</span><span>{book.category}</span></p>
            <p className="book-desc">{book.description}</p>
        </div>
        <div className="right-content">
            {rightContent}
        </div>
    </div>
}