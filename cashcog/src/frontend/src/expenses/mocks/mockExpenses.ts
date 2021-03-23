import { ExpenseT } from 'src/expenses/types';

export const mockExpenses: ExpenseT[] = [
  {
    uuid: '30691fea-8816-403a-a1ed-f00f14c5a75d',
    description: 'Nobis dolorum culpa iusto saepe alias atque maiores.',
    createdAt: new Date('2020-12-08T04:00:29'),
    amount: 7111,
    currency: 'AED',
    employee: {
      uuid: '8ed3977d-63b7-4790-a852-d38149d170f6',
      firstName: 'Annelies',
      lastName: 'Pechel',
    },
    resolution: {
      status: 'pending',
    },
  },
  {
    uuid: '975af3f6-55e5-5b18-9b77-b034e98ff4e0',
    description:
      'coming unusual dish recall happened hard leaving ask herself it various command ability example adventure anything harbor fear sign below rabbit spite bean organized',
    createdAt: new Date('2020-10-08T04:00:29'),
    amount: 302,
    currency: 'EUR',
    employee: {
      uuid: '8ed3977d-63b7-4790-a852-d38149d170f6',
      firstName: 'Annelies',
      lastName: 'Pechel',
    },
    resolution: {
      status: 'pending',
    },
  },
  {
    uuid: 'cb7ca971-6791-5448-9c52-fd58dbd09751',
    description:
      'drew doing shall is search dirt fully strong air rapidly longer stream examine flame difficulty milk stared speech forward eat everyone pencil uncle follow',
    createdAt: new Date('2020-04-08T04:00:29'),
    amount: 662,
    currency: 'EUR',
    employee: {
      uuid: '8ed3977d-63b7-4790-a852-d38149d170f6',
      firstName: 'Annelies',
      lastName: 'Pechel',
    },
    resolution: {
      createdAt: new Date('2020-04-11T04:00:29'),
      status: 'approved',
    },
  },
  {
    uuid: '0d129a86-a3ce-51e6-afc0-226ea2e00a6d',
    description:
      'third flower prepare jungle left ever me view thirty he each grass grain brother student heavy previous thumb post general tales major belong planning',
    createdAt: new Date('2020-02-09T04:00:29'),
    amount: 662,
    currency: 'EUR',
    employee: {
      uuid: '8ed3977d-63b7-4790-a852-d38149d170f6',
      firstName: 'Annelies',
      lastName: 'Pechel',
    },
    resolution: {
      status: 'declined',
      createdAt: new Date('2020-02-11T04:00:29'),
      reason: 'too expensive',
    },
  },
];
