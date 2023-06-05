const { Command } = require("commander");
const contact = require("./contacts.js");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await contact.listContacts();
      break;

    case "get":
      await contact.getContactById(id);
      break;

    case "add":
      await contact.addContact(name, email, phone);
      break;

    case "remove":
      await contact.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
