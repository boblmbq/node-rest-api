const ContactModel = require("../models/contacts");

class ContactsService {
  constructor() {
    this.ContactModel = ContactModel;
  }

  getContacts = async (filter, skip, limit) => {
    const contacts = await this.ContactModel.find(
      { ...filter },
      "name phone email favorite",
      { skip, limit }
    );
    return contacts || null;
  };

  getContact = async (contactId) => {
    const contact = await this.ContactModel.findById(contactId);
    return contact || null;
  };

  createContact = async (body) => {
    const createdContact = await this.ContactModel.create(body);
    return createdContact || null;
  };

  deleteContact = async (contactId) => {
    const deletedContact = await this.ContactModel.findByIdAndDelete(contactId);
    return deletedContact || null;
  };

  updateContact = async (contactId, body) => {
    const updatedContact = await this.ContactModel.findByIdAndUpdate(
      contactId,
      { ...body },
      { new: true, runValidators: true }
    );

    return updatedContact || null;
  };

  updateStatusContact = async (contactId) => {
    const updatedStatusContact = await this.ContactModel.findByIdAndUpdate(
      contactId,
      { ...body },
      { new: true, runValidators: true }
    );
  };
}

module.exports = new ContactsService();
