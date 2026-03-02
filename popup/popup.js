document.getElementById('skipBtn').addEventListener('click', async () => {
  const status = document.getElementById('status');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      status.textContent = 'Нет активной вкладки';
      return;
    }
    const res = await chrome.tabs.sendMessage(tab.id, { action: 'skipToEnd' });
    status.textContent = res?.success ? 'Готово' : 'Видео не найдено';
  } catch (e) {
    status.textContent = 'Откройте страницу с видео';
  }
  setTimeout(() => { status.textContent = ''; }, 2000);
});
