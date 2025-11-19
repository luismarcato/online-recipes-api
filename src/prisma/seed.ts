import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const recipes = [
    {
      title: 'Spaghetti Carbonara',
      image: 'spaghetti_carbonara.jpg',
      time: 25,
      difficulty: 'MEDIUM',
      category: 'PASTA',
      servings: 4,
      description: 'Clássico prato italiano com ovos, queijo e bacon.',
      ingredients: [
        '300g Spaghetti',
        '150g Bacon',
        '3 Ovos',
        '50g Parmesão ralado',
        'Pimenta a gosto',
      ],
      instructions: [
        'Cozinhe o spaghetti conforme instruções da embalagem.',
        'Frite o bacon até dourar.',
        'Misture ovos e parmesão.',
        'Combine tudo com o macarrão e tempere com pimenta.',
      ],
    },
    {
      title: 'Tomato Soup',
      image: 'tomato_soup.jpg',
      time: 30,
      difficulty: 'EASY',
      category: 'SOUPS',
      servings: 4,
      description: 'Sopa cremosa de tomate, perfeita para dias frios.',
      ingredients: [
        '500g Tomate',
        '1 Cebola média',
        '2 Dentes de alho',
        '500ml Caldo de legumes',
        '100ml Creme de leite',
      ],
      instructions: [
        'Refogue cebola e alho até dourar.',
        'Adicione os tomates e o caldo de legumes.',
        'Cozinhe por 20 minutos e bata no liquidificador.',
        'Misture o creme de leite e sirva quente.',
      ],
    },
    {
      title: 'Chocolate Cake',
      image: 'chocolate_cake.jpg',
      time: 60,
      difficulty: 'MEDIUM',
      category: 'DESSERTS',
      servings: 8,
      description: 'Bolo de chocolate fofinho e delicioso.',
      ingredients: [
        '200g Farinha de trigo',
        '150g Açúcar',
        '50g Cacau em pó',
        '3 Ovos',
        '100g Manteiga',
        '10g Fermento em pó',
      ],
      instructions: [
        'Misture os ingredientes secos.',
        'Adicione ovos e manteiga e bata bem.',
        'Asse em forno preaquecido a 180°C por 40 minutos.',
        'Deixe esfriar antes de desenformar.',
      ],
    },
    {
      title: 'Greek Salad',
      image: 'greek_salad.jpg',
      time: 15,
      difficulty: 'EASY',
      category: 'HEALTHY',
      servings: 2,
      description: 'Salada fresca com tomate, pepino e queijo feta.',
      ingredients: [
        '2 Tomates médios',
        '1 Pepino',
        '50g Queijo feta',
        '10 Azeitonas pretas',
        '1 Colher de sopa Azeite',
        'Sal e pimenta a gosto',
      ],
      instructions: [
        'Corte tomates, pepino e queijo em cubos.',
        'Misture tudo em uma tigela.',
        'Adicione azeite, sal e pimenta a gosto.',
        'Sirva imediatamente.',
      ],
    },
    {
      title: 'Mango Smoothie',
      image: 'mango_smoothie.jpg',
      time: 10,
      difficulty: 'EASY',
      category: 'DRINKS',
      servings: 2,
      description: 'Bebida refrescante de manga com iogurte.',
      ingredients: [
        '1 Manga madura',
        '200ml Iogurte natural',
        '1 Colher de sopa Mel',
        'Gelo a gosto',
      ],
      instructions: [
        'Bata todos os ingredientes no liquidificador até ficar homogêneo.',
        'Sirva gelado.',
      ],
    },
    {
      title: 'Chicken Wrap',
      image: 'chicken_wrap.jpg',
      time: 20,
      difficulty: 'MEDIUM',
      category: 'SNACKS',
      servings: 2,
      description: 'Wrap rápido de frango grelhado com legumes.',
      ingredients: [
        '2 Tortilhas',
        '150g Peito de frango',
        '50g Alface',
        '1 Tomate pequeno',
        '30g Queijo ralado',
        'Molho a gosto',
      ],
      instructions: [
        'Grelhe o frango e corte em tiras.',
        'Distribua alface, tomate e queijo nas tortilhas.',
        'Adicione o frango e molho.',
        'Enrole o wrap e sirva.',
      ],
    },
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({
      data: { ...recipe, userId: 1 },
    });
  }

  console.log('Seed finalizada!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
