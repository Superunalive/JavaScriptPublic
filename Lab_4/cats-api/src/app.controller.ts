import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index(): string {
    // Небольшая HTML-страница со справкой по эндпоинтам
    return `
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <title>Cats API</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Helvetica,Arial,sans-serif;line-height:1.4;margin:24px;}
    code{background:#f5f5f5;padding:2px 6px;border-radius:4px;}
    h1{margin:0 0 8px;}
    small{color:#666}
    ul{margin:8px 0 16px 20px}
    .card{border:1px solid #eee;border-radius:8px;padding:16px;margin:16px 0;background:#fff}
  </style>
</head>
<body>
  <h1>Murlyka Cats API</h1>
  <small>cats-api · NestJS</small>

  <div class="card">
    <h3>Эндпоинты</h3>
    <ul>
      <li><code>GET /cats</code> — список котиков (поддерживает фильтры)</li>
      <li><code>GET /cats/:id</code> — один котик по <code>id</code></li>
      <li><code>POST /cats</code> — добавить котика</li>
      <li><code>PATCH /cats/:id</code> — частично изменить</li>
      <li><code>DELETE /cats/:id</code> — удалить</li>
    </ul>
  </div>

  <div class="card">
    <h3>Фильтры для <code>GET /cats</code></h3>
    <ul>
      <li><code>?name=строка</code> — поиск по части имени (без учета регистра)</li>
      <li><code>?color=строка</code> — поиск по части цвета</li>
      <li><code>?status=available|adopted|treatment</code> — точное совпадение</li>
      <li><code>?age=число</code> — точный возраст</li>
      <li><code>?minAge=число&amp;maxAge=число</code> — диапазон возраста</li>
      <li><code>?minWeight=число&amp;maxWeight=число</code> — диапазон веса</li>
    </ul>
  </div>

  <div class="card">
    <h3>Описание карточки</h3>
    <p><code>description</code> — массив строк (пункты). Если на вход приходит строка или поля фронта
      (<code>statusText</code>, <code>character</code>, <code>health</code>, <code>story</code>),
      бэкенд объединяет их в массив автоматически.</p>
  </div>
</html>`;
  }
}