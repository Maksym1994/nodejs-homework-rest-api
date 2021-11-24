const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json")

const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(contactsPath))
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
        const contact = contacts.filter((contact) => String(contact.id) === contactId);
        return contact;
}

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
        const contactsList = contacts.filter((contact) => contact.id !== Number(contactId));
        await fs.writeFile(contactsPath, JSON.stringify(contactsList));
        return contactsList;
}

const addContact = async (body) => {
        const contacts = await listContacts();
        const newContact = {id: uuidv4(), ...body};
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(({ id }) => id.toString() === contactId)
  if (index === -1) return
  contacts[index] = { ...contacts[index], ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
