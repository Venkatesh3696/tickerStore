const { connection, connectDB, endConnection } = require("../config/database");

const formatPeriod = (period) => {
  const abbrivation = {
    y: "year",
    m: "month",
    d: "day",
  };

  numerical = "";
  alpha = "";
  if (period) {
    Array.from(period).forEach((character) => {
      if (!isNaN(character)) {
        numerical += character;
      } else {
        alpha += character;
      }
    });
  }
  timeline = abbrivation[alpha];
  result = numerical + " " + timeline;
  return result;
};

const getStocks = async (req, res) => {
  try {
    const { column = "*", ticker, period, limit = 100 } = req.query;
    const formattedPeriod = formatPeriod(period);

    const conditions = [];

    if (ticker) {
      conditions.push(` ticker = "${ticker}" `);
    }

    if (period) {
      conditions.push(
        `transaction_date >= date_sub(now(),interval ${formattedPeriod})`
      );
    }

    const sqlQuery = `SELECT ${column} FROM stocks`;
    var newQuerry = null;

    if (conditions.length > 0) {
      newQuerry = sqlQuery + " WHERE " + conditions.join(" AND ") + ";";
    } else {
      newQuerry = sqlQuery;
    }

    // console.log("hereeee ====>>>>>>>", newQuerry);

    await connection.query(newQuerry, async (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Database query error");
        return;
      }
      // console.log("connection establihed on thread " + connection.threadId);
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getStocks };
