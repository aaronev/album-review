const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

module.exports = class SQLInjections {
  constructor(tableName, insertIntoColumns) {
    this.table = tableName
    this.columns = insertIntoColumns
  }

  errorHandler(SQLCommand, queryParams) {
    return db.any(SQLCommand, queryParams)
    .catch(error => {
      console.log('ERROR: Queries ===> ', error)
      throw error
    })
  }

  injectInto$1$2etc() {
    let colmns = []
    for (let i = 1; i <= this.columns.length; i++) {
      colmns.push('$'+ i)
    }
    return colmns.join()
  }
  
  insert(valuesAsAnArray) {
    return this.errorHandler(`
      INSERT INTO 
        ${this.table} 
        (${this.columns}) 
      VALUES 
        (${this.injectInto$1$2etc()})
      RETURNING
        *`, valuesAsAnArray
    )
  }
  
  delete(column, value) {
    return this.errorHandler(`
      DELETE FROM 
        ${this.table} 
      WHERE 
        ${column} = $1`, value
    )
  }

  all() {
    return this.errorHandler(`
      SELECT 
        * 
      FROM 
        ${this.table}
      ORDER BY 
        timestamp
      DESC`
    )
  }

  find(column, value) { 
    return this.errorHandler(`
      SELECT 
        * 
      FROM 
        ${this.table} 
      WHERE 
        ${column} = $1
      ORDER BY 
        timestamp
      DESC`, value
    )
  }

  limit(limit) {
    return this.errorHandler(`
      SELECT 
        * 
      FROM 
        ${this.table}
      ORDER BY 
        timestamp
      DESC
      LIMIT $1
      `, limit
    )
  }

  truncate() {
    return this.errorHandler(`
      TRUNCATE 
        ${this.table}
      RESTART IDENTITY
    `)
  }
}
