const express = require("express");
const contactsController = require("../../controllers/ContactsController");
const validateId = require("../../middlewares/validateId");
const validateBody = require("../../middlewares/validateBody");
const contactsJoiSchema = require("../../schemas/contactsJoiSchema");
const authenticate = require("../../middlewares/authenticate");
const router = express.Router();

router.get("/", authenticate, contactsController.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  validateId,
  contactsController.getOneContact
);

router.post(
  "/",
  authenticate,
  validateBody(contactsJoiSchema),
  contactsController.createContact
);

router.delete(
  "/:contactId",
  authenticate,
  validateId,
  contactsController.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  validateId,
  contactsController.updateContact
);
router.patch(
  "/:contactId/favorite",
  validateId,
  contactsController.updateStatusContact
);

module.exports = router;
