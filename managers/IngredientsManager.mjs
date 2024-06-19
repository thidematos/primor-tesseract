import Ingrediente from '../models/ingredienteModel.mjs';

class IngredientManager {
  #blackList = [
    {
      nome: 'Farinha de sangue',
      idExterno: 110,
      mapToId: 114,
      motivo: 'duplicado com o item 00114',
    },
  ];

  constructor(prices, semana, reqId) {
    this.prices = prices;
    this.semana = semana;
    this.alreadyIncluded = [];
  }

  verifiesIfBlacklisted(id) {
    const includes = this.#blackList.find(
      (bannedItem) => bannedItem.idExterno === id
    );

    if (!includes) return id;

    return includes.mapToId;
  }

  getPrice(id) {
    const insumo = this.prices.find((insumo) => insumo.idExterno === id);
    if (!insumo) return null;
    return insumo.preco;
  }

  /*
  async addWeeklyReport(insumo) {
    try {
      const precoSemanaToPush = {
        semana: this.semana,
        preco: Number.parseFloat(insumo.price),
        alreadyIncluded: true,
      };

      const id = this.verifiesIfBlacklisted(Number.parseInt(insumo.id));

      const currentInsumo = await Ingrediente.findOne({
        idExterno: id,
      });

      console.log('Hi from weekly!');

      if (this.allIngredients.includes(id)) return;

      this.allIngredients.push(id);

      console.log('Atualizou: ', currentInsumo.nome);

      currentInsumo.precoSemana.push(precoSemanaToPush);

      await currentInsumo.save({ j: true });
    } catch (err) {
      console.log(err);
      process.exit(-1);
    }
  }
  */

  async getAllIngredients() {
    const ingredients = await Ingrediente.find({});

    this.allIngredients = ingredients.map((el) => el.idExterno);
  }

  async choosePath(insumo) {
    const currentId = this.verifiesIfBlacklisted(Number.parseInt(insumo.id));

    const isAlreadyInDB = this.allIngredients.some((id) => id === currentId);

    if (isAlreadyInDB) return; //await this.addWeeklyReport(insumo);

    this.allIngredients.push(currentId);
    await this.createInsumo(insumo);
  }

  async createInsumo(insumo) {
    try {
      const id = this.verifiesIfBlacklisted(Number.parseInt(insumo.id));
      // this.alreadyIncluded.push(id);

      const precoSemanaToPush = {
        semana: this.semana,
        preco: Number.parseFloat(insumo.price),
      };

      console.log('Novo insumo: ', insumo.nome);

      await Ingrediente.create({
        idExterno: id,
        nome: insumo.nome,
        precoSemana: [precoSemanaToPush],
      });
    } catch (err) {
      console.log(err);
      process.exit(-1);
    }
  }

  pricesTeste = [
    {
      idExterno: 31,
      preco: '0.745',
    },
    {
      idExterno: 1,
      preco: '1.000',
    },
    {
      idExterno: 45,
      preco: '1.020',
    },
    {
      idExterno: 115,
      preco: '2.600',
    },
    {
      idExterno: 4,
      preco: '1.760',
    },
    {
      idExterno: 16,
      preco: '0.810',
    },
    {
      idExterno: 124,
      preco: '0.400',
    },
    {
      idExterno: 149,
      preco: '0.332',
    },
    {
      idExterno: 104,
      preco: '1.750',
    },
    {
      idExterno: 61,
      preco: '1.015',
    },
    {
      idExterno: 313,
      preco: '40',
    },
    {
      idExterno: 316,
      preco: '58',
    },
    {
      idExterno: 119,
      preco: '5.000',
    },
    {
      idExterno: 13,
      preco: '2.225',
    },
    {
      idExterno: 317,
      preco: '100',
    },
    {
      idExterno: 312,
      preco: '36.610',
    },
    {
      idExterno: 192,
      preco: '1.780',
    },
    {
      idExterno: 402,
      preco: '28.872',
    },
    {
      idExterno: 394,
      preco: '17.970',
    },
    {
      idExterno: 403,
      preco: '83.012',
    },
    {
      idExterno: 171,
      preco: '4.850',
    },
    {
      idExterno: 114,
      preco: '5.000',
    },
    {
      idExterno: 314,
      preco: '55',
    },
    {
      idExterno: 141,
      preco: '0.630',
    },
    {
      idExterno: 288,
      preco: '9.5',
    },
    {
      idExterno: 64,
      preco: '2.110',
    },
    {
      idExterno: 401,
      preco: '50.371',
    },
    {
      idExterno: 102,
      preco: '1.350',
    },
    {
      idExterno: 400,
      preco: '82.083',
    },
    {
      idExterno: 49,
      preco: '7.592',
    },
    {
      idExterno: 112,
      preco: '4.150',
    },
    {
      idExterno: 393,
      preco: '27.590',
    },
    {
      idExterno: 391,
      preco: '14.650',
    },
    {
      idExterno: 179,
      preco: '6.680',
    },
    {
      idExterno: 410,
      preco: '40.652',
    },
    {
      idExterno: 162,
      preco: '14.650',
    },
    {
      idExterno: 298,
      preco: '13',
    },
    {
      idExterno: 158,
      preco: '29.000',
    },
    {
      idExterno: 173,
      preco: '9.170',
    },
    {
      idExterno: 172,
      preco: '6.220',
    },
    {
      idExterno: 161,
      preco: '14.700',
    },
    {
      idExterno: 390,
      preco: '200',
    },
    {
      idExterno: 395,
      preco: '21.026',
    },
    {
      idExterno: 315,
      preco: '40',
    },
    {
      idExterno: 392,
      preco: '20.250',
    },
    {
      idExterno: 261,
      preco: '6.400',
    },
    {
      idExterno: 262,
      preco: '9.100',
    },
    {
      idExterno: 276,
      preco: '8',
    },
    {
      idExterno: 257,
      preco: '5.300',
    },
    {
      idExterno: 190,
      preco: '1.050',
    },
    {
      idExterno: 275,
      preco: '9.750',
    },
    {
      idExterno: 279,
      preco: '4.2',
    },
    {
      idExterno: 287,
      preco: '0.1',
    },
    {
      idExterno: 289,
      preco: '4.4',
    },
    {
      idExterno: 277,
      preco: '0.1',
    },
    {
      idExterno: 43,
      preco: '1.215',
    },
    {
      idExterno: 2290,
      preco: '0.1',
    },
    {
      idExterno: 19,
      preco: '1.140',
    },
    {
      idExterno: 2291,
      preco: '0.1',
    },
    {
      idExterno: 131,
      preco: '2.100',
    },
    {
      idExterno: 2283,
      preco: '0.1',
    },
  ];

  produtosTest = [
    [
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 987,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 400,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 256,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 179,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 112,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 9,
          },
        ],
        micro: [
          {
            id: '00257',
            nome: 'PX 05 POSTURA PRODUÇAO',
            qtd: 8,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 7,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-05 POSTURA INTENSIVA 17% F',
          id: '02004',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 704,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 400,
          },
          {
            id: '00004',
            nome: 'GERMEN DE MILHO GORDO',
            qtd: 260,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 242,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 143,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 116,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 60,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 18,
          },
        ],
        micro: [
          {
            id: '00257',
            nome: 'PX 05 POSTURA PRODUÇAO',
            qtd: 8,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 7,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-05 POSTURA INTENSIVA 17% T',
          id: '02005',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 644,
          },
          {
            id: '00004',
            nome: 'GERMEN DE MILHO GORDO',
            qtd: 380,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 360,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 200,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 200,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 123,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 60,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 17,
          },
        ],
        micro: [
          {
            id: '00261',
            nome: 'PX 11 FRANGO CORTE INICIAL',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 6,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-11 AVES CORTE INICIAL F',
          id: '02011',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 1083,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 400,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 164,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 126,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 100,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 50,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 20,
          },
        ],
        micro: [
          {
            id: '00262',
            nome: 'PX 12 FRANGO CORTE FINAL',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 7,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-12 CORTE ENGORDA F',
          id: '02012',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 495,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 350,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 315,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 302,
          },
          {
            id: '00045',
            nome: 'FEIJAO EM GRAO',
            qtd: 280,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 216,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 20,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 10,
          },
          {
            id: '00276',
            nome: 'PX 37 PEIXES',
            qtd: 10,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP 31 - PEIXE 28% (EXT)',
          id: '02024',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 542,
          },
          {
            id: '00190',
            nome: 'MILHO QUEBRADO',
            qtd: 495,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 419,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 272,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 200,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
        ],
        micro: [
          {
            id: '00276',
            nome: 'PX 37 PEIXES',
            qtd: 20,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 10,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP 34 - PEIXE 32% (EXT)',
          id: '02031',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 664,
          },
          {
            id: '00004',
            nome: 'GERMEN DE MILHO GORDO',
            qtd: 330,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 300,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 193,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 160,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 110,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 86,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 81,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 60,
          },
        ],
        micro: [
          {
            id: '00275',
            nome: 'PX 33 CODORNA PRODUÇAO',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 6,
          },
          {
            id: '00161',
            nome: 'L-LISINA',
            qtd: '-',
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-33 CODORNA POSTURA F',
          id: '02033',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 580,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 490,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 430,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 367,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 100,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 1,
          },
        ],
        micro: [
          {
            id: '00276',
            nome: 'PX 37 PEIXES',
            qtd: 20,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 10,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP 35 PEIXES ALEVINOS 35%',
          id: '02035',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 601,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 355,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 335,
          },
          {
            id: '00045',
            nome: 'FEIJAO EM GRAO',
            qtd: 280,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 263,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 78,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 30,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 10,
          },
          {
            id: '00276',
            nome: 'PX 37 PEIXES',
            qtd: 6,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP 39 - PEIXE ENGORDA 22%',
          id: '02041',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 564,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 366,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 361,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 343,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 200,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 120,
          },
        ],
        micro: [
          {
            id: '00257',
            nome: 'PX 05 POSTURA PRODUÇAO',
            qtd: 28,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 17,
          },
          {
            id: '00162',
            nome: 'DL-METIONINA',
            qtd: 1,
          },
          {
            id: '00161',
            nome: 'L-LISINA',
            qtd: '-',
          },
        ],
        outros: [],
        produto: {
          nome: 'CMP 105 - CONC AVES POSTURA',
          id: '02105',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 1121,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 300,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 273,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 140,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 120,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 6,
          },
        ],
        micro: [
          {
            id: '00261',
            nome: 'PX 11 FRANGO CORTE INICIAL',
            qtd: 25,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 15,
          },
        ],
        outros: [],
        produto: {
          nome: 'CMP 111 - CONC CORTE INICIAL',
          id: '02111',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 987,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 484,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 240,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 130,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 100,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 5,
          },
        ],
        micro: [
          {
            id: '00262',
            nome: 'PX 12 FRANGO CORTE FINAL',
            qtd: 33,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 20,
          },
          {
            id: '00162',
            nome: 'DL-METIONINA',
            qtd: 1,
          },
        ],
        outros: [],
        produto: {
          nome: 'CMP 112 - CONC CORTE FINAL',
          id: '02112',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 602,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 580,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 400,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 190,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 105,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 63,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 20,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 20,
          },
          {
            id: '00262',
            nome: 'PX 12 FRANGO CORTE FINAL',
            qtd: 20,
          },
        ],
        outros: [],
        produto: {
          nome: 'CMP 114 - CONC AVES CORTE',
          id: '02114',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 567,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 500,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 435,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 178,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 140,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 100,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 40,
          },
          {
            id: '00279',
            nome: 'PX 45 SUINOS CRESCIMENTO',
            qtd: 40,
          },
        ],
        outros: [],
        produto: {
          nome: 'CMP 145 - CONC SUINOS ENGORDA',
          id: '02140',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 699.5,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 455,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 424,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 140,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 119.5,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 100,
          },
        ],
        micro: [
          {
            id: '00279',
            nome: 'PX 45 SUINOS CRESCIMENTO',
            qtd: 32,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 30,
          },
        ],
        outros: [],
        produto: {
          nome: 'CMP 146 - CONC SUINOS REPRODUÇAO',
          id: '02141',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 1704,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 100,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 76,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 60,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 10,
          },
          {
            id: '00287',
            nome: 'PX 74 COELHOS REPRODUÇAO',
            qtd: 8,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-772/872 COELHO CRIADOR/DeCasa',
          id: '02265',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 1079.8,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 585,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 90,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 36,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 9.2,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-839 CHAMA PEIXES g',
          id: '02267',
          batida: 1800,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 927,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 335,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 144,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 70,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 48,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 37,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 32,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 5.4,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-806 CRIADOR POSTURA T',
          id: '02276',
          batida: 1600,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 959,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 305,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 170,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 56,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 48,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 15,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 5.4,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-812 CRIADOR ENGORDA T',
          id: '02277',
          batida: 1600,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 813,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 410,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 145,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 120,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 65,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 5.4,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-806 CRIADOR POSTURA F',
          id: '02279',
          batida: 1600,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 962.4,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 390,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 145,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 56,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 32,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 8,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 5,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-812 CRIADOR ENGORDA F',
          id: '02280',
          batida: 1600,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 702,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 420,
          },
          {
            id: '00004',
            nome: 'GERMEN DE MILHO GORDO',
            qtd: 400,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 260,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 126,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 71,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 3,
          },
        ],
        micro: [
          {
            id: '00257',
            nome: 'PX 05 POSTURA PRODUÇAO',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 6,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-832 CRIADOR CODORNA F',
          id: '02282',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 1071.6,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 245,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 160,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 72,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 32,
          },
          {
            id: '00114',
            nome: 'FARINHA DE SANGUE (HEMOGLOBINA)',
            qtd: 9.5,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 7.5,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2.4,
          },
        ],
        outros: [],
        produto: {
          nome: '883-CRIADOR EQUINO / R.181-M',
          id: '02283',
          batida: 1600,
        },
      },
      {
        macro: [
          {
            id: '02283',
            nome: '883-CRIADOR EQUINO / R.181-M',
            qtd: 1900,
          },
        ],
        micro: [],
        outros: [
          {
            id: '00131',
            nome: 'MELACO',
            qtd: 100,
          },
        ],
        produto: {
          nome: '883-CRIADOR EQUINO 181-M.M.(G)',
          id: '02284',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 1363.9,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 145,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 32,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 32,
          },
          {
            id: '00114',
            nome: 'FARINHA DE SANGUE (HEMOGLOBINA)',
            qtd: 9.5,
          },
        ],
        micro: [
          {
            id: '00289',
            nome: 'PX 85 EQUINOS',
            qtd: 8,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 7.2,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2.4,
          },
        ],
        outros: [],
        produto: {
          nome: 'PELLET - POTROS (MP84/82)',
          id: '02290',
          batida: 1600,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 1451.4,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 50,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 41,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 32,
          },
          {
            id: '00114',
            nome: 'FARINHA DE SANGUE (HEMOGLOBINA)',
            qtd: 8,
          },
        ],
        micro: [
          {
            id: '00289',
            nome: 'PX 85 EQUINOS',
            qtd: 8,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 7.2,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2.4,
          },
        ],
        outros: [],
        produto: {
          nome: 'PELLET - MP 85',
          id: '02291',
          batida: 1600,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 1152,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 265,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 200,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 120,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 119,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 80,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 10,
          },
          {
            id: '00004',
            nome: 'GERMEN DE MILHO GORDO',
            qtd: 5,
          },
        ],
        micro: [
          {
            id: '00277',
            nome: 'PX 41 SUINOS INICIAL',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 7,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 2,
          },
        ],
        outros: [
          {
            id: '00131',
            nome: 'MELACO',
            qtd: 30,
          },
        ],
        produto: {
          nome: 'MP-42 SUINOS INICIAL  G.',
          id: '02442',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 1050.5,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 150,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 150,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 55,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 30,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 30,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 13,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 6.5,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 7.5,
          },
          {
            id: '00287',
            nome: 'PX 74 COELHOS REPRODUÇAO',
            qtd: 6,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.5,
          },
        ],
        outros: [],
        produto: {
          nome: 'MP-72 COELHOS ENGORDA  G.',
          id: '02472',
          batida: 1500,
        },
      },
      {
        macro: [
          {
            id: '02283',
            nome: '883-CRIADOR EQUINO / R.181-M',
            qtd: 1540,
          },
          {
            id: '00190',
            nome: 'MILHO QUEBRADO',
            qtd: 200,
          },
          {
            id: '00043',
            nome: 'AVEIA',
            qtd: 160,
          },
        ],
        micro: [],
        outros: [
          {
            id: '00131',
            nome: 'MELACO',
            qtd: 100,
          },
        ],
        produto: {
          nome: 'MP 83 - TOP HORSE MANUT 12',
          id: '02479',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '02290',
            nome: 'PELLET POTROS (MP84)',
            qtd: 1740,
          },
          {
            id: '00019',
            nome: 'MILHO LAMINADO',
            qtd: 160,
          },
        ],
        micro: [],
        outros: [
          {
            id: '00131',
            nome: 'MELACO',
            qtd: 100,
          },
        ],
        produto: {
          nome: 'MP 84 - TOP HORSE POTROS',
          id: '02484',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '02291',
            nome: 'PELLET PARA MP85',
            qtd: 1700,
          },
          {
            id: '00019',
            nome: 'MILHO LAMINADO',
            qtd: 200,
          },
        ],
        micro: [],
        outros: [
          {
            id: '00131',
            nome: 'MELACO',
            qtd: 100,
          },
        ],
        produto: {
          nome: 'MP 85 - TOP HORSE TRABALHO 15',
          id: '02485',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '02283',
            nome: '883-CRIADOR EQUINO / R.181-M',
            qtd: 1581,
          },
          {
            id: '00019',
            nome: 'MILHO LAMINADO',
            qtd: 179,
          },
          {
            id: '00043',
            nome: 'AVEIA',
            qtd: 140,
          },
        ],
        micro: [],
        outros: [
          {
            id: '00131',
            nome: 'MELACO',
            qtd: 100,
          },
        ],
        produto: {
          nome: 'MP 181 - EQUUS PRODUTOR 12',
          id: '02487',
          batida: 2000,
        },
      },
    ],
    [
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 599.1,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 390,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 279,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 240,
          },
          {
            id: '00045',
            nome: 'FEIJAO EM GRAO',
            qtd: 220,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 65,
          },
          {
            id: '00004',
            nome: 'GERMEN DE MILHO GORDO',
            qtd: 40,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 40,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 33,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 9.6,
          },
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 4,
          },
          {
            id: '00313',
            nome: 'COR. AMARELO TARTRAZINA',
            qtd: 1,
          },
          {
            id: '00316',
            nome: 'COR. VERMELHO PONCEAU',
            qtd: 0.8,
          },
          {
            id: '00312',
            nome: 'COR. BRANCO (Dióxido Titânio)',
            qtd: 0.4,
          },
          {
            id: '00317',
            nome: 'CORANTE AZUL BRILHANTE',
            qtd: 0.1,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 38,
          },
        ],
        produto: {
          nome: 'MP 93 LESTER MULTI',
          id: '02490',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 455.4,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 360,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 306,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 225,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 200,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 180,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 100,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 15,
          },
        ],
        micro: [
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 9.6,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 2,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
          {
            id: '00313',
            nome: 'COR. AMARELO TARTRAZINA',
            qtd: 1,
          },
          {
            id: '00316',
            nome: 'COR. VERMELHO PONCEAU',
            qtd: 0.6,
          },
          {
            id: '00402',
            nome: 'AROMA DE BAUNILHA',
            qtd: 0.6,
          },
          {
            id: '00403',
            nome: 'AROMA DE LEITE CONDENSADO',
            qtd: 0.6,
          },
          {
            id: '00312',
            nome: 'COR. BRANCO (Dióxido Titânio)',
            qtd: 0.4,
          },
          {
            id: '00317',
            nome: 'CORANTE AZUL BRILHANTE',
            qtd: 0.2,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 52,
          },
          {
            id: '00171',
            nome: "PALAT D'TECH 6L (CAES)",
            qtd: 40,
          },
        ],
        produto: {
          nome: 'MP 91 TIPSY FILHOTES MIX',
          id: '02491',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 504.4,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 360,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 307,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 200,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 180,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 120,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 100,
          },
          {
            id: '00114',
            nome: 'FARINHA DE SANGUE (HEMOGLOBINA)',
            qtd: 50,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 25,
          },
        ],
        micro: [
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 9.8,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 2,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
          {
            id: '00402',
            nome: 'AROMA DE BAUNILHA',
            qtd: 0.6,
          },
          {
            id: '00403',
            nome: 'AROMA DE LEITE CONDENSADO',
            qtd: 0.6,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 49,
          },
          {
            id: '00171',
            nome: "PALAT D'TECH 6L (CAES)",
            qtd: 40,
          },
        ],
        produto: {
          nome: 'MP 91-TIPSY FILHOTE',
          id: '02493',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 501.6,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 450,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 251,
          },
          {
            id: '00045',
            nome: 'FEIJAO EM GRAO',
            qtd: 240,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 200,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 155,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 28,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 25,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 10,
          },
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 6,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 1.6,
          },
          {
            id: '00315',
            nome: 'COR. AMARELO CREPUSCULO',
            qtd: 1.2,
          },
          {
            id: '00314',
            nome: 'COR. VERMELHO BORDEAUX',
            qtd: 0.4,
          },
          {
            id: '00313',
            nome: 'COR. AMARELO TARTRAZINA',
            qtd: 0.2,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 50,
          },
          {
            id: '00171',
            nome: "PALAT D'TECH 6L (CAES)",
            qtd: 40,
          },
        ],
        produto: {
          nome: 'MP 92 - DINK  PLUS',
          id: '02498',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 665,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 460,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 272,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 154,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 140,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 106,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 70,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 6,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 10,
          },
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 10,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 2,
          },
          {
            id: '00392',
            nome: 'MYCOSORB',
            qtd: 1,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 40,
          },
          {
            id: '00171',
            nome: "PALAT D'TECH 6L (CAES)",
            qtd: 24,
          },
        ],
        produto: {
          nome: 'MP 91 TIPSY MIX ADULTO R.P.',
          id: '02501',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 621.8,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 300,
          },
          {
            id: '00045',
            nome: 'FEIJAO EM GRAO',
            qtd: 300,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 200,
          },
          {
            id: '00004',
            nome: 'GERMEN DE MILHO GORDO',
            qtd: 185,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 128,
          },
          {
            id: '00102',
            nome: 'FARINHA DE CARNE 42%',
            qtd: 127,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 29,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 16,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 10,
          },
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 4,
          },
          {
            id: '00401',
            nome: 'AROMA ALHO',
            qtd: 1,
          },
          {
            id: '00315',
            nome: 'COR. AMARELO CREPUSCULO',
            qtd: 0.2,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 38,
          },
        ],
        produto: {
          nome: 'MP 79 IGOR, LESTER ,BUCKY DOG',
          id: '02502',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 398,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 310,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 302,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 300,
          },
          {
            id: '00045',
            nome: 'FEIJAO EM GRAO',
            qtd: 280,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 215,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 29,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 24,
          },
          {
            id: '00110',
            nome: 'FARINHA DE SANGUE',
            qtd: 18,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 10,
          },
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 4,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 40,
          },
          {
            id: '00171',
            nome: "PALAT D'TECH 6L (CAES)",
            qtd: 30,
          },
        ],
        produto: {
          nome: 'LESTER GOURMET',
          id: '02505',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 689.2,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 485,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 273,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 160,
          },
          {
            id: '00064',
            nome: 'QUIRERA DE ARROZ',
            qtd: 100,
          },
          {
            id: '00114',
            nome: 'FARINHA DE SANGUE (HEMOGLOBINA)',
            qtd: 50,
          },
          {
            id: '00112',
            nome: 'FARINHA DE VICERAS',
            qtd: 40,
          },
          {
            id: '00049',
            nome: 'FARELO LINHAÇA INTEGRAL',
            qtd: 6,
          },
        ],
        micro: [
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 9.6,
          },
          {
            id: '00391',
            nome: 'BIO-MOS',
            qtd: 2,
          },
          {
            id: '00392',
            nome: 'MYCOSORB',
            qtd: 2,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 2,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
          {
            id: '00393',
            nome: 'BIOPLEX ZINCO',
            qtd: 0.8,
          },
          {
            id: '00400',
            nome: 'DE-ODORASE',
            qtd: 0.8,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 118,
          },
          {
            id: '00179',
            nome: "PALAT D'TECH 10L frango (CAES)",
            qtd: 50,
          },
        ],
        produto: {
          nome: 'MP-98 BONNY ADULTO 26%',
          id: '02507',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 620.2,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 445,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 271,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 200,
          },
          {
            id: '00064',
            nome: 'QUIRERA DE ARROZ',
            qtd: 100,
          },
          {
            id: '00112',
            nome: 'FARINHA DE VICERAS',
            qtd: 92,
          },
          {
            id: '00114',
            nome: 'FARINHA DE SANGUE (HEMOGLOBINA)',
            qtd: 50,
          },
          {
            id: '00049',
            nome: 'FARELO LINHAÇA INTEGRAL',
            qtd: 4,
          },
        ],
        micro: [
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 9.6,
          },
          {
            id: '00391',
            nome: 'BIO-MOS',
            qtd: 4,
          },
          {
            id: '00392',
            nome: 'MYCOSORB',
            qtd: 2,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 2,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
          {
            id: '00393',
            nome: 'BIOPLEX ZINCO',
            qtd: 0.8,
          },
          {
            id: '00400',
            nome: 'DE-ODORASE',
            qtd: 0.8,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 137,
          },
          {
            id: '00179',
            nome: "PALAT D'TECH 10L frango (CAES)",
            qtd: 50,
          },
        ],
        produto: {
          nome: 'MP 99  BONNY FILHOTE',
          id: '02509',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 524,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 380,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 320,
          },
          {
            id: '00045',
            nome: 'FEIJAO EM GRAO',
            qtd: 200,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 160,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 88,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 75,
          },
          {
            id: '00004',
            nome: 'GERMEN DE MILHO GORDO',
            qtd: 60,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00114',
            nome: 'FARINHA DE SANGUE (HEMOGLOBINA)',
            qtd: 25,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 23,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 6,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 9.8,
          },
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 6,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 1.6,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 40,
          },
          {
            id: '00171',
            nome: "PALAT D'TECH 6L (CAES)",
            qtd: 40,
          },
        ],
        produto: {
          nome: 'MP 92 - DINK DOG NATURAL',
          id: '02515',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 460,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 405,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 329,
          },
          {
            id: '00045',
            nome: 'FEIJAO EM GRAO',
            qtd: 240,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 160,
          },
          {
            id: '00192',
            nome: 'DDGs 40 ALTA PROTEINA',
            qtd: 99,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 81,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 80,
          },
          {
            id: '00124',
            nome: 'CAULIM AMARELO',
            qtd: 40,
          },
          {
            id: '00149',
            nome: 'CALCARIO MOIDO 38%',
            qtd: 4,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 9.8,
          },
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 6,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 1.6,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
          {
            id: '00410',
            nome: 'AROMA de CARNE (Vogler)',
            qtd: 1,
          },
          {
            id: '00316',
            nome: 'COR. VERMELHO PONCEAU',
            qtd: 0.8,
          },
          {
            id: '00315',
            nome: 'COR. AMARELO CREPUSCULO',
            qtd: 0.6,
          },
          {
            id: '00314',
            nome: 'COR. VERMELHO BORDEAUX',
            qtd: 0.4,
          },
          {
            id: '00317',
            nome: 'CORANTE AZUL BRILHANTE',
            qtd: 0.2,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 40,
          },
          {
            id: '00171',
            nome: "PALAT D'TECH 6L (CAES)",
            qtd: 40,
          },
        ],
        produto: {
          nome: 'MP 92 - DINK DOG CARNE',
          id: '02518',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 601.2,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 310,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 268,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 200,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 200,
          },
          {
            id: '00064',
            nome: 'QUIRERA DE ARROZ',
            qtd: 100,
          },
          {
            id: '00112',
            nome: 'FARINHA DE VICERAS',
            qtd: 100,
          },
          {
            id: '00114',
            nome: 'FARINHA DE SANGUE (HEMOGLOBINA)',
            qtd: 50,
          },
          {
            id: '00049',
            nome: 'FARELO LINHAÇA INTEGRAL',
            qtd: 6,
          },
        ],
        micro: [
          {
            id: '00288',
            nome: 'PX 78 CAES',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 9.6,
          },
          {
            id: '00391',
            nome: 'BIO-MOS',
            qtd: 2,
          },
          {
            id: '00392',
            nome: 'MYCOSORB',
            qtd: 2,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 2,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
          {
            id: '00393',
            nome: 'BIOPLEX ZINCO',
            qtd: 0.8,
          },
          {
            id: '00400',
            nome: 'DE-ODORASE',
            qtd: 0.8,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 86,
          },
          {
            id: '00179',
            nome: "PALAT D'TECH 10L frango (CAES)",
            qtd: 50,
          },
        ],
        produto: {
          nome: 'BONNY ADULTO RAÇAS PEQUENAS',
          id: '02541',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 461.4,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 400,
          },
          {
            id: '00112',
            nome: 'FARINHA DE VICERAS',
            qtd: 289,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 280,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 180,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 160,
          },
          {
            id: '00064',
            nome: 'QUIRERA DE ARROZ',
            qtd: 100,
          },
        ],
        micro: [
          {
            id: '00298',
            nome: 'PREMIX 96 (GATOS)',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 9.8,
          },
          {
            id: '00162',
            nome: 'DL-METIONINA',
            qtd: 2,
          },
          {
            id: '00391',
            nome: 'BIO-MOS',
            qtd: 2,
          },
          {
            id: '00158',
            nome: 'TAURINA',
            qtd: 1.6,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 1.6,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
          {
            id: '00400',
            nome: 'DE-ODORASE',
            qtd: 1,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 60,
          },
          {
            id: '00173',
            nome: "PALAT C'SENS 11L (GATO)",
            qtd: 40,
          },
        ],
        produto: {
          nome: 'MP 21 AE PET CAT MIX',
          id: '02549',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 545,
          },
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 390,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 300,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 287,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 180,
          },
          {
            id: '00115',
            nome: 'FARINHA DE PENAS',
            qtd: 80,
          },
          {
            id: '00064',
            nome: 'QUIRERA DE ARROZ',
            qtd: 60,
          },
          {
            id: '00016',
            nome: 'CASCA DE SOJA',
            qtd: 35,
          },
        ],
        micro: [
          {
            id: '00141',
            nome: 'SAL',
            qtd: 10,
          },
          {
            id: '00298',
            nome: 'PREMIX 96 (GATOS)',
            qtd: 10,
          },
          {
            id: '00162',
            nome: 'DL-METIONINA',
            qtd: 2,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 1.2,
          },
          {
            id: '00158',
            nome: 'TAURINA',
            qtd: 1,
          },
          {
            id: '00313',
            nome: 'COR. AMARELO TARTRAZINA',
            qtd: 1,
          },
          {
            id: '00316',
            nome: 'COR. VERMELHO PONCEAU',
            qtd: 0.6,
          },
          {
            id: '00312',
            nome: 'COR. BRANCO (Dióxido Titânio)',
            qtd: 0.4,
          },
          {
            id: '00317',
            nome: 'CORANTE AZUL BRILHANTE',
            qtd: 0.2,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 55,
          },
          {
            id: '00172',
            nome: "PALAT C'SENS 5L (GATO)",
            qtd: 40,
          },
        ],
        produto: {
          nome: 'MP 96 - MISTY CAT 26%',
          id: '02550',
          batida: 2000,
        },
      },
      {
        macro: [
          {
            id: '00013',
            nome: 'FARELO DE SOJA 46%',
            qtd: 402.4,
          },
          {
            id: '00001',
            nome: 'MILHO',
            qtd: 350,
          },
          {
            id: '00031',
            nome: 'FARELO DE TRIGO',
            qtd: 280,
          },
          {
            id: '00112',
            nome: 'FARINHA DE VICERAS',
            qtd: 268,
          },
          {
            id: '00104',
            nome: 'FARINHA DE CARNE 48%',
            qtd: 185,
          },
          {
            id: '00061',
            nome: 'FARELO DE ARROZ GORDO',
            qtd: 160,
          },
          {
            id: '00064',
            nome: 'QUIRERA DE ARROZ',
            qtd: 160,
          },
          {
            id: '00114',
            nome: 'FARINHA DE SANGUE (HEMOGLOBINA)',
            qtd: 50,
          },
        ],
        micro: [
          {
            id: '00298',
            nome: 'PREMIX 96 (GATOS)',
            qtd: 10,
          },
          {
            id: '00141',
            nome: 'SAL',
            qtd: 7,
          },
          {
            id: '00391',
            nome: 'BIO-MOS',
            qtd: 3,
          },
          {
            id: '00158',
            nome: 'TAURINA',
            qtd: 2,
          },
          {
            id: '00161',
            nome: 'L-LISINA',
            qtd: 2,
          },
          {
            id: '00162',
            nome: 'DL-METIONINA',
            qtd: 2,
          },
          {
            id: '00394',
            nome: 'BANOX E',
            qtd: 2,
          },
          {
            id: '00395',
            nome: 'MOLD-ZAP AQ. PO',
            qtd: 1.6,
          },
          {
            id: '00400',
            nome: 'DE-ODORASE',
            qtd: 1,
          },
          {
            id: '00393',
            nome: 'BIOPLEX ZINCO',
            qtd: 0.6,
          },
          {
            id: '00390',
            nome: 'CARNITINA',
            qtd: 0.4,
          },
        ],
        outros: [
          {
            id: '00119',
            nome: 'OLEO FRANGO',
            qtd: 63,
          },
          {
            id: '00173',
            nome: "PALAT C'SENS 11L (GATO)",
            qtd: 50,
          },
        ],
        produto: {
          nome: 'MP 22 PET CAT - GATOS CASTRADOS',
          id: '02555',
          batida: 2000,
        },
      },
    ],
  ];
}

export default IngredientManager;
