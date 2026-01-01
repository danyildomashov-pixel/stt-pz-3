/* eslint-env jest */

const apiIceAndFire = require('./anapioficeandfire')

jest.mock('./anapioficeandfire', () => {
    const originalModule = jest.requireActual('./anapioficeandfire');
    const resp = require('../__mocksData__/api.json')
    
    return {
        __esModule: true,
        ...originalModule,
        getListOfRestEndPoint: function () {
            return new Promise((resolve, reject) => {
                resolve({entity: resp})
            })
        },
        // Добавляем мок для книги 3
        getBook3: function () {
            return new Promise((resolve) => {
                resolve({
                    url: "https://www.anapioficeandfire.com/api/books/3",
                    name: "A Storm of Swords",
                    isbn: "978-0553106633",
                    authors: ["George R. R. Martin"],
                    numberOfPages: 992,
                    publisher: "Bantam Books",
                    country: "United States",
                    mediaType: "Hardcover",
                    released: "2000-08-08T00:00:00"
                })
            })
        },
        // Добавляем мок для списка домов
        getHouses: function () {
            return new Promise((resolve) => {
                resolve([
                    {
                        url: "https://www.anapioficeandfire.com/api/houses/1",
                        name: "House Algood",
                        region: "The Westerlands"
                    },
                    {
                        url: "https://www.anapioficeandfire.com/api/houses/7",
                        name: "House Allyrion of Godsgrace",
                        region: "Dorne",
                        words: "No Foe May Pass",
                        seats: ["Godsgrace"]
                    }
                ])
            })
        },
        // Добавляем мок для House Allyrion
        getHouseAllyrion: function () {
            return new Promise((resolve) => {
                resolve({
                    url: "https://www.anapioficeandfire.com/api/houses/7",
                    name: "House Allyrion of Godsgrace",
                    region: "Dorne",
                    coatOfArms: "Gyronny Gules and Sable, a hand couped Or",
                    words: "No Foe May Pass",
                    seats: ["Godsgrace"]
                })
            })
        }
    };
});

describe('#getBooks() using Promises', () => {
    it('should load books data', () => {
        return apiIceAndFire.getListOfRestEndPoint()
            .then(data => {
                expect(data.entity.books).toBeDefined()
                expect(data.entity.books).toEqual('https://www.anapioficeandfire.com/api/books')
                expect(data.entity.houses).toBeDefined()
                expect(data.entity.houses).toEqual('https://www.anapioficeandfire.com/api/houses')
            })
    })
})

// ТЕСТ 1: Книга 3
describe('#getBook3() - Book 3 API', () => {
    it('should load book 3 data with correct properties', () => {
        return apiIceAndFire.getBook3()
            .then(data => {
                expect(data.name).toBe("A Storm of Swords")
                expect(data.authors).toContain("George R. R. Martin")
                expect(data.numberOfPages).toBe(992)
                expect(data.isbn).toBe("978-0553106633")
                expect(data.publisher).toBe("Bantam Books")
            })
    })
})

// ТЕСТ 2: Список домов
describe('#getHouses() - Houses API', () => {
    it('should load houses list', () => {
        return apiIceAndFire.getHouses()
            .then(data => {
                expect(Array.isArray(data)).toBe(true)
                expect(data.length).toBeGreaterThan(0)
                expect(data[0]).toHaveProperty('name')
                expect(data[0]).toHaveProperty('region')
            })
    })
})

// ТЕСТ 3: House Allyrion of Godsgrace
describe('#getHouseAllyrion() - House Allyrion of Godsgrace', () => {
    it('should load House Allyrion of Godsgrace data', () => {
        return apiIceAndFire.getHouseAllyrion()
            .then(data => {
                expect(data.name).toBe("House Allyrion of Godsgrace")
                expect(data.region).toBe("Dorne")
                expect(data.words).toBe("No Foe May Pass")
                expect(data.seats).toContain("Godsgrace")
                expect(data.coatOfArms).toBe("Gyronny Gules and Sable, a hand couped Or")
            })
    })
})