/*
Quoting style
Imagine you have written a story and used single quotation marks throughout to mark pieces of dialogue. Now you want to replace all the dialogue quotes with double quotes, while keeping the single quotes used in contractions like aren’t.

Think of a pattern that distinguishes these two kinds of quote usage and craft a call to the replace method that does the proper replacement.
*/

let reQuotes = /'(?!(m|ll|re|s|t))/g;

let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(reQuotes, "\""));
// → "I'm the cook," he said, "it's my job."

// this breaks when the apostrophy is after a word to represent possesion of a noun that ends with s
text = "'Dr Jones' report'";
console.log(text.replace(reQuotes, "\""));
// → "Dr Jones" report"
