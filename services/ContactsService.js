const ContactsModel = require("../models/Contacts");

class ContactsService {
  getContacts = async () => {
    const contacts = await ContactsModel.find({});
    return contacts || null;
  };

  getContact = async (id) => {
    const contact = await ContactsModel.findById(id);
    return contact || null;
  };

  createContact = async (body) => {
    const contact = await ContactsModel.create(body);
    return contact || null;
  };
}


module.exports = new ContactsService()