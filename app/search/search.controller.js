let resourceModel = require("./resource.model");

const getList = (req, res) => {
  try {
    let word = req.query.word;
    resourceModel.find(
      {
        text: { $regex: word, $options: "i" },

      },
      function (err, docs) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting list.",
            error: err,
          });
        }
        return res.json(docs);
      }
    ).sort({count : -1, text : 1}).limit(10);
    // return {}
  } catch (error) {
    return res.json(error);
  }
};

const updateList = (req, res) => {
  try {
    var word = req.body.word;
    resourceModel.findOne({ text: word }, function (err, resource) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting resource",
          error: err,
        });
      }
      if (!resource) {
        let resourcenew = new resourceModel({
          text: word,
          count: 1,
        });

        resourcenew.save(function (err, resourcenew) {
          if (err) {
            return res.status(500).json({
              message: "Error when creating Institute",
              error: err,
            });
          }
          return res.status(201).json(resourcenew);
        });
      } else {
        resource.count = resource.count + 1;

        resource.save(function (err, resource) {
          if (err) {
            return res.status(500).json({
              message: "Error when updating Institute.",
              error: err,
            });
          }

          return res.json(resource);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getList,
  updateList,
};
