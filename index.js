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

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      logger.listContacts();
      break;

    case "get":
      logger.getContactById(id);
      break;

    case "add":
      logger.addContact(name, email, phone);
      break;

    case "remove":
      logger.removeContact(id);
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
