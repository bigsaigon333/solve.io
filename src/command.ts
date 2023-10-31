import { Command, Option } from "clipanion";
import { exec } from "node:child_process";
import { constants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { getErrorMessage } from "./utils";

const execAsync = promisify(exec);

export class SolveCommand extends Command {
  dirname = Option.String();
  resolvedDirname = "";
  jsFile = "";
  inoutPair: [string, string][] = [];

  async execute(): Promise<void> {
    await this.validate();
    await this.run();
  }

  async run(): Promise<void> {
    for (let i = 0; i < this.inoutPair.length; i++) {
      const [inputFile, outputFile] = this.inoutPair[i];
      this.context.stdout.write(`test case ${i + 1}) `);

      try {
        await this.runTestCase(inputFile, outputFile);
        this.context.stdout.write("PASSED\n");
      } catch (error) {
        this.context.stdout.write(`Failed >>\n${getErrorMessage(error)}\n`);
      }

      this.context.stdout.write(`\n`);
    }
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
    let resolvedDirname = path.isAbsolute(this.dirname)
      ? this.dirname
      : path.resolve(process.env.INIT_CWD, this.dirname);

    try {
      await fs.access(resolvedDirname, constants.R_OK);
    } catch (error) {
      resolvedDirname = path.resolve(process.cwd(), this.dirname);
      await fs.access(resolvedDirname, constants.R_OK);
    }

    this.resolvedDirname = resolvedDirname;
  }

  async validateOnlyOneJsFile(): Promise<void> {
    const files = await fs.readdir(this.resolvedDirname);
    const jsFiles = files.filter((file) => file.endsWith(".js"));

    if (jsFiles.length !== 1) {
      throw new Error(
        `Directory ${
          this.resolvedDirname
        } must have only one js file: ${jsFiles.join(", ")}`
      );
    }

    this.jsFile = this.pathResolve(jsFiles[0]);
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

    this.inoutPair = pair.map(([inputFile, outputFile]) => [
      this.pathResolve(inputFile),
      this.pathResolve(outputFile),
    ]);
  }

  pathResolve(fileName: string): string {
    return path.resolve(this.resolvedDirname, fileName);
  }

  async runTestCase(intputFile: string, outputFile: string): Promise<void> {
    const expected = await fs.readFile(outputFile, "utf-8");
    const { stdout, stderr } = await execAsync(
      `node ${this.jsFile} < ${intputFile}`
    );

    if (stderr) throw new Error(stderr);

    if (!this.isSame(stdout, expected)) {
      throw new Error(
        `Expected: ${expected.trimEnd()}\nActual: ${stdout.trimEnd()}\nInput: ${intputFile.replace(
          new RegExp("^" + this.resolvedDirname + "/"),
          ""
        )}`
      );
    }
  }

  isSame(expected: string, actual: string): boolean {
    return expected.trimEnd() === actual.trimEnd();
  }
}
