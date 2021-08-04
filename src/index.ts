import path from "path";
import util from "util";
import childProcess from "child_process";

const exec = util.promisify(childProcess.exec);

type GenerateSolve = (filePath: string) => (input: string) => Promise<string>;

const generateSolve: GenerateSolve = (filePath) => {
  if (!path.isAbsolute(filePath)) {
    throw new TypeError(
      `Invalid filePath: ${filePath}\nfilePath should be an absolute path`
    );
  }

  return async (input: string) => {
    const { stdout, stderr } = await exec(`echo "${input}" | node ${filePath}`);

    return stderr ? Promise.reject(stderr) : Promise.resolve(stdout);
  };
};

export default generateSolve;
