import BookSingleCard from "./BookSingleCard";

const BookCards = ({books}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
      {books.map((item) => (
        <BookSingleCard key={item._id} item={item} />
      ))}
    </div>
  );
}
export default BookCards