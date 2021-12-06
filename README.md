# TODO list

---

- `npm i`
- `npm run start`- run api server nodemon
- PROFTI

---

### Пути приложения

- GET `/api/todos` - Получение всей коллекции дел
- GET `/api/todos/:id` - Получение коллекции под ID
- POST `/api/todos/` - Создание коллекции
  - Обязательно поля для создания дела:
    - "todo": 'Сдать практику', string
    - "chek": false, bool
- DELETE `/api/todos/:id` - удалении коллекции под ID
- PUT `/api/todos/:id` - Редактирование коллекции под ID
  - Обязательно поля для создания дела:
    - "todo": 'Сдать практику', string
    - "chek": false, bool
