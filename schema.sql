DROP TABLE IF EXISTS BOOK_LIST;
CREATE TABLE IF NOT EXISTS BOOK_LIST(
    ID SERIAL PRIMARY KEY,
    bookName VARCHAR(255),
    bookAuthor VARCHAR(255),
    bookDesc TEXT,
    bookImage VARCHAR(255),
    bookCat VARCHAR(255)
    );
    INSERT INTO BOOK_LIST(bookName,bookAuthor,bookDesc,bookImage,bookCat) VALUES('THE GREAT SHELA','AHMAD SHELA','THIS IS A GREAT BOOK JUST LIKE THE ONE WHO WROTE IT','https://i.imgur.com/J5LVHEL.jpg','History');