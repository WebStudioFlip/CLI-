const fs = require("fs").promises;
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function updateContacts(contactsList) {
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
}

function listContacts() {  
  return fs.readFile(contactsPath)
    .then((data) => {        
        const result = JSON.parse(data)    
return result})
    .catch((error) => console.log(error));
}

function getContactById(contactId) {
  return listContacts()
    .then((contactsList) => {        
      const result = contactsList.find(({ id }) => id.toString() === contactId.toString());
      if (!result) {
        return null;
      }
      return result;
    })
    .catch((error) => console.log(error));
}

function removeContact(contactId) {
  return listContacts()
    .then((contactsList) => {
      const index = contactsList.findIndex(({ id }) => id.toString() === contactId.toString());
      if (index === -1) {
        return null;
      }
      const [result] = contactsList.splice(index, 1);
      return updateContacts(contactsList).then(() => result);
    })
    .catch((error) => console.log(error));
}

function addContact(name, email, phone) {
    if (!name || !email || !phone){
        return null;
    }
  return listContacts()
    .then((contactsList) => {
      const newContact = {
        name,
        email,
        phone,
        id: nanoid(),
      };
      contactsList.push(newContact);
      return updateContacts(contactsList).then(() => newContact);
    })
    .catch((error) => console.log(error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
