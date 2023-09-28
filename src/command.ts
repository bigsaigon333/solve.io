import { Command, Option } from "clipanion";

export class HelloCommand extends Command {
  name = Option.String();

  async execute() {
    this.context.stdout.write(`Hello ${this.name}!\n`);
  }
}
