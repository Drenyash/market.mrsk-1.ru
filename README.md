# dranik
Start template - webpack/scss

## CSS

Все пишем в scss и в БЭМ. Стили библиотек импортируем в `src\js\index.js`;

## SVG

1. Иконки для спрайта кладем в `src\assets\sprite`
2. Импортируем их в `src\js\sprite.js`
3. После этого они доступны по названию файла:

`
<svg>
    <use xlink:href="#icon-camera"></use>
</svg>
`

## Страницы и includes

HTML-части лежат в папке `src\includes`  
Они импортируются в файл `src\js\pages.js`, там же определяются новые страницы и заголовок страницы

## API

В проект включен [JSON server](https://github.com/typicode/json-server) для имитации API. Данные хранятся в файле data.json в корне проекта. Сервер доступен по адресу `http://localhost:3001/`  
Запустить сервер: `npm run server`