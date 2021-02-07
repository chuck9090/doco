import completerWordsForSystemTable from "./completerWordsForSystemTable.js";
import completerWordsForCommonField from "./completerWordsForCommonField.js";

let cWords = [];
cWords = cWords.concat(completerWordsForSystemTable);
cWords = cWords.concat(completerWordsForCommonField);

export default cWords;
