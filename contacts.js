const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(contacts));
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const necessaryContact = JSON.parse(contacts).filter(
      ({ id }) => id === contactId
    );
    console.log(necessaryContact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const updatedContacts = JSON.parse(contacts).filter(
      ({ id }) => id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    listContacts();
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: uuidv4(), name, phone, email };
    const contacts = await fs.readFile(contactsPath, "utf8");
    const updatedContacts = [...JSON.parse(contacts), newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    listContacts();
  } catch (error) {
    onsole.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
