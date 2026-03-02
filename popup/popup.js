const t = (key) => chrome.i18n.getMessage(key);

document.documentElement.lang = chrome.i18n.getUILanguage();
document.getElementById('popupTitle').textContent = t('popupTitle');
document.getElementById('popupHint').textContent = t('popupHint');
document.getElementById('skipBtn').textContent = t('skipToEnd');

document.getElementById('skipBtn').addEventListener('click', async () => {
  const status = document.getElementById('status');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      status.textContent = t('noActiveTab');
      return;
    }
    const res = await chrome.tabs.sendMessage(tab.id, { action: 'skipToEnd' });
    status.textContent = res?.success ? t('done') : t('videoNotFound');
  } catch (e) {
    status.textContent = t('openVideoPage');
  }
  setTimeout(() => { status.textContent = ''; }, 2000);
});
