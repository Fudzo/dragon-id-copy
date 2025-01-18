let cellId;
let blockId;
let objectTypeId;
let bvId;
let actBtnId;
let userSessionId;
let pageActionID;
const errorMessage = "Please select a cell first.";
const errorMessage2 = "Please select a button first.";
const errorMessage3 = "Whoops something went wrong.";


function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

let cellCm = {
  title: "Copy Cell ID",
  id: "cellid",
  contexts: ["all"],
  type: "normal",
};

let blockCm = {
  title: "Copy Block ID",
  id: "blockid",
  contexts: ["all"],
  type: "normal",
};

let objectTypeCm = {
  title: "Copy Object Type ID",
  id: "objecttypeid",
  contexts: ["all"],
  type: "normal",
};

let bvCm = {
  title: "Copy BV ID",
  id: "bvid",
  contexts: ["all"],
  type: "normal",
};

let actBtnCm = {
  title: "Copy Action Button ID",
  id: "actionbuttonid",
  contexts: ["all"],
  type: "normal",
}

let userSessionCm = {
  title: "Copy User Session ID",
  id: "usersessionid",
  contexts: ["all"],
  type: "normal",
}

let pageActionIDCm = {
  title: "Copy Page Action ID",
  id: "pageactionid",
  contexts: ["all"],
  type: "normal",
};

chrome.contextMenus.create(cellCm);
chrome.contextMenus.create(blockCm);
chrome.contextMenus.create(objectTypeCm);
chrome.contextMenus.create(bvCm);
chrome.contextMenus.create(actBtnCm);
chrome.contextMenus.create(pageActionIDCm);
chrome.contextMenus.create(userSessionCm);

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg, sendingPort) => {
    console.log(msg);
    if (msg.cellid) {
      cellId = msg.cellid;
    } else cellId = errorMessage;
    if (msg.blockid) {
      blockId = msg.blockid;
    } else blockId = errorMessage;
    if (msg.objecttypeid) {
      objectTypeId = msg.objecttypeid;
    } else objectTypeId = errorMessage;
    if (msg.bvid) {
      bvId = msg.bvid;
    } else bvId = errorMessage;
    if (msg.actbtnid) {
      actBtnId = msg.actbtnid;
    } else actBtnId = errorMessage2;
    if (msg.usersessionid) {
      userSessionId = msg.usersessionid;
    } else userSessionId =  errorMessage3;
    if (msg.pageActionID) {
      pageActionID = msg.pageActionID;
    } else pageActionID =  errorMessage3;
  });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "cellid") {
    chrome.tabs.sendMessage(tab.id, { action: "copyCellID", cellId }, response => {
      console.log(response)
    })
  }
  if (info.menuItemId === "blockid") {
    chrome.tabs.sendMessage(tab.id, { action: "copyBlockID", blockId }, response => {
      console.log(response)
    })
  }
  if (info.menuItemId === "objecttypeid") {
    chrome.tabs.sendMessage(tab.id, { action: "copyObjectTypeID", objectTypeId }, response => {
      console.log(response)
    })
  }
  if (info.menuItemId === "actionbuttonid") {
    chrome.tabs.sendMessage(tab.id, { action: "copyActionButtonID", actBtnId }, response => {
      console.log(response)
    })
  }
  if (info.menuItemId === "usersessionid") {
    chrome.tabs.sendMessage(tab.id, { action: "copyUserSessionID", userSessionId }, response => {
      console.log(response)
    })
  }
  if (info.menuItemId === "bvid") {
    chrome.tabs.sendMessage(tab.id, { action: "copyBvID", bvId }, response => {
      console.log(response)
    })
  }
  if (info.menuItemId === "pageactionid") {
    chrome.tabs.sendMessage(tab.id, { action: "copyPageActionID", pageActionID }, response => {
      console.log(response)
    })
  }
});

