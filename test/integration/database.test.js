const { expect } = require('chai')
const DBTable = require('../../src/database/database')

describe('DB Integration SQL Injection', () => {
const DBTest = new DBTable('test', ['first_name', 'last_name'])
  it('Inserts new data', () => 
    DBTest.insert(['aaron','villanueva'])
  ),
  it('Reads all data', () => 
    DBTest.all()
  ),
  it('Finds data by column', () => 
    DBTest.find('id', 1)
  ),
  it('Limits data', () => 
    DBTest.limit(3)
  ),
  it('Deletes data by column', () => 
    DBTest.delete('id', 1)
  )
})