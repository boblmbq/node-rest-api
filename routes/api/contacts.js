const express = require("express");
const { ContactsController } = require("../../controllers");
const { authenticate, validateId, validateBody } = require("../../middlewares");
const { contactsJoiSchema } = require("../../schemas");
const router = express.Router();

router.get("/", authenticate, ContactsController.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  validateId,
  ContactsController.getOneContact
);

router.post(
  "/",
  authenticate,
  validateBody(contactsJoiSchema),
  ContactsController.createContact
);

router.delete(
  "/:contactId",
  authenticate,
  validateId,
  ContactsController.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  validateId,
  ContactsController.updateContact
);
router.patch(
  "/:contactId/favorite",
  validateId,
  ContactsController.updateStatusContact
);

module.exports = router;
