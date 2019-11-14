const connection = require("./connection");

const orm = {
  selectAll: (table, cb) => {
    let query = `SELECT * FROM ${table};`;


    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },

  selectOneTeam: (table, team_id, cb) => {

    let query = `SELECT 
                  p.player_id, 
                  player_name, 
                  jersey_number, 
                  position, 
                  handness, 
                  team_id, 
                  s.hits/s.at_bats AS bat_avg   
                  From ${table} AS p
                  LEFT JOIN season_bat_stats AS s 
                  ON p.player_id = s.player_id 
                  WHERE team_id = '${team_id}';`;


    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },
  
  selectOne: (table, team_id, cb) => {
    let query = `SELECT * From ${table} WHERE team_id = '${team_id}'`;

    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },

 

  selectWhere: (table, condition, cb) => {
    let query = `SELECT * FROM ${table} Where player_id = ${condition};`;
    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    })
  },
  updateHits: (table, condition, cb) => {
    let query = `UPDATE ${table} SET hits = hits +1, at_bats = at_bats +1 Where player_id = ${condition};`
    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }
       cb(res)
    })
  },


  create: (table, homeTeam, awayTeam, loc, date, cb) => {
    let query = `INSERT INTO ${table} (home, away, location, date, result) `;
    query += `VALUES (${homeTeam}, ${awayTeam}, ${loc}, ${date}, );`;

    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }

      cb(res);
    })
  },
  // selectWhere: (table, condition, cb) => {
  //   let query = `SELECT * FROM ${table} Where player_id = ${condition};`;
  //   connection.query(query, function(err, res) {
  //     if (err) {
  //       throw err;
  //     }
  //     cb(res);
  //   })
  // },
  // updateHits: (table, condition, cb) => {
  //   let query = `UPDATE ${table} SET hits = hits +1, at_bats = at_bats +1 Where player_id = ${condition};`
  //   connection.query(query, function(err, res) {
  //     if (err) {
  //       throw err;
  //     }
  //      cb(res)
  //   })
  // },
   updateOuts:(table, condition, cb) => {
     let query = `UPDATE ${table} SET at_bats = at_bats +1 Where player_id = ${condition}`
     connection.query(query, function(err, res) {
       if (err) {
         throw err;
       }
       cb(res)
     })
   },


  // create: (table, homeTeam, awayTeam, loc, result, cb) => {
  //   let query = `INSERT INTO ${table} (home, away, location, result) `;
  //   query += `VALUES (${homeTeam}, ${awayTeam},${loc}, ${result} );`;

  //   connection.query(query, function(err, res) {
  //     if (err) {
  //       throw err;
  //     }

  //     cb(res);
  //   })
  // },


     
  
  

};

module.exports = orm;
