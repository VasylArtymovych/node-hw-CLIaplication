const { Command } = require("commander");
const logger = require("./contacts");

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
      const list = await logger.listContacts();
      console.table(list);
      break;

    case "get":
      const contact = await logger.getContactById(id);
      if (!contact) throw new Error(`Contact with id:${id} not found!`);
      console.log(contact);
      break;

    case "add":
      await logger.addContact(name, email, phone);
      console.table(await logger.listContacts());
      break;

    case "remove":
      const removedContact = await logger.removeContact(id);
      if (!removedContact) throw new Error(`Contact with id:${id} not found!`);
      console.table(await logger.listContacts());
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
      console.log("Use some of the list:");
      console.table([
        '-a, --action <type>", "choose action',
        "-i, --id <type>, user id",
        "-n, --name <type>, user name",
        "-e, --email <type>, user email",
        "-p, --phone <type>, user phone",
      ]);
  }
}

invokeAction(argv);
