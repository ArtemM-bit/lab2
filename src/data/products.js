const coffeeImage = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

export const products = [
  {
    id: 'flat-white',
    name: 'Флет вайт',
    description: 'Подвійний еспресо, ніжне молоко',
    price: 95,
    category: 'Кава',
    image: coffeeImage('photo-1461023058943-07fcbe16d735'),
  },
  {
    id: 'raf',
    name: 'Лавандовий раф',
    description: 'Вершки, ваніль і трішки лаванди',
    price: 115,
    category: 'Кава',
    image: coffeeImage('photo-1517701604599-bb29b565090c'),
  },
  {
    id: 'espresso',
    name: 'Еспресо тонік',
    description: 'Яскравий еспресо з цитрусовим тоніком',
    price: 105,
    category: 'Кава',
    image: coffeeImage('photo-1517701550927-30cf4ba1dba5'),
  },
  {
    id: 'cinnamon-roll',
    name: 'Синнабон',
    description: 'Булочка з корицею та вершковою глазур’ю',
    price: 89,
    category: 'Десерти',
    image: coffeeImage('photo-1509440159596-0249088772ff'),
  },
  {
    id: 'cheesecake',
    name: 'Чизкейк',
    description: 'Ніжний сирний крем і ягідний соус',
    price: 125,
    category: 'Десерти',
    image: coffeeImage('photo-1533134242443-d4fd215305ad'),
  },
  {
    id: 'matcha',
    name: 'Матча лате',
    description: 'Японська матча на вівсяному молоці',
    price: 120,
    category: 'Чай',
    image: coffeeImage('photo-1515823064-d6e0c04616a7'),
  },
  {
    id: 'chai',
    name: 'Пряний масала',
    description: 'Чорний чай, спеції та тепле молоко',
    price: 100,
    category: 'Чай',
    image: coffeeImage('photo-1571934811356-5cc061b6821f'),
  },
  {
    id: 'beans',
    name: 'Зерно «Колумбія»',
    description: 'Мита обробка, ноти карамелі й яблука · 250 г',
    price: 390,
    category: 'Зерно',
    image: coffeeImage('photo-1559525839-b184a4d698c7'),
  },
]
