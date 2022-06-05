const argv = require("yargs").argv;

const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const list = await contacts.listContacts();
        console.table(list);
        break;

      case "get":
          console.log(id)
        const contact = await contacts.getContactById(id);
        console.log(contact);
        break;

      case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
        break;

      case "remove":
        const removeContact = await contacts.removeContact(id);
        console.log(removeContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error);
  }
}

invokeAction(argv);
