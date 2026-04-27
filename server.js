const express = require('express');
const app = express();
const PORT = 3000;

// Middleware: дозволяє серверу розуміти JSON у тілі запиту та роздавати статику з папки public
app.use(express.json());
app.use(express.static('public'));

// REST API Endpoint для обробки форми (метод POST)
app.post('/api/users', (req, res) => {
    const { name, email, age } = req.body;

    // Серверна перевірка даних (Validation)
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Поле "Ім\'я" є обов\'язковим.' });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Введено некоректний email.' });
    }
    if (!age || isNaN(age) || age < 18) {
        return res.status(400).json({ error: 'Вік повинен бути числом (мінімум 18 років).' });
    }

    // Тут зазвичай відбувається збереження в базу даних (PostgreSQL, MongoDB тощо)
    console.log(`Отримано нові дані: Ім'я: ${name}, Email: ${email}, Вік: ${age}`);

    // Відправка успішної відповіді клієнту (Статус 201 Created)
    res.status(201).json({ 
        message: 'Дані успішно пройшли перевірку та збережені на сервері!',
        user: { name, email, age }
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущено. Відкрийте http://localhost:${PORT}`);
});