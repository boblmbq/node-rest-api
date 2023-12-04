const ContactsService = require("../services/ContactsService");
const asyncHandler = require("express-async-handler");

class ContactsController {
  getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await ContactsService.getContacts();

    if (!contacts) {
      res.status(400);
      throw new Error("Unable to fetch, plese check the request");
    }

    res.status(200).json({ code: 200, message: "Success", data: contacts });
  });

  getOneContact = asyncHandler(async (req, res) => {
    const id = req.params.contactId;
    const contact = await ContactsService.getContact(id);

    if (!contact) {
      res.status(400);
      throw new Error(`Contact with ID: ${id} does not exist`);
    }

    res.status(200).json({ code: 200, message: "Success", data: contact });
  });

  createContact = asyncHandler(async (req, res) => {
    const contact = await ContactsService.createContact(req.body);

    if (!contact) {
      res.status(400);
      throw new Error(`Contact with ID: ${id} does not exist`);
    }

    res.status(200).json({ code: 200, message: "Success", data: contact });
  });
}

module.exports = new ContactsController();
