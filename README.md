# YouTube Video Skip Extension

Расширение для Chrome, которое перематывает любое видео на YouTube в конец по одному нажатию кнопки.

---

**Язык / Language:** [Русский](#-русский) · [English](#-english)

---

## 🇷🇺 Русский

### Возможности

- **Интеграция с YouTube** — кнопка «В конец» в панели управления плеером (рядом с Play)
- **Popup** — нажмите на иконку расширения и используйте кнопку для перемотки видео активной вкладки в конец

### Установка

1. Клонируйте или скачайте этот репозиторий
2. Откройте Chrome и перейдите на `chrome://extensions/`
3. Включите **Режим разработчика** (переключатель в правом верхнем углу)
4. Нажмите **Загрузить распакованное расширение** и выберите папку с расширением

### Использование

- **На YouTube**: Нажмите кнопку «В конец» в панели управления плеером
- **Из popup**: Нажмите на иконку расширения, затем нажмите «В конец» для перемотки видео на активной вкладке

### Структура проекта

| Файл | Описание |
|------|----------|
| [manifest.json](manifest.json) | Манифест расширения (Manifest V3) |
| [content/content.js](content/content.js) | Content script: кнопки в плеере, обработка сообщений |
| [popup/popup.html](popup/popup.html), [popup/popup.js](popup/popup.js), [popup/popup.css](popup/popup.css) | Popup с кнопкой «В конец» |
| [icons/](icons/) | Иконки расширения (16, 48, 128 px) |

### Требования

- Chrome или браузер на базе Chromium

---

## 🇬🇧 English

### Features

- **YouTube integration** — "To end" button appears in the video player controls (next to Play)
- **Popup** — click the extension icon and use the button to skip the active tab's video to the end

### Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top-right)
4. Click **Load unpacked** and select the extension folder

### Usage

- **On YouTube**: Click the "To end" button in the player controls
- **From popup**: Click the extension icon, then click "To end" to skip the video on the active tab

### Project Structure

| File | Description |
|------|-------------|
| [manifest.json](manifest.json) | Extension manifest (Manifest V3) |
| [content/content.js](content/content.js) | Content script: player buttons, message handling |
| [popup/popup.html](popup/popup.html), [popup/popup.js](popup/popup.js), [popup/popup.css](popup/popup.css) | Popup with "To end" button |
| [icons/](icons/) | Extension icons (16, 48, 128 px) |

### Requirements

- Chrome or Chromium-based browser
