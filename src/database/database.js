const pgp = require('pg-promise')()
const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

module.exports = class SQLInjections {
  constructor(tableName, insertIntoColumns) {
    this.table = tableName
    this.columns = insertIntoColumns
  }

  injectInto$1$2etc() {
    let colmns = []
    for (let i = 1; i <= this.columns.length; i++) {
      colmns.push('$'+ i)
    }
    return colmns.join()
  }
  
  insert(valuesAsAnArray) {
    return db.any(`
      INSERT INTO 
        ${this.table} 
        (${this.columns}) 
      VALUES 
        (${this.injectInto$1$2etc()})
      RETURNING
        *`, valuesAsAnArray
    ).catch(error => { 
      console.log('ERROR: INSERT ==>', error)
      throw error 
    })
  }
  
  delete(column, value) {
    return db.any(`
      DELETE FROM 
        ${this.table} 
      WHERE 
        ${column} = $1`, value
    ).catch(error => { 
      console.log('ERROR: DELETE ==>', error)
      throw error 
    })
  }

  all() {
    return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table}
      ORDER BY 
        timestamp
      DESC`
    ).catch(error => { 
      console.log('ERROR: SELECT * ==>', error)
      throw error 
    })
  }

  find(column, value) { 
    return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table} 
      WHERE 
        ${column} = $1
      ORDER BY 
        timestamp
      DESC`, value
    ).catch(error => { 
      console.log('ERROR: FIND ==>', error)
      throw error 
    })
  }

  limit(limit) {
     return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table}
      ORDER BY 
        timestamp
      DESC
      LIMIT $1
      `, limit
    ).catch(error => { 
      console.log('ERROR: LIMIT ==>', error)
      throw error 
    })
  }

  truncate() {
     return db.any(`
      TRUNCATE 
        ${this.table}
      RESTART IDENTITY
    `).catch(error => { 
      console.log('ERROR: TRUNCATE ==>', error)
      throw error 
    })
  }
}
