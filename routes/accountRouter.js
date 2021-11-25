const { request, response } = require("express");
const express = require("express")
const account = require("../usercases/account");

const router = express.Router();

//get
router.get("/", async (request, response, next) => {
  const accounts = [];
  const { limit } = request.query;

  try {
    const accountGet = await account.get();
    response.json({
      ok: true,
      message: "Done!",
      payload: { accountGet },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;