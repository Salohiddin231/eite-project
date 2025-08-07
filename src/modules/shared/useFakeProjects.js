import { useState, useEffect } from 'react';
import { FaBoxOpen, FaChartLine, FaCheckCircle, FaCogs, FaTools, FaUserFriends } from 'react-icons/fa';

const FAKE_PROJECTS = {
  builds: [
    {
      id: 1,
      title: 'Игровой ПК "Beast 3070"',
      description: 'Высокопроизводительная сборка на базе RTX 3070 и Ryzen 7. Подходит для стримов, игр на ультра-настройках и работы с видео. В комплекте: SSD 1TB, 32ГБ ОЗУ, водяное охлаждение.',
      image: 'https://i.ibb.co/9HqQ2qnN/product-1-3.png',
      price: '1200.00$',
      specs: ['RTX 3070', 'Ryzen 7 5800X', '32ГБ DDR4', 'SSD 1TB', '750W PSU'],
      rating: "5.0",
      type: 'Компьютеры',
    },
    {
      id: 2,
      title: 'Офисный ПК "Smart Work"',
      description: 'Тихий и энергоэффективный компьютер для работы с документами, почтой и браузером. В комплекте: SSD 512GB, 16ГБ ОЗУ, встроенная графика.',
      image: 'https://i.ibb.co/23XdM3cb/product-1-2.png',
      price: '600.00$',
      specs: ['Intel i5', '16ГБ DDR4', 'SSD 512GB', 'Wi-Fi', '400W PSU'],
      rating: "4.0",
      type: 'Компьютеры',
    },
    {
      id: 3,
      title: 'ПК для дизайна "Creator Pro"',
      description: 'Сборка для 3D-графики, рендеринга и работы в Adobe. В комплекте: Core i7, 32ГБ ОЗУ, SSD 1TB, видеокарта RTX 3060.',
      image: 'https://tgpc.by/uploads/images/tplimages/Creator.png',
      price: '820.00$',
      specs: ['Core i7', 'RTX 3060', '32ГБ DDR4', 'SSD 1TB', '650W PSU'],
      rating: 4.5,
      type: 'Компьютеры',
    },
    {
      id: 4,
      title: 'ПК для дизайна "Creator Pro"',
      description: 'Сборка для 3D-графики, рендеринга и работы в Adobe. В комплекте: Core i7, 32ГБ ОЗУ, SSD 1TB, видеокарта RTX 3060.',
      image: 'https://i.ibb.co/sJQnyt82/product-1-1.png',
      price: '820.00$',
      specs: ['Core i7', 'RTX 3060', '32ГБ DDR4', 'SSD 1TB', '650W PSU'],
      rating: 4.5,
      type: 'Компьютеры',
    },
    {
      id: 5,
      title: 'ПК для дизайна "Creator Pro"',
      description: 'Сборка для 3D-графики, рендеринга и работы в Adobe. В комплекте: Core i7, 32ГБ ОЗУ, SSD 1TB, видеокарта RTX 3060.',
      image: 'https://i.ibb.co/rGY59KjV/product-1.png',
      price: '820.00$',
      specs: ['Core i7', 'RTX 3060', '32ГБ DDR4', 'SSD 1TB', '650W PSU'],
      rating: 4.5,
      type: 'Компьютеры',
    },
    {
      id: 6,
      title: 'ПК для дизайна "Creator Pro"',
      description: 'Сборка для 3D-графики, рендеринга и работы в Adobe. В комплекте: Core i7, 32ГБ ОЗУ, SSD 1TB, видеокарта RTX 3060.',
      image: 'https://i.ibb.co/Cpb3TQjR/product-3.png',
      price: '820.00$',
      specs: ['Core i7', 'RTX 3060', '32ГБ DDR4', 'SSD 1TB', '650W PSU'],
      rating: 4.5,
      type: 'Компьютеры',
    },
    {
      id: 7,
      title: 'ПК для дизайна "Creator Pro"',
      description: 'Сборка для 3D-графики, рендеринга и работы в Adobe. В комплекте: Core i7, 32ГБ ОЗУ, SSD 1TB, видеокарта RTX 3060.',
      image: 'https://i.ibb.co/HpMvM240/product-4.png',
      price: '820.00$',
      specs: ['Core i7', 'RTX 3060', '32ГБ DDR4', 'SSD 1TB', '650W PSU'],
      rating: 4.5,
      type: 'Компьютеры',
    },
  ],
  monitors: [
    {
      id: 8,
      title: 'Монитор Elite 27" 165Hz',
      description: '27-дюймовый IPS монитор с частотой обновления 165Гц, поддержкой FreeSync и минимальными рамками. Отлично подходит для геймеров и дизайнеров.',
      image: 'https://i.ibb.co/qLd2fmS1/monitor.png',
      price: '290.00$',
      specs: ['27" IPS', '165Hz', '1ms', 'FreeSync', 'HDMI/DP'],
      rating: 4.5,
      type: 'Мониторы',
    },
    {
      id: 9,
      title: 'Монитор Elite 27" 165Hz',
      description: '27-дюймовый IPS монитор с частотой обновления 165Гц, поддержкой FreeSync и минимальными рамками. Отлично подходит для геймеров и дизайнеров.',
      image: 'https://i.ibb.co/qLd2fmS1/monitor.png',
      price: '290.00$',
      specs: ['27" IPS', '165Hz', '1ms', 'FreeSync', 'HDMI/DP'],
      rating: 4.5,
      type: 'Мониторы',
    },


    {
      id: 10,
      title: 'Монитор Elite 27" 165Hz',
      description: '27-дюймовый IPS монитор с частотой обновления 165Гц, поддержкой FreeSync и минимальными рамками. Отлично подходит для геймеров и дизайнеров.',
      image: 'https://i.ibb.co/qLd2fmS1/monitor.png',
      price: '290.00$',
      specs: ['27" IPS', '165Hz', '1ms', 'FreeSync', 'HDMI/DP'],
      rating: 4.5,
      type: 'Мониторы',
    },
    {
      id: 11,
      title: 'Монитор Elite 27" 165Hz',
      description: '27-дюймовый IPS монитор с частотой обновления 165Гц, поддержкой FreeSync и минимальными рамками. Отлично подходит для геймеров и дизайнеров.',
      image: 'https://i.ibb.co/qLd2fmS1/monitor.png',
      price: '290.00$',
      specs: ['27" IPS', '165Hz', '1ms', 'FreeSync', 'HDMI/DP'],
      rating: 4.5,
      type: 'Мониторы',
    },

  ],
  keyboards: [
    {
      id: 12,
      title: 'Elite TKL RGB',
      description: 'Компактная механическая клавиатура с RGB-подсветкой, переключателями Gateron Red и алюминиевым корпусом.',
      image: 'https://i.ibb.co/b5G9Hj4s/klava.png',
      price: '100.00$',
      specs: ['Gateron Red', 'RGB', 'TKL', 'USB-C', 'Алюминий'],
      rating: 4.8,
      type: 'Клавиатуры',
    },
    {
      id: 13,
      title: 'Elite TKL RGB',
      description: 'Компактная механическая клавиатура с RGB-подсветкой, переключателями Gateron Red и алюминиевым корпусом.',
      image: 'https://i.ibb.co/b5G9Hj4s/klava.png',
      price: '100.00$',
      specs: ['Gateron Red', 'RGB', 'TKL', 'USB-C', 'Алюминий'],
      rating: 4.8,
      type: 'Клавиатуры',
    },
    {
      id: 14,
      title: 'Elite TKL RGB',
      description: 'Компактная механическая клавиатура с RGB-подсветкой, переключателями Gateron Red и алюминиевым корпусом.',
      image: 'https://i.ibb.co/b5G9Hj4s/klava.png',
      price: '100.00$',
      specs: ['Gateron Red', 'RGB', 'TKL', 'USB-C', 'Алюминий'],
      rating: 4.8,
      type: 'Клавиатуры',
    },
    {
      id: 15,
      title: 'Elite TKL RGB',
      description: 'Компактная механическая клавиатура с RGB-подсветкой, переключателями Gateron Red и алюминиевым корпусом.',
      image: 'https://i.ibb.co/b5G9Hj4s/klava.png',
      price: '100.00$',
      specs: ['Gateron Red', 'RGB', 'TKL', 'USB-C', 'Алюминий'],
      rating: 4.8,
      type: 'Клавиатуры',
    },
    {
      id: 16,
      title: 'Elite TKL RGB',
      description: 'Компактная механическая клавиатура с RGB-подсветкой, переключателями Gateron Red и алюминиевым корпусом.',
      image: 'https://i.ibb.co/b5G9Hj4s/klava.png',
      price: '100.00$',
      specs: ['Gateron Red', 'RGB', 'TKL', 'USB-C', 'Алюминий'],
      rating: 4.8,
      type: 'Клавиатуры',
    },
  ],
  gpus: [
    {
      id: 17,
      title: 'Видеокарты от Elite',
      description: 'Lorem corporis a voluptatum inventore dicta est eius repellat earum, veniam distinctio eveniet.',
      image: 'https://i.ibb.co/TqTXs91N/rtx3060.png',
      price: '100.00$',
      rating: "4.0",
      type: 'Видеокарты',
    },
    {
      id: 18,
      title: 'Видеокарты от Elite',
      description: 'Lorem corporis a voluptatum inventore dicta est eius repellat earum, veniam distinctio eveniet.',
      image: 'https://i.ibb.co/TqTXs91N/rtx3060.png',
      price: '100.00$',
      rating: "4.0",
      type: 'Видеокарты',
    },
    {
      id: 19,
      title: 'Видеокарты от Elite',
      description: 'Lorem corporis a voluptatum inventore dicta est eius repellat earum, veniam distinctio eveniet.',
      image: 'https://i.ibb.co/TqTXs91N/rtx3060.png',
      price: '100.00$',
      rating: "4.0",
      type: 'Видеокарты',
    },

  ],
  cases: [
    {
      id: 20,
      title: 'Корпус от Elite',
      description: 'Lorem est eius repellat earum, veniam distinctio eveniet.',
      image: 'https://i.ibb.co/93gj4hkX/korpus.png',
      price: '200.00$',
      rating: "4.0",
      type: 'Корпуса',
    },
    {
      id: 21,
      title: 'Корпус от Elite',
      description: 'Lorem est eius repellat earum, veniam distinctio eveniet.',
      image: 'https://i.ibb.co/93gj4hkX/korpus.png',
      price: '200.00$',
      rating: "4.0",
      type: 'Корпуса',
    },
    {
      id: 22,
      title: 'Корпус от Elite',
      description: 'Lorem est eius repellat earum, veniam distinctio eveniet.',
      image: 'https://i.ibb.co/93gj4hkX/korpus.png',
      price: '200.00$',
      rating: "4.0",
      type: 'Корпуса',
    },
    {
      id: 23,
      title: 'Корпус от Elite',
      description: 'Lorem est eius repellat earum, veniam distinctio eveniet.',
      image: 'https://i.ibb.co/93gj4hkX/korpus.png',
      price: '200.00$',
      rating: "4.0",
      type: 'Корпуса',
    },
  ],
  note_books: [
    {
      id: 24,
      title: 'Ноутбук от Elite',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, enim blanditiis. Nostrum at vel in distinctio facilis',
      image: 'https://i.ibb.co/kVrDd3JR/new-product-2.png',
      price: '500.00$',
      rating: "4.0",
      type: 'Ноутбуки',
    },
    {
      id: 25,
      title: 'Ноутбук от Elite',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, enim blanditiis. Nostrum at vel in distinctio facilis',
      image: 'https://i.ibb.co/kVrDd3JR/new-product-2.png',
      price: '500.00$',
      rating: "4.0",
      type: 'Ноутбуки',
    },
    {
      id: 26,
      title: 'Ноутбук от Elite',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, enim blanditiis. Nostrum at vel in distinctio facilis',
      image: 'https://i.ibb.co/kVrDd3JR/new-product-2.png',
      price: '500.00$',
      rating: "4.0",
      type: 'Ноутбуки',
    },
    {
      id: 27,
      title: 'Ноутбук от Elite',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, enim blanditiis. Nostrum at vel in distinctio facilis',
      image: 'https://i.ibb.co/kVrDd3JR/new-product-2.png',
      price: '500.00$',
      rating: "4.0",
      type: 'Ноутбуки',
    },
    {
      id: 28,
      title: 'Ноутбук от Elite',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, enim blanditiis. Nostrum at vel in distinctio facilis',
      image: 'https://i.ibb.co/kVrDd3JR/new-product-2.png',
      price: '500.00$',
      rating: "4.0",
      type: 'Ноутбуки',
    }
  ],
  mouse: [
    {
      id: 29,
      title: 'Мышки от Elite',
      description: 'Lorem ipsum dolor sit amet Veritatis, enim blanditiis. Nostrum at vel in distinctio facilis',
      image: 'https://i.ibb.co/Q35Ywp6F/mouse.png',
      price: '70.00$',
      rating: "4.7",
      type: 'Мыши',
    },
    {
      id: 30,
      title: 'Мышки от Elite',
      description: 'Lorem ipsum dolor sit amet Veritatis, enim blanditiis. Nostrum at vel in distinctio facilis',
      image: 'https://i.ibb.co/Q35Ywp6F/mouse.png',
      price: '70.00$',
      rating: "4.7",
      type: 'Мыши',
    },
    {
      id: 31,
      title: 'Мышки от Elite',
      description: 'Lorem ipsum dolor sit amet Veritatis, enim blanditiis. Nostrum at vel in distinctio facilis',
      image: 'https://i.ibb.co/Q35Ywp6F/mouse.png',
      price: '70.00$',
      rating: "4.7",
      type: 'Мыши',
    }
  ],
  services: [
    {
      icon: FaBoxOpen,
      title: 'Продажа комплектующих',
      desc: 'Процессоры, видеокарты, ОЗУ, накопители, БП, корпуса и другое — в наличии и под заказ.'
    },
    {
      icon: FaCogs,
      title: 'Сборка ПК под ключ',
      desc: 'Индивидуальная сборка компьютеров под игры, работу, стриминг или повседневные задачи.'
    },
    {
      icon: FaCheckCircle,
      title: 'Готовые ПК',
      desc: 'Проверенные сборки с оптимальной производительностью — сразу из коробки.'
    },
    {
      icon: FaChartLine,
      title: 'Апгрейд и модернизация',
      desc: 'Улучшение существующего ПК: замена процессора, видеокарты, добавление ОЗУ и др.'
    },
    {
      icon: FaTools,
      title: 'Диагностика и тестирование',
      desc: 'Проверка комплектующих и систем на стабильность, перегревы, ошибки и сбои.'
    },
    {
      icon: FaUserFriends,
      title: 'Консультации и подбор',
      desc: 'Поможем выбрать оптимальную конфигурацию под ваш бюджет и задачи.'
    },
  ]
};

function getUserProducts() {
  try {
    const saved = localStorage.getItem('userProducts');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function addUserProduct(product) {
  const current = getUserProducts();
  const id = Date.now();
  const newProduct = { ...product, id };
  const updated = [...current, newProduct];
  localStorage.setItem('userProducts', JSON.stringify(updated));
}

export function removeUserProduct(id) {
  const current = getUserProducts();
  const updated = current.filter(p => p.id !== id);
  localStorage.setItem('userProducts', JSON.stringify(updated));
}

export function clearUserProducts() {
  localStorage.removeItem('userProducts');
}

export function useFakeProjects() {
  const [data, setData] = useState({
    builds: [],
    monitors: [],
    keyboards: [],
    gpus: [],
    cases: [],
    note_books: [],
    mouse: [],
    services: [],
    user: [] // ← сохраняем эту структуру
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const user = getUserProducts(); // ← загружаем только товары пользователя
      setData({ ...FAKE_PROJECTS, user }); // ← вставляем их в data.user
      setLoading(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, []);

  const refreshUserProducts = () => {
    setData(prev => ({
      ...prev,
      user: getUserProducts()
    }));
  };

  return { ...data, loading, refreshUserProducts };
}

export function getStarsArray(rating, max = 5) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (rating >= i) {
      stars.push('full');
    } else if (rating >= i - 0.5) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }
  return stars;
}