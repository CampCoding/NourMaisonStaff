export const CURRENT_USER = { id: 1, student_id: 2, name: 'Mohammad' };

export const MOCK_MESSAGES = [
  {
    _id: '1',
    text: 'مرحباً! كيف يمكنني مساعدتك اليوم؟',
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
    user: { _id: 99, name: 'دكتور/ محمد علي', isAdmin: true },
  },
  {
    _id: '2',
    text: 'أريد الاستفسار عن موعد الامتحان القادم.',
    createdAt: new Date(Date.now() - 1000 * 60 * 8),
    user: { _id: CURRENT_USER.id, name: CURRENT_USER.name, isAdmin: false },
  },
  {
    _id: '3',
    text: 'الامتحان سيكون يوم الخميس القادم الساعة العاشرة صباحاً. هل لديك أي أسئلة أخرى؟',
    createdAt: new Date(Date.now() - 1000 * 60 * 6),
    user: { _id: 99, name: 'دكتور/ محمد علي', isAdmin: true },
  },
  {
    _id: '4',
    text: 'شكراً جزيلاً دكتور!',
    createdAt: new Date(Date.now() - 1000 * 60 * 4),
    user: { _id: CURRENT_USER.id, name: CURRENT_USER.name, isAdmin: false },
  },
  {
    _id: '5',
    text: 'عفواً، بالتوفيق! 🌟',
    createdAt: new Date(Date.now() - 1000 * 60 * 2),
    user: { _id: 99, name: 'دكتور/ محمد علي', isAdmin: true },
  },
];
