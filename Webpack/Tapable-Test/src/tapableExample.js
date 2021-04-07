const { SyncHook } = require("tapable");

let syncHook = new SyncHook(["name"]);

syncHook.tap("JunlinZhu Plugin", (name) => {
  console.log("Junlin Zhu", name);
});

syncHook.call("Tapabele Test");
