const asyncExec = require('../../asyncExec');

function filterOutput(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '').replace(/[\r\n]/g, '');
}

module.exports = {
  isDebug: false,

  /**
   * Retrieves a handle to the top-level window whose class name and window name match the specified strings. This function does not search child windows. This function does not perform a case-sensitive search.
   * @param {String} lpClassName The class name or a class atom created by a previous call to the RegisterClass or RegisterClassEx function. The atom must be in the low-order word of lpClassName; the high-order word must be zero.
   * @param {String} lpWindowName The window name (the window's title). If this parameter is NULL, all window names match.
   * @returns {String} HWND 
   */
  FindWindow: async function (lpClassName, lpWindowName) {
    lpClassName = lpClassName || '0';
    lpWindowName = lpWindowName || '0';
    let cmdStr = `${__dirname}\\user32.exe FindWindow "${lpClassName}" "${lpWindowName}"`;
    if (this.isDebug === true)  console.log(`called FindWindow: ${cmdStr}`);
    let eObj = await asyncExec(cmdStr);
    let output = filterOutput(eObj.data);
    return output;
  },

  /**
   * Displays a modal dialog box that contains a system icon, a set of buttons, and a brief application-specific message, such as status or error information. The message box returns an integer value that indicates which button the user clicked.
   * @param {String} hWnd A handle to the owner window of the message box to be created. If this parameter is NULL, the message box has no owner window.
   * @param {String} lpText The message to be displayed. If the string consists of more than one line, you can separate the lines using a carriage return and/or linefeed character between each line.
   * @param {String} lpCaption The dialog box title. If this parameter is NULL, the default title is Error.
   * @param {String} uType The contents and behavior of the dialog box. This parameter can be a combination of flags from the following groups of flags.
   * @returns {String} HWND 
   */
  MessageBox: async function (hWnd, lpText, lpCaption, uType) {
    hWnd = hWnd || '0';
    lpText = lpText || '0';
    lpCaption = lpCaption || '0';
    uType = uType || '0';
    let cmdStr = `${__dirname}\\user32.exe MessageBox "${hWnd}" "${lpText}" "${lpCaption}" "${uType}"`;
    if (this.isDebug === true) console.log(`called MessageBox: ${cmdStr}`);
    let eObj = await asyncExec(cmdStr);
    return filterOutput(eObj.data);
  },

  /**
   * Sends the specified message to a window or windows. The SendMessage function calls the window procedure for the specified window and does not return until the window procedure has processed the message.
   * @param {String} hWnd A handle to the window whose window procedure will receive the message. If this parameter is HWND_BROADCAST ((HWND)0xffff), the message is sent to all top-level windows in the system, including disabled or invisible unowned windows, overlapped windows, and pop-up windows; but the message is not sent to child windows.
   * @param {String} Msg The message to be sent.
   * @param {String} wParam Additional message-specific information.
   * @param {String} lParam Additional message-specific information.
   * @returns {String} The return value specifies the result of the message processing; it depends on the message sent.
   */
  SendMessage: async function (hWnd, Msg, wParam, lParam) {
    hWnd = hWnd || '0';
    Msg = Msg || '0';
    wParam = wParam || '0';
    lParam = lParam || '0';
    let cmdStr = `${__dirname}\\user32.exe SendMessage "${hWnd}" "${Msg}" "${wParam}" "${lParam}"`;
    if (this.isDebug === true) console.log(`called SendMessage: ${cmdStr}`);
    let eObj = await asyncExec(cmdStr);
    return filterOutput(eObj.data);
  },

  /**
   * This function sets the specified window's show state.
   * @param {String} hWnd Handle to the window.
   * @param {String} nCmdShow Specifies how the window is to be shown. The first time ShowWindow is called, the value should be the value obtained by the WinMain function in its nCmdShow parameter. In subsequent calls, this parameter can be one of the following values.
   * @returns {String} Nonzero indicates that the window was previously visible. Zero indicates that the window was previously hidden.
   */
  ShowWindow: async function (hWnd, nCmdShow) {
    hWnd = hWnd || '0';
    nCmdShow = nCmdShow || '0';
    let cmdStr = `${__dirname}\\user32.exe ShowWindow "${hWnd}" "${nCmdShow}"`;
    if (this.isDebug === true) console.log(`called ShowWindow: ${cmdStr}`);
    let eObj = await asyncExec(cmdStr);
    return filterOutput(eObj.data);
  },

  /**
   * Enumerates all top-level windows on the screen by passing the handle to each window, in turn, to an application-defined callback function. EnumWindows continues until the last top-level window is enumerated or the callback function returns FALSE.
   * @param {Function} lpEnumFunc A pointer to an application-defined callback function. For more information, see EnumWindowsProc.
   * @param {String} lParam An application-defined value to be passed to the callback function.
   * @returns {Boolean} If the function succeeds, the return value is nonzero.
   */
  EnumWindows: async function (lpEnumFunc, lParam) {
    lpEnumFunc = lpEnumFunc || function() {};
    lParam = lParam || '0';
    let cmdStr = `${__dirname}\\user32.exe EnumWindows`;
    if (this.isDebug === true) console.log(`called EnumWindows: ${cmdStr}`);
    let eObj = await asyncExec(cmdStr);
    let array = JSON.parse(eObj.data.replace(",\r\n]", "\r\n]"));
    return array;
  },

  /**
   * This function copies the text of the specified window's title bar.
   * @param {String} hWnd  Handle to the window or control containing the text.
   * @param {String} nMaxCount Long pointer to the buffer that will receive the text.
   * @returns {String}
   */
  GetWindowText: async function (hWnd, nMaxCount ) {
    hWnd = hWnd || '0';
    nMaxCount = nMaxCount || '200';
    let cmdStr = `${__dirname}\\user32.exe GetWindowText "${hWnd}" "${nMaxCount}"`;
    if (this.isDebug === true) console.log(`called GetWindowText: ${cmdStr}`);
    let eObj = await asyncExec(cmdStr);
    return filterOutput(eObj.data);
  }
}