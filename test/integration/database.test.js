const { expect } = require('chai')
const DBTable = require('../../src/database/database')

describe('DB Integration SQL Injection', () => {
const DBTest = new DBTable('test', ['first_name', 'last_name'])
  it('Inserts new data', () => 
    DBTest.insert(['aaron','villanueva'])
    .then( added => {
      expect(added[0].first_name).to.equal('aaron')
      expect(added[0].last_name).to.equal('villanueva')
    })
  ),
  it('Reads all data', () => 
    DBTest.all()
    .then(allData => {
      expect(allData).to.be.an('array')
      expect(allData.length).to.equal(1)
    })
  ),
  it('Finds data by column', () => 
    DBTest.find('first_name', 'aaron')
    .then(foundData => {
      expect(foundData[0].last_name).to.equal('villanueva')
      expect(foundData[0].id).to.equal(1)
    })
  ),
  it('Limits data', () => 
    DBTest.limit(1)
    .then(limitedData => {
      expect(limitedData).to.be.an('array')
      expect(limitedData.length).to.equal(1)
    })
  ),
  it('Deletes data by column', () => 
    DBTest.delete('id', 1)
    .then(() => {
      DBTest.all()
      .then(allData => {
        expect(allData).to.be.an('array')
        expect(allData.length).to.equal(0)
      })
    })
  )
  DBTest.truncate()
})