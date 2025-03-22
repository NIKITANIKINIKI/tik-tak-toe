import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {

  const user=await prisma.user.create({
    data:{
      login: 'user',
      passwordHash: '82838383838',
      rating: 1000
    }
  })
  const user2=await prisma.user.create({
    data:{
      login: 'user2',
      passwordHash: '82838383sss838',
      rating: 100
    }
  })
  await prisma.game.create({
    data:{
      field: Array(9).fill(null),
      status: 'idle',
      gameOverAt: '2882828',
      players: {
        connect:{
          id: user.id,
        }
      }
    }
  })
  await prisma.game.create({
    data:{
      field: Array(9).fill(null),
      status: 'idle',
      gameOverAt: '2882828',
      players: {
        connect:{
          id: user2.id,
        }
      }
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
