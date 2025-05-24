// 1. ✅ Получение данных через Promise.all
// ● Сделай три запроса:
// ○ /users
// ○ /posts
// ○ /todos
// ● Используй Promise.all
// ● Выведи:
// ○ Количество пользователей
// ○ Количество постов
// ○ Количество задач
// 💬 Что произойдёт, если один из URL будет неправильным?
// 2. ⚠️ Обработка ошибок через Promise.allSettled
// ● Повтори запросы, но один из них специально испорти (/todoss с лишней s)
// ● Используй Promise.allSettled
// ● Выведи:
// ○ Какие запросы сработали
// ○ Какие вернули ошибку (и почему)
// 3. 🏁 Быстрый ответ через Promise.race
// ● Сделай Promise.race между:
// ○ fetch('/users')
// ○ new Promise(resolve => setTimeout(() =>
// resolve('Медленно, но успешно'), 3000))
// ● Выведи, кто оказался быстрее.
// Base url - https://jsonplaceholder.typicode.com/

const baseUrl = "https://jsonplaceholder.typicode.com/";

const users = fetch(baseUrl + "/users").then((res) => {
  return res.json();
});

const posts = fetch(baseUrl + "/posts").then((res) => {
  return res.json();
});

const todos = fetch(baseUrl + "/todos").then((res) => {
  if (res.ok) {
    return res.json();
  }
});

const testPromise = new Promise((resolve) =>
  setTimeout(() => resolve("Медленно, но успешно"), 3000)
);

const errTodos = fetch(baseUrl + "/todoss").then((res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("ошибка");
  }
});

Promise.all([users, posts, todos])
  .then((res) => {
    console.log("Количество пользователей:", res[0].length);
    console.log("Количество постов:", res[1].length);
    console.log("Количество задач:", res[2].length);
  })
  .catch((err) => {
    console.log("ERR!!!!", err);
  });

Promise.allSettled([users, posts, errTodos])
  .then((res) => {
    console.log(res);

    console.log("Количество пользователей:", res[0].value.length);
    console.log("Количество постов:", res[1].value.length);
    console.log("Количество задач:", res[2].value.length);
  })
  .catch((err) => {
    console.log(err);
  });

Promise.race([users, testPromise]).then((res) => {
  console.log(" Users Быстрее !!!", res);
});
