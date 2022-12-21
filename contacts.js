const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "/db/contacts.json");

const writeContacts = async (data) =>
  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.filter((elem) => elem.id === contactId.toString());
  return contact || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await writeContacts(data);
  return result;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await writeContacts(data);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
