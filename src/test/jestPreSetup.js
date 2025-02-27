const listeners = window._virtualConsole.listeners("jsdomError");
const originalListener = listeners && listeners[0];

window._virtualConsole.removeAllListeners("jsdomError");

// modify the jsdomError event to suppress css stylesheet parsing error
window._virtualConsole.addListener("jsdomError", (error) => {
  if (error && error.type === "css parsing") {
    return;
  }

  originalListener(error);
});
