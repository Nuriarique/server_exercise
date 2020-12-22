"use stric";

async function getData(req, res) {
  try {
    res.send("Miau");
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    }
    console.log(error);
    res.status(error.status || 500);
    res.send({ error: error.message });
  }
}

module.exports = getData;
