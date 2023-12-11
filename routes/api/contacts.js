const express = require("express");
const contactsController = require("../../controllers/ContactsController");
const validateId = require("../../middlewares/validateId");
const validateBody = require("../../middlewares/validateBody");
const contactsJoiSchema = require("../../schemas/contactsJoiSchema");
const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", validateId, contactsController.getOneContact);

router.post(
  "/",
  validateBody(contactsJoiSchema),
  contactsController.createContact
);

router.delete("/:contactId", validateId, contactsController.deleteContact);

router.put("/:contactId", validateId, contactsController.updateContact);
router.patch(
  "/:contactId/favorite",
  validateId,
  contactsController.updateStatusContact
);

module.exports = router;
