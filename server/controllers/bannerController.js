const db = require("../config/db");

const getBanner = (req, res) => {

  // console.log("this apis is hit")
  const query = 'SELECT * FROM banner LIMIT 1';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Server error.');
    res.send(results[0]);
  });
};

const updateBanner = (req, res) => {
  const { description, timer, link, visible } = req.body;
  const bannerImage = req.file ? req.file.filename : null;

  const query = `
    UPDATE banner 
    SET description = ?, timer = ?, link = ?, visible = ?, image = ?
    WHERE id = 1
  `;

  db.query(
    query,
    [description, timer, link, visible, bannerImage],
    (err) => {
      if (err) return res.status(500).send('Server error.');
      res.send('Banner updated successfully.');
    }
  );
};

module.exports = { getBanner, updateBanner };
