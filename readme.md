# 🔔 LiteToast – Lightweight & Elegant JavaScript Toast Notifications

**LiteToast** is a minimal, flexible, and stylish vanilla JavaScript toast notification library built with zero dependencies. It's perfect for developers who want a plug-and-play toast system in any web project, whether personal or professional.<br/>

## 🚀 Features

* ✅ No dependencies – pure JavaScript
* 🎨 Predefined types: success, error, info, warning
* 🧠 Smart argument handling for multiple usage patterns
* 📌 Position options: `top-left`, `top-right`, `top-center`, `bottom-left`, `bottom-right`, `bottom-center`
* ⏱️ Custom duration control
* 🖼️ Built-in SVG icons with styling
* 💡 Smooth animations based on position<br/>


## 📦 Installation

### Option 1: Download

Download the [`toast.js`](toast.js) file and include it in your project:

```html
<script src="path/to/toast.js"></script><br/>
```

<!-- ### Option 2: CDN (via Githack)

```html
<script src="https://raw.githack.com/munaimpro/MyToast/main/toast.js"></script>
``` -->

## 🛠️ Basic Usage

Use the global function `showToastMessage()` to display toasts.

```js
showToastMessage('success', 'Data saved successfully!');
```

<br/>

## 🧠 Smart Usage Patterns

| Use Case                      | Example                                                       |
| ----------------------------- | ------------------------------------------------------------- |
| Only message                  | `showToastMessage('Hello there!')`                            |
| Type + Message                | `showToastMessage('success', 'Saved successfully!')`          |
| Message + Duration            | `showToastMessage('Loading...', 5000)`                        |
| Message + Position            | `showToastMessage('Hi!', 'top-center')`                       |
| Type + Message + Duration     | `showToastMessage('error', 'Something failed!', 4000)`        |
| Type + Message + Position     | `showToastMessage('info', 'Centered toast', 'bottom-center')` |
| Message + Duration + Position | `showToastMessage('Processing...', 6000, 'top-left')`         |

> Arguments are intelligently handled, so just focus on your message – the system figures out the rest.<br/>

## ⚙️ Positions

You can place the toast in any of the following screen corners:

* `top-left`
* `top-right`
* `top-center`
* `bottom-left`
* `bottom-right` (default)
* `bottom-center`<br/>

## 🎨 Toast Types & Icons

Each toast includes a built-in SVG icon depending on the type:

* ✅ `success` – Green check icon
* ❌ `error` – Red alert icon
* ℹ️ `info` – Blue info icon
* ⚠️ `warning` – Yellow warning icon<br/>

## 🧪 Live Demo

Try all combinations in the interactive [Documentation & Demo Page](https://munaimpro.github.io/lite-toast/)<br/>

## 💻 Developer Notes

* All toast styles are dynamically injected once.
* Animations vary based on the toast position (slide in from relevant direction).
* No global state pollution – safe to use in any app.
* Fully responsive and supports mobile devices.<br/>

## 📁 File Structure

```
MyToast/
│
├── toast.js          # Core JS library
├── index.html        # Documentation & live demo
└── README.md         # Project readme (you’re reading it!)
```
<br/>

## 🤝 Contribution

Contributions, improvements, and suggestions are always welcome!
Please feel free to submit a pull request or open an issue.<br/>

## 📜 License

MIT License © 2025 [Munaim Khan](https://github.com/munaimpro)