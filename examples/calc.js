/**
 * 操作计算器
 * 请先自行打开计算器
 */

const win32  = require('../index');

(async () => {
  win32.user32.isDebug = false;

  let hWnd = await win32.user32.FindWindow(0, '计算器');
  await win32.user32.MessageBox(hWnd, `获取到的计算器的句柄是${hWnd}`, '提示', 0);
  // 在任务栏隐藏计算器窗口
  await win32.user32.ShowWindow(hWnd, 0);
})();
