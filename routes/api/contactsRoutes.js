const express = require("express");
const contactsController = require("../../controllers/ContactsController");
const validateId = require("../../middlewares/validateId");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", validateId, contactsController.getOneContact);

router.post("/", contactsController.createContact);

router.delete("/:contactId", validateId, async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", validateId, async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
