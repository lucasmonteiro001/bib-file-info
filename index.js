const bibtex = require('bibtex');
const parseBibFile = bibtex.parseBibFile;
const normalizeFieldValue = bibtex.normalizeFieldValue;

exports.parse = (file) => {
  const bibFile = parseBibFile(`${file}`);
  
  if (bibFile.entries_raw.length > 1) throw new Error("Somente um bibFile é aceito!");
  
  const entry = bibFile.getEntry(bibFile.entries_raw[0]._id);
  
  const extractValueFromFile = campo => normalizeFieldValue(entry.getField(campo));
  
  console.log("Titulo:", extractValueFromFile("title"));
  
  let authors = [];
  const authorField = entry.getField("author");
  authorField.authors$.map((author, i) =>
    authors.push((author.firstNames.concat(author.vons).concat(author.lastNames).concat(author.jrs)).join(" ")));

  return {
    title: extractValueFromFile("title"),
    authors: authors,
    year: extractValueFromFile("year"),
    abstract: extractValueFromFile("abstract"),
    isbn: extractValueFromFile("isbn"),
    bookTitle: extractValueFromFile("bookTitle"),
    pages: extractValueFromFile("pages"),
    publisher: extractValueFromFile("publisher"),
    address: extractValueFromFile("address")
  }
}

