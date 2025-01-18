const port = chrome.runtime.connect({ name: "content" });

function createSnackbar(message, id, duration = 3000 ) {
    // Create the snackbar element
    const snackbar = document.createElement('div');
    snackbar.classList.add('snackbar');
    snackbar.textContent = message;

    if(!parseInt(id)) {
        snackbar.textContent = 'Please select cell first!';
    }
  
    // Add styles (you can customize these)
    const style = document.createElement('style');
    style.innerHTML = `
      .snackbar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: #5ce65c;
        padding: 20px 30px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        z-index: 9999; 
        font-size: 1.4rem;
      }
      .snackbar.show {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  
    // Add the snackbar to the document
    document.body.appendChild(snackbar);
  
    // Show the snackbar
    snackbar.classList.add('show');
  
    // Hide the snackbar after the specified duration
    setTimeout(() => {
      snackbar.classList.remove('show');
      setTimeout(() => {
        snackbar.remove(); 
      }, 300); // Delay removal for smooth transition
    }, duration);
  }
  


function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

chrome.runtime.onMessage.addListener((req, sener, sendResponse) => {
    if(req.action === 'copyCellID') {
        copyToClipboard(req.cellId)
        createSnackbar(`Cell ID: ${req.cellId} copied!`, req.cellId);
    }
    if(req.action === 'copyBlockID') {
        copyToClipboard(req.blockId);
        createSnackbar(`Block ID: ${req.blockId} copied!`, req.blockId);
    }
    if(req.action === 'copyObjectTypeID') {
        copyToClipboard(req.objectTypeId)
        createSnackbar(`Object Type ID: ${req.objectTypeId} copied!`, req.objectTypeId);
    }
    if(req.action === 'copyActionButtonID') {
        copyToClipboard(req.actBtnId)
        createSnackbar(`Action Button ID: ${req.actBtnId} copied!`, req.actBtnId);
    }
    if(req.action === 'copyUserSessionID') {
        copyToClipboard(req.userSessionId)
        createSnackbar(`UserSession ID: ${req.userSessionId} copied!`, req.userSessionId);
    }
    if(req.action === 'copyBvID') {
        copyToClipboard(req.bvId)
        createSnackbar(`BV ID: ${req.bvId} copied!`, req.bvId);
    }
    if(req.action === 'copyPageActionID') {
        copyToClipboard(req.pageActionID)
        createSnackbar(`Page Action ID: ${req.pageActionID} copied!`, req.pageActionID);
    }
    sendResponse('Copied!');
})



window.addEventListener("mousedown", function (event) {

    // console.log(pageJSON)

    if (event.button === 2) {
      let cellid = null;
      let blockid = null;
      let objecttypeid = null;
      let bvid = null;
      let actbtnid = null;
      let usersessionid = null;
      let pageActionID = null;
      const attributes = event.target.attributes;
      
      const pageJSON = getPageJSON();

      usersessionid = pageJSON.hvars.filter(obj => obj.name === "DRAGON_SESSION_ID")[0]?.value;

  
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].name === "osviewid") {
          let values = attributes[i].value.split("_");
          // port.postMessage(values[values.length - 1]);
          if (values [2] === "AB") {
            actbtnid = values[3];
            pageActionID = values[1];
          } else {
            cellid = values[9];
            blockid = values[7];
            objecttypeid = values[3];
            pageActionID = values[1];
          }
        }
        if (attributes[i].name === "name") {
          let p = attributes[i].value.search("p");
  
          if (p === -1) {
            let values = attributes[i].value.split("_");
            bvid = values[values.length - 1];
          } else {
            let values = attributes[i].value.split("p");
            bvid = values[values.length - 1];
          }
        }
      }
  
      const message = {
        cellid,
        blockid,
        objecttypeid,
        bvid,
        actbtnid,
        usersessionid,
        pageActionID
      };
  
    //   console.log(message)
      port.postMessage(message);
    }
    else if (event.button === 1) {  
    } 
  });


  function getPageJSON() {

    let scriptID;
    const scripts = document.querySelectorAll("head > script");
    let finalScript;
    
    scripts.forEach((script, idx) => {
     searchResult = script.textContent.search('"name":"DRAGON_SESSION_ID","value":"');
     if(searchResult !== -1) {
         scriptID = {
             idx,
             start: searchResult
         }
     }
     })

    finalScript = scripts[scriptID.idx];
    var regex = /var\s+pageJSON\s*=\s*({.*?});/s;
    var match = finalScript.textContent.match(regex);
    if (match && match[1]) {
        var pageJSON = JSON.parse(match[1]);
        return pageJSON
    } else {
        return "pageJSON not found";
    }
  }