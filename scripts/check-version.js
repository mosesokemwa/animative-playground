const fs = require("fs");
const packageJson = require("../package.json");
const appJson = require("../app.json");

const appJsonPath = "./app.json";
const packageJsonPath = "./package.json";
const packageJsonLockPath = "./package-lock.json";

const currentVersion = packageJson.version;
let [major, minor, patch] = currentVersion.split(".");
major = parseInt(major);
minor = parseInt(minor);
patch = parseInt(patch);

let newVersion = "";

if (patch === 9) {
  let newPatch = 0;
  let newMinor = minor + 1;
  let newMajor = major;

  if (newMinor > 9) {
    newMinor = 0;
    newMajor = major + 1;
  }

  newVersion = `${newMajor}.${newMinor}.${newPatch}`;
} else {
  let newPatch = patch + 1;
  let newMinor = minor;
  let newMajor = major;

  newVersion = `${newMajor}.${newMinor}.${newPatch}`;
}

if (newVersion !== currentVersion) {
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Version updated to ${newVersion}`);
} else {
  console.log("No version update required");
}

// Update app.json expo.version
const currentAppVersion = appJson.expo.version;
if (currentAppVersion !== newVersion) {
  appJson.expo.version = newVersion;
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  console.log(`app.json version updated to ${newVersion}`);
} else {
  console.log("No app.json version update required");
}

// git commit version update
const { exec } = require("child_process");
exec(
  'git add package.json app.json && git commit -m "Update version to ' +
    newVersion +
    '"',
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error committing changes: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    console.log(`Changes committed: ${stdout}`);
  }
);
