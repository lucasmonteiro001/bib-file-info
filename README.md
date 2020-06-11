# bib-file-info
Repositório que contém utilitários para extrair informações de arquivo .bib.

Exemplo de uso:

```javascript
const bibFileInfo = require('bib-file-info');

const info = bibFileInfo.parse(bibFile);

console.log(info.authors);
```
