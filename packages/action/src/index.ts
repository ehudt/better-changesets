import * as core from '@actions/core';
import { exec } from '@actions/exec';

async function run() {
  try {
    const publishCmd = core.getInput('publish');
    const versionCmd = core.getInput('version');

    if (versionCmd) {
      await exec(versionCmd);
    }

    if (publishCmd) {
      await exec(publishCmd);
    }

  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(String(error));
    }
  }
}

run();
