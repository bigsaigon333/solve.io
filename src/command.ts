import { Command, Option } from "clipanion";
import path from "node:path";
import fs from "node:fs/promises";
import { constants } from "fs";

export class SolveCommand extends Command {
  dirname = Option.String();
  resolvedDirname = "";
  jsFile = "";
  inoutPair: [string, string][] = [];

  async execute(): Promise<void> {
    await this.validate();

    this.context.stdout.write(this.jsFile + "\n");
    this.context.stdout.write(this.inoutPair + "\n");
  }

  async validate(): Promise<void> {
    // dirname access check
    await this.validateResolvedDirname();

    // have only one js file check
    await this.validateOnlyOneJsFile();

    // filter input files
    await this.filterInputFiles();
  }

  async validateResolvedDirname(): Promise<void> {
    const resolvedDirname = path.isAbsolute(this.dirname)
      ? this.dirname
      : path.resolve(this.dirname);

    fs.access(resolvedDirname, constants.R_OK);

    this.resolvedDirname = resolvedDirname;
  }

  async validateOnlyOneJsFile(): Promise<void> {
    const files = await fs.readdir(this.resolvedDirname);
    const jsFiles = files.filter((file) => file.endsWith(".js"));

    if (jsFiles.length !== 1) {
      throw new Error(
        `Directory ${this.resolvedDirname} must have only one js file`
      );
    }

    this.jsFile = jsFiles[0];
  }

  async filterInputFiles(): Promise<void> {
    const files = await fs.readdir(this.resolvedDirname);
    const inputFiles = files.filter((file) => file.endsWith(".in"));

    const pair: [string, string][] = [];

    for (const inputFile of inputFiles) {
      const filenameWithoutExtension = inputFile.replace(/\.in$/, "");

      const outputFile = `${filenameWithoutExtension}.out`;
      if (!files.includes(outputFile)) continue;

      pair.push([inputFile, outputFile]);
    }

    this.inoutPair = pair;
  }
}
