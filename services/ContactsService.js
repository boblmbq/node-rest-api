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
    const createdContact = await ContactsModel.create(body);
    return createdContact || null;
  };

  deleteContact = async (id) => {
    const deletedContact = await ContactsModel.findByIdAndDelete(id);
    return deletedContact || null;
  };

  updateContact = async (id, body) => {
    const updatedContact = await ContactsModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    return updatedContact || null;
  };

  updateStatusContact = async (id, body) => {
    const updatedStatusContact = await ContactsModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    return updatedStatusContact || null;
  };
}

module.exports = new ContactsService();
