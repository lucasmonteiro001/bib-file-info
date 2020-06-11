const assert = require('assert');
const bibFileInfo = require('../index');

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });

    describe('should extract fields', function () {
        const file = `
      @InProceedings{10.1007/978-3-319-25010-6_12,
        author="Szekely, Pedro
        and Dólar, Maçã
        and Ferreira, Lídia",
        editor="Arenas, Marcelo
        and Staab, Steffen",
        title="Building and Using a Knowledge Graph to Combat Human Trafficking",
        booktitle="The Semantic Web - ISWC 2015",
        year="2015",
        publisher="Springer International Publishing",
        address="Cham",
        pages="205--221",
        abstract="There is a huge amount of data spread across the web and stored in databases that we can use to build knowledge graphs. However, exploiting this data to build knowledge graphs is difficult due to the heterogeneity of the sources, scale of the amount of data, and noise in the data. In this paper we present an approach to building knowledge graphs by exploiting semantic technologies to reconcile the data continuously crawled from diverse sources, to scale to billions of triples extracted from the crawled content, and to support interactive queries on the data. We applied our approach, implemented in the DIG system, to the problem of combating human trafficking and deployed it to six law enforcement agencies and several non-governmental organizations to assist them with finding traffickers and helping victims.",
        isbn="978-3-319-25010-6"
        } 
      `;

        const info = bibFileInfo.parse(file);

        it('should extract correct values', function () {
            assert.equal(info.abstract, 'There is a huge amount of data spread across the web and stored in databases that we can use to build knowledge graphs. However, exploiting this data to build knowledge graphs is difficult due to the heterogeneity of the sources, scale of the amount of data, and noise in the data. In this paper we present an approach to building knowledge graphs by exploiting semantic technologies to reconcile the data continuously crawled from diverse sources, to scale to billions of triples extracted from the crawled content, and to support interactive queries on the data. We applied our approach, implemented in the DIG system, to the problem of combating human trafficking and deployed it to six law enforcement agencies and several non-governmental organizations to assist them with finding traffickers and helping victims.');
            assert.equal(info.isbn, '978-3-319-25010-6');
            assert.equal(info.pages, '205--221');
            assert.equal(info.title, 'Building and Using a Knowledge Graph to Combat Human Trafficking');
            assert.equal(info.year, '2015');
            assert.equal(info.bookTitle, 'The Semantic Web - ISWC 2015');
            assert.equal(info.authors.join(';'), ['Pedro Szekely','Maçã Dólar', 'Lídia Ferreira'].join(';'));
        })
    })
});