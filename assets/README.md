# Иконка приложения

Поместите сюда файл `icon.png` размером 256×256 пикселей.

Пример иконки: голубой карандаш на тёмном круглом фоне в стиле Windows 11 Fluent Design.

Для быстрой генерации можно использовать любой онлайн-редактор SVG→PNG, например:
- https://svgtopng.com/
- https://convertio.co/

SVG-пример иконки:
```svg
<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="256" rx="56" fill="#1a1a2e"/>
  <rect width="256" height="256" rx="56" fill="url(#grad)" opacity="0.6"/>
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00CFFE" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0066FF" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <g transform="translate(128,128) rotate(-45)">
    <rect x="-12" y="-70" width="24" height="100" rx="6" fill="#00CFFE"/>
    <polygon points="-12,30 12,30 0,55" fill="#0099FF"/>
    <rect x="-12" y="-90" width="24" height="22" rx="4" fill="#C0C0C0"/>
  </g>
</svg>
```
