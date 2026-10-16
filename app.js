'use strict';

/* Цифролаб 7 — моделирование и формализация.
   Оценка, варианты и проверка кода считаются в браузере. */

const STORAGE_KEY = 'digitallab7-model-journal-v1';
const SECRET = ['M7', 'FGOS', 'LAB', '2026', 'MODEL', 'SALT', 'K9'].join('-');
const BLITZ_MS = 45000;
const READ_MS = 12000;
const AUTHOR = 'Усеинов Эмир Рустемович';
const ALPH = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const META = [
  null,
  {
    title: 'Модели и формализация',
    teaser: 'Объект, модель, существенные признаки',
    aim: 'Научиться отличать оригинал от модели и отбирать признаки под конкретную цель.',
    bullets: [
      'Чем модель отличается от объекта-оригинала',
      'Почему существенность признака зависит от цели',
      'Какие модели материальные, а какие информационные',
      'Что такое формализация'
    ],
    hw: 'Найти примеры моделей в науке или технике'
  },
  {
    title: 'Математические модели',
    teaser: 'Формулы, параметры и графики',
    aim: 'Описывать зависимость величин формулой и читать её по графику.',
    bullets: [
      'Что такое математическая модель',
      'Какие величины задают, а какую получают',
      'Как линейная зависимость выглядит на графике',
      'Зачем в модели учитывают важные условия, например ветер'
    ],
    hw: 'Решить 2 задачи по формулам'
  },
  {
    title: 'Алгоритмы и блок-схемы',
    teaser: 'Формализация действий',
    aim: 'Записывать жизненную задачу блок-схемой и прослеживать её на данных.',
    bullets: [
      'Какими свойствами обладает алгоритм',
      'Что означают овал, параллелограмм, прямоугольник и ромб',
      'Как устроены ветвление и цикл',
      'Как прогнать блок-схему на конкретном числе'
    ],
    hw: 'Описать алгоритм с условием'
  },
  {
    title: 'Таблицы, деревья и графы',
    teaser: 'Информационные модели связей',
    aim: 'Читать таблицы и взвешенный граф и находить маршрут нужной длины.',
    bullets: [
      'Таблица «объект — свойство» и «объект — объект»',
      'Иерархия как дерево',
      'Граф: вершины, рёбра и веса',
      'Кратчайший путь как наименьшая сумма весов'
    ],
    hw: 'Собрать свою информационную модель'
  }
];

const MISSIONS = [
  null,
  {
    name: 'Охота за признаками',
    icon: 'fa-solid fa-magnifying-glass',
    hue: '#3de0ff',
    story: 'Лаборатория получила заказ: отличить настоящий объект от модели и оставить только признаки, которые нужны для цели. Остальное — маскировка.',
    stations: [['Брифинг', '5 мин'], ['Теория', '12 мин'], ['Практика', '15 мин'], ['Дневник', '8 мин'], ['Блиц', '5 мин']],
    notes: [
      'Какой объект вы сегодня отличали от модели и зачем для него делают модель?',
      'Назовите два признака, которые были существенными, и объясните почему.',
      'Где в вашей жизни вы уже пользуетесь моделью, сами того не замечая?'
    ]
  },
  {
    name: 'Лаборатория формул',
    icon: 'fa-solid fa-chart-line',
    hue: '#9b8cff',
    story: 'Дрон и бак с водой подчиняются формулам. Ваша миссия — собрать математическую модель, увидеть её на графике и получить точное число.',
    stations: [['Брифинг', '5 мин'], ['Теория', '10 мин'], ['График', '18 мин'], ['Дневник', '7 мин'], ['Блиц', '5 мин']],
    notes: [
      'Какая формула была моделью вашей задачи и что в ней было результатом?',
      'Что изменилось бы на графике, если увеличить скорость или приток?',
      'Почему верхняя подпись шкалы не является готовым ответом?'
    ]
  },
  {
    name: 'Сборка алгоритма',
    icon: 'fa-solid fa-shapes',
    hue: '#ffc14d',
    story: 'Автомат в школе ждёт точных команд. Соберите блок-схему, прогоните число и объясните, почему исполнитель не умеет догадываться.',
    stations: [['Брифинг', '5 мин'], ['Теория', '10 мин'], ['Сборка схемы', '18 мин'], ['Дневник', '7 мин'], ['Блиц', '5 мин']],
    notes: [
      'Какой блок обозначает условие и почему он не прямоугольник?',
      'Что выдал ваш алгоритм на тестовом числе и какая ветка сработала?',
      'Придумайте своё «если …, то …, иначе …» из школьной жизни.'
    ]
  },
  {
    name: 'Карта маршрутов',
    icon: 'fa-solid fa-map-location-dot',
    hue: '#3ee0a0',
    story: 'Пять пунктов связаны дорогами с разной длиной. Перенесите веса на схему и найдите кратчайший путь. Побеждает не красивая линия, а меньшая сумма.',
    stations: [['Брифинг', '5 мин'], ['Теория', '10 мин'], ['Граф', '18 мин'], ['Дневник', '7 мин'], ['Блиц', '5 мин']],
    notes: [
      'Чем таблица «объект — объект» отличается от таблицы свойств?',
      'Какой маршрут вы нашли и почему он короче соседнего?',
      'Где ещё, кроме дорог, удобна модель-граф?'
    ]
  }
];

const THEORY = {
  1: [
    {
      title: 'Объект и модель',
      body: '<p>Объект-оригинал — реальный предмет, процесс или явление. Модель — упрощённое представление оригинала: в ней оставляют только то, что нужно для цели.</p><p>Моделирование — создание и исследование модели вместо оригинала. Так поступают, когда оригинал опасен, дорог, слишком велик или ещё не существует.</p>',
      correct: 'Чертёж крыла самолёта',
      options: ['Чертёж крыла самолёта', 'Живой самолёт у терминала', 'Ангар, где стоит самолёт', 'Пассажир, который смотрит на самолёт'],
      explain: 'Чертёж заменяет самолёт в задаче инженера. Сам самолёт, ангар и пассажир — объекты, а не эта модель.'
    },
    {
      title: 'Существенные признаки',
      body: '<p>Признак существенный, если без него модель не отвечает на поставленный вопрос. Для другой цели набор признаков будет другим.</p><p>Цвет кузова важен дизайнеру, но не нужен, чтобы посчитать расход топлива. Сначала формулируют цель, потом отбрасывают лишнее.</p>',
      correct: 'Расход топлива на 100 км и масса автомобиля',
      options: ['Расход топлива на 100 км и масса автомобиля', 'Цвет салона', 'Название радиостанции в магнитоле', 'Рисунок на чехлах сидений'],
      explain: 'Для расхода топлива нужны величины, от которых он зависит. Цвет и радиостанция на литры бензина не влияют.'
    },
    {
      title: 'Материальные и информационные',
      body: '<p>Материальная (натурная) модель сделана из вещества: макет, тренажёр, уменьшенная копия.</p><p>Информационная модель состоит из знаков: текст, таблица, формула, схема, программа. Её можно хранить в тетради или в компьютере.</p>',
      correct: 'Таблица с расписанием уроков',
      options: ['Таблица с расписанием уроков', 'Пластиковый макет здания', 'Металлическая игрушечная машина', 'Глобус на полке кабинета'],
      explain: 'Расписание — знаковая модель. Макет, игрушка и глобус вещественные, то есть материальные модели.'
    },
    {
      title: 'Формализация',
      body: '<p>Формализация — переход от слов на обычном языке к точной форме: формуле, таблице, схеме или чётким правилам.</p><p>Фразу «воды в бассейне прибывает» можно заменить моделью V = V₀ + q·t. После этого результат считают по правилам, в том числе на компьютере.</p>',
      correct: 'Записать зависимость объёма формулой V = V₀ + q·t',
      options: ['Записать зависимость объёма формулой V = V₀ + q·t', 'Посмотреть на бассейн вживую', 'Сказать «воды становится больше»', 'Сфотографировать бассейн без единой величины'],
      explain: 'Формализация заменяет расплывчатое описание точной записью, по которой можно вычислить результат.'
    },
    {
      title: 'Когда модель годится',
      body: '<p>Хорошая модель отвечает на вопрос цели. Она не обязана быть копией оригинала и не обязана содержать все его признаки.</p><p>Если цель — прочность моста, цвет перил можно не включать. Если цель — внешний вид, цвет как раз существенен.</p>',
      correct: 'Когда она отражает признаки, важные для выбранной цели',
      options: ['Когда она отражает признаки, важные для выбранной цели', 'Когда она красивее оригинала', 'Когда в ней оставлены вообще все признаки', 'Когда её обязательно сделали на компьютере'],
      explain: 'Мерило модели — цель. Лишние подробности не делают модель лучше, а иногда мешают.'
    }
  ],
  2: [
    {
      title: 'Математическая модель',
      body: '<p>Математическая модель описывает зависимость величин языком математики: формулой, уравнением или графиком.</p><p>Равномерное движение удобно записать как S = v·t. Буквы здесь не украшение: вместо них подставляют числа и получают путь.</p>',
      correct: 'Формула S = v·t',
      options: ['Формула S = v·t', 'Фраза «машина едет быстро»', 'Фотография машины', 'Руль автомобиля'],
      explain: 'Формула связывает путь, скорость и время. Фотография и руль не позволяют вычислить путь.'
    },
    {
      title: 'Что задают и что получают',
      body: '<p>Исходные данные — величины, которые уже известны и подставляются в модель. Результат — величина, которую модель позволяет найти.</p><p>В модели V = V₀ + q·t при известных V₀, q и t результатом будет объём V.</p>',
      correct: 'Объём V',
      options: ['Объём V', 'Название бассейна', 'Цвет воды', 'Буква t без числового значения'],
      explain: 'Если V₀, q и t известны, формула как раз вычисляет V. Название и цвет в эту модель не входят.'
    },
    {
      title: 'Как читать график',
      body: '<p>На графике зависимости по горизонтали обычно откладывают независимую величину, по вертикали — ту, которую наблюдают.</p><p>Точка (3; 150) на графике пути от времени означает: в момент 3 часа путь равен 150 км. Первое число — по горизонтали, второе — по вертикали.</p>',
      correct: 'За 3 часа путь составил 150 км',
      options: ['За 3 часа путь составил 150 км', 'За 150 часов путь составил 3 км', 'Скорость всегда равна 3 км/ч', 'Объём воды равен 150 л'],
      explain: 'В паре (t; S) первое число — время, второе — путь. Путать координаты нельзя.'
    },
    {
      title: 'Крутизна прямой',
      body: '<p>Если скорость постоянна, график пути — прямая. Чем больше скорость, тем быстрее растёт путь и тем круче прямая.</p><p>Два дрона стартуют из нуля. У того, чья скорость выше, график за то же время поднимется выше.</p>',
      correct: 'У дрона со скоростью 80 км/ч',
      options: ['У дрона со скоростью 80 км/ч', 'У дрона со скоростью 40 км/ч', 'Графики совпадут: скорость на наклон не влияет', 'Круче график того, у кого ярче корпус'],
      explain: 'При большем v путь S = v·t растёт быстрее, поэтому прямая круче. Цвет корпуса на график не влияет.'
    },
    {
      title: 'Какие условия входят в модель',
      body: '<p>Модель честна, когда в ней есть факторы, заметно влияющие на результат. Если дрон летит против ветра, скорость относительно земли меньше скорости относительно воздуха.</p><p>При v = 60 км/ч, встречном ветре 10 км/ч и t = 2 ч путь над землёй считают как S = (60 − 10)·2 = 100 км.</p>',
      correct: 'S = (60 − 10)·2',
      options: ['S = (60 − 10)·2', 'S = 60·2', 'S = (60 + 10)·2', 'S = 60 + 10 + 2'],
      explain: 'Встречный ветер уменьшает путевую скорость. Складывать v, w и t нельзя: это величины разных ролей.'
    }
  ],
  3: [
    {
      title: 'Что такое алгоритм',
      body: '<p>Алгоритм — понятное и точное описание шагов, ведущих к результату. Его свойства: дискретность (отдельные шаги), определённость (ясно, что делать), результативность (есть итог), массовость (подходит для разных данных одного типа).</p><p>Исполнитель выполняет шаги формально, не догадываясь «что имелось в виду».</p>',
      correct: '«Сделай хорошо и побыстрее»',
      options: ['«Сделай хорошо и побыстрее»', '«Если свет красный — стой, если зелёный — иди»', '«Введи два числа и сложи их»', '«Пока чайник не закипел — жди»'],
      explain: '«Хорошо и побыстрее» нельзя выполнить однозначно. В алгоритме каждый шаг должен быть понятен исполнителю.'
    },
    {
      title: 'Фигуры блок-схемы',
      body: '<p>Овал — начало или конец. Параллелограмм — ввод или вывод. Прямоугольник — действие. Ромб — условие с ответами «да» и «нет».</p><p>В ромб не записывают вычисление, а в прямоугольник не прячут вопрос.</p>',
      correct: 'Ромб',
      options: ['Ромб', 'Овал', 'Параллелограмм', 'Прямоугольник'],
      explain: 'Проверка «да/нет» стоит в ромбе. Овал начинает и заканчивает, параллелограмм вводит и выводит, прямоугольник выполняет действие.'
    },
    {
      title: 'Ветвление',
      body: '<p>Ветвление выбирает один из путей. Условие в ромбе истинно — идём по ветке «да», ложно — по ветке «нет».</p><p>Обе ветки сразу не выполняются. Поэтому в жизни «если хватает денег — купить, иначе — отказаться» — это ветвление.</p>',
      correct: 'Только одна ветка: «да» или «нет»',
      options: ['Только одна ветка: «да» или «нет»', 'Сразу все ветки', 'Ни одна ветка', 'Только блок «начало»'],
      explain: 'Условие направляет исполнителя по одной ветке. Вторая в этот проход не выполняется.'
    },
    {
      title: 'Цикл',
      body: '<p>Цикл повторяет действия, пока условие остаётся истинным. «Пока уроки не закончились — переходи к следующему» — повторение, а не одно ветвление.</p><p>У цикла должен быть понятный выход, иначе алгоритм не завершится.</p>',
      correct: 'Цикл',
      options: ['Цикл', 'Только начало алгоритма', 'Материальная модель', 'Таблица «объект — свойство»'],
      explain: 'Слово «пока» и повтор действия задают цикл. Таблица и макет — модели другого вида.'
    },
    {
      title: 'Формализация задачи',
      body: '<p>Чтобы превратить жизненную задачу в алгоритм, сначала называют исходные данные, правило решения и результат.</p><p>Для задачи «купить билет, если хватает денег» данными будут цена и сумма в кошельке, правилом — сравнение, результатом — покупка или отказ.</p>',
      correct: 'Определить данные, условие и ожидаемый результат',
      options: ['Определить данные, условие и ожидаемый результат', 'Сразу выбрать случайный график', 'Подобрать самый яркий цвет блоков', 'Удалить из задачи все условия'],
      explain: 'Формализация начинается с вопроса: что дано, как решаем и что хотим получить на выходе.'
    }
  ],
  4: [
    {
      title: 'Таблица «объект — свойство»',
      body: '<p>В такой таблице строка — объект, столбец — свойство, в клетке — значение. Один ученик — одна строка, рост и класс — столбцы.</p><p>Так удобно сравнивать объекты по одним и тем же признакам.</p>',
      correct: 'Модель «объект — свойство»',
      options: ['Модель «объект — свойство»', 'Взвешенный граф дорог', 'Только натурная модель', 'Циклический алгоритм'],
      explain: 'Имя, рост и класс — свойства объектов-учеников. Это не граф и не алгоритм.'
    },
    {
      title: 'Таблица «объект — объект»',
      body: '<p>Если и строки, и столбцы — объекты одного вида, на пересечении записывают связь: расстояние, оценку «играли друг с другом», наличие дороги.</p><p>Таблица километров между городами — модель «объект — объект».</p>',
      correct: 'Модель «объект — объект»',
      options: ['Модель «объект — объект»', 'Модель «объект — свойство»', 'Блок-схема цикла', 'Материальный макет города'],
      explain: 'И строка, и столбец здесь города, а число — связь между ними. Это не список свойств одного города.'
    },
    {
      title: 'Иерархия',
      body: '<p>Иерархическая модель — дерево: у корня есть потомки, у тех — свои, а циклов нет. Так устроены папки компьютера, оглавление, классификация животных.</p><p>Кольцо станций метро деревом не является: там путь замыкается.</p>',
      correct: 'Дерево папок на компьютере',
      options: ['Дерево папок на компьютере', 'Таблица умножения', 'Кольцевая линия метро', 'Один прямоугольник блок-схемы'],
      explain: 'Папки вложены друг в друга и не образуют кольца. Кольцевая линия — сеть, а не дерево.'
    },
    {
      title: 'Граф и вес ребра',
      body: '<p>Граф состоит из вершин и рёбер. Если на рёбрах стоят числа — граф взвешенный. На схеме дорог вершины — пункты, вес — расстояние или время.</p><p>Сетевая модель удобна, когда связи идут не только сверху вниз, а в разные стороны.</p>',
      correct: 'Расстояние или стоимость между двумя пунктами',
      options: ['Расстояние или стоимость между двумя пунктами', 'Цвет вершины', 'Имя автора карты', 'Номер школьного урока'],
      explain: 'Вес относится к ребру, то есть к связи двух вершин. Цвет и подпись автора весом ребра не являются.'
    },
    {
      title: 'Кратчайший путь',
      body: '<p>Длина маршрута на взвешенном графе — сумма весов его рёбер. Короче тот путь, у которого сумма меньше, а не тот, который нарисован выше.</p><p>Маршрут 4 км + 6 км длиннее маршрута 3 км + 3 км, хотя в обоих по два ребра.</p>',
      correct: 'А—В—Г, потому что сумма расстояний меньше',
      options: ['А—В—Г, потому что сумма расстояний меньше', 'А—Б—Г, потому что первое ребро длиннее', 'Они всегда равны, если вершин поровну', 'Тот, который нарисован выше на схеме'],
      explain: 'Сравнивают суммы: 3 + 3 = 6, а 4 + 6 = 10. Меньше сумма — короче путь.'
    }
  ]
};

const FEATURE_TASKS = [
  {
    object: 'Самолёт',
    goal: 'Рассчитать расход топлива в полёте',
    features: [
      ['Масса самолёта', true],
      ['Тяга двигателей', true],
      ['Расход топлива двигателем', true],
      ['Скорость и высота полёта', true],
      ['Ёмкость топливных баков', true],
      ['Цвет окраски фюзеляжа', false],
      ['Рисунок на салфетках', false],
      ['Название авиакомпании на билете', false],
      ['Цвет формы бортпроводников', false],
      ['Музыка в салоне', false]
    ]
  },
  {
    object: 'Самолёт',
    goal: 'Оценить удобство салона для пассажиров',
    features: [
      ['Шаг между креслами', true],
      ['Уровень шума в салоне', true],
      ['Температура и вентиляция', true],
      ['Ширина прохода', true],
      ['Объём полок для ручной клади', true],
      ['Марка сплава заклёпок крыла', false],
      ['Химический состав керосина', false],
      ['Частота бортового радара', false],
      ['Толщина обшивки киля', false],
      ['Число лопаток турбины', false]
    ]
  },
  {
    object: 'Смартфон',
    goal: 'Оценить, на сколько часов хватит заряда',
    features: [
      ['Ёмкость аккумулятора', true],
      ['Яркость экрана', true],
      ['Нагрузка процессора', true],
      ['Число активных приложений', true],
      ['Включён ли режим энергосбережения', true],
      ['Цвет чехла', false],
      ['Мелодия звонка', false],
      ['Рисунок обоев', false],
      ['Имя владельца на чехле', false],
      ['Форма наушников в комплекте', false]
    ]
  },
  {
    object: 'Смартфон',
    goal: 'Проверить прочность при падении',
    features: [
      ['Материал корпуса', true],
      ['Тип защитного стекла', true],
      ['Масса телефона', true],
      ['Высота падения', true],
      ['Наличие чехла-бампера', true],
      ['Цвет значков на экране', false],
      ['Список контактов', false],
      ['Обои рабочего стола', false],
      ['Имя в мессенджере', false],
      ['Громкость уведомлений', false]
    ]
  },
  {
    object: 'Здание школы',
    goal: 'Спланировать эвакуацию при пожаре',
    features: [
      ['Число и ширина выходов', true],
      ['План коридоров и лестниц', true],
      ['Количество людей в здании', true],
      ['Расположение огнетушителей', true],
      ['Время прохождения маршрута', true],
      ['Цвет штор в кабинете', false],
      ['Картины на стенах', false],
      ['Марка классной доски', false],
      ['Рисунок на портфелях', false],
      ['Название кружка рисования', false]
    ]
  },
  {
    object: 'Здание школы',
    goal: 'Рассчитать расход тепла зимой',
    features: [
      ['Площадь и высота помещений', true],
      ['Теплоизоляция стен и окон', true],
      ['Температура на улице', true],
      ['Мощность системы отопления', true],
      ['Сколько часов в сутки топят здание', true],
      ['Цвет фасадной краски', false],
      ['Текст на вывеске школы', false],
      ['Число мячей в спортзале', false],
      ['Расписание кружка пения', false],
      ['Форма дверных ручек', false]
    ]
  }
];

const CLASSIFY_ITEMS = [
  ['Глобус в кабинете географии', 'mat'],
  ['Формула пути S = v·t', 'inf'],
  ['Картонный макет моста', 'mat'],
  ['Таблица химических элементов', 'inf'],
  ['Автотренажёр с кабиной и рулём', 'mat'],
  ['Чертёж дома на экране компьютера', 'inf'],
  ['Схема линий метро', 'inf'],
  ['Манекен для отработки первой помощи', 'mat']
];

const HW_TOPICS = [
  'Приготовить чай',
  'Перейти дорогу по светофору',
  'Зарядить телефон',
  'Полить цветы',
  'Купить билет, если хватает денег'
];

function hashString(str) {
  let h = 2166136261;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(rng, list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

function randInt(rng, min, max) {
  return min + Math.floor(rng() * (max - min + 1));
}

function esc(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function normPerson(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').replace(/ё/gi, 'е').toLowerCase();
}

function prettyName(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').split('-').map((part) => {
    if (!part) return part;
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  }).join('-');
}

function normClass(value) {
  const latin = { A: 'А', B: 'В', C: 'С', E: 'Е', H: 'Н', K: 'К', M: 'М', O: 'О', P: 'Р', T: 'Т', X: 'Х', Y: 'У' };
  return String(value || '').trim().toUpperCase().replace(/\s+/g, '').replace(/[–—-]/g, '')
    .replace(/[A-Z]/g, (ch) => latin[ch] || ch);
}

function validPerson(value) {
  const name = prettyName(value);
  return name.length >= 2 && name.length <= 40 && /^[А-ЯЁA-Z][а-яёa-z]+(?:-[А-ЯЁA-Z][а-яёa-z]+)?$/i.test(name);
}

function validClass(value) {
  return /^\d{1,2}[А-ЯЁ]$/.test(normClass(value));
}

function normRoom(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, '').replace(/ё/g, 'е').replace(/[^a-zа-я0-9-]/g, '');
}

function validRoom(value) {
  const room = normRoom(value);
  return room.length >= 4 && room.length <= 40;
}

const PARALLEL_LETTERS = ['А', 'Б', 'В', 'Г', 'Л', 'Д', 'Е', 'Ж', 'И', 'Н'];

function parallelClassNames() {
  return PARALLEL_LETTERS.map((letter) => '7' + letter);
}

function roomFromClass(value) {
  const raw = String(value || '').trim().replace(/^class-/i, '');
  const normalized = normClass(raw);
  if (!validClass(normalized)) return '';
  return 'class-' + normRoom(normalized);
}

function cloudErrorText(error) {
  const code = (error && error.code) || '';
  const message = String((error && error.message) || '');
  if (code === 'auth/unauthorized-domain' || /unauthorized-domain/i.test(message)) {
    return 'Оценки сохранены на телефоне. Журнал с этого адреса сайта ещё не открыт.';
  }
  if (code === 'PERMISSION_DENIED' || /permission_denied/i.test(message)) {
    return 'Оценки сохранены на телефоне. Журнал класса запись не принял.';
  }
  if (/уже записано/.test(message)) return message;
  return 'Оценки сохранены на телефоне. В журнал класса они пока не ушли.';
}

function teacherErrorText(error) {
  const code = (error && error.code) || '';
  const message = String((error && error.message) || '');
  if (code === 'auth/unauthorized-domain' || /unauthorized-domain/i.test(message)) {
    return 'Вход с этого адреса закрыт. В Firebase откройте Authentication → Settings → Authorized domains и добавьте r1m1r.github.io.';
  }
  if (code === 'PERMISSION_DENIED' || /permission_denied/i.test(message)) {
    return 'Ведущим может стать только почта автора курса. Чужой аккаунт закрепить класс не может.';
  }
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return 'Почта или пароль не подошли. Если вход уже создавался, нужен тот пароль, либо письмо для смены пароля.';
  }
  return message || 'Не удалось открыть журнал';
}

function teacherEmailSaved() {
  try { return localStorage.getItem('digitallab7-teacher-email') || ''; } catch (error) { return ''; }
}

function mac(payload) {
  let h = hashString(String(payload) + '|' + SECRET);
  let out = '';
  for (let i = 0; i < 4; i++) {
    out += ALPH[h % ALPH.length];
    h = Math.imul(h ^ (h >>> 13), 0x5bd1e995) >>> 0;
  }
  return out;
}

function codePayload(parts) {
  return [
    normPerson(parts.lastName),
    normPerson(parts.firstName),
    normClass(parts.className),
    parts.lesson,
    parts.grade,
    parts.total,
    parts.seconds,
    parts.focus,
    parts.errors,
    parts.suspicious
  ].join('|');
}

function formatCode(student, lesson) {
  const seconds = Math.max(0, Math.round((lesson.timeMs || 0) / 1000));
  const focus = lesson.focusLostCount || 0;
  const errors = (lesson.trainer && lesson.trainer.errors) || 0;
  const suspicious = lesson.suspiciousFast || 0;
  const check = mac(codePayload({
    lastName: student.lastName,
    firstName: student.firstName,
    className: student.className,
    lesson: lesson.n,
    grade: lesson.grade,
    total: lesson.total,
    seconds,
    focus,
    errors,
    suspicious
  }));
  return `U${lesson.n}-${lesson.grade}-${String(lesson.total).padStart(3, '0')}-T${seconds}-F${focus}-E${errors}-S${suspicious}-${check}`;
}

function verifyCode(student, code) {
  const match = String(code || '').trim().match(/^U([1-4])-([2-5])-(\d{3})-T(\d+)-F(\d+)-E(\d+)-S(\d+)-([A-Z2-9]{4})$/);
  if (!match) return { ok: false, reason: 'Код не похож на код лаборатории.' };
  const decoded = {
    lesson: Number(match[1]),
    grade: Number(match[2]),
    total: Number(match[3]),
    seconds: Number(match[4]),
    focus: Number(match[5]),
    errors: Number(match[6]),
    suspicious: Number(match[7])
  };
  const expect = mac(codePayload({
    lastName: student.lastName,
    firstName: student.firstName,
    className: student.className,
    lesson: decoded.lesson,
    grade: decoded.grade,
    total: decoded.total,
    seconds: decoded.seconds,
    focus: decoded.focus,
    errors: decoded.errors,
    suspicious: decoded.suspicious
  }));
  return Object.assign({ ok: expect === match[8], reason: expect === match[8] ? '' : 'Код не совпал с фамилией, именем и классом. Оценка могла быть изменена.' }, decoded);
}

function canon(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(canon).join(',') + ']';
  const keys = Object.keys(value).filter((key) => key !== 'sig').sort();
  return '{' + keys.map((key) => JSON.stringify(key) + ':' + canon(value[key])).join(',') + '}';
}

function sign(obj) {
  return hashString(canon(obj) + '|' + SECRET).toString(16).padStart(8, '0');
}

function gradeFrom(total) {
  if (total >= 85) return 5;
  if (total >= 65) return 4;
  if (total >= 45) return 3;
  return 2;
}

function gradeWord(grade) {
  return { 5: 'Отлично', 4: 'Хорошо', 3: 'Удовлетворительно', 2: 'Нужна доработка' }[grade] || 'Нет оценки';
}

function focusPenalty(count) {
  if (!count || count < 2) return 0;
  return Math.min(20, (count - 1) * 5);
}

function recompute(lesson) {
  const theoryScore = (lesson.theory.cards || []).reduce((sum, card) => sum + (card.points || 0), 0);
  const trainerScore = Math.max(0, 45 - 10 * ((lesson.trainer && lesson.trainer.errors) || 0));
  const blitzScore = (lesson.blitz.results || []).reduce((sum, item) => sum + (item.points || 0), 0);
  const penalty = focusPenalty(lesson.focusLostCount || 0);
  const total = Math.max(0, Math.min(100, theoryScore + trainerScore + blitzScore - penalty));
  return { theoryScore, trainerScore, blitzScore, penalty, total, grade: gradeFrom(total) };
}

function featureErrors(features, picked) {
  const set = new Set(picked || []);
  return features.reduce((sum, feature) => sum + ((set.has(feature.id) !== feature.essential) ? 1 : 0), 0);
}

function buildAdj(edges) {
  const adj = {};
  edges.forEach((edge) => {
    if (!adj[edge.a]) adj[edge.a] = [];
    if (!adj[edge.b]) adj[edge.b] = [];
    adj[edge.a].push({ to: edge.b, w: edge.w });
    adj[edge.b].push({ to: edge.a, w: edge.w });
  });
  return adj;
}

function allSimplePaths(adj, start, goal) {
  const result = [];
  const guard = Object.keys(adj).length + 1;
  function walk(node, path, len, seen) {
    if (path.length > guard) return;
    if (node === goal) {
      result.push({ path: path.slice(), len });
      return;
    }
    (adj[node] || []).forEach((edge) => {
      if (seen.has(edge.to)) return;
      seen.add(edge.to);
      path.push(edge.to);
      walk(edge.to, path, len + edge.w, seen);
      path.pop();
      seen.delete(edge.to);
    });
  }
  walk(start, [start], 0, new Set([start]));
  return result;
}

function shortestVia(adj, from, via, to) {
  const paths = allSimplePaths(adj, from, to).filter((item) => item.path.includes(via));
  paths.sort((a, b) => a.len - b.len || a.path.length - b.path.length);
  return paths[0] || null;
}

function isMeaningful(text, minLen) {
  const value = String(text || '').trim();
  if (value.length < minLen || value.length > 400) return false;
  if (!/[а-яёa-z]/i.test(value)) return false;
  if (/^[\d\s.,:;+\-*/=]+$/.test(value)) return false;
  const compact = value.replace(/\s+/g, '');
  if (compact.length >= 4 && /^(.)\1+$/.test(compact)) return false;
  const banned = ['12345', '123456', 'qwerty', 'asdf', 'йцукен', 'тест', 'проверка', 'аааа', 'asdfgh', 'модель', 'объект', 'формула', 'алгоритм', 'граф', 'таблица', 'нет', 'да', 'тип', 'задача', 'ответ'];
  if (banned.includes(value.toLowerCase())) return false;
  if (minLen >= 12) {
    const words = value.split(/\s+/).filter((word) => /[а-яёa-z]/i.test(word) && word.length >= 2);
    if (words.length < 2) return false;
  }
  return true;
}

function hasFormula(text) {
  const value = String(text || '');
  return /=/.test(value) && /[a-zа-яё]/i.test(value);
}

function hasCalculation(text) {
  const value = String(text || '').trim();
  if (value.length < 5 || value.length > 400) return false;
  if (!/\d/.test(value)) return false;
  if (!/[=+\-−·*/]/.test(value)) return false;
  const compact = value.replace(/\s+/g, '');
  if (compact.length >= 4 && /^(.)\1+$/.test(compact)) return false;
  const banned = ['12345', '123456', '00000', 'тест', 'qwerty'];
  return banned.indexOf(value.toLowerCase()) < 0;
}

function hasBranch(text) {
  return /если\s+.+?\s*,?\s*то\s+.+?\s*,?\s*иначе\s+\S+/i.test(String(text || ''));
}

function makeChoice(rng, spec) {
  const options = shuffle(rng, [spec.correct].concat(spec.wrong));
  return {
    type: 'choice',
    complex: !!spec.complex,
    minMs: spec.complex ? 2000 : 700,
    text: spec.text,
    options,
    correctIndex: options.indexOf(spec.correct),
    explain: spec.explain,
    usesGraph: !!spec.usesGraph
  };
}

function makeNumber(spec) {
  return {
    type: 'number',
    complex: true,
    minMs: 2000,
    text: spec.text,
    answer: spec.answer,
    explain: spec.explain,
    graph: spec.graph || null,
    usesGraph: !!spec.usesGraph
  };
}

function buildTheory(n, rng) {
  return THEORY[n].map((card) => {
    const options = shuffle(rng, card.options.slice());
    return {
      title: card.title,
      body: card.body,
      options,
      correctIndex: options.indexOf(card.correct),
      explain: card.explain,
      attempts: 0,
      points: 0,
      solved: false,
      wrong: []
    };
  });
}

function blankLesson(n, seed) {
  return {
    n,
    seed,
    phase: 'goal',
    startedAt: null,
    finishedAt: null,
    timeMs: 0,
    lastTick: null,
    focusLostCount: 0,
    cheatArmedAt: null,
    suspiciousFast: 0,
    theory: { index: 0, cardStartedAt: null, cards: [] },
    trainer: { errors: 0 },
    blitz: {
      index: 0,
      questions: [],
      results: [],
      qStartedAt: null,
      deadline: null,
      acceptAfter: 0,
      review: false
    },
    theoryScore: 0,
    trainerScore: 0,
    blitzScore: 0,
    penalty: 0,
    total: null,
    grade: null,
    code: null,
    notes: ['', '', ''],
    notesDone: false
  };
}

function copyTask(task, rng) {
  const features = shuffle(rng, task.features.map((item, index) => ({
    id: 'f' + index,
    text: item[0],
    essential: item[1]
  })));
  return { object: task.object, goal: task.goal, features, picked: [], submitted: false };
}

function buildTrainer1(rng) {
  const task = copyTask(FEATURE_TASKS[Math.floor(rng() * FEATURE_TASKS.length)], rng);
  const items = shuffle(rng, CLASSIFY_ITEMS.map((item, index) => ({
    id: 'c' + index,
    text: item[0],
    type: item[1]
  })));
  return { stage: 'features', task, items, answers: {}, classSubmitted: false };
}

function nudge(rng, value, min, max, step) {
  const values = [];
  for (let current = min; current <= max; current += step) {
    if (current !== value) values.push(current);
  }
  return values[Math.floor(rng() * values.length)];
}

function buildTrainer2(rng) {
  const drone = rng() < 0.5;
  let scenario;
  if (drone) {
    const v = 40 + Math.floor(rng() * 7) * 5;
    let w = 5 + Math.floor(rng() * 3) * 5;
    if (w >= v) w = 5;
    const t = 2 + Math.floor(rng() * 4);
    scenario = {
      kind: 'drone',
      story: `Дрон летит со скоростью v = ${v} км/ч относительно воздуха. Встречный ветер w = ${w} км/ч. Время полёта t = ${t} ч. Найдите путь относительно земли.`,
      sliders: {
        v: { label: 'v, км/ч', min: 20, max: 90, step: 5, target: v, value: nudge(rng, v, 20, 90, 5) },
        w: { label: 'w, км/ч', min: 0, max: 30, step: 5, target: w, value: nudge(rng, w, 0, 30, 5) },
        t: { label: 't, ч', min: 1, max: 8, step: 1, target: t, value: nudge(rng, t, 1, 8, 1) }
      },
      formulas: shuffle(rng, [
        { text: 'S = (v − w) · t', ok: true },
        { text: 'S = (v + w) · t', ok: false },
        { text: 'S = v · t + w', ok: false },
        { text: 'S = v · w · t', ok: false }
      ]),
      mainAsk: 'Чему равен путь S относительно земли, в километрах?',
      mainAnswer: (v - w) * t,
      extraAsk: 'Чему равна скорость дрона относительно земли, в км/ч?',
      extraAnswer: v - w
    };
  } else {
    const v0 = (4 + Math.floor(rng() * 9)) * 50;
    const q = (2 + Math.floor(rng() * 7)) * 5;
    const t = 6 + Math.floor(rng() * 10);
    scenario = {
      kind: 'pool',
      story: `В баке уже V₀ = ${v0} л воды. Каждую минуту доливают q = ${q} л. Прошло t = ${t} мин. Найдите объём воды в баке.`,
      sliders: {
        v0: { label: 'V₀, л', min: 0, max: 1000, step: 50, target: v0, value: nudge(rng, v0, 0, 1000, 50) },
        q: { label: 'q, л/мин', min: 5, max: 60, step: 5, target: q, value: nudge(rng, q, 5, 60, 5) },
        t: { label: 't, мин', min: 1, max: 30, step: 1, target: t, value: nudge(rng, t, 1, 30, 1) }
      },
      formulas: shuffle(rng, [
        { text: 'V = V₀ + q · t', ok: true },
        { text: 'V = V₀ · q · t', ok: false },
        { text: 'V = V₀ − q · t', ok: false },
        { text: 'V = (V₀ + q) · t', ok: false }
      ]),
      mainAsk: 'Чему равен объём V, в литрах?',
      mainAnswer: v0 + q * t,
      extraAsk: 'На сколько литров вырос объём за это время?',
      extraAnswer: q * t
    };
  }
  scenario.formulaPick = null;
  scenario.formulaLocked = false;
  scenario.mainLocked = false;
  scenario.extraLocked = false;
  return { stage: 'formula', scenario };
}

function discountPrice(sample, threshold, percent) {
  if (sample < threshold) return sample;
  return Math.round(sample * (100 - percent) / 100);
}

function algoChallenge(rng, algo) {
  if (algo.kind === 'discount') {
    const above = rng() < 0.5;
    const sample = above ? algo.threshold + 400 : Math.max(100, algo.threshold - 200);
    const price = discountPrice(sample, algo.threshold, algo.percent);
    return {
      type: 'number',
      sample,
      answer: price,
      text: `По собранному алгоритму скидки ввели сумму ${sample} ₽. Какая цена получится на выходе? Введите число рублей.`,
      explain: sample >= algo.threshold
        ? `Сумма не меньше порога ${algo.threshold} ₽, поэтому скидка ${algo.percent}%. Цена = ${sample} − ${algo.percent}% = ${price} ₽.`
        : `Сумма меньше порога ${algo.threshold} ₽, скидки нет. Цена остаётся ${price} ₽.`
    };
  }
  if (algo.kind === 'climate') {
    const sample = algo.limit + (rng() < 0.5 ? -2 : 2);
    const cool = sample > algo.limit;
    const correct = cool ? 'Включить охлаждение' : 'Выключить охлаждение';
    const options = shuffle(rng, [correct, cool ? 'Выключить охлаждение' : 'Включить охлаждение', 'Включить нагрев', 'Завершить без проверки температуры']);
    return {
      type: 'choice',
      sample,
      options,
      correctIndex: options.indexOf(correct),
      text: `На вход климат-контроля подали T = ${sample}. Что должен выдать алгоритм?`,
      explain: cool
        ? `${sample} > ${algo.limit}, условие истинно, включается охлаждение.`
        : `${sample} не больше ${algo.limit}, условие ложно, охлаждение выключено.`
    };
  }
  const sample = rng() < 0.5 ? 0 : randInt(rng, 1, 4);
  const open = sample >= 1;
  const correct = open ? 'Турникет открыт, один проход списан' : 'Отказ: проходов нет';
  const options = shuffle(rng, [correct, open ? 'Отказ: проходов нет' : 'Турникет открыт, один проход списан', 'Турникет открыт, но проход не списан', 'Алгоритм зациклился и ничего не вывел']);
  return {
    type: 'choice',
    sample,
    options,
    correctIndex: options.indexOf(correct),
    text: `На карте остаток N = ${sample}. Что выведет алгоритм турникета?`,
    explain: open
      ? `N = ${sample} ≥ 1, поэтому турникет открывается и списывает один проход.`
      : 'N = 0, условие N ≥ 1 ложно, турникет отказывает.'
  };
}

function buildTrainer3(rng) {
  const kind = ['turnstile', 'climate', 'discount'][Math.floor(rng() * 3)];
  let algo;
  if (kind === 'climate') {
    const limit = 20 + Math.floor(rng() * 7);
    algo = {
      kind,
      title: 'Умный климат-контроль',
      story: `Система измеряет температуру в кабинете. Если T > ${limit}, она включает охлаждение, иначе выключает его.`,
      limit,
      blocks: [
        { id: 's', text: 'Начало', shape: 'oval' },
        { id: 'in', text: 'Ввод температуры T', shape: 'para' },
        { id: 'if', text: `T > ${limit}?`, shape: 'diamond' },
        { id: 'yes', text: 'Включить охлаждение', shape: 'rect' },
        { id: 'no', text: 'Выключить охлаждение', shape: 'rect' },
        { id: 'out', text: 'Вывод режима', shape: 'para' },
        { id: 'e', text: 'Конец', shape: 'oval' }
      ]
    };
  } else if (kind === 'discount') {
    const threshold = [1000, 1500, 2000, 2500][Math.floor(rng() * 4)];
    const percent = [10, 15, 20][Math.floor(rng() * 3)];
    algo = {
      kind,
      title: 'Расчёт скидки в магазине',
      story: `Если сумма покупки не меньше ${threshold} ₽, цена уменьшается на ${percent}%. Иначе скидки нет.`,
      threshold,
      percent,
      blocks: [
        { id: 's', text: 'Начало', shape: 'oval' },
        { id: 'in', text: 'Ввод суммы покупки', shape: 'para' },
        { id: 'if', text: `Сумма ≥ ${threshold} ₽?`, shape: 'diamond' },
        { id: 'yes', text: `Цена = сумма − ${percent}%`, shape: 'rect' },
        { id: 'no', text: 'Цена = сумма без скидки', shape: 'rect' },
        { id: 'out', text: 'Вывод цены', shape: 'para' },
        { id: 'e', text: 'Конец', shape: 'oval' }
      ]
    };
  } else {
    algo = {
      kind: 'turnstile',
      title: 'Автоматический турникет',
      story: 'Турникет получает остаток проходов N. Если N ≥ 1, он открывается и списывает один проход. Иначе отказывает.',
      blocks: [
        { id: 's', text: 'Начало', shape: 'oval' },
        { id: 'in', text: 'Ввод: остаток проходов N', shape: 'para' },
        { id: 'if', text: 'N ≥ 1?', shape: 'diamond' },
        { id: 'yes', text: 'Открыть турникет и вычесть 1 проход', shape: 'rect' },
        { id: 'no', text: 'Отказать: проходов нет', shape: 'rect' },
        { id: 'out', text: 'Вывод результата', shape: 'para' },
        { id: 'e', text: 'Конец', shape: 'oval' }
      ]
    };
  }
  algo.correct = ['s', 'in', 'if', 'yes', 'no', 'out', 'e'];
  algo.order = shuffle(rng, algo.correct.slice());
  if (algo.order.every((id, index) => id === algo.correct[index])) {
    const swap = algo.order[1];
    algo.order[1] = algo.order[2];
    algo.order[2] = swap;
  }
  algo.slots = [null, null, null, null, null, null, null];
  algo.bank = algo.order.slice();
  algo.picked = null;
  algo.orderLocked = false;
  algo.tracePick = null;
  algo.traceLocked = false;
  algo.challenge = algoChallenge(rng, algo);
  return { stage: 'order', algo };
}

function buildTrainer4(rng) {
  const names = { A: 'Дом', B: 'Школа', C: 'Парк', D: 'Библиотека', E: 'Стадион' };
  const pairs = [['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'D'], ['C', 'D'], ['C', 'E'], ['D', 'E']];
  const weights = shuffle(rng, [4, 5, 6, 7, 8, 9, 11, 12, 13, 14]).slice(0, pairs.length);
  const edges = pairs.map((pair, index) => ({ id: pair[0] + pair[1], a: pair[0], b: pair[1], w: weights[index] }));
  const vias = ['B', 'C', 'D'];
  let via = vias[Math.floor(rng() * vias.length)];
  if (!shortestVia(buildAdj(edges), 'A', via, 'E')) via = 'C';
  return {
    stage: 'edges',
    graph: { names, edges, via, draft: {}, given: null, edgeSubmitted: false, pathSubmitted: false }
  };
}

function buildLesson(n, seed) {
  const rng = mulberry32(seed >>> 0);
  const lesson = blankLesson(n, seed >>> 0);
  lesson.theory.cards = buildTheory(n, rng);
  if (n === 1) Object.assign(lesson.trainer, buildTrainer1(rng));
  if (n === 2) Object.assign(lesson.trainer, buildTrainer2(rng));
  if (n === 3) Object.assign(lesson.trainer, buildTrainer3(rng));
  if (n === 4) Object.assign(lesson.trainer, buildTrainer4(rng));
  return lesson;
}

function edgeWeight(graph, a, b) {
  const edge = graph.edges.find((item) => (item.a === a && item.b === b) || (item.a === b && item.b === a));
  return edge ? edge.w : null;
}

function attachBlitz(lesson) {
  const rng = mulberry32((lesson.seed ^ 0xa5a5a5a5) >>> 0);
  lesson.blitz.questions = buildBlitz(lesson, rng);
}

function otherSample(rng, algo, avoid) {
  let sample = avoid;
  let guard = 0;
  while (sample === avoid && guard < 8) {
    if (algo.kind === 'discount') {
      sample = rng() < 0.5 ? algo.threshold + 600 : Math.max(100, algo.threshold - 300);
    } else if (algo.kind === 'climate') {
      sample = algo.limit + (rng() < 0.5 ? -3 : 3);
    } else {
      sample = rng() < 0.5 ? 0 : randInt(rng, 2, 5);
    }
    guard += 1;
  }
  return sample;
}

function buildBlitz(lesson, rng) {
  if (lesson.n === 1) {
    const task = lesson.trainer.task;
    const essential = task.features.filter((feature) => feature.essential);
    const noise = shuffle(rng, task.features.filter((feature) => !feature.essential)).slice(0, 3);
    const correct = essential[Math.floor(rng() * essential.length)];
    return [
      makeChoice(rng, {
        complex: true,
        text: `Объект: ${task.object}. Цель: «${task.goal}». Какой признак существенный именно для этой цели?`,
        correct: correct.text,
        wrong: noise.map((feature) => feature.text),
        explain: `Для цели «${task.goal}» нужен признак «${correct.text}». Остальные на результат этой модели не влияют.`
      }),
      makeChoice(rng, {
        text: 'Что называют формализацией?',
        correct: 'Запись правила или зависимости в точном виде: формула, таблица, схема',
        wrong: ['Украшение модели цветами', 'Замена модели самим объектом-оригиналом', 'Удаление из модели всех чисел и правил'],
        explain: 'Формализация переводит описание на точный язык: формулу, таблицу или схему.'
      }),
      makeChoice(rng, {
        text: 'Какая пара названа верно?',
        correct: 'Модель — чертёж квартиры, оригинал — сама квартира',
        wrong: ['Модель — живой кот, оригинал — слово «кот»', 'Модель и оригинал всегда один и тот же предмет', 'Оригинал — это всегда компьютерная программа'],
        explain: 'Чертёж — модель, квартира — оригинал. Слово не является оригиналом живого кота.'
      }),
      makeChoice(rng, {
        text: 'Глобус в кабинете географии — это…',
        correct: 'Материальная модель Земли',
        wrong: ['Информационная модель только потому, что он круглый', 'Сам объект-оригинал, то есть планета', 'Алгоритм вращения Земли'],
        explain: 'Глобус — вещественная уменьшенная модель. Планета остаётся оригиналом.'
      })
    ];
  }
  if (lesson.n === 2) {
    const v = randInt(rng, 6, 16) * 5;
    const t = randInt(rng, 2, 6);
    const v0 = randInt(rng, 4, 12) * 50;
    const q = randInt(rng, 2, 8) * 5;
    const t2 = randInt(rng, 4, 12);
    const xMax = randInt(rng, 2, 4) * 2;
    const speed = randInt(rng, 5, 12) * 10;
    const yEnd = speed * xMax;
    return [
      makeNumber({
        text: `Велосипедист едет равномерно: v = ${v} км/ч, t = ${t} ч. Модель S = v·t. Чему равен путь S в километрах?`,
        answer: v * t,
        explain: `S = ${v} · ${t} = ${v * t} км.`
      }),
      makeNumber({
        text: `В бочке уже ${v0} л. Каждую минуту доливают ${q} л, прошло ${t2} мин. V = V₀ + q·t. Какой объём получится в литрах?`,
        answer: v0 + q * t2,
        explain: `V = ${v0} + ${q} · ${t2} = ${v0 + q * t2} л.`
      }),
      makeNumber({
        text: `График пути — прямая из (0; 0) в (${xMax}; ${yEnd}). Чему равен путь в километрах при t = ${xMax / 2} ч?`,
        answer: yEnd / 2,
        explain: `За половину времени путь тоже половина: ${yEnd} / 2 = ${yEnd / 2} км.`,
        graph: { xMax, y0: 0, slope: speed, yMax: Math.ceil(yEnd * 1.15), xLabel: 't, ч', yLabel: 'S, км' }
      }),
      makeChoice(rng, {
        text: 'Какая запись является математической моделью?',
        correct: 'Формула V = V₀ + q·t',
        wrong: ['Фраза «воды становится больше»', 'Фотография бочки', 'Кран, из которого течёт вода'],
        explain: 'Математическая модель записывает зависимость формулой, уравнением или графиком.'
      })
    ];
  }
  if (lesson.n === 3) {
    const algo = lesson.trainer.algo;
    const sample = otherSample(rng, algo, algo.challenge.sample);
    let trace;
    if (algo.kind === 'discount') {
      const price = discountPrice(sample, algo.threshold, algo.percent);
      trace = makeNumber({
        text: `Скидка ${algo.percent}% действует от ${algo.threshold} ₽. Покупатель принёс ${sample} ₽. Какая цена получится?`,
        answer: price,
        explain: sample >= algo.threshold
          ? `Порог достигнут: ${sample} − ${algo.percent}% = ${price} ₽.`
          : `До порога ${algo.threshold} ₽ сумма не дотянула, цена ${price} ₽.`
      });
    } else if (algo.kind === 'climate') {
      const cool = sample > algo.limit;
      trace = makeChoice(rng, {
        complex: true,
        text: `Климат-контроль: если T > ${algo.limit}, включить охлаждение, иначе выключить. Ввели T = ${sample}. Что будет на выходе?`,
        correct: cool ? 'Включить охлаждение' : 'Выключить охлаждение',
        wrong: [cool ? 'Выключить охлаждение' : 'Включить охлаждение', 'Включить нагрев', 'Не проверять температуру'],
        explain: cool ? `${sample} > ${algo.limit}, ветка «да».` : `${sample} не больше ${algo.limit}, ветка «нет».`
      });
    } else {
      const open = sample >= 1;
      trace = makeChoice(rng, {
        complex: true,
        text: `Турникет открывается, только если N ≥ 1, и тогда списывает один проход. Ввели N = ${sample}. Какой выход верен?`,
        correct: open ? 'Турникет открыт, один проход списан' : 'Отказ: проходов нет',
        wrong: [open ? 'Отказ: проходов нет' : 'Турникет открыт, один проход списан', 'Турникет открыт без списания', 'Алгоритм не заканчивается'],
        explain: open ? `N = ${sample} ≥ 1, проход разрешён и списан.` : 'N = 0, условие ложно, будет отказ.'
      });
    }
    return [
      makeChoice(rng, {
        text: 'В какой фигуре блок-схемы записывают условие?',
        correct: 'В ромбе',
        wrong: ['В овале', 'В параллелограмме', 'В прямоугольнике'],
        explain: 'Условие «да/нет» ставят в ромб. Прямоугольник — действие, параллелограмм — ввод или вывод, овал — начало или конец.'
      }),
      trace,
      makeChoice(rng, {
        text: 'Какая запись нарушает определённость алгоритма?',
        correct: '«Придумай красивый ответ»',
        wrong: ['«Раздели сумму на 2»', '«Если N ≥ 1, открой турникет»', '«Выведи цену»'],
        explain: 'Исполнитель не может одинаково понять слово «красивый». Шаг алгоритма должен быть однозначным.'
      }),
      makeChoice(rng, {
        text: 'Какой фрагмент является циклом?',
        correct: 'Пока на карте есть проходы, пропускай следующего ученика',
        wrong: ['Начало алгоритма', 'Вывести слово «готово»', 'Таблица расстояний между городами'],
        explain: '«Пока» повторяет действие. Это цикл. Однократный вывод циклом не является.'
      })
    ];
  }
  const graph = lesson.trainer.graph;
  const adj = buildAdj(graph.edges);
  let via = graph.via === 'C' ? 'B' : 'C';
  let best = shortestVia(adj, 'A', via, 'E');
  if (!best) {
    via = 'D';
    best = shortestVia(adj, 'A', via, 'E');
  }
  const route = edgeWeight(graph, 'A', 'B') + edgeWeight(graph, 'B', 'D') + edgeWeight(graph, 'D', 'E');
  return [
    makeNumber({
      usesGraph: true,
      text: 'По вашей таблице: чему равна длина маршрута Дом — Школа — Библиотека — Стадион, в километрах?',
      answer: route,
      explain: `Складываем три ребра: ${edgeWeight(graph, 'A', 'B')} + ${edgeWeight(graph, 'B', 'D')} + ${edgeWeight(graph, 'D', 'E')} = ${route} км.`
    }),
    makeNumber({
      usesGraph: true,
      text: `По вашей таблице найдите кратчайший путь от Дома до Стадиона через пункт «${graph.names[via]}». Введите его длину в километрах.`,
      answer: best.len,
      explain: `Один из кратчайших маршрутов: ${best.path.map((id) => graph.names[id]).join(' → ')}. Сумма весов ${best.len} км.`
    }),
    makeChoice(rng, {
      text: 'Какая модель иерархическая?',
      correct: 'Дерево папок: внутри «Учёба» лежат «7А» и «7Б»',
      wrong: ['Таблица расстояний между пятью городами', 'Кольцо из четырёх остановок', 'Один ромб с условием'],
      explain: 'Вложенные папки — дерево. Таблица связей и кольцо — сетевые модели.'
    }),
    makeChoice(rng, {
      text: 'Таблица, где и строки, и столбцы — населённые пункты, а в клетках километры, — это…',
      correct: 'Модель «объект — объект»',
      wrong: ['Модель «объект — свойство»', 'Материальный макет дороги', 'Цикл с условием'],
      explain: 'Связь двух объектов записывают на пересечении строки и столбца. Это таблица «объект — объект».'
    })
  ];
}

function emptyHw() {
  return {
    1: { done: false, savedAt: null, message: '', cards: [{ name: '', original: '', type: '', goal: '' }, { name: '', original: '', type: '', goal: '' }] },
    2: { done: false, savedAt: null, message: '', tasks: [{ title: '', data: '', formula: '', solution: '' }, { title: '', data: '', formula: '', solution: '' }] },
    3: { done: false, savedAt: null, message: '', topic: '', steps: ['', '', '', '', '', ''] },
    4: {
      done: false,
      savedAt: null,
      message: '',
      mode: 'table',
      table: { props: ['', '', ''], objects: ['', '', '', ''], cells: [['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']] },
      graph: {
        nodes: ['', '', '', ''],
        edges: [{ a: '0', b: '1', w: '' }, { a: '0', b: '2', w: '' }, { a: '1', b: '3', w: '' }, { a: '2', b: '3', w: '' }],
        start: '0',
        end: '3',
        path: '',
        length: ''
      }
    }
  };
}

function blankState() {
  return { version: 1, student: null, lessons: {}, hw: emptyHw(), notice: '' };
}

function validateHomework(n, hw) {
  if (n === 1) {
    const names = [];
    for (let i = 0; i < 2; i++) {
      const card = hw.cards[i];
      if (!isMeaningful(card.name, 3)) return { ok: false, message: `Карточка ${i + 1}: напишите название модели словами.` };
      if (!isMeaningful(card.original, 3)) return { ok: false, message: `Карточка ${i + 1}: укажите объект-оригинал.` };
      if (card.type !== 'mat' && card.type !== 'inf') return { ok: false, message: `Карточка ${i + 1}: выберите тип модели.` };
      if (!isMeaningful(card.goal, 15)) return { ok: false, message: `Карточка ${i + 1}: цель нужна фразой не короче 15 символов.` };
      names.push(card.name.trim().toLowerCase());
    }
    if (names[0] === names[1]) return { ok: false, message: 'Две карточки должны быть про разные модели.' };
    return { ok: true, message: '' };
  }
  if (n === 2) {
    for (let i = 0; i < 2; i++) {
      const task = hw.tasks[i];
      if (!isMeaningful(task.title, 20)) return { ok: false, message: `Задача ${i + 1}: запишите номер и условие своими словами.` };
      if (!isMeaningful(task.data, 8)) return { ok: false, message: `Задача ${i + 1}: перечислите исходные данные.` };
      if (!hasFormula(task.formula)) return { ok: false, message: `Задача ${i + 1}: формула должна содержать знак = и букву.` };
      if (!hasCalculation(task.solution)) return { ok: false, message: `Задача ${i + 1}: покажите расчёт со знаком действия и числовым ответом.` };
    }
    return { ok: true, message: '' };
  }
  if (n === 3) {
    if (!HW_TOPICS.includes(hw.topic)) return { ok: false, message: 'Выберите задачу, для которой строите алгоритм.' };
    const steps = hw.steps.map((step) => step.trim()).filter(Boolean);
    if (steps.length < 5) return { ok: false, message: 'Нужно не меньше 5 осмысленных шагов.' };
    if (steps.some((step) => !isMeaningful(step, 8))) return { ok: false, message: 'Каждый шаг — короткая фраза, не набор цифр.' };
    if (new Set(steps.map((step) => step.toLowerCase())).size < 4) return { ok: false, message: 'Шаги не должны повторять друг друга.' };
    if (!steps.some(hasBranch)) return { ok: false, message: 'Добавьте шаг вида «Если …, то …, иначе …».' };
    return { ok: true, message: '' };
  }
  if (hw.mode === 'graph') return validateGraphHw(hw.graph);
  return validateTableHw(hw.table);
}

function validateTableHw(table) {
  const props = table.props.map((item) => item.trim());
  const objects = table.objects.map((item) => item.trim());
  if (props.some((item) => !isMeaningful(item, 2)) || new Set(props.map((item) => item.toLowerCase())).size < 3) {
    return { ok: false, message: 'Три свойства должны быть разными словами.' };
  }
  if (objects.some((item) => !isMeaningful(item, 2)) || new Set(objects.map((item) => item.toLowerCase())).size < 4) {
    return { ok: false, message: 'Четыре объекта должны быть разными словами.' };
  }
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = String(table.cells[row][col] || '').trim();
      if (cell.length < 1 || cell.length > 40) return { ok: false, message: 'Заполните каждую клетку таблицы.' };
    }
  }
  return { ok: true, message: '' };
}

function validateGraphHw(graph) {
  const nodes = graph.nodes.map((item) => item.trim());
  if (nodes.some((item) => !isMeaningful(item, 2)) || new Set(nodes.map((item) => item.toLowerCase())).size < 4) {
    return { ok: false, message: 'Четыре вершины должны называться по-разному.' };
  }
  if (!graph.edges || graph.edges.length < 4) return { ok: false, message: 'Нужно не меньше 4 рёбер.' };
  const seen = new Set();
  const edges = [];
  for (let i = 0; i < graph.edges.length; i++) {
    const edge = graph.edges[i];
    const a = String(edge.a);
    const b = String(edge.b);
    if (a === b) return { ok: false, message: `Ребро ${i + 1} не может соединять вершину саму с собой.` };
    if (!/^\d+$/.test(String(edge.w).trim())) return { ok: false, message: `У ребра ${i + 1} вес — целое число.` };
    const w = Number(edge.w);
    if (w < 1 || w > 999) return { ok: false, message: `Вес ребра ${i + 1} должен быть от 1 до 999.` };
    const key = [a, b].sort().join('-');
    if (seen.has(key)) return { ok: false, message: 'Одинаковые рёбра лучше не дублировать.' };
    seen.add(key);
    edges.push({ a, b, w });
  }
  const adj = {};
  nodes.forEach((_, index) => { adj[String(index)] = []; });
  edges.forEach((edge) => {
    adj[edge.a].push({ to: edge.b, w: edge.w });
    adj[edge.b].push({ to: edge.a, w: edge.w });
  });
  if (graph.start === graph.end) return { ok: false, message: 'Начало и конец маршрута должны различаться.' };
  const idByName = {};
  nodes.forEach((name, index) => { idByName[name.toLowerCase()] = String(index); });
  const parts = String(graph.path || '').split(/\s*(?:→|->|—|–)\s*|\s+-\s+/).map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return { ok: false, message: 'Запишите путь через дефис: пункт - пункт - пункт.' };
  const ids = parts.map((part) => idByName[part.toLowerCase()]);
  if (ids.some((id) => id == null)) return { ok: false, message: 'В пути есть название, которого нет среди вершин.' };
  if (ids[0] !== String(graph.start) || ids[ids.length - 1] !== String(graph.end)) {
    return { ok: false, message: 'Путь должен начинаться в выбранном старте и заканчиваться в выбранном финише.' };
  }
  let length = 0;
  for (let i = 0; i < ids.length - 1; i++) {
    const hop = adj[ids[i]].find((item) => item.to === ids[i + 1]);
    if (!hop) return { ok: false, message: `Между «${parts[i]}» и «${parts[i + 1]}» нет ребра.` };
    length += hop.w;
  }
  if (Number(graph.length) !== length) return { ok: false, message: `Сумма вашего пути равна ${length}. Проверьте длину.` };
  const best = allSimplePaths(adj, String(graph.start), String(graph.end)).sort((a, b) => a.len - b.len)[0];
  if (!best) return { ok: false, message: 'Между выбранными пунктами нет пути — добавьте рёбра.' };
  if (length !== best.len) return { ok: false, message: `Путь существует, но есть маршрут короче. Ваша сумма: ${length}.` };
  return { ok: true, message: '' };
}

let state = blankState();
let pendingYes = null;
let toastTimer = null;
let lastFocusMark = 0;
let lastPersist = 0;

function persist(obj) {
  const copy = JSON.parse(JSON.stringify(obj));
  delete copy.sig;
  copy.sig = sign(copy);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
}

function save() {
  persist(state);
  lastPersist = Date.now();
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return blankState();
    const parsed = JSON.parse(raw);
    const signature = parsed.sig;
    delete parsed.sig;
    if (sign(parsed) !== signature || parsed.version !== 1) {
      const fresh = blankState();
      if (parsed.student && validPerson(parsed.student.lastName) && validPerson(parsed.student.firstName)) {
        fresh.student = parsed.student;
        fresh.notice = 'Данные журнала не прошли проверку целостности и были сброшены. Оценки нужно получить заново.';
      }
      if (fresh.student) persist(fresh);
      return fresh;
    }
    parsed.hw = Object.assign(emptyHw(), parsed.hw || {});
    [1, 2, 3, 4].forEach((n) => {
      parsed.hw[n] = Object.assign(emptyHw()[n], parsed.hw[n] || {});
    });
    parsed.lessons = parsed.lessons || {};
    return parsed;
  } catch (error) {
    return blankState();
  }
}

function ensureLesson(n) {
  if (!state.lessons[n]) {
    const seed = hashString([
      normPerson(state.student.lastName),
      normPerson(state.student.firstName),
      state.student.className,
      state.student.salt,
      'L', n
    ].join('|'));
    state.lessons[n] = buildLesson(n, seed);
    save();
  }
  return state.lessons[n];
}

function currentView() {
  const hash = (location.hash || '#lessons').replace('#', '');
  if (hash.indexOf('lesson/') === 0) return 'lesson';
  if (['lessons', 'grades', 'hw', 'teacher'].indexOf(hash) >= 0) return hash;
  return 'lessons';
}

function currentLessonNumber() {
  const hash = (location.hash || '').replace('#', '');
  if (hash.indexOf('lesson/') !== 0) return null;
  const n = Number(hash.split('/')[1]);
  return n >= 1 && n <= 4 ? n : null;
}

function clockText() {
  const date = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function fmtDuration(ms) {
  const total = Math.max(0, Math.round((ms || 0) / 1000));
  return `${Math.floor(total / 60)} мин ${String(total % 60).padStart(2, '0')} с`;
}

function $(id) { return document.getElementById(id); }

function toast(message) {
  const node = $('toast');
  const main = $('main');
  if (main && node.parentElement !== main) main.prepend(node);
  node.textContent = message;
  node.classList.remove('is-hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.add('is-hidden'), 3200);
}

function showModal(title, text, mode) {
  $('modal-title').textContent = title;
  $('modal-text').textContent = text;
  $('modal-ok').textContent = mode === 'confirm' ? 'Сдать' : 'Понятно';
  $('modal-cancel').classList.toggle('is-hidden', mode !== 'confirm');
  $('modal').classList.remove('is-hidden');
  document.body.classList.add('modal-open');
}

function closeModal() {
  $('modal').classList.add('is-hidden');
  document.body.classList.remove('modal-open');
  pendingYes = null;
}

function confirmModal(title, text, onYes) {
  pendingYes = onYes;
  showModal(title, text, 'confirm');
}

function paintClocks() {
  const text = clockText();
  document.querySelectorAll('[data-clock]').forEach((node) => { node.textContent = text; });
  if (!state.student) return;
  const wm = `${state.student.lastName} ${state.student.firstName} · ${state.student.className} · группа ${state.groupId === '2' ? '2' : '1'} · ${text}`;
  document.querySelectorAll('[data-wm-text]').forEach((node) => { node.textContent = wm; });
}

function wmLayer() {
  if (!state.student) return '';
  const text = `${state.student.lastName} ${state.student.firstName} · ${state.student.className} · группа ${state.groupId === '2' ? '2' : '1'} · ${clockText()}`;
  return `<div class="wm" aria-hidden="true">${Array.from({ length: 14 }, () => `<span data-wm-text>${esc(text)}</span>`).join('')}</div>`;
}

function scoreStrip(lesson) {
  const live = recompute(lesson);
  const bank = Math.max(0, 45 - 10 * ((lesson.trainer && lesson.trainer.errors) || 0));
  const practice = (lesson.phase === 'goal' || lesson.phase === 'theory')
    ? '—'
    : (lesson.phase === 'trainer' && !trainerReady(lesson) ? bank : live.trainerScore);
  const blitz = (lesson.phase === 'blitz' || lesson.phase === 'done') ? live.blitzScore : '—';
  return `<div class="hud">
    <div><small>Теория</small><b>${live.theoryScore}</b><small>из 15</small></div>
    <div><small>Практика</small><b>${practice}</b><small>из 45</small></div>
    <div><small>Блиц</small><b>${blitz}</b><small>из 40</small></div>
    <p class="fine">В миссии ${fmtDuration(lesson.timeMs)} из 45 мин${live.penalty ? ' · штраф −' + live.penalty : ''}</p>
  </div>`;
}

function stepsHtml(phase, hue) {
  const order = ['goal', 'theory', 'trainer', 'notes', 'blitz', 'done'];
  const labels = ['Старт', 'Теория', 'Практика', 'Дневник', 'Блиц', 'Итог'];
  const current = phase === 'done' ? 5 : Math.max(0, order.indexOf(phase));
  const color = hue ? ` style="--accent:${hue}"` : '';
  return `<div class="steps"${color}>${labels.map((label, index) => `<span class="step ${index < current ? 'is-done' : ''} ${index === current ? 'is-now' : ''}"><b>${index + 1}</b><small>${esc(label)}</small></span>`).join('')}</div>`;
}

function xpTotal() {
  return [1, 2, 3, 4].reduce((sum, n) => {
    const lesson = state.lessons[n];
    return sum + (lesson && lesson.phase === 'done' ? lesson.total : 0);
  }, 0);
}

function rankTitle(points) {
  if (points >= 360) return 'Мастер моделирования';
  if (points >= 300) return 'Хранитель схем';
  if (points >= 200) return 'Инженер моделей';
  if (points >= 100) return 'Исследователь';
  return 'Стажёр лаборатории';
}

function stars(grade) {
  const count = grade >= 5 ? 3 : grade === 4 ? 2 : grade === 3 ? 1 : 0;
  return '★'.repeat(count) + '☆'.repeat(3 - count);
}

function rulesHtml() {
  return `<details class="rules"><summary>Как ставится оценка и что защищено</summary>
    <ul class="list-check">
      <li>Теория — до 15 баллов: 5 вопросов по 3. Балл только если ответ верный с первой попытки. Дальше без балла, но с пониманием.</li>
      <li>Тренажёр — 45 баллов. Каждая ошибка снимает 10. Сдать задание можно один раз.</li>
      <li>Дневник миссии обязателен, но баллов не даёт. Он нужен, чтобы блиц открылся и учитель увидел ваши мысли.</li>
      <li>Блиц — 4 вопроса по 10 баллов, 45 секунд и одна попытка. На расчётных вопросах ответ быстрее 2 секунд не засчитывается.</li>
      <li>Уход с экрана во время тренажёра или блица фиксируется. Первый — предупреждение без штрафа. Дальше каждый следующий уход снимает 5 баллов: 2 ухода — минус 5, 3 — минус 10, и так до минус 20.</li>
      <li>Обновление страницы продолжает ту же попытку. Числа в задачах у каждого ученика свои.</li>
      <li>85–100 — «5», 65–84 — «4», 45–64 — «3», меньше 45 — «2». Домашняя работа в эти 100 баллов не входит, она идёт в отчёт отдельно.</li>
    </ul>
  </details>`;
}

function renderLessons() {
  const nextMission = [1, 2, 3, 4].find((n) => !(state.lessons[n] && state.lessons[n].phase === 'done'));
  const cards = [1, 2, 3, 4].map((n) => {
    const lesson = state.lessons[n];
    const meta = META[n];
    const started = lesson && lesson.startedAt;
    let status = 'Не начата';
    let badge = '';
    let action = 'В миссию';
    if (lesson && lesson.phase === 'done') {
      status = `${lesson.total}/100 · ${fmtDuration(lesson.timeMs)}`;
      badge = `<span class="badge grade-${lesson.grade}">${lesson.grade}</span>`;
      action = 'Открыть';
    } else if (started) {
      status = 'Идёт сейчас';
      badge = '<span class="pill">игра</span>';
      action = 'Продолжить';
    }
    const mission = MISSIONS[n];
    const starLine = lesson && lesson.phase === 'done' ? stars(lesson.grade) : '☆☆☆';
    const mark = lesson && lesson.phase === 'done' ? 'is-cleared' : (n === nextMission ? 'is-next' : '');
    return `<article class="card lesson-card mission quest-card ${mark}" style="--accent:${mission.hue}">
      <div class="mission-mark" aria-hidden="true"><i class="${mission.icon}"></i><span>${n}</span></div>
      <div>
        <p class="eyebrow">Миссия ${n} · 45 мин</p>
        <h2>${esc(mission.name)}</h2>
        <p class="fine">${esc(meta.teaser)}</p>
        <p class="stars-sm">${esc(starLine)} · ${esc(status)}</p>
      </div>
      <div class="status-col">${badge}<button class="btn btn-primary" type="button" data-act="open-lesson" data-n="${n}">${action}</button></div>
    </article>`;
  }).join('');
  const points = xpTotal();
  const nextName = nextMission ? MISSIONS[nextMission].name : 'Все миссии пройдены';
  const width = Math.max(4, Math.round(points / 400 * 100));
  const group = state.groupId === '2' ? '2' : '1';
  return `<p class="eyebrow">Игровое поле</p><h2 class="section-title">Привет, ${esc(state.student.firstName)}!</h2>
    <article class="card hero-rank">
      <p class="eyebrow">${esc(rankTitle(points))}</p>
      <p class="lead">${points} из 400 · класс ${esc(state.student.className)}</p>
      <div class="group-picks">
        <button class="btn ${group === '1' ? 'btn-primary' : 'btn-ghost'}" type="button" data-act="set-group" data-group="1">Группа 1</button>
        <button class="btn ${group === '2' ? 'btn-primary' : 'btn-ghost'}" type="button" data-act="set-group" data-group="2">Группа 2</button>
      </div>
      <p class="fine">Светлая кнопка — ваша группа. Если учитель назвал другую, нажмите её.</p>
      <div class="xp-track" aria-hidden="true"><span style="width:${width}%"></span></div>
      <p class="fine">Дальше: ${esc(nextName)}</p>
      <p class="fine" data-cloud-note>${esc(state.cloudNote || 'Баллы уходят учителю сами. Код класса вводить не нужно.')}</p>
    </article>
    <div class="quest-map">${cards}</div>`;
}

function honestyBlock(lesson) {
  const count = lesson.focusLostCount || 0;
  const main = count
    ? `<p class="warn-text"><i class="fa-solid fa-triangle-exclamation"></i> Зафиксировано сворачиваний окна: ${count}</p>`
    : '<p class="ok-text"><i class="fa-solid fa-circle-check"></i> Честное прохождение (0 выходов из окна)</p>';
  const fast = lesson.suspiciousFast ? `<p class="warn-text">Подозрительно быстрых ответов: ${lesson.suspiciousFast}</p>` : '';
  return main + fast;
}

function cloudOn() {
  return window.LabCloud && LabCloud.enabled();
}

function ensureIdentity() {
  if (!state.deviceSecret) {
    state.deviceSecret = hashString(String(Date.now()) + ':' + Math.random()).toString(16);
    save();
  }
  if (typeof state.roomCode !== 'string') state.roomCode = '';
  if (state.groupId !== '1' && state.groupId !== '2') state.groupId = '1';
  if (state.student) state.roomCode = roomFromClass(state.student.className);
}

function cloudStudentId() {
  return hashString([
    normRoom(state.roomCode),
    normPerson(state.student.lastName),
    normPerson(state.student.firstName),
    normClass(state.student.className)
  ].join('|')).toString(16);
}

function progressPayload() {
  const lessons = [1, 2, 3, 4].map((n) => {
    const lesson = state.lessons[n];
    if (!lesson || lesson.phase !== 'done') return { n, done: false, grade: null, total: null };
    return {
      n,
      done: true,
      grade: lesson.grade,
      total: lesson.total,
      code: lesson.code,
      timeSec: Math.round((lesson.timeMs || 0) / 1000),
      focus: lesson.focusLostCount || 0,
      errors: lesson.trainer.errors || 0,
      suspicious: lesson.suspiciousFast || 0,
      notes: lesson.notesDone ? (lesson.notes || []) : []
    };
  });
  const homework = [1, 2, 3, 4].map((n) => ({
    n,
    done: !!state.hw[n].done,
    text: state.hw[n].done ? hwPlain(n, state.hw[n]) : '',
    photoUrl: state.hw[n].photoUrl || ''
  }));
  const doneLessons = lessons.filter((lesson) => lesson.done);
  return {
    roomId: normRoom(state.roomCode),
    groupId: state.groupId || '1',
    previousGroup: state.sentGroup || '',
    studentId: cloudStudentId(),
    board: {
      lastName: state.student.lastName,
      firstName: state.student.firstName,
      className: state.student.className,
      groupId: state.groupId || '1',
      grades: lessons.map((lesson) => lesson.grade),
      points: doneLessons.reduce((sum, lesson) => sum + (lesson.total || 0), 0),
      lessonsDone: doneLessons.length,
      hwDone: homework.filter((item) => item.done).length
    },
    work: {
      lastName: state.student.lastName,
      firstName: state.student.firstName,
      className: state.student.className,
      lessons,
      homework
    }
  };
}

function publishProgress(options) {
  const loud = !!(options && options.loud);
  if (!cloudOn() || !validRoom(state.roomCode)) return Promise.resolve();
  return LabCloud.publish(progressPayload()).then((result) => {
    if (result && result.hold) return;
    if (result && result.ok === false) {
      state.cloudNote = result.reason || cloudErrorText();
      if (loud) toast(state.cloudNote);
    } else {
      state.cloudNote = '';
      state.sentGroup = state.groupId || '1';
    }
    save();
    const note = document.querySelector('[data-cloud-note]');
    if (note) note.textContent = state.cloudNote || 'Баллы уходят учителю сами. Код класса вводить не нужно.';
  }).catch((error) => {
    state.cloudNote = cloudErrorText(error);
    save();
    if (loud) toast(state.cloudNote);
    const note = document.querySelector('[data-cloud-note]');
    if (note) note.textContent = state.cloudNote;
  });
}

function rankSection() {
  const connected = cloudOn();
  return `<article class="card"><h3>Рейтинг группы ${esc(state.groupId || '1')}</h3>
    <p class="fine">Класс ${esc(state.student.className)} отправляется учителю сам. Здесь только имена и баллы вашей группы.</p>
    <label class="field">Группа, которую назвал учитель<select id="room-group">
      <option value="1" ${state.groupId === '1' ? 'selected' : ''}>Группа 1</option>
      <option value="2" ${state.groupId === '2' ? 'selected' : ''}>Группа 2</option>
    </select></label>
    <button class="btn btn-primary" type="button" data-act="save-room">Запомнить группу</button>
    ${connected ? '<div id="rank-wrap"><p class="fine">Загружаю рейтинг…</p></div>' : '<p class="fine">Общий рейтинг появится, когда учитель подключит журнал класса. Свои оценки выше уже сохранены на этом телефоне.</p>'}
  </article>`;
}

function rankTable(rows) {
  if (!rows.length) return '<p class="fine">В этом классе пока никто не отправил баллы.</p>';
  const mine = validRoom(state.roomCode) ? cloudStudentId() : '';
  const visible = (state.groupId ? rows.filter((row) => String(row.groupId || state.groupId) === String(state.groupId)) : rows);
  const body = visible.map((row, index) => {
    const grades = (row.grades || []).map((grade) => grade || '–').join(' ');
    return `<tr class="${row.id === mine ? 'is-me' : ''}"><td>${index + 1}</td><td>${esc(row.lastName)} ${esc(row.firstName)}</td><td>${row.points || 0}</td><td>${row.lessonsDone || 0}/4</td><td>${esc(grades)}</td></tr>`;
  }).join('');
  return `<div class="table-wrap"><table class="rank"><tr><th>#</th><th>Ученик</th><th>Баллы</th><th>Уроки</th><th>Оценки</th></tr>${body}</table></div>`;
}

function teacherJournalSection() {
  if (!cloudOn()) {
    return `<article class="card"><h3>Журнал всего класса</h3>
      <p>Автор курса: Усеинов Эмир Рустемович. Он ведущий: видит все группы. Коллеге можно выдать только её группы, например 1 и 2, без вашей группы.</p>
      <p>Сейчас телефон хранит только своего ученика. Коды выше уже проверяют оценку. Общий журнал включится, когда база klmodel-40995 будет подключена тем Google-аккаунтом, в котором она создана.</p>
    </article>`;
  }
  return `<article class="card"><h3>Журнал всего класса</h3>
    <p>Автор и ведущий: Усеинов Эмир Рустемович. Десять параллелей 7 класса открываются отсюда. Письмо на почту не нужно.</p>
    <div class="stack">
      <label class="field">Почта<input id="teacher-email" autocomplete="username" value="${esc(teacherEmailSaved())}" placeholder="Только для учителя"></label>
      <label class="field">Пароль<input id="teacher-pass" type="password" autocomplete="current-password"></label>
      <p class="eyebrow">Параллели</p>
      <div class="parallel-picks">${parallelClassNames().map((name) => `<button class="btn btn-ghost" type="button" data-act="teacher-parallel" data-class="${esc(name)}">${esc(name)}</button>`).join('')}</div>
      <button class="btn btn-primary" type="button" data-act="teacher-all">Открыть все параллели</button>
      <button class="btn btn-ghost" type="button" data-act="teacher-claim-all">Закрепить меня ведущим всех параллелей</button>
      <label class="field">Или один класс<input id="teacher-room" value="${esc(state.student ? state.student.className : '')}" placeholder="7А" autocapitalize="characters"></label>
      <button class="btn btn-ghost" type="button" data-act="teacher-journal">Открыть этот класс</button>
      <button class="btn btn-ghost" type="button" data-act="teacher-logout">Выйти из входа учителя</button>
      <details class="rules">
        <summary>Доступ коллеги и письмо для пароля</summary>
        <button class="btn btn-ghost" type="button" data-act="teacher-reset">Прислать письмо для пароля</button>
        <p class="fine">На её телефоне та же вкладка: её почта, пароль и кнопка «Показать мой код доступа». Код вставьте сюда и отметьте только её группы.</p>
        <button class="btn btn-ghost" type="button" data-act="colleague-register">Показать мой код доступа</button>
        <label class="field">Код доступа коллеги<input id="colleague-uid" autocomplete="off"></label>
        <label class="fine"><input type="checkbox" class="grant-group" value="1"> Группа 1</label>
        <label class="fine"><input type="checkbox" class="grant-group" value="2"> Группа 2</label>
        <button class="btn btn-ghost" type="button" data-act="grant-teacher">Открыть коллеге выбранные группы</button>
      </details>
    </div>
    <div id="journal-out"></div>
  </article>`;
}

function lessonByNumber(row, n) {
  return (row.lessons || []).find((lesson) => lesson.n === n) || null;
}

function missingRows(rows, n) {
  return (rows || []).filter((row) => {
    const lesson = lessonByNumber(row, n);
    return !lesson || !lesson.done;
  });
}

function gapLine(rows) {
  if (!rows || !rows.length) return '';
  const parts = [1, 2, 3, 4].map((n) => {
    const missing = missingRows(rows, n);
    if (!missing.length) return '';
    const byGroup = {};
    missing.forEach((row) => {
      const group = String(row.groupId || '–');
      if (!byGroup[group]) byGroup[group] = [];
      byGroup[group].push(`${row.lastName} ${row.firstName}`);
    });
    const groups = Object.keys(byGroup).sort().map((group) => `гр. ${group}: ${byGroup[group].join(', ')}`).join('; ');
    return `Урок ${n} не сдали (${missing.length}). ${groups}`;
  }).filter(Boolean);
  return parts.length ? parts.join('\n') : 'Среди приславших все четыре урока сданы.';
}

function doneCounts(rows) {
  return [1, 2, 3, 4].map((n) => (rows || []).filter((row) => {
    const lesson = lessonByNumber(row, n);
    return lesson && lesson.done;
  }).length);
}

function weakLine(rows) {
  const items = [];
  (rows || []).forEach((row) => {
    [1, 2, 3, 4].forEach((n) => {
      const lesson = lessonByNumber(row, n);
      if (lesson && lesson.done && Number(lesson.grade) === 2) {
        items.push({ group: String(row.groupId || '–'), name: `${row.lastName} ${row.firstName}`, n });
      }
    });
  });
  if (!items.length) return '';
  const byGroup = {};
  items.forEach((item) => {
    if (!byGroup[item.group]) byGroup[item.group] = [];
    byGroup[item.group].push(`${item.name}, урок ${item.n}`);
  });
  const groups = Object.keys(byGroup).sort().map((group) => `гр. ${group}: ${byGroup[group].join('; ')}`).join(' · ');
  return `Оценка 2 (${items.length}). ${groups}`;
}

function gapBlocks(rows) {
  const text = gapLine(rows);
  if (!text) return '';
  return text.split('\n').map((line) => `<p class="fine">${esc(line)}</p>`).join('');
}

function gradeMark(lesson) {
  if (!lesson || !lesson.done || !lesson.grade) return '–';
  return `<span class="badge grade-${lesson.grade}">${lesson.grade}</span>`;
}

function journalCards(rows) {
  if (!rows.length) return '<p class="fine">Пока нет сданных работ.</p>';
  const sorted = rows.slice().sort((a, b) => String(a.groupId || '').localeCompare(String(b.groupId || ''))
    || String(a.lastName || '').localeCompare(String(b.lastName || ''), 'ru'));
  const lessonCount = sorted.reduce((sum, row) => sum + (row.lessons || []).filter((lesson) => lesson.done).length, 0);
  const hwCount = sorted.reduce((sum, row) => sum + (row.homework || []).filter((item) => item.done).length, 0);
  let lastGroup = null;
  const body = sorted.map((row) => {
    const group = String(row.groupId || '–');
    const band = group === lastGroup ? '' : `<h3 class="journal-band">Группа ${esc(group)}</h3>`;
    lastGroup = group;
    const hasTwo = [1, 2, 3, 4].some((n) => {
      const lesson = lessonByNumber(row, n);
      return lesson && lesson.done && Number(lesson.grade) === 2;
    });
    const marks = [1, 2, 3, 4].map((n) => `<span><small>${n}</small>${gradeMark(lessonByNumber(row, n))}</span>`).join('');
    const points = (row.lessons || []).reduce((sum, lesson) => sum + (lesson.done ? (lesson.total || 0) : 0), 0);
    const hw = (row.homework || []).filter((item) => item.done).length;
    return `${band}<article class="journal-person ${hasTwo ? 'is-weak' : ''}"><div><b>${esc(row.lastName)} ${esc(row.firstName)}</b><span>группа ${esc(group)}</span></div><div class="journal-marks">${marks}</div><p>${points} баллов · ДЗ ${hw}/4</p></article>`;
  }).join('');
  const texts = sorted.map((row) => {
    const lessons = (row.lessons || []).map((lesson) => {
      const head = lesson.done ? `Урок ${lesson.n}: ${lesson.grade} (${lesson.total}/100), код ${lesson.code}, уходы ${lesson.focus}` : `Урок ${lesson.n}: не сдан`;
      const notes = (lesson.notes || []).filter(Boolean).map((line, index) => `дневник ${index + 1}: ${line}`).join('\n');
      return notes ? `${head}\n${notes}` : head;
    }).join('\n');
    const homework = (row.homework || []).map((item) => {
      const text = item.done ? `<div class="readout">${esc(item.text)}</div>` : '<p class="fine">Не сдано</p>';
      const photo = item.photoUrl ? `<a href="${esc(item.photoUrl)}" target="_blank" rel="noopener">Открыть фото</a><img class="hw-photo" alt="Фото домашнего задания ${item.n}" src="${esc(item.photoUrl)}">` : '';
      return `<h3>ДЗ ${item.n}</h3>${text}${photo}`;
    }).join('');
    return `<article class="subcard"><h3>${esc(row.lastName)} ${esc(row.firstName)}, группа ${esc(row.groupId || '–')}</h3><div class="readout">${esc(lessons)}</div>${homework}</article>`;
  }).join('');
  return `<p class="fine">Учеников ${sorted.length}. Уроков сдано ${lessonCount}. Домашних работ ${hwCount}.</p>
    ${gapBlocks(sorted)}
    ${weakLine(sorted) ? `<p class="warn-text">${esc(weakLine(sorted))}</p>` : ''}
    <div class="journal-list">${body}</div>
    <details class="rules"><summary>Тексты дневников и ДЗ</summary>${texts}</details>`;
}

let lastJournalText = '';
let lastJournalPack = [];

function rowsForGroup(rows, group) {
  if (!group) return rows || [];
  return (rows || []).filter((row) => String(row.groupId || '') === String(group));
}

function paintLoadedJournal(group) {
  const blocks = [];
  const sheets = [];
  const index = [];
  const quiet = [];
  lastJournalPack.forEach((item) => {
    const anchor = 'journal-' + item.name;
    if (!item.error && group && !rowsForGroup(item.result.rows, group).length) {
      quiet.push(item.name);
      return;
    }
    if (item.error) {
      blocks.push(`<section class="subcard" id="${esc(anchor)}"><h3>${esc(item.name)}</h3><p class="field-error">${esc(item.error)}</p></section>`);
      sheets.push(item.name + '\n' + item.error);
      index.push(`<button class="btn btn-ghost" type="button" data-act="jump-journal" data-id="${esc(anchor)}">${esc(item.name)}<small>ошибка</small></button>`);
      return;
    }
    const rows = rowsForGroup(item.result.rows, group);
    const role = item.result.access.role === 'master'
      ? 'ведущий, все группы'
      : (item.result.access.role === 'teacher' ? 'группы ' + item.result.access.groups.join(', ') : 'нет доступа');
    const counts = doneCounts(rows);
    blocks.push(`<section class="subcard" id="${esc(anchor)}"><h3>${esc(item.name)} · ${esc(role)} · работ ${rows.length}</h3><p class="fine">Сдали: урок 1 — ${counts[0]}, урок 2 — ${counts[1]}, урок 3 — ${counts[2]}, урок 4 — ${counts[3]}.</p>${journalCards(rows)}</section>`);
    sheets.push(journalTsv(item.name + (group ? ' группа ' + group : ''), rows));
    index.push(`<button class="btn btn-ghost" type="button" data-act="jump-journal" data-id="${esc(anchor)}">${esc(item.name)}<small>${rows.length} чел. · ${counts.join('/')}</small></button>`);
  });
  if (group && quiet.length) sheets.unshift('В группе ' + group + ' нет работ: ' + quiet.join(', '));
  lastJournalText = sheets.join('\n\n');
  const filters = ['', '1', '2'].map((id) => {
    const on = String(group || '') === id;
    const label = id ? 'Группа ' + id : 'Все группы';
    return `<button class="btn ${on ? 'btn-primary' : 'btn-ghost'}" type="button" data-act="journal-group" data-group="${id}">${label}</button>`;
  }).join('');
  const menu = index.length > 1 ? `<p class="fine">На кнопке класса четыре числа: сколько учеников сдали уроки 1, 2, 3 и 4.</p><div class="parallel-index">${index.join('')}</div>` : '';
  const quietLine = group && quiet.length ? `<p class="fine">В группе ${esc(group)} пока нет работ: ${esc(quiet.join(', '))}.</p>` : '';
  const node = $('journal-out');
  if (node) {
    node.innerHTML = `<div class="group-filters">${filters}</div>${quietLine}${menu}<button class="btn btn-primary" type="button" data-act="copy-journal">Скопировать сводку в таблицу</button>${blocks.join('')}`;
  }
}

function journalTsv(title, rows) {
  const sorted = (rows || []).slice().sort((a, b) => String(a.groupId || '').localeCompare(String(b.groupId || ''))
    || String(a.lastName || '').localeCompare(String(b.lastName || ''), 'ru'));
  const lines = [title, 'Фамилия\tИмя\tГруппа\tУрок1\tУрок2\tУрок3\tУрок4\tБаллы\tДЗ'];
  sorted.forEach((row) => {
    const grades = [1, 2, 3, 4].map((n) => {
      const lesson = lessonByNumber(row, n);
      return lesson && lesson.done ? lesson.grade : '–';
    });
    const points = (row.lessons || []).reduce((sum, lesson) => sum + (lesson.done ? (lesson.total || 0) : 0), 0);
    const hw = (row.homework || []).filter((item) => item.done).length;
    lines.push([row.lastName, row.firstName, row.groupId || '', grades.join('\t'), points, hw + '/4'].join('\t'));
  });
  if (!sorted.length) lines.push('Пока нет работ');
  const gaps = gapLine(sorted);
  const weak = weakLine(sorted);
  if (gaps) lines.push('', gaps);
  if (weak) lines.push(weak);
  return lines.join('\n');
}

function photoField() {
  return '';
}

function renderGrades() {
  const cards = [1, 2, 3, 4].map((n) => {
    const lesson = state.lessons[n];
    if (!lesson || lesson.phase !== 'done') {
      return `<article class="card grade-card"><div class="content"><h3>Урок ${n}. ${esc(META[n].title)}</h3><p>Оценка за классную работу ещё не выставлена.</p></div></article>`;
    }
    return `<article class="card grade-card">${wmLayer()}<div class="content">
      <div class="lesson-card">
        <span class="badge grade-${lesson.grade}">${lesson.grade}</span>
        <div><h3>Урок ${n}. ${esc(META[n].title)}</h3><p>${esc(gradeWord(lesson.grade))} · ${lesson.total}/100</p></div>
      </div>
      <table class="breakdown">
        <tr><td>Теория</td><td>${lesson.theoryScore}/15</td></tr>
        <tr><td>Тренажёр</td><td>${lesson.trainerScore}/45 · ошибок ${lesson.trainer.errors}</td></tr>
        <tr><td>Блиц</td><td>${lesson.blitzScore}/40</td></tr>
        <tr><td>Штраф за уходы</td><td>−${lesson.penalty}</td></tr>
        <tr><td>Время</td><td>${fmtDuration(lesson.timeMs)}</td></tr>
      </table>
      ${honestyBlock(lesson)}
      <p class="fine">Код проверки</p>
      <code class="kbd-code">${esc(lesson.code)}</code>
      <button class="btn btn-ghost" type="button" data-act="copy-code" data-code="${esc(lesson.code)}">Скопировать код</button>
    </div></article>`;
  }).join('');
  return `<p class="eyebrow">Табель</p><h2 class="section-title">${esc(state.student.lastName)} ${esc(state.student.firstName)}</h2>
    <p class="lead">Класс ${esc(state.student.className)} · группа ${state.groupId === '2' ? '2' : '1'} · <span data-clock>${esc(clockText())}</span></p>
    ${cards}
    <button class="btn btn-primary" type="button" data-act="copy-report">Скопировать защищённый отчёт для учителя</button>
    <button class="btn btn-ghost" type="button" data-act="download-report">Скачать сертификат/отчёт (.html)</button>
    ${rankSection()}`;
}

function fieldInput(label, bind, value, area, placeholder) {
  const hint = placeholder ? ` placeholder="${esc(placeholder)}"` : '';
  const control = area
    ? `<textarea data-bind="${bind}" maxlength="400"${hint}>${esc(value || '')}</textarea>`
    : `<input data-bind="${bind}" maxlength="80" value="${esc(value || '')}"${hint}>`;
  return `<label class="field">${esc(label)}${control}</label>`;
}

function renderHw() {
  const blocks = [1, 2, 3, 4].map((n) => {
    const hw = state.hw[n];
    const body = hw.done ? readonlyHw(n, hw) : editorHw(n, hw);
    return `<article class="card" id="hw-${n}"><p class="eyebrow">ДЗ ${n}</p><h3>${esc(META[n].hw)}</h3><p class="fine">Домашняя работа не меняет оценку за урок. После сдачи текст попадает в отчёт и не редактируется.</p>${hw.message ? `<p class="field-error">${esc(hw.message)}</p>` : ''}${body}</article>`;
  }).join('');
  return `<p class="eyebrow">Моё ДЗ</p><h2 class="section-title">Четыре домашние работы</h2>${blocks}`;
}

function readonlyHw(n, hw) {
  return `<div class="hw-lock"><p class="ok-text">Сдано ${esc(new Date(hw.savedAt).toLocaleString('ru-RU'))}</p><div class="readout">${esc(hwPlain(n, hw))}</div></div>`;
}

function editorHw(n, hw) {
  if (n === 1) {
    return `<div class="hw-form">${hw.cards.map((card, index) => `<h3>Карточка ${index + 1}</h3>
      ${fieldInput('Название модели', `1.cards.${index}.name`, card.name)}
      ${fieldInput('Объект-оригинал', `1.cards.${index}.original`, card.original)}
      <label class="field">Тип модели<select data-bind="1.cards.${index}.type">
        <option value="">Выберите</option>
        <option value="mat" ${card.type === 'mat' ? 'selected' : ''}>Материальная (натурная)</option>
        <option value="inf" ${card.type === 'inf' ? 'selected' : ''}>Информационная</option>
      </select></label>
      ${fieldInput('Цель создания', `1.cards.${index}.goal`, card.goal, true)}`).join('')}<button class="btn btn-primary" type="button" data-act="hw-save" data-n="1">Сдать ДЗ 1</button></div>`;
  }
  if (n === 2) {
    return `<div class="hw-form">${hw.tasks.map((task, index) => `<h3>Задача ${index + 1}</h3>
      ${fieldInput('Номер и условие', `2.tasks.${index}.title`, task.title, true)}
      ${fieldInput('Исходные данные', `2.tasks.${index}.data`, task.data, true)}
      ${fieldInput('Формула', `2.tasks.${index}.formula`, task.formula)}
      ${fieldInput('Расчёт и ответ', `2.tasks.${index}.solution`, task.solution, true)}`).join('')}${photoField(2, 'Фото решения в тетради, необязательно')}<button class="btn btn-primary" type="button" data-act="hw-save" data-n="2">Сдать ДЗ 2</button></div>`;
  }
  if (n === 3) {
    const options = HW_TOPICS.map((topic) => `<option ${hw.topic === topic ? 'selected' : ''}>${esc(topic)}</option>`).join('');
    return `<div class="hw-form"><label class="field">Задача<select data-bind="3.topic"><option value="">Выберите</option>${options}</select></label>
      <p class="fine">Минимум 5 шагов. В одном из них обязательно напишите: Если …, то …, иначе …</p>
      ${hw.steps.map((step, index) => fieldInput(`Шаг ${index + 1}${index === 5 ? ' (необязательно)' : ''}`, `3.steps.${index}`, step)).join('')}
      <button class="btn btn-primary" type="button" data-act="hw-save" data-n="3">Сдать ДЗ 3</button></div>`;
  }
  const tableMode = hw.mode !== 'graph';
  return `<div class="hw-form"><div class="btn-row">
      <button class="btn ${tableMode ? 'btn-primary' : 'btn-ghost'}" type="button" data-act="hw-mode" data-mode="table">Таблица</button>
      <button class="btn ${tableMode ? 'btn-ghost' : 'btn-primary'}" type="button" data-act="hw-mode" data-mode="graph">Граф</button>
    </div>${tableMode ? tableEditor(hw) : graphEditor(hw)}
    ${photoField(4, 'Фото или скриншот своей модели, необязательно')}
    <button class="btn btn-primary" type="button" data-act="hw-save" data-n="4">Сдать ДЗ 4</button></div>`;
}

function tableEditor(hw) {
  const table = hw.table;
  const examples = ['Рост', 'Класс', 'Хобби'];
  const props = table.props.map((prop, index) => fieldInput(`Свойство ${index + 1}`, `4.table.props.${index}`, prop, false, examples[index])).join('');
  const cards = table.objects.map((object, row) => `<section class="subcard">
      ${fieldInput(`Объект ${row + 1}`, `4.table.objects.${row}`, object, false, 'Название')}
      ${table.cells[row].map((cell, col) => {
        const propName = String(table.props[col] || '').trim();
        return fieldInput(propName || `Свойство ${col + 1}`, `4.table.cells.${row}.${col}`, cell, false, 'Значение');
      }).join('')}
    </section>`).join('');
  return `<p class="fine">Сначала назовите три свойства. Затем для каждого из четырёх объектов заполните эти свойства. Это модель «объект — свойство».</p><div class="stack">${props}</div>${cards}`;
}

function selectOptions(nodes, selected) {
  return nodes.map((node, index) => `<option value="${index}" ${String(selected) === String(index) ? 'selected' : ''}>${esc(node || ('Вершина ' + (index + 1)))}</option>`).join('');
}

function graphEditor(hw) {
  const graph = hw.graph;
  const nodes = graph.nodes.map((node, index) => fieldInput(`Вершина ${index + 1}`, `4.graph.nodes.${index}`, node)).join('');
  const edges = graph.edges.map((edge, index) => `<div class="edge-block">
      <p class="fine">Ребро ${index + 1}</p>
      <label class="field">Откуда<select data-bind="4.graph.edges.${index}.a">${selectOptions(graph.nodes, edge.a)}</select></label>
      <label class="field">Куда<select data-bind="4.graph.edges.${index}.b">${selectOptions(graph.nodes, edge.b)}</select></label>
      <label class="field">Вес, км<input inputmode="numeric" data-bind="4.graph.edges.${index}.w" value="${esc(edge.w)}" placeholder="км"></label>
    </div>`).join('');
  return `<p class="fine">Четыре пункта, не меньше четырёх рёбер и защита: кратчайший путь и его длина.</p>${nodes}
    <h3>Рёбра</h3>${edges}
    <button class="btn btn-ghost" type="button" data-act="hw-add-edge">Добавить ребро</button>
    <label class="field">Старт<select data-bind="4.graph.start">${selectOptions(graph.nodes, graph.start)}</select></label>
    <label class="field">Финиш<select data-bind="4.graph.end">${selectOptions(graph.nodes, graph.end)}</select></label>
    ${fieldInput('Кратчайший путь через дефис', '4.graph.path', graph.path)}
    ${fieldInput('Его длина', '4.graph.length', graph.length)}`;
}

function renderTeacher() {
  const back = state.student ? '' : '<button class="btn btn-ghost" type="button" data-act="close-teacher">К входу учеников</button>';
  return `${back}<p class="eyebrow">Для учителя</p><h2 class="section-title">Журнал и проверка</h2>
    <article class="card"><p>Введите фамилию, имя и класс так, как на карточке ученика, и вставьте код или весь отчёт. Лаборатория проверит, что оценка, баллы, время, ошибки и уходы с экрана не переписаны.</p>
      <div class="stack">
        <label class="field">Фамилия<input id="teacher-last" autocomplete="off"></label>
        <label class="field">Имя<input id="teacher-first" autocomplete="off"></label>
        <label class="field">Класс<input id="teacher-class" placeholder="7А" autocomplete="off"></label>
        <label class="field">Код или отчёт<textarea id="teacher-code" placeholder="U1-5-092-T480-F0-E0-S0-ABCD"></textarea></label>
        <button class="btn btn-primary" type="button" data-act="verify">Проверить</button>
      </div>
      <div id="verify-out"></div>
    </article>
    <article class="card"><h3>Как читать код</h3><p class="mono">Uурок-оценка-баллы-Tсекунды-Fуходы-Eошибки-Sбыстрые-КОД</p><p class="fine">Последние 4 символа сходятся только при тех же ФИО, классе и числах. Секретная часть хранится в приложении: правки скриншота или localStorage без пересчёта кода учитель увидит.</p></article>
    ${teacherJournalSection()}`;
}

function lessonHtml(lesson) {
  const meta = META[lesson.n];
  const mission = MISSIONS[lesson.n];
  const back = '<button class="btn btn-ghost" type="button" data-act="nav" data-go="lessons"><i class="fa-solid fa-chevron-left"></i> К урокам</button>';
  if (lesson.phase === 'done') return `${stepsHtml('done', mission.hue)}${back}${resultHtml(lesson)}`;
  let body = '';
  if (lesson.phase === 'goal') body = goalHtml(lesson);
  if (lesson.phase === 'theory') body = theoryHtml(lesson);
  if (lesson.phase === 'trainer') body = trainerHtml(lesson);
  if (lesson.phase === 'notes') body = notesHtml(lesson);
  if (lesson.phase === 'blitz') body = blitzHtml(lesson);
  return `${stepsHtml(lesson.phase, mission.hue)}${scoreStrip(lesson)}${back}
    <div class="quest-banner" style="--accent:${mission.hue}"><i class="${mission.icon}" aria-hidden="true"></i><div><p class="eyebrow">Миссия ${lesson.n} · 45 минут</p><h2 class="section-title">${esc(mission.name)}</h2></div></div>
    <div class="mission-run" style="--accent:${mission.hue}">${body}</div>`;
}

function goalHtml(lesson) {
  const meta = META[lesson.n];
  const mission = MISSIONS[lesson.n];
  const plan = mission.stations.map(([name, time]) => `<span class="station"><b>${esc(name)}</b><small>${esc(time)}</small></span>`).join('');
  return `<article class="card mission quest-card" style="--accent:${mission.hue}"><p class="story-lead">${esc(mission.story)}</p><p>${esc(meta.aim)}</p><ul class="list-check">${meta.bullets.map((item) => `<li>${esc(item)}</li>`).join('')}</ul><h3>План на 45 минут</h3><div class="stations">${plan}</div>${rulesHtml()}
    <button class="btn btn-primary" type="button" data-act="start-lesson">Начать миссию</button>
    <p class="fine">После старта попытка закрепляется на этом устройстве. Результат уйдёт учителю сам.</p></article>`;
}

function notesHtml(lesson) {
  if (!lesson.notes) lesson.notes = ['', '', ''];
  const prompts = MISSIONS[lesson.n].notes;
  const fields = prompts.map((prompt, index) => `<label class="field">${esc(prompt)}<textarea id="note-${index}" maxlength="400">${esc(lesson.notes[index] || '')}</textarea></label>`).join('');
  const mission = MISSIONS[lesson.n];
  return `<article class="card mission quest-card" style="--accent:${mission.hue}"><h3>Дневник миссии</h3><p>Это не контрольная: баллы за дневник не ставятся. Напишите три ответа своими словами, и откроется блиц.</p>${fields}<button class="btn btn-primary" type="button" data-act="notes-save">Открыть блиц</button></article>`;
}

function theoryParts(html) {
  const parts = [];
  const pattern = /<p>([\s\S]*?)<\/p>/gi;
  let match = pattern.exec(html);
  while (match) {
    parts.push(match[1]);
    match = pattern.exec(html);
  }
  return {
    lead: parts[0] || '',
    rest: parts.slice(1).map((part) => `<p>${part}</p>`).join('')
  };
}

function theoryHtml(lesson) {
  const card = lesson.theory.cards[lesson.theory.index];
  const left = Math.max(0, READ_MS - (Date.now() - (lesson.theory.cardStartedAt || Date.now())));
  const locked = left > 0;
  const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е'];
  const options = card.options.map((option, index) => {
    const classes = ['btn', 'choice'];
    if (card.wrong.indexOf(index) >= 0) classes.push('is-wrong');
    if (card.solved && index === card.correctIndex) classes.push('is-ok');
    const blocked = card.solved || locked || card.wrong.indexOf(index) >= 0;
    return `<button class="${classes.join(' ')}" type="button" data-act="theory-pick" data-i="${index}" ${blocked ? 'disabled' : ''}><span class="choice-letter">${letters[index] || index + 1}</span><span>${esc(option)}</span></button>`;
  }).join('');
  const next = card.solved
    ? (lesson.theory.index < 4
      ? '<button class="btn btn-primary" type="button" data-act="theory-next">Дальше</button>'
      : '<button class="btn btn-primary" type="button" data-act="go-trainer">К практике</button>')
    : '';
  const recap = lesson.theory.index === 4 && card.solved
    ? `<div class="key-idea"><span>Возьмите в практику</span><p>Эти мысли понадобятся в задании. За список баллы не ставятся.</p><ul class="list-check">${META[lesson.n].bullets.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></div>`
    : '';
  const note = card.solved
    ? `<div class="why ${card.points ? 'is-ok' : 'is-no'}"><b>${card.points ? 'Верно с первой попытки: 3 балла' : 'Балл за карточку: 0. Ход мысли сохранён'}</b><p>${esc(card.explain)}</p></div>`
    : `<p class="js-readgate fine">${locked ? `Сначала прочитайте мысль: ${Math.ceil(left / 1000)} с` : 'Выберите ответ'}</p>`;
  const mission = MISSIONS[lesson.n];
  const parts = theoryParts(card.body);
  const dots = [0, 1, 2, 3, 4].map((index) => `<i class="${index < lesson.theory.index ? 'is-done' : ''} ${index === lesson.theory.index ? 'is-now' : ''}"></i>`).join('');
  return `<article class="card no-cheat mission quest-card" style="--accent:${mission.hue}"><div class="dots" aria-label="Карточка ${lesson.theory.index + 1} из 5">${dots}</div><h3>${esc(card.title)}</h3><div class="key-idea"><span>Ключевая мысль</span><p>${parts.lead}</p></div><div class="theory-copy">${parts.rest}</div>${note}${options}${recap}${next}</article>`;
}

function nowNext(now, next) {
  return `<div class="now-next"><p><b>Сейчас</b> ${esc(now)}</p><p><b>Дальше</b> ${esc(next)}</p></div>`;
}

function exampleBox(text) {
  return `<div class="example-box"><span>Сначала пример</span><p>${esc(text)}</p></div>`;
}

function trainerHtml(lesson) {
  const bank = `<p class="formula">Банк практики: ${Math.max(0, 45 - 10 * lesson.trainer.errors)} из 45. Ошибка снимает 10, сдать можно один раз.</p>`;
  if (lesson.n === 1) return bank + trainer1(lesson);
  if (lesson.n === 2) return bank + trainer2(lesson);
  if (lesson.n === 3) return bank + trainer3(lesson);
  return bank + trainer4(lesson);
}

function trainer1(lesson) {
  const trainer = lesson.trainer;
  if (trainer.stage === 'features' || trainer.stage === 'features-review') {
    const chips = trainer.task.features.map((feature) => {
      const on = trainer.task.picked.indexOf(feature.id) >= 0;
      let cls = on ? 'is-on' : '';
      if (trainer.task.submitted) cls = feature.essential ? 'is-ok' : (on ? 'is-no' : '');
      return `<button class="btn chip ${cls}" type="button" data-act="feat-toggle" data-id="${feature.id}" ${trainer.task.submitted ? 'disabled' : ''}>${esc(feature.text)}</button>`;
    }).join('');
    const action = trainer.task.submitted
      ? `<p>Ошибок в фильтре: ${featureErrors(trainer.task.features, trainer.task.picked)}. Зелёным отмечены существенные признаки.</p><button class="btn btn-primary" type="button" data-act="feat-next">К классификатору</button>`
      : '<button class="btn btn-primary" type="button" data-act="ask-confirm" data-confirm="feat-submit">Сдать выбор признаков</button>';
    return `<article class="card no-cheat"><h3>Фильтр признаков</h3><div class="task-brief"><b>${esc(trainer.task.object)}</b><span>${esc(trainer.task.goal)}</span></div>${nowNext('Отметьте только признаки, без которых цель не решить.', 'Сдайте выбор. Лишний или пропущенный признак — ошибка.')}${exampleBox('Для расхода топлива масса самолёта нужна, а цвет фюзеляжа — нет.')}<div class="grid-2">${chips}</div>${action}</article>`;
  }
  const cards = trainer.items.map((item) => `<div class="model-pick"><p>${esc(item.text)}</p><div class="btn-row">
      <button class="btn ${trainer.answers[item.id] === 'mat' ? 'btn-primary' : 'btn-ghost'}" type="button" data-act="cls-pick" data-id="${item.id}" data-type="mat" ${trainer.classSubmitted ? 'disabled' : ''}>Материальная</button>
      <button class="btn ${trainer.answers[item.id] === 'inf' ? 'btn-primary' : 'btn-ghost'}" type="button" data-act="cls-pick" data-id="${item.id}" data-type="inf" ${trainer.classSubmitted ? 'disabled' : ''}>Информационная</button>
    </div>${trainer.classSubmitted ? `<p class="${trainer.answers[item.id] === item.type ? 'ok-text' : 'bad-text'}">Верно: ${item.type === 'mat' ? 'материальная' : 'информационная'}</p>` : ''}</div>`).join('');
  const action = trainer.classSubmitted
    ? '<button class="btn btn-primary" type="button" data-act="go-notes">К дневнику миссии</button>'
    : '<button class="btn btn-primary" type="button" data-act="ask-confirm" data-confirm="cls-submit">Сдать классификацию</button>';
  return `<article class="card no-cheat"><h3>Классификатор моделей</h3>${nowNext('У восьми примеров выберите: материальная или информационная модель.', 'Сдайте, когда у каждой карточки есть выбор. Ошибка снимает 10 из банка.')}${exampleBox('Глобус можно потрогать — это материальная модель. Расписание уроков состоит из знаков — информационная.')}</article>${cards}${action}`;
}

function niceCeil(value) {
  const safe = Math.max(10, value);
  const pow = Math.pow(10, Math.floor(Math.log10(safe)));
  const steps = [1, 2, 2.5, 5, 10];
  for (let i = 0; i < steps.length; i++) {
    const candidate = steps[i] * pow;
    if (candidate >= safe - 1e-6) return candidate;
  }
  return 10 * pow;
}

function plotSpec(scenario) {
  if (scenario.kind === 'drone') {
    const speed = Math.max(0, scenario.sliders.v.value - scenario.sliders.w.value);
    const xMax = Math.max(1, scenario.sliders.t.value);
    return { xMax, y0: 0, slope: speed, yMax: niceCeil(speed * xMax), xLabel: 't, ч', yLabel: 'S, км' };
  }
  const v0 = scenario.sliders.v0.value;
  const q = scenario.sliders.q.value;
  const t = Math.max(1, scenario.sliders.t.value);
  return { xMax: t, y0: v0, slope: q, yMax: niceCeil(v0 + q * t), xLabel: 't, мин', yLabel: 'V, л' };
}

function trainer2(lesson) {
  const scenario = lesson.trainer.scenario;
  if (lesson.trainer.stage === 'formula') {
    const buttons = scenario.formulas.map((formula, index) => `<button class="btn choice ${scenario.formulaPick === index ? 'is-on' : ''}" type="button" data-act="formula-pick" data-i="${index}">${esc(formula.text)}</button>`).join('');
    return `<article class="card no-cheat"><h3>Лаборатория формул</h3><p>${esc(scenario.story)}</p>${nowNext('Выберите формулу, которая описывает эту задачу.', 'Сдайте один раз. Неверная формула снимает 10.')}${exampleBox('Путь при постоянной скорости: S = v·t. Если v = 60 км/ч и t = 2 ч, то S = 120 км.')}${buttons}<button class="btn btn-primary" type="button" data-act="ask-confirm" data-confirm="formula-submit">Сдать формулу</button></article>`;
  }
  const sliders = Object.keys(scenario.sliders).map((key) => {
    const slider = scenario.sliders[key];
    return `<div class="slider-row"><div class="slider-head"><span>${esc(slider.label)}</span><b data-sv="${key}">${slider.value}</b></div><input type="range" min="${slider.min}" max="${slider.max}" step="${slider.step}" value="${slider.value}" data-slider="${key}"></div>`;
  }).join('');
  const canvas = `<canvas class="plot" data-plot-live="1" data-ymax="${plotSpec(scenario).yMax}"></canvas>`;
  if (lesson.trainer.stage === 'calc') {
    const correct = scenario.formulas.find((formula) => formula.ok).text;
    return `<article class="card no-cheat"><h3>График и расчёт</h3><p>${esc(scenario.story)}</p>${nowNext('Поставьте ползунки по условию и впишите число по формуле.', 'Пустое поле попытку не тратит. Верх шкалы — не ответ.')}${exampleBox('Если ответ 120, а шкала сверху подписана 150, в поле пишут 120. Верхняя подпись только рисует график.')}<p class="${scenario.formulaWasOk ? 'ok-text' : 'warn-text'}">Рабочая формула: ${esc(correct)}</p><label class="field">${esc(scenario.mainAsk)}<input id="math-answer" inputmode="numeric" autocomplete="off"></label><button class="btn btn-primary" type="button" data-act="ask-confirm" data-confirm="math-submit">Сдать расчёт</button>${canvas}${sliders}</article>`;
  }
  if (lesson.trainer.stage === 'extra') {
    const mainSame = scenario.mainGiven === scenario.mainAnswer;
    const mainCheck = scenario.mainGiven == null ? '' : `<p class="${mainSame ? 'ok-text' : 'warn-text'}">Ваш расчёт: ${scenario.mainGiven}. Верный результат: ${scenario.mainAnswer}. ${mainSame ? 'Число совпало.' : 'Балл за ошибку уже снят, число показано, чтобы сверить формулу.'}</p>`;
    return `<article class="card no-cheat"><h3>Промежуточная величина</h3><p>${esc(scenario.story)}</p>${mainCheck}${nowNext('Найдите величину, которая нужна для основного ответа.', 'Сдайте число. Пустое поле попытку не тратит.')}${exampleBox('Встречный ветер 10 км/ч при скорости 60 км/ч даёт путевую скорость 50 км/ч. Складывать скорость, ветер и время нельзя.')}<label class="field">${esc(scenario.extraAsk)}<input id="math-extra" inputmode="numeric" autocomplete="off"></label><button class="btn btn-primary" type="button" data-act="ask-confirm" data-confirm="extra-submit">Сдать величину</button>${canvas}${sliders}</article>`;
  }
  const extraSame = scenario.extraGiven === scenario.extraAnswer;
  const extraCheck = scenario.extraGiven == null ? '' : `<p class="${extraSame ? 'ok-text' : 'warn-text'}">Ваша величина: ${scenario.extraGiven}. Верно: ${scenario.extraAnswer}.</p>`;
  return `<article class="card"><h3>Тренажёр завершён</h3><p>Основной ответ: ${scenario.mainAnswer}. Промежуточный: ${scenario.extraAnswer}.</p>${extraCheck}<button class="btn btn-primary" type="button" data-act="go-notes">К дневнику миссии</button></article>`;
}

function shapeHtml(shape) {
  return `<i class="shape shape-${shape}" aria-hidden="true"></i>`;
}

function ensureSlots(algo) {
  if (algo.slots) return;
  algo.slots = [null, null, null, null, null, null, null];
  algo.bank = (algo.order || algo.correct).slice();
  algo.picked = null;
}

function trainer3(lesson) {
  const algo = lesson.trainer.algo;
  const byIdMap = {};
  algo.blocks.forEach((block) => { byIdMap[block.id] = block; });
  ensureSlots(algo);
  if (lesson.trainer.stage === 'order' || lesson.trainer.stage === 'order-review') {
    const slots = algo.slots.map((id, index) => {
      const block = id ? byIdMap[id] : null;
      const good = algo.orderLocked && algo.correct[index] === id;
      const bad = algo.orderLocked && algo.correct[index] !== id;
      const body = block ? `${shapeHtml(block.shape)}<span>${esc(block.text)}</span>` : '<span>Пустой шаг</span>';
      if (algo.orderLocked) return `<div class="flow-slot is-filled ${good ? 'is-ok' : ''} ${bad ? 'is-no' : ''}"><span class="slot-n">${index + 1}</span>${body}</div>`;
      return `<button class="btn flow-slot ${block ? 'is-filled' : ''} ${algo.picked && block && algo.picked === id ? 'is-on' : ''}" type="button" data-act="algo-slot" data-i="${index}"><span class="slot-n">${index + 1}</span>${body}</button>`;
    }).join('<div class="flow-arrow" aria-hidden="true">↓</div>');
    const bank = algo.orderLocked ? '' : `<div class="flow-bank">${algo.bank.map((id) => {
      const block = byIdMap[id];
      return `<button class="btn flow-block" type="button" data-act="algo-pick" data-id="${id}">${shapeHtml(block.shape)}<span>${esc(block.text)}</span></button>`;
    }).join('')}</div>`;
    const action = algo.orderLocked
      ? `<p>Верный порядок: ${algo.correct.map((id) => esc(byIdMap[id].text)).join(' → ')}</p><button class="btn btn-primary" type="button" data-act="trace-start">К трассировке</button>`
      : '<button class="btn btn-primary" type="button" data-act="ask-confirm" data-confirm="order-submit">Сдать порядок блоков</button>';
    return `<article class="card no-cheat"><h3>${esc(algo.title)}</h3><p>${esc(algo.story)}</p>${nowNext('Нажмите блок: он встанет в первый свободный шаг. Занятый шаг возвращает блок назад.', 'После ромба сначала «да», потом «нет». Затем сдайте порядок.')}${exampleBox('Овал — начало и конец. Параллелограмм — ввод. Ромб — вопрос «да или нет». Прямоугольник — действие.')}${bank}<div class="flow">${slots}</div>${action}</article>`;
  }
  const correctList = algo.correct.map((id) => `<div class="btn block-item">${shapeHtml(byIdMap[id].shape)}<span>${esc(byIdMap[id].text)}</span></div>`).join('');
  if (!algo.traceLocked) {
    const chooser = algo.challenge.type === 'choice'
      ? algo.challenge.options.map((option, index) => `<button class="btn choice ${algo.tracePick === index ? 'is-on' : ''}" type="button" data-act="trace-pick" data-i="${index}">${esc(option)}</button>`).join('')
      : `<label class="field">Ответ<input id="trace-num" inputmode="numeric" autocomplete="off"></label>`;
    return `<article class="card no-cheat"><h3>Трассировка верной схемы</h3>${nowNext('Пройдите схему сверху вниз и ответьте на вопрос.', 'Сдайте один раз.')}${exampleBox('Если условие в ромбе истинно, выполняется только ветка «да». Ветка «нет» в этот проход молчит.')}${correctList}<p>${esc(algo.challenge.text)}</p>${chooser}<button class="btn btn-primary" type="button" data-act="ask-confirm" data-confirm="trace-submit">Сдать трассировку</button></article>`;
  }
  return `<article class="card"><h3>Трассировка сдана</h3><p>${esc(algo.challenge.explain)}</p><button class="btn btn-primary" type="button" data-act="go-notes">К дневнику миссии</button></article>`;
}

function graphTable(graph) {
  const ids = ['A', 'B', 'C', 'D', 'E'];
  const head = ids.map((id) => `<th>${esc(graph.names[id])}</th>`).join('');
  const rows = ids.map((row) => `<tr><th>${esc(graph.names[row])}</th>${ids.map((col) => {
    if (row === col) return '<td>·</td>';
    const weight = edgeWeight(graph, row, col);
    return `<td>${weight == null ? '—' : weight}</td>`;
  }).join('')}</tr>`).join('');
  const roads = graph.edges.map((edge) => `<li>${esc(graph.names[edge.a])} — ${esc(graph.names[edge.b])}: <b>${edge.w} км</b></li>`).join('');
  return `<ul class="road-list">${roads}</ul><details class="rules"><summary>Таблица расстояний</summary><p class="fine">Ту же схему можно сдвинуть пальцем вбок.</p><div class="table-wrap"><table class="matrix matrix-wide"><tr><th>км</th>${head}</tr>${rows}</table></div></details>`;
}

function roadSvg(graph) {
  const pos = { A: [58, 120], B: [128, 42], C: [168, 124], D: [128, 206], E: [286, 120] };
  const short = { A: 'Дом', B: 'Школа', C: 'Парк', D: 'Библ.', E: 'Стадион' };
  const lines = graph.edges.map((edge) => {
    const [x1, y1] = pos[edge.a];
    const [x2, y2] = pos[edge.b];
    const label = graph.draft[edge.id] ? esc(graph.draft[edge.id]) : '?';
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line><text class="lab" x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 6}">${label}</text>`;
  }).join('');
  const tone = { A: '#3de0ff', B: '#9b8cff', C: '#3ee0a0', D: '#ffc14d', E: '#ff8fab' };
  const nodes = Object.keys(pos).map((id) => `<circle cx="${pos[id][0]}" cy="${pos[id][1]}" r="22" fill="${tone[id]}"></circle><text class="node" x="${pos[id][0]}" y="${pos[id][1] + 4}">${short[id]}</text>`).join('');
  return `<svg class="road" viewBox="0 0 340 250" role="img" aria-label="Граф дорог">${lines}${nodes}</svg>`;
}

function trainer4(lesson) {
  const graph = lesson.trainer.graph;
  const table = graphTable(graph);
  if (lesson.trainer.stage === 'edges') {
    const rows = graph.edges.map((edge) => `<label class="edge-row"><span>${esc(graph.names[edge.a])} — ${esc(graph.names[edge.b])}</span><input class="bare-input" inputmode="numeric" data-edge="${edge.id}" value="${esc(graph.draft[edge.id] || '')}" placeholder="км"></label>`).join('');
    return `<article class="card no-cheat"><h3>Схема дорог</h3>${nowNext('Перенесите километры из списка в поля у каждой дороги.', 'Пустое поле попытку не тратит. Неверный вес снимает 10.')}${exampleBox('Если в списке «Дом — Школа: 5 км», в поле этой же дороги пишут 5, а не длину соседней дороги.')}${roadSvg(graph)}${table}${rows}<button class="btn btn-primary" type="button" data-act="ask-confirm" data-confirm="edge-submit">Сдать веса</button></article>`;
  }
  if (lesson.trainer.stage === 'edges-review') {
    const lines = graph.edges.map((edge) => {
      const given = Number(graph.given[edge.id]);
      const ok = given === edge.w;
      return `<p class="${ok ? 'ok-text' : 'warn-text'}">${esc(graph.names[edge.a])} — ${esc(graph.names[edge.b])}: вы написали ${given} км, верно ${edge.w} км.</p>`;
    }).join('');
    return `<article class="card"><h3>Веса сданы</h3><p>Сверьте каждую дорогу. Баллы уже учтены, повторно сдать нельзя.</p>${lines}<button class="btn btn-primary" type="button" data-act="path-start">Искать маршрут</button></article>`;
  }
  if (lesson.trainer.stage === 'path') {
    return `<article class="card no-cheat"><h3>Кратчайший маршрут</h3>${nowNext('От «Дома» до «Стадиона» через «' + graph.names[graph.via] + '». Сложите километры по дорогам.', 'Сдайте одну длину всего пути, не длину одного ребра.')}${exampleBox('Маршрут 4 км + 6 км длиннее маршрута 3 км + 3 км: сравнивают суммы, 10 и 6, а не красоту линии.')}${roadSvg(graph)}${table}<label class="field">Длина всего пути, км<input id="path-len" inputmode="numeric" autocomplete="off"></label><button class="btn btn-primary" type="button" data-act="ask-confirm" data-confirm="path-submit">Сдать длину</button></article>`;
  }
  const best = shortestVia(buildAdj(graph.edges), 'A', graph.via, 'E');
  const wrote = graph.pathGiven;
  const same = best && wrote === best.len;
  const compare = best ? `<p class="${same ? 'ok-text' : 'warn-text'}">Вы написали ${wrote == null ? '—' : wrote} км. Верная сумма ${best.len} км: ${esc(best.path.map((id) => graph.names[id]).join(' → '))}.</p><p>Длину пути получают сложением километров его дорог.</p>` : '';
  return `<article class="card"><h3>Маршрут проверен</h3>${compare}<button class="btn btn-primary" type="button" data-act="go-notes">К дневнику миссии</button></article>`;
}

function blitzHtml(lesson) {
  const blitz = lesson.blitz;
  const question = blitz.questions[blitz.index];
  if (!question) return '<article class="card">Вопросы ещё не готовы.</article>';
  if (blitz.review) {
    const result = blitz.results[blitz.index];
    const title = result.timeout ? 'Время вышло' : (result.fast ? 'Слишком быстро' : (result.matched ? 'Верно' : 'Неверно'));
    return `<article class="card no-cheat"><p class="pill">Блиц ${blitz.index + 1} / 4</p><h3 class="${result.points ? 'ok-text' : 'bad-text'}">${title}</h3><p>${esc(question.explain)}</p><p>Баллы за вопрос: ${result.points} / 10</p><button class="btn btn-primary" type="button" data-act="blitz-next">Дальше</button></article>`;
  }
  const left = Math.max(0, (blitz.deadline || Date.now()) - Date.now());
  const extra = question.usesGraph ? graphTable(lesson.trainer.graph) : '';
  const graph = question.graph ? `<canvas class="plot" data-plot="${esc(JSON.stringify(question.graph))}"></canvas>` : '';
  const letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е'];
  const mission = MISSIONS[lesson.n];
  const answers = question.type === 'choice'
    ? question.options.map((option, index) => `<button class="btn choice" type="button" data-act="blitz-pick" data-i="${index}"><span class="choice-letter">${letters[index] || index + 1}</span><span>${esc(option)}</span></button>`).join('')
    : `<label class="field">Целое число<input id="blitz-num" inputmode="numeric" autocomplete="off"></label><button class="btn btn-primary" type="button" data-act="blitz-num">Сдать число</button>`;
  return `<article class="card no-cheat mission quest-card" style="--accent:${mission.hue}"><div class="timer"><span>Блиц ${blitz.index + 1} / 4</span><span data-timer-label>${Math.ceil(left / 1000)} с</span></div><div class="timer-track"><span data-timer-bar style="width:${(left / BLITZ_MS) * 100}%"></span></div><p class="blitz-q">${esc(question.text)}</p>${question.complex ? '<p class="fine">Расчётный вопрос: ответ быстрее 2 секунд не засчитывается.</p>' : ''}${extra}${graph}${answers}</article>`;
}

function resultHtml(lesson) {
  const mission = MISSIONS[lesson.n];
  return `<article class="card result-hero mission" style="--accent:${mission.hue}">${wmLayer()}<div class="content big-grade">
      <p class="eyebrow">Миссия пройдена</p>
      <p class="stars">${esc(stars(lesson.grade))}</p>
      <span class="badge grade-${lesson.grade}">${lesson.grade}</span>
      <strong>${lesson.grade}</strong>
      <p>${esc(gradeWord(lesson.grade))} · ${esc(rankTitle(xpTotal()))}</p>
      <p>${lesson.total} из 100</p>
      <p class="fine">Баллы уже уходят учителю сами. Код ниже — для сверки, его не нужно диктовать одноклассникам.</p>
    </div></article>
    <article class="card"><table class="breakdown">
      <tr><td>Теория</td><td>${lesson.theoryScore}/15</td></tr>
      <tr><td>Тренажёр</td><td>${lesson.trainerScore}/45</td></tr>
      <tr><td>Блиц</td><td>${lesson.blitzScore}/40</td></tr>
      <tr><td>Штраф за уходы</td><td>−${lesson.penalty}</td></tr>
      <tr><td>Ошибки тренажёра</td><td>${lesson.trainer.errors}</td></tr>
      <tr><td>Время</td><td>${fmtDuration(lesson.timeMs)}</td></tr>
    </table>${honestyBlock(lesson)}<p class="fine">Код проверки</p><code class="kbd-code">${esc(lesson.code)}</code>
    <button class="btn btn-ghost" type="button" data-act="copy-code" data-code="${esc(lesson.code)}">Скопировать код</button>
    <button class="btn btn-primary" type="button" data-act="nav" data-go="grades">Открыть табель</button>
    <button class="btn btn-ghost" type="button" data-act="nav-hw" data-n="${lesson.n}">Перейти к ДЗ этого урока</button></article>`;
}

function render(options) {
  options = options || {};
  const auth = $('auth');
  const shell = $('shell');
  const teacherDoor = !state.student && state.teacherDoor;
  if (!state.student && !teacherDoor) {
    auth.classList.remove('is-hidden');
    shell.classList.add('is-hidden');
    return;
  }
  if (teacherDoor && currentView() !== 'teacher') {
    location.hash = 'teacher';
    return;
  }
  auth.classList.add('is-hidden');
  shell.classList.remove('is-hidden');
  const tabbar = document.querySelector('.tabbar');
  if (tabbar) tabbar.classList.toggle('is-hidden', teacherDoor);
  if (state.student) readHwFromDom();
  $('student-chip').textContent = state.student
    ? `${state.student.lastName} ${state.student.firstName} · ${state.student.className} · группа ${state.groupId === '2' ? '2' : '1'}`
    : 'Учитель';
  const notice = $('notice');
  if (state.notice) {
    notice.classList.remove('is-hidden');
    notice.innerHTML = `${esc(state.notice)} <button class="btn btn-ghost" type="button" data-act="dismiss-notice">Скрыть</button>`;
  } else notice.classList.add('is-hidden');
  const view = currentView();
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.go === (view === 'lesson' ? 'lessons' : view));
  });
  const main = $('main');
  const scroll = options.toTop ? 0 : main.scrollTop;
  const nodes = {
    lessons: $('view-lessons'),
    grades: $('view-grades'),
    hw: $('view-hw'),
    teacher: $('view-teacher'),
    lesson: $('view-lesson')
  };
  Object.keys(nodes).forEach((key) => nodes[key].classList.toggle('is-hidden', key !== view));
  if (view === 'lessons') nodes.lessons.innerHTML = renderLessons();
  if (view === 'grades') {
    nodes.grades.innerHTML = renderGrades();
    if (cloudOn() && validRoom(state.roomCode)) {
      LabCloud.watchBoard(normRoom(state.roomCode), state.groupId || '1', (rows) => {
        const wrap = $('rank-wrap');
        if (wrap) wrap.innerHTML = rankTable(rows);
      });
    }
  }
  if (view === 'hw') nodes.hw.innerHTML = renderHw();
  if (view === 'teacher') nodes.teacher.innerHTML = renderTeacher();
  if (view === 'lesson') {
    const n = currentLessonNumber();
    if (!n) {
      location.hash = 'lessons';
      return;
    }
    const lesson = ensureLesson(n);
    if (lesson.phase === 'theory' && !lesson.theory.cardStartedAt) {
      lesson.theory.cardStartedAt = Date.now();
      save();
    }
    if (lesson.phase === 'blitz' && !lesson.blitz.questions.length) attachBlitz(lesson);
    if (lesson.phase === 'blitz') ensureBlitzTimer(lesson);
    nodes.lesson.innerHTML = lessonHtml(lesson);
    drawAllPlots();
    if (lesson.n === 2 && lesson.phase === 'trainer') drawLivePlot();
    requestAnimationFrame(() => {
      drawAllPlots();
      if (lesson.n === 2 && lesson.phase === 'trainer') drawLivePlot();
    });
  }
  main.scrollTop = scroll;
  paintClocks();
}

function drawPlot(canvas, spec) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.clientWidth || 320;
  const height = canvas.clientHeight || 230;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0d1526';
  ctx.fillRect(0, 0, width, height);
  const pad = { l: 46, r: 16, t: 16, b: 32 };
  const iw = width - pad.l - pad.r;
  const ih = height - pad.t - pad.b;
  ctx.strokeStyle = 'rgba(61,224,255,0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (ih * i) / 4;
    const x = pad.l + (iw * i) / 4;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(width - pad.r, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, pad.t + ih); ctx.stroke();
  }
  ctx.strokeStyle = '#9fb0c9';
  ctx.beginPath();
  ctx.moveTo(pad.l, pad.t);
  ctx.lineTo(pad.l, pad.t + ih);
  ctx.lineTo(width - pad.r, pad.t + ih);
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = '#3de0ff';
  ctx.lineWidth = 2.5;
  for (let i = 0; i <= 60; i++) {
    const xVal = spec.xMax * i / 60;
    const yVal = spec.y0 + spec.slope * xVal;
    const px = pad.l + (xVal / spec.xMax) * iw;
    const py = pad.t + ih - (yVal / spec.yMax) * ih;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  const endX = pad.l + iw;
  const endYVal = spec.y0 + spec.slope * spec.xMax;
  const endY = pad.t + ih - (endYVal / spec.yMax) * ih;
  ctx.fillStyle = '#ffc14d';
  ctx.beginPath();
  ctx.arc(endX, endY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#9fb0c9';
  ctx.font = '12px Manrope, sans-serif';
  ctx.fillText(spec.xLabel || '', width - pad.r - 48, height - 8);
  ctx.fillText(spec.yLabel || '', 6, 14);
  ctx.fillText('0', pad.l - 4, pad.t + ih + 14);
  ctx.fillText(String(spec.xMax), width - pad.r - 12, pad.t + ih + 14);
  ctx.fillText(String(spec.yMax), 4, pad.t + 28);
}

function drawAllPlots() {
  document.querySelectorAll('canvas[data-plot]').forEach((canvas) => {
    try { drawPlot(canvas, JSON.parse(canvas.dataset.plot)); } catch (error) { /* график необязателен для ответа */ }
  });
}

function drawLivePlot() {
  const n = currentLessonNumber();
  const lesson = n && state.lessons[n];
  const canvas = document.querySelector('canvas[data-plot-live]');
  if (!lesson || !canvas || !lesson.trainer.scenario) return;
  drawPlot(canvas, plotSpec(lesson.trainer.scenario));
}

function ensureBlitzTimer(lesson) {
  const blitz = lesson.blitz;
  if (blitz.review || blitz.results.length !== blitz.index || blitz.index >= blitz.questions.length) return;
  if (!blitz.qStartedAt) {
    blitz.qStartedAt = Date.now();
    blitz.deadline = blitz.qStartedAt + BLITZ_MS;
    blitz.acceptAfter = blitz.qStartedAt + 400;
    save();
  }
}

function activeLesson() {
  const n = currentLessonNumber();
  return n ? state.lessons[n] : null;
}

function readInt(id) {
  const node = $(id);
  if (!node) return { ok: false };
  const raw = node.value.trim();
  if (!/^\d+$/.test(raw)) return { ok: false };
  return { ok: true, value: Number(raw) };
}

function addTrainerError(lesson, count) {
  lesson.trainer.errors += count;
}

function finishLesson(n) {
  const lesson = state.lessons[n];
  if (!lesson || lesson.phase === 'done') return;
  if (!document.hidden && lesson.lastTick) {
    const delta = Date.now() - lesson.lastTick;
    if (delta > 0 && delta < 5000) lesson.timeMs += delta;
  }
  lesson.lastTick = Date.now();
  const score = recompute(lesson);
  lesson.theoryScore = score.theoryScore;
  lesson.trainerScore = score.trainerScore;
  lesson.blitzScore = score.blitzScore;
  lesson.penalty = score.penalty;
  lesson.total = score.total;
  lesson.grade = score.grade;
  lesson.phase = 'done';
  lesson.finishedAt = Date.now();
  lesson.code = formatCode(state.student, lesson);
  save();
  publishProgress({ loud: true });
  if (currentLessonNumber() === n) render({ toTop: true });
}

function pushBlitz(lesson, result) {
  const blitz = lesson.blitz;
  if (blitz.results.length !== blitz.index || blitz.review) return;
  blitz.results.push(result);
  if (result.fast) lesson.suspiciousFast = (lesson.suspiciousFast || 0) + 1;
  blitz.review = true;
  save();
  if (currentLessonNumber() === lesson.n) render({ toTop: true });
}

function answerBlitz(lesson, matched, fast, timeout) {
  pushBlitz(lesson, {
    matched: !!matched,
    fast: !!fast,
    timeout: !!timeout,
    points: matched && !fast && !timeout ? 10 : 0,
    spentMs: lesson.blitz.qStartedAt ? Date.now() - lesson.blitz.qStartedAt : 0
  });
}

function setDeep(obj, path, value) {
  const parts = path.split('.');
  let cursor = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cursor = cursor[parts[i]];
  }
  cursor[parts[parts.length - 1]] = value;
}

function readHwFromDom() {
  document.querySelectorAll('[data-bind]').forEach((node) => setDeep(state.hw, node.dataset.bind, node.value));
}

function hwPlain(n, hw) {
  if (n === 1) {
    return hw.cards.map((card, index) => `Карточка ${index + 1}: ${card.name}; оригинал: ${card.original}; тип: ${card.type === 'mat' ? 'материальная' : 'информационная'}; цель: ${card.goal}`).join('\n');
  }
  if (n === 2) {
    return hw.tasks.map((task, index) => `Задача ${index + 1}: ${task.title}\nДанные: ${task.data}\nФормула: ${task.formula}\nРешение: ${task.solution}`).join('\n\n');
  }
  if (n === 3) {
    return `Тема: ${hw.topic}\n` + hw.steps.map((step, index) => step.trim() ? `${index + 1}. ${step.trim()}` : '').filter(Boolean).join('\n');
  }
  if (hw.mode === 'graph') {
    const nodes = hw.graph.nodes.map((name, index) => `${index + 1}) ${name}`).join(', ');
    const edges = hw.graph.edges.map((edge) => `${hw.graph.nodes[edge.a]} — ${hw.graph.nodes[edge.b]} (${edge.w})`).join('; ');
    return `Граф. Вершины: ${nodes}\nРёбра: ${edges}\nПуть: ${hw.graph.path}\nДлина: ${hw.graph.length}`;
  }
  const head = hw.table.props.join(' | ');
  const rows = hw.table.objects.map((object, row) => `${object}: ${hw.table.cells[row].join(' | ')}`).join('\n');
  return `Таблица. Свойства: ${head}\n${rows}`;
}

function reportPlain() {
  const lines = [
    'ЦИФРОЛАБ 7 · ОТЧЁТ',
    `Ученик: ${state.student.lastName} ${state.student.firstName}`,
    `Класс: ${state.student.className}`,
    `Группа: ${state.groupId === '2' ? '2' : '1'}`,
    `Сформирован: ${clockText()}`,
    ''
  ];
  [1, 2, 3, 4].forEach((n) => {
    const lesson = state.lessons[n];
    lines.push(`УРОК ${n}. ${META[n].title}`);
    if (!lesson || lesson.phase !== 'done') lines.push('Классная работа: не завершена');
    else {
      lines.push(`Оценка: ${lesson.grade} (${lesson.total}/100) — ${gradeWord(lesson.grade)}`);
      lines.push(`Теория ${lesson.theoryScore}/15; тренажёр ${lesson.trainerScore}/45; блиц ${lesson.blitzScore}/40; штраф −${lesson.penalty}`);
      lines.push(`Время: ${fmtDuration(lesson.timeMs)}; ошибки тренажёра: ${lesson.trainer.errors}`);
      lines.push(lesson.focusLostCount ? `Честность: сворачиваний окна ${lesson.focusLostCount}` : 'Честность: выходов из окна 0');
      lines.push(`Быстрых ответов: ${lesson.suspiciousFast || 0}`);
      lines.push(`Код: ${lesson.code}`);
    }
    lines.push(state.hw[n].done ? `ДЗ ${n}:\n${hwPlain(n, state.hw[n])}` : `ДЗ ${n}: не сдано`);
    lines.push('');
  });
  return lines.join('\n');
}

function reportHtml() {
  const student = state.student;
  const rows = [1, 2, 3, 4].map((n) => {
    const lesson = state.lessons[n];
    const grade = lesson && lesson.phase === 'done' ? `${lesson.grade} · ${lesson.total}/100` : 'нет';
    const code = lesson && lesson.code ? lesson.code : '—';
    return `<tr><td>${n}. ${esc(META[n].title)}</td><td>${esc(grade)}</td><td>${esc(code)}</td></tr>`;
  }).join('');
  const hw = [1, 2, 3, 4].map((n) => `<h2>ДЗ ${n}. ${esc(META[n].hw)}</h2><pre>${esc(state.hw[n].done ? hwPlain(n, state.hw[n]) : 'не сдано')}</pre>`).join('');
  return `<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><title>Отчёт ${esc(student.lastName)}</title>
    <style>body{font-family:Segoe UI,sans-serif;background:#0d1526;color:#e8f0fb;padding:24px}table{border-collapse:collapse;width:100%}td{border:1px solid #345;padding:8px}h1{font-size:28px}pre{white-space:pre-wrap}</style></head>
    <body><p>${esc(student.lastName)} ${esc(student.firstName)} · ${esc(student.className)} · группа ${state.groupId === '2' ? '2' : '1'} · ${esc(clockText())}</p>
    <h1>Цифролаб 7. Отчёт</h1><table>${rows}</table>${hw}</body></html>`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  toast('Скопировано');
}

function handleAuth(event) {
  event.preventDefault();
  const lastName = prettyName($('lastName').value);
  const firstName = prettyName($('firstName').value);
  const className = normClass($('className').value);
  const error = $('auth-error');
  if (!validPerson(lastName) || !validPerson(firstName)) {
    error.textContent = 'Фамилия и имя: буквы, можно дефис, без цифр.';
    return;
  }
  if (!validClass(className)) {
    error.textContent = 'Класс укажите как 7А.';
    return;
  }
  error.textContent = '';
  state.student = {
    lastName,
    firstName,
    className,
    salt: hashString(String(Date.now()) + ':' + Math.random()).toString(16),
    createdAt: Date.now()
  };
  state.teacherDoor = false;
  const pickedGroup = (document.querySelector('input[name="signupGroup"]:checked') || {}).value;
  state.groupId = pickedGroup === '2' ? '2' : '1';
  state.roomCode = roomFromClass(className);
  state.hw = emptyHw();
  save();
  publishProgress();
  location.hash = 'lessons';
  render({ toTop: true });
}

function theoryPick(lesson, index) {
  const card = lesson.theory.cards[lesson.theory.index];
  if (!card || card.solved || card.wrong.indexOf(index) >= 0) return;
  if (Date.now() - lesson.theory.cardStartedAt < READ_MS) return;
  card.attempts += 1;
  if (index === card.correctIndex) {
    card.solved = true;
    card.points = card.attempts === 1 ? 3 : 0;
  } else card.wrong.push(index);
  save();
  render();
}

function slidersMatch(scenario) {
  return Object.keys(scenario.sliders).every((key) => scenario.sliders[key].value === scenario.sliders[key].target);
}

function trainerReady(lesson) {
  if (lesson.n === 1) return !!lesson.trainer.classSubmitted;
  if (lesson.n === 2) return lesson.trainer.stage === 'review';
  if (lesson.n === 3) return !!(lesson.trainer.algo && lesson.trainer.algo.traceLocked);
  if (lesson.n === 4) return !!(lesson.trainer.graph && lesson.trainer.graph.pathSubmitted);
  return false;
}

function actConfirm(name) {
  const lesson = activeLesson();
  if (!lesson || lesson.phase !== 'trainer') return;
  if (name === 'feat-submit') {
    if (!lesson.trainer.task || lesson.trainer.task.submitted) return;
    if (!lesson.trainer.task.picked.length) { toast('Отметьте признаки, которые считаете существенными.'); return; }
    confirmModal('Сдать признаки?', 'Изменить набор после сдачи нельзя. Каждая ошибка снимает 10 баллов.', () => {
      if (lesson.trainer.task.submitted) return;
      addTrainerError(lesson, featureErrors(lesson.trainer.task.features, lesson.trainer.task.picked));
      lesson.trainer.task.submitted = true;
      lesson.trainer.stage = 'features-review';
      save();
      render({ toTop: true });
    });
  }
  if (name === 'cls-submit') {
    if (!lesson.trainer.items || lesson.trainer.classSubmitted) return;
    if (lesson.trainer.items.some((item) => !lesson.trainer.answers[item.id])) { toast('Распределите все 8 карточек.'); return; }
    confirmModal('Сдать классификацию?', 'Попытка одна.', () => {
      if (lesson.trainer.classSubmitted) return;
      const wrong = lesson.trainer.items.filter((item) => lesson.trainer.answers[item.id] !== item.type).length;
      addTrainerError(lesson, wrong);
      lesson.trainer.classSubmitted = true;
      lesson.trainer.stage = 'classify-review';
      save();
      render({ toTop: true });
    });
  }
  if (name === 'formula-submit') {
    if (!lesson.trainer.scenario || lesson.trainer.scenario.formulaLocked) return;
    if (lesson.trainer.scenario.formulaPick == null) { toast('Выберите формулу.'); return; }
    confirmModal('Сдать формулу?', 'Попытка одна.', () => {
      if (lesson.trainer.scenario.formulaLocked) return;
      const picked = lesson.trainer.scenario.formulas[lesson.trainer.scenario.formulaPick];
      lesson.trainer.scenario.formulaWasOk = !!picked.ok;
      if (!picked.ok) addTrainerError(lesson, 1);
      lesson.trainer.scenario.formulaLocked = true;
      lesson.trainer.stage = 'calc';
      save();
      render({ toTop: true });
    });
  }
  if (name === 'math-submit' || name === 'extra-submit') {
    const field = name === 'math-submit' ? 'math-answer' : 'math-extra';
    const parsed = readInt(field);
    if (!parsed.ok) { toast('Введите целое число без единиц измерения.'); return; }
    if (!lesson.trainer.scenario) return;
    if (name === 'math-submit' && (lesson.trainer.stage !== 'calc' || lesson.trainer.scenario.mainLocked)) return;
    if (name === 'extra-submit' && (lesson.trainer.stage !== 'extra' || lesson.trainer.scenario.extraLocked)) return;
    confirmModal('Сдать число?', 'Неверный ответ снимает 10 баллов. Повторной сдачи нет.', () => {
      const scenario = lesson.trainer.scenario;
      if (name === 'math-submit' && scenario.mainLocked) return;
      if (name === 'extra-submit' && scenario.extraLocked) return;
      if (name === 'math-submit') {
        if (!slidersMatch(scenario)) addTrainerError(lesson, 1);
        if (parsed.value !== scenario.mainAnswer) addTrainerError(lesson, 1);
        scenario.mainGiven = parsed.value;
        scenario.mainLocked = true;
        lesson.trainer.stage = 'extra';
      } else {
        if (parsed.value !== scenario.extraAnswer) addTrainerError(lesson, 1);
        scenario.extraGiven = parsed.value;
        scenario.extraLocked = true;
        lesson.trainer.stage = 'review';
      }
      save();
      render({ toTop: true });
    });
  }
  if (name === 'order-submit') {
    if (!lesson.trainer.algo || lesson.trainer.algo.orderLocked) return;
    ensureSlots(lesson.trainer.algo);
    if (lesson.trainer.algo.slots.some((id) => !id)) { toast('Поставьте все 7 блоков на схему.'); return; }
    confirmModal('Сдать порядок блоков?', 'Каждый блок не на своём месте — отдельная ошибка.', () => {
      if (lesson.trainer.algo.orderLocked) return;
      const algo = lesson.trainer.algo;
      let wrong = 0;
      algo.slots.forEach((id, index) => { if (id !== algo.correct[index]) wrong += 1; });
      algo.order = algo.slots.slice();
      addTrainerError(lesson, wrong);
      algo.orderLocked = true;
      lesson.trainer.stage = 'order-review';
      save();
      render({ toTop: true });
    });
  }
  if (name === 'trace-submit') {
    const algo = lesson.trainer.algo;
    if (!algo || algo.traceLocked) return;
    let okValue = false;
    let value = null;
    if (algo.challenge.type === 'choice') {
      if (algo.tracePick == null) { toast('Выберите выход алгоритма.'); return; }
      okValue = algo.tracePick === algo.challenge.correctIndex;
    } else {
      const parsed = readInt('trace-num');
      if (!parsed.ok) { toast('Введите целое число.'); return; }
      value = parsed.value;
      okValue = value === algo.challenge.answer;
    }
    confirmModal('Сдать трассировку?', 'Попытка одна.', () => {
      if (algo.traceLocked) return;
      if (!okValue) addTrainerError(lesson, 1);
      algo.traceLocked = true;
      lesson.trainer.stage = 'trace-review';
      save();
      render({ toTop: true });
    });
  }
  if (name === 'edge-submit') {
    if (!lesson.trainer.graph || lesson.trainer.graph.edgeSubmitted) return;
    const values = {};
    let missing = false;
    lesson.trainer.graph.edges.forEach((edge) => {
      const raw = String(lesson.trainer.graph.draft[edge.id] || '').trim();
      if (!/^\d+$/.test(raw)) missing = true;
      values[edge.id] = raw;
    });
    if (missing) { toast('Для каждого ребра введите целое число километров.'); return; }
    confirmModal('Сдать веса рёбер?', 'Ошибочный вес снимает 10 баллов.', () => {
      if (lesson.trainer.graph.edgeSubmitted) return;
      let wrong = 0;
      lesson.trainer.graph.edges.forEach((edge) => { if (Number(values[edge.id]) !== edge.w) wrong += 1; });
      addTrainerError(lesson, wrong);
      lesson.trainer.graph.given = values;
      lesson.trainer.graph.edgeSubmitted = true;
      lesson.trainer.stage = 'edges-review';
      save();
      render({ toTop: true });
    });
  }
  if (name === 'path-submit') {
    const parsed = readInt('path-len');
    if (!parsed.ok) { toast('Введите длину целым числом.'); return; }
    if (!lesson.trainer.graph || lesson.trainer.graph.pathSubmitted) return;
    confirmModal('Сдать длину маршрута?', 'Попытка одна.', () => {
      if (lesson.trainer.graph.pathSubmitted) return;
      const best = shortestVia(buildAdj(lesson.trainer.graph.edges), 'A', lesson.trainer.graph.via, 'E');
      if (!best || parsed.value !== best.len) addTrainerError(lesson, 1);
      lesson.trainer.graph.pathGiven = parsed.value;
      lesson.trainer.graph.pathSubmitted = true;
      lesson.trainer.stage = 'path-review';
      save();
      render({ toTop: true });
    });
  }
}

function handleAct(act, btn) {
  if (act === 'open-teacher') {
    state.teacherDoor = true;
    save();
    if (location.hash !== '#teacher') location.hash = 'teacher';
    else render({ toTop: true });
    return;
  }
  if (act === 'close-teacher') {
    state.teacherDoor = false;
    save();
    location.hash = 'lessons';
    render({ toTop: true });
    return;
  }
  if (act === 'nav') {
    location.hash = btn.dataset.go;
    return;
  }
  if (act === 'open-lesson') {
    location.hash = 'lesson/' + btn.dataset.n;
    return;
  }
  if (act === 'nav-hw') {
    location.hash = 'hw';
    setTimeout(() => { const node = $('hw-' + btn.dataset.n); if (node) node.scrollIntoView({ behavior: 'smooth' }); }, 50);
    return;
  }
  if (act === 'dismiss-notice') {
    state.notice = '';
    save();
    render();
    return;
  }
  if (act === 'modal-cancel') { closeModal(); return; }
  if (act === 'modal-ok') {
    const fn = pendingYes;
    closeModal();
    if (fn) fn();
    return;
  }
  if (act === 'copy-report') { copyText(reportPlain()); return; }
  if (act === 'download-report') {
    const blob = new Blob([reportHtml()], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `report-${state.student.lastName}-${state.student.firstName}.html`;
    link.click();
    URL.revokeObjectURL(link.href);
    return;
  }
  if (act === 'copy-code') { copyText(btn.dataset.code || ''); return; }
  if (act === 'jump-journal') {
    const target = document.getElementById(btn.dataset.id || '');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (act === 'journal-group') {
    if (!lastJournalPack.length) { toast('Сначала откройте журнал.'); return; }
    paintLoadedJournal(btn.dataset.group || '');
    return;
  }
  if (act === 'copy-journal') {
    if (!lastJournalText) { toast('Сначала откройте журнал.'); return; }
    copyText(lastJournalText);
    return;
  }
  if (act === 'verify') { runVerify(); return; }
  if (act === 'set-group') {
    const group = btn.dataset.group === '2' ? '2' : '1';
    if (state.groupId === group) return;
    state.groupId = group;
    save();
    toast(group === '2' ? 'Теперь вы в группе 2' : 'Теперь вы в группе 1');
    publishProgress({ loud: true });
    render();
    return;
  }
  if (act === 'save-room') {
    const picked = $('room-group') && $('room-group').value;
    const group = picked === '2' ? '2' : '1';
    state.groupId = group;
    state.roomCode = roomFromClass(state.student.className);
    save();
    toast('Группа запомнена. Баллы уходят учителю сами.');
    publishProgress({ loud: true });
    render();
    return;
  }
  if (act === 'colleague-register') {
    const email = $('teacher-email').value.trim();
    const password = $('teacher-pass').value;
    const room = roomFromClass($('teacher-room').value);
    const out = $('journal-out');
    if (!validRoom(room) || !email || password.length < 6) {
      out.innerHTML = '<p class="field-error">Нужны почта, пароль от 6 символов и класс, например 7А.</p>';
      return;
    }
    LabCloud.teacherLogin(email, password, true).then(() => LabCloud.myAccess(room)).then((access) => {
      const node = $('journal-out');
      if (node) node.innerHTML = `<p class="ok-text">Вход коллеги создан. Передайте ведущему код доступа: ${esc(access.uid)}</p>`;
    }).catch((error) => {
      const node = $('journal-out');
      if (node) node.innerHTML = `<p class="field-error">${esc(teacherErrorText(error))}</p>`;
    });
    return;
  }
  if (act === 'teacher-register') {
    const email = $('teacher-email').value.trim();
    const password = $('teacher-pass').value;
    const room = roomFromClass($('teacher-room').value);
    const out = $('journal-out');
    if (!validRoom(room) || !email || password.length < 6) {
      out.innerHTML = '<p class="field-error">Нужны почта, пароль от 6 символов и класс, например 7А.</p>';
      return;
    }
    LabCloud.teacherLogin(email, password, true).then(() => LabCloud.claimMaster(room, 'Усеинов Эмир Рустемович')).then(() => LabCloud.teacherJournal(room)).then((result) => {
      const node = $('journal-out');
      if (node) node.innerHTML = `<p class="ok-text">Вы ведущий. Код доступа: ${esc(result.access.uid)}</p>` + journalCards(result.rows);
    }).catch((error) => {
      const node = $('journal-out');
      if (node) node.innerHTML = `<p class="field-error">${esc(teacherErrorText(error))}</p>`;
    });
    return;
  }
  if (act === 'grant-teacher') {
    const room = roomFromClass($('teacher-room').value);
    const uid = $('colleague-uid').value.trim();
    const groups = Array.from(document.querySelectorAll('.grant-group:checked')).map((node) => node.value);
    const out = $('journal-out');
    if (!validRoom(room) || uid.length < 8 || !groups.length) {
      out.innerHTML = '<p class="field-error">Нужны класс, код доступа коллеги и хотя бы одна группа.</p>';
      return;
    }
    LabCloud.grantTeacher(room, uid, groups).then(() => {
      out.innerHTML = `<p class="ok-text">Коллеге открыты группы ${esc(groups.join(', '))}.</p>`;
    }).catch((error) => {
      out.innerHTML = `<p class="field-error">${esc(teacherErrorText(error))}</p>`;
    });
    return;
  }
  if (act === 'teacher-reset') {
    const email = $('teacher-email').value.trim();
    const out = $('journal-out');
    if (!email || email.indexOf('@') < 1) {
      out.innerHTML = '<p class="field-error">Напишите почту, на которую прислать письмо.</p>';
      return;
    }
    out.innerHTML = '<p class="fine">Отправляю письмо…</p>';
    LabCloud.sendPasswordReset(email).then(() => {
      const node = $('journal-out');
      if (node) node.innerHTML = '<p class="ok-text">Письмо отправлено. Задайте в нём пароль, затем вернитесь и нажмите «Закрепить меня ведущим этого класса».</p>';
    }).catch((error) => {
      const node = $('journal-out');
      if (node) node.innerHTML = `<p class="field-error">${esc(teacherErrorText(error))}</p>`;
    });
    return;
  }
  if (act === 'teacher-logout') {
    LabCloud.teacherLogout().then(() => {
      toast('Вход учителя закрыт. Этот телефон снова может отправлять баллы ученика.');
      publishProgress();
      render();
    }).catch((error) => toast(teacherErrorText(error)));
    return;
  }
  if (act === 'teacher-journal' || act === 'teacher-parallel' || act === 'teacher-all' || act === 'teacher-claim-all') {
    const email = $('teacher-email').value.trim();
    const password = $('teacher-pass').value;
    const out = $('journal-out');
    const names = act === 'teacher-parallel'
      ? [btn.dataset.class]
      : (act === 'teacher-journal' ? [($('teacher-room').value || '').trim()] : parallelClassNames());
    if (names.some((name) => !validRoom(roomFromClass(name)))) {
      out.innerHTML = '<p class="field-error">Нужен класс, например 7А.</p>';
      return;
    }
    out.innerHTML = '<p class="fine">Открываю параллели…</p>';
    const session = (email && password)
      ? LabCloud.teacherLogin(email, password).then((user) => {
        try { localStorage.setItem('digitallab7-teacher-email', email); } catch (error) { /* почта только на этом телефоне */ }
        return user;
      })
      : LabCloud.currentTeacher().then((user) => {
        if (!user) throw new Error('Первый раз на этом телефоне нужны почта и пароль.');
        return user;
      });
    session.then(async () => {
      if (act === 'teacher-claim-all') {
        for (const name of parallelClassNames()) {
          try {
            await LabCloud.claimMaster(roomFromClass(name), 'Усеинов Эмир Рустемович');
          } catch (error) {
            // Остальные параллели закрепляются даже если одна уже занята.
          }
        }
      }
      const pack = [];
      for (const name of (act === 'teacher-claim-all' ? parallelClassNames() : names)) {
        try {
          pack.push({ name, result: await LabCloud.teacherJournal(roomFromClass(name)) });
        } catch (error) {
          pack.push({ name, error: teacherErrorText(error) });
        }
      }
      lastJournalPack = pack;
      paintLoadedJournal('');
    }).catch((error) => {
      const node = $('journal-out');
      if (node) node.innerHTML = `<p class="field-error">${esc(teacherErrorText(error))}</p>`;
    });
    return;
  }
  if (act === 'hw-mode') {
    readHwFromDom();
    state.hw[4].mode = btn.dataset.mode;
    save();
    render();
    return;
  }
  if (act === 'hw-add-edge') {
    readHwFromDom();
    if (state.hw[4].graph.edges.length >= 8) { toast('Для защиты проекта хватит восьми рёбер.'); return; }
    state.hw[4].graph.edges.push({ a: '0', b: '1', w: '' });
    save();
    render();
    return;
  }
  if (act === 'hw-save') {
    readHwFromDom();
    const n = Number(btn.dataset.n);
    const result = validateHomework(n, state.hw[n]);
    state.hw[n].message = result.ok ? '' : result.message;
    if (result.ok) {
      state.hw[n].done = true;
      state.hw[n].savedAt = Date.now();
      const photoInput = document.querySelector(`[data-photo="${n}"]`);
      const photo = photoInput && photoInput.files ? photoInput.files[0] : null;
      save();
      render();
      toast('Домашняя работа сдана');
      if (photo && cloudOn() && validRoom(state.roomCode)) {
        const payload = progressPayload();
        LabCloud.uploadPhoto(payload.roomId, payload.studentId, n, photo).then((url) => {
          state.hw[n].photoUrl = url;
          save();
          return publishProgress({ loud: true });
        }).catch((error) => toast(error.message || 'Фото не отправилось, текст ДЗ сохранён'));
      } else publishProgress({ loud: true });
    } else {
      save();
      render();
    }
    const card = $('hw-' + n);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  const lesson = activeLesson();
  if (!lesson || lesson.phase === 'done') return;
  if (act === 'start-lesson' && lesson.phase === 'goal') {
    lesson.phase = 'theory';
    lesson.startedAt = Date.now();
    lesson.lastTick = Date.now();
    lesson.theory.cardStartedAt = Date.now();
    save();
    render({ toTop: true });
    return;
  }
  if (act === 'theory-pick') { theoryPick(lesson, Number(btn.dataset.i)); return; }
  if (act === 'theory-next') {
    const card = lesson.theory.cards[lesson.theory.index];
    if (!card.solved || lesson.theory.index >= 4) return;
    lesson.theory.index += 1;
    lesson.theory.cardStartedAt = Date.now();
    save();
    render({ toTop: true });
    return;
  }
  if (act === 'go-trainer' && lesson.phase === 'theory') {
    if (!lesson.theory.cards.every((card) => card.solved)) return;
    lesson.phase = 'trainer';
    if (!lesson.cheatArmedAt) lesson.cheatArmedAt = Date.now();
    save();
    render({ toTop: true });
    return;
  }
  if (act === 'feat-toggle' && !lesson.trainer.task.submitted) {
    const id = btn.dataset.id;
    const list = lesson.trainer.task.picked;
    const at = list.indexOf(id);
    if (at >= 0) list.splice(at, 1);
    else list.push(id);
    save();
    render();
    return;
  }
  if (act === 'feat-next') {
    if (!lesson.trainer.task || !lesson.trainer.task.submitted) return;
    lesson.trainer.stage = 'classify';
    save();
    render({ toTop: true });
    return;
  }
  if (act === 'cls-pick' && !lesson.trainer.classSubmitted) {
    lesson.trainer.answers[btn.dataset.id] = btn.dataset.type;
    save();
    render();
    return;
  }
  if (act === 'formula-pick' && !lesson.trainer.scenario.formulaLocked) {
    lesson.trainer.scenario.formulaPick = Number(btn.dataset.i);
    save();
    render();
    return;
  }
  if ((act === 'algo-pick' || act === 'algo-slot') && lesson.trainer.algo && !lesson.trainer.algo.orderLocked) {
    const algo = lesson.trainer.algo;
    ensureSlots(algo);
    let placedIndex = null;
    if (act === 'algo-pick') {
      const empty = algo.slots.indexOf(null);
      if (empty < 0) { toast('Все шаги заняты. Нажмите шаг, чтобы убрать блок.'); return; }
      algo.slots[empty] = btn.dataset.id;
      algo.bank = algo.bank.filter((id) => id !== btn.dataset.id);
      algo.picked = null;
      placedIndex = empty;
    } else {
      const index = Number(btn.dataset.i);
      const current = algo.slots[index];
      if (!current) return;
      algo.slots[index] = null;
      algo.bank.push(current);
    }
    save();
    render();
    if (placedIndex !== null) {
      const placed = document.querySelector(`#view-lesson [data-act="algo-slot"][data-i="${placedIndex}"]`);
      if (placed) placed.scrollIntoView({ block: 'center' });
    }
    return;
  }
  if (act === 'trace-start') {
    if (!lesson.trainer.algo || !lesson.trainer.algo.orderLocked) return;
    lesson.trainer.stage = 'trace';
    save();
    render({ toTop: true });
    return;
  }
  if (act === 'trace-pick' && !lesson.trainer.algo.traceLocked) {
    lesson.trainer.algo.tracePick = Number(btn.dataset.i);
    save();
    render();
    return;
  }
  if (act === 'path-start') {
    if (!lesson.trainer.graph || !lesson.trainer.graph.edgeSubmitted) return;
    lesson.trainer.stage = 'path';
    save();
    render({ toTop: true });
    return;
  }
  if (act === 'go-notes') {
    if (!trainerReady(lesson)) { toast('Сначала завершите практику.'); return; }
    if (!lesson.notes) lesson.notes = ['', '', ''];
    lesson.phase = 'notes';
    save();
    render({ toTop: true });
    return;
  }
  if (act === 'notes-save') {
    if (lesson.phase !== 'notes') return;
    const notes = [0, 1, 2].map((index) => {
      const node = $('note-' + index);
      return node ? node.value.trim() : '';
    });
    if (notes.some((text) => !isMeaningful(text, 16))) {
      toast('В каждом ответе нужны хотя бы два слова своими словами.');
      return;
    }
    lesson.notes = notes;
    lesson.notesDone = true;
    if (!lesson.blitz.questions.length) attachBlitz(lesson);
    lesson.phase = 'blitz';
    if (!lesson.cheatArmedAt) lesson.cheatArmedAt = Date.now();
    save();
    render({ toTop: true });
    return;
  }
  if (act === 'ask-confirm') { actConfirm(btn.dataset.confirm); return; }
  if (lesson.phase !== 'blitz') return;
  const blitz = lesson.blitz;
  if (act === 'blitz-next') {
    if (!blitz.review) return;
    blitz.review = false;
    blitz.index += 1;
    blitz.qStartedAt = null;
    blitz.deadline = null;
    if (blitz.index >= blitz.questions.length) finishLesson(lesson.n);
    else { save(); render({ toTop: true }); }
    return;
  }
  if (blitz.review || Date.now() < blitz.acceptAfter || blitz.results.length !== blitz.index) return;
  if (Date.now() > blitz.deadline) return;
  const question = blitz.questions[blitz.index];
  const spent = Date.now() - blitz.qStartedAt;
  const fast = !!question.complex && spent < question.minMs;
  if (act === 'blitz-pick') {
    answerBlitz(lesson, Number(btn.dataset.i) === question.correctIndex, fast, false);
  }
  if (act === 'blitz-num') {
    const parsed = readInt('blitz-num');
    if (!parsed.ok) { toast('Введите целое число без единиц измерения.'); return; }
    answerBlitz(lesson, parsed.value === question.answer, fast, false);
  }
}

function runVerify() {
  let lastName = prettyName($('teacher-last').value);
  let firstName = prettyName($('teacher-first').value);
  let className = normClass($('teacher-class').value);
  const raw = $('teacher-code').value;
  if (!lastName || !firstName || !className) {
    const header = raw.match(/Ученик:\s*([^\n]+)/);
    const cls = raw.match(/Класс:\s*([^\n]+)/);
    if (header) {
      const parts = header[1].trim().split(/\s+/);
      lastName = lastName || prettyName(parts[0] || '');
      firstName = firstName || prettyName(parts.slice(1).join(' ') || '');
    }
    if (!className && cls) className = normClass(cls[1]);
  }
  const codes = raw.match(/U[1-4]-[2-5]-\d{3}-T\d+-F\d+-E\d+-S\d+-[A-Z2-9]{4}/g) || [];
  const out = $('verify-out');
  if (!validPerson(lastName) || !validPerson(firstName) || !validClass(className)) {
    out.innerHTML = '<p class="field-error">Нужны фамилия, имя и класс — с карточки или из текста отчёта.</p>';
    return;
  }
  if (!codes.length) {
    out.innerHTML = '<p class="field-error">В тексте нет кода вида U1-5-092-T480-F0-E0-S0-ABCD.</p>';
    return;
  }
  const student = { lastName, firstName, className };
  out.innerHTML = codes.map((code) => {
    const result = verifyCode(student, code);
    if (!result.ok) return `<article class="card"><p class="bad-text">Не подтверждён</p><code class="kbd-code">${esc(code)}</code><p>${esc(result.reason)}</p></article>`;
    return `<article class="card"><p class="ok-text">Код подлинный</p><code class="kbd-code">${esc(code)}</code>
      <p>${esc(lastName)} ${esc(firstName)}, ${esc(className)}</p>
      <p>Урок ${result.lesson}: оценка ${result.grade}, ${result.total}/100</p>
      <p>Время ${fmtDuration(result.seconds * 1000)}; уходы ${result.focus}; ошибки тренажёра ${result.errors}; быстрые ответы ${result.suspicious}</p>
      ${result.focus >= 2 ? '<p class="warn-text">В коде есть повторные уходы с экрана.</p>' : ''}</article>`;
  }).join('');
}

function markFocusLoss() {
  if (!state || !state.student) return;
  const now = Date.now();
  if (now - lastFocusMark < 1200) return;
  let count = 0;
  let hit = false;
  Object.keys(state.lessons).forEach((key) => {
    const lesson = state.lessons[key];
    if (!lesson || (lesson.phase !== 'trainer' && lesson.phase !== 'blitz')) return;
    if (!lesson.cheatArmedAt || now - lesson.cheatArmedAt < 800) return;
    lesson.focusLostCount = (lesson.focusLostCount || 0) + 1;
    count = Math.max(count, lesson.focusLostCount);
    hit = true;
  });
  if (!hit) return;
  lastFocusMark = now;
  save();
  pendingYes = null;
  showModal('Уход с экрана', `Зафиксирован выход из окна лаборатории. Сейчас таких уходов: ${count}. Первый без штрафа. Штраф сейчас: ${focusPenalty(count)} баллов.`, 'alert');
}

function accumulateTime() {
  if (!state || !state.student || document.hidden) return false;
  const now = Date.now();
  let changed = false;
  Object.keys(state.lessons).forEach((key) => {
    const lesson = state.lessons[key];
    if (!lesson || !lesson.startedAt || lesson.phase === 'goal' || lesson.phase === 'done') return;
    if (!lesson.lastTick) { lesson.lastTick = now; changed = true; return; }
    const delta = now - lesson.lastTick;
    if (delta > 0 && delta < 5000) { lesson.timeMs += delta; changed = true; }
    lesson.lastTick = now;
  });
  return changed;
}

function blitzTick() {
  if (!state || !state.student) return;
  Object.keys(state.lessons).forEach((key) => {
    const lesson = state.lessons[key];
    if (!lesson || lesson.phase !== 'blitz') return;
    const blitz = lesson.blitz;
    if (!blitz.qStartedAt || blitz.review || blitz.results.length !== blitz.index) return;
    if (Date.now() > blitz.deadline) answerBlitz(lesson, false, false, true);
    else if (currentView() === 'lesson' && currentLessonNumber() === lesson.n) {
      const left = Math.max(0, blitz.deadline - Date.now());
      const bar = document.querySelector('[data-timer-bar]');
      const label = document.querySelector('[data-timer-label]');
      if (bar) {
        bar.style.width = (left / BLITZ_MS) * 100 + '%';
        bar.classList.toggle('is-low', left < 10000);
      }
      if (label) label.textContent = Math.ceil(left / 1000) + ' с';
    }
  });
}

function readGateTick() {
  const lesson = activeLesson();
  if (!lesson || lesson.phase !== 'theory') return;
  const card = lesson.theory.cards[lesson.theory.index];
  if (!card || card.solved) return;
  const left = Math.max(0, READ_MS - (Date.now() - lesson.theory.cardStartedAt));
  const label = document.querySelector('.js-readgate');
  if (label) label.textContent = left > 0 ? `Прочитайте теорию: ${Math.ceil(left / 1000)} с` : 'Выберите ответ';
  document.querySelectorAll('[data-act="theory-pick"]').forEach((button) => {
    const index = Number(button.dataset.i);
    button.disabled = left > 0 || card.wrong.indexOf(index) >= 0;
  });
}

function onHide() {
  if (!state || !state.student) return;
  Object.keys(state.lessons).forEach((key) => {
    const lesson = state.lessons[key];
    if (lesson && lesson.phase !== 'goal' && lesson.phase !== 'done') lesson.lastTick = Date.now();
  });
  markFocusLoss();
}

function boot() {
  const link = document.querySelector('link[data-lab-css]');
  if (link) document.head.appendChild(link);
  state = loadState();
  if (state && state.student) ensureIdentity();
  $('auth-form').addEventListener('submit', handleAuth);
  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('[data-act]');
    if (!button || button.disabled) return;
    handleAct(button.dataset.act, button);
  });
  document.body.addEventListener('input', (event) => {
    const slider = event.target.dataset.slider;
    if (slider) {
      const lesson = activeLesson();
      if (!lesson || !lesson.trainer.scenario) return;
      lesson.trainer.scenario.sliders[slider].value = Number(event.target.value);
      const label = document.querySelector(`[data-sv="${slider}"]`);
      if (label) label.textContent = event.target.value;
      drawLivePlot();
      save();
      return;
    }
    if (event.target.dataset.edge) {
      const lesson = activeLesson();
      if (!lesson || !lesson.trainer.graph || lesson.trainer.graph.edgeSubmitted) return;
      lesson.trainer.graph.draft[event.target.dataset.edge] = event.target.value;
      const holder = document.querySelector('.road');
      if (holder) holder.outerHTML = roadSvg(lesson.trainer.graph);
      save();
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) onHide();
    else if (state && state.student) {
      Object.keys(state.lessons).forEach((key) => {
        const lesson = state.lessons[key];
        if (lesson && lesson.phase !== 'goal' && lesson.phase !== 'done') lesson.lastTick = Date.now();
      });
    }
  });
  window.addEventListener('blur', () => {
    setTimeout(() => {
      if (!document.hidden && !document.hasFocus()) markFocusLoss();
    }, 250);
  });
  document.addEventListener('contextmenu', (event) => {
    if (event.target.closest('.no-cheat') && !event.target.closest('input, textarea')) event.preventDefault();
  });
  window.addEventListener('resize', () => { drawAllPlots(); drawLivePlot(); });
  window.addEventListener('hashchange', () => {
    if (state && state.student) readHwFromDom();
    render({ toTop: true });
  });
  window.addEventListener('load', () => {
    const css = document.querySelector('link[data-lab-css]');
    if (css) document.head.appendChild(css);
  });
  setInterval(() => {
    paintClocks();
    readGateTick();
    blitzTick();
    if (accumulateTime() && Date.now() - lastPersist > 1000) save();
  }, 250);
  if (!state.student && location.hash === '#teacher') state.teacherDoor = true;
  if (!location.hash) location.hash = state.teacherDoor ? 'teacher' : 'lessons';
  render({ toTop: true });
  if (state && state.student) publishProgress();
  const opened = currentLessonNumber();
  if (opened && state.lessons[opened] && ['theory', 'trainer', 'notes', 'blitz'].indexOf(state.lessons[opened].phase) >= 0) {
    toast('Продолжаем урок с сохранённого места. Обновление страницы не сбрасывает ошибки.');
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}

const ModelLab = {
  hashString, mac, codePayload, formatCode, verifyCode, normClass, roomFromClass, prettyName, normPerson,
  gradeFrom, focusPenalty, recompute, featureErrors, buildAdj, allSimplePaths, shortestVia,
  isMeaningful, hasFormula, hasBranch, buildLesson, attachBlitz, validateHomework, emptyHw, sign, canon
};

if (typeof module !== 'undefined' && module.exports) module.exports = ModelLab;
