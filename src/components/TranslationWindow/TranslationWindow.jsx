import { useEffect, useState } from 'react';
import cls from './TranslationWindow.module.css';

const TranslationWindow = () => {
    const [messages, setMessages] = useState([]);
    const [isLive, setIsLive] = useState(true); // Состояние для мигания кружка
    const [likes, setLikes] = useState(0); // Состояние для количества лайков

    // Список случайных сообщений
    const randomMessages = [
        'Какое красивое яйцо!',
        'Кажется, оно движется!',
        'Сколько времени оно здесь?',
        'Мне кажется, оно вот-вот треснет.',
        'Лучший стрим на сегодня!',
        'А лайки что-то дают?',
        'Кто ещё смотрит трансляцию яйца?',
        'А новый скин будет?',
        'Мама, я в эфире!',
        'Ничего эпичнее не видел!',
        'Оно растёт, или мне кажется?',
        'Это яйцо — мой новый идол!',
        'Хочется увидеть, что будет дальше!',
        'Кажется, яйцо собирается начать путешествие.',
        'Здесь происходят чудеса!',
        'Когда яйцо наконец-то лопнет?',
        'Почему оно не двигается?',
        'Какое оно необычное!',
        'В это сложно поверить, но яйцо живое!',
        'Яйцо и я — мы одно целое!',
        'Мне нужно больше яиц!',
        'Зрители, активней, яйцо ждёт ваших лайков!',
        'Что если оно не яйцо, а инопланетянин?',
        'Как думаете, что будет, если его покачать?',
        'Когда выстрелит первое яйцо?!',
        'Яйцо стало моим любимым героем!',
        'Жду с нетерпением, что будет с яйцом!',
        'Секреты яйца раскрываются!',
    ];

    // Список случайных ников
    const randomNicknames = [
        'User123',
        'EggFan',
        'StreamerLover',
        'RandomWatcher',
        'CoolDude',
        'EggMaster',
        'ChatGuru',
        'Anonymous',
    ];

    const getImageByLikes = () => {
        // Изменили требования для скинов
        if (likes < 25) return '/eggitch/egg1.jpg';
        if (likes < 50) return '/egg2.jpg';
        if (likes < 75) return '/egg3.jpg';
        if (likes < 100) return '/egg4.jpg';
        if (likes <= 150) return '/egg5.jpg';
        if (likes > 150 && likes < 100000) return '/egg6.jpg';
        // return '/egg7.jpg'; // Новый скин
    };

    // Генерация случайного сообщения каждые 2-5 секунд
    useEffect(() => {
        const interval = setInterval(() => {
            const randomMessageIndex = Math.floor(Math.random() * randomMessages.length);
            const randomNicknameIndex = Math.floor(Math.random() * randomNicknames.length);

            const newMessage = {
                nickname: randomNicknames[randomNicknameIndex],
                text: randomMessages[randomMessageIndex],
            };

            setMessages((prevMessages) => {
                // Ограничиваем количество сообщений в чате (например, 50)
                const updatedMessages = [...prevMessages, newMessage];
                return updatedMessages.length > 50 ? updatedMessages.slice(-50) : updatedMessages;
            });
        }, Math.random() * (5000 - 2000) + 2000); // Интервал от 2 до 5 секунд

        return () => clearInterval(interval);
    }, []);

    // Случайное увеличение лайков каждые 5-10 секунд
    useEffect(() => {
        const randomLikesInterval = setInterval(() => {
            const randomIncrease = Math.random() < 0.5 ? 1 : Math.floor(Math.random() * 3) + 1; // Либо 1, либо случайное увеличение от 2 до 3
            setLikes((prevLikes) => prevLikes + randomIncrease);
        }, Math.random() * (10000 - 5000) + 5000); // Инкремент каждые 5-10 секунд

        return () => clearInterval(randomLikesInterval);
    }, []);

    // Эффект для мигания кружка
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsLive((prev) => !prev);
        }, 500); // Мигание каждые 500 мс

        return () => clearInterval(blinkInterval);
    }, []);

    // Эффект для проверки лайков и показа предупреждения
    useEffect(() => {
        if (likes >= 200) {
            alert(
                'Этот сайт пытается использовать ваш браузер для добычи криптовалюты. Это может создать заметную нагрузку на процессор. Закройте страницу немедленно!'
            );
            window.close(); // Закрывает вкладку
        }
    }, [likes]);

    return (
        <div className={cls.translationWindow}>
            <div className={cls.translation}>
            
                <div className={cls.translationVideo}>
                    <img className={cls.translationImg} src={getImageByLikes()} alt="Egg" />
                    <div className={cls.liveIndicatorWrapper}>
                        <div className={`${cls.liveIndicator} ${isLive ? cls.liveOn : ''}`}></div>
                        <span className={cls.liveText}>В эфире</span>
                    </div>
                </div>
                

                <div className={cls.translationActions}>
                    <h2>ТРАНСЛЯЦИЯ ЯЙЦА</h2>
                    <div className={cls.likesCounter}>
                    <button onClick={() => setLikes((prev) => prev + 1)}>ЛАЙК</button>
                    <p>{likes} likes</p>
                    </div>
                </div>
            </div>

            <div className={cls.chatBlock}>
                <h3>Чат</h3>
                <div className={cls.chatMessages}>
                    {messages.map((message, index) => (
                        <div key={index} className={cls.chatMessage}>
                            <strong>{message.nickname}:</strong> {message.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TranslationWindow;
