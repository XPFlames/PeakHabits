// script.js
let habits = JSON.parse(localStorage.getItem('habits')) || [];

document.getElementById('add-habit-button').addEventListener('click', addHabit);

function addHabit() {
    const habitText = document.getElementById('habit-input').value;
    const category = document.getElementById('category-select').value;
    if (habitText === '') return;
    const habit = {
        text: habitText,
        category: category,
        dates: {}
    };
    habits.push(habit);
    document.getElementById('habit-input').value = '';
    saveHabits();
    renderHabits();
}

function toggleHabitDate(habitIndex, date) {
    const habit = habits[habitIndex];
    habit.dates[date] = !habit.dates[date];
    saveHabits();
    renderHabits();
}

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabits() {
    const container = document.getElementById('habits-container');
    container.innerHTML = '';
    habits.forEach((habit, index) => {
        const card = document.createElement('div');
        card.className = 'habit-card';

        const header = document.createElement('div');
        header.className = 'habit-header';

        const title = document.createElement('h2');
        title.className = 'habit-title';
        title.textContent = habit.text;

        const category = document.createElement('span');
        category.className = 'habit-category';
        category.textContent = habit.category;

        header.appendChild(title);
        header.appendChild(category);

        const datesContainer = document.createElement('div');
        datesContainer.className = 'habit-dates';

        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            const dateElement = document.createElement('div');
            dateElement.className = 'habit-date';
            if (habit.dates[dateString]) {
                dateElement.classList.add('completed');
            }
            dateElement.addEventListener('click', () => {
                toggleHabitDate(index, dateString);
            });
            datesContainer.appendChild(dateElement);
        }

        card.appendChild(header);
        card.appendChild(datesContainer);
        container.appendChild(card);
    });
}

// Initial render
renderHabits();
