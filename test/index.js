const chai = require('chai');
const expect = chai.expect;

const somarNumeros = (a,b) => {
    if (typeof a === "number"  && typeof b === "number" ) return a + b;
        else return undefined;
}
describe('Somas' , () => {
    it('Soma de dois números - 2 e 3', (done) => {
        const resultado = somarNumeros(2,3);
        expect(resultado).be.equal(5);
        done();
    })
})

describe('Somas' , () => {
    it('Soma de dois números - -2 e 3', (done) => {
        const resultado = somarNumeros(-2,3);
        expect(resultado).be.equal(1);
        done();
    })
})

describe('Somas' , () => {
    it('Soma uma string e um número - "teste" e 3', (done) => {
        const resultado = somarNumeros("teste",3);
        expect(resultado).be.equal(undefined);
        done();
    })
})

describe('Somas' , () => {
    it('Soma de dois valores - NULL e 3', (done) => {
        const resultado = somarNumeros(null,3);
        expect(resultado).be.equal(undefined);
        done();
    })
})