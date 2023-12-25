const ContactsService = require("../services/ContactsService");
const asyncHandler = require("express-async-handler");

class ContactsController {
  getAllContacts = asyncHandler(async (req, res) => {
    const { id: owner } = res.locals.user;

    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;

    const filter = {
      owner,
    };

    if (favorite) {
      filter.favorite = favorite;
    }

    const contacts = await ContactsService.getContacts(filter, skip, limit);

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
    const { id: owner } = res.locals.user;
    const contact = await ContactsService.createContact({ ...req.body, owner });

    if (!contact) {
      res.status(400);
      throw new Error(`Contact with ID: ${id} does not exist`);
    }

    res.status(201).json({ code: 201, message: "Success", data: contact });
  });

  deleteContact = asyncHandler(async (req, res) => {
    const { contactId } = req.params;
    const deletedContact = await ContactsService.deleteContact(contactId);

    if (!deletedContact) {
      res.status(404);
      throw new Error(`Contac with ID: ${contactId}`);
    }

    res.status(200).json({
      code: 200,
      message: `Contact with ID: ${contactId} successfully deleted`,
      data: deletedContact,
    });
  });

  updateContact = asyncHandler(async (req, res) => {
    const {
      params: { contactId },
      body,
    } = req;

    const updatedContact = await ContactsService.updateContact(contactId, body);

    if (!updatedContact) {
      res.status(400);
      throw new Error("Something went wrong");
    }

    res.status(201).json({
      code: 201,
      message: `User With ID: ${contactId} successfully updated`,
      data: updatedContact,
    });
  });

  updateStatusContact = asyncHandler(async (req, res) => {
    const {
      params: { contactId },
      body,
    } = req;

    if (!body.favorite) {
      res.status(400);
      throw new Error("Missing field favorite");
    }

    const updatedStatusContact = await ContactsService.updateStatusContact(
      contactId,
      body
    );

    if (!updatedStatusContact) {
      res.status(400);
      throw new Error("Not found");
    }

    res.status(200).json({
      code: 200,
      message: "field 'favorite' updated successfully",
      data: updatedStatusContact,
    });
  });
}

module.exports = new ContactsController();
