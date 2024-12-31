import { db } from "../src/server/db";
import { type ContentInfo, type Song } from "@prisma/client";

async function main() {
  const categories = await db.category.createMany({
    data: [
      {
        name: "Programming",
        description:
          "Sometimes just work, sometimes a hobby, but always fun to me. Click here to see my projects, tutorials and experiments about this beautiful art",
      },
      {
        name: "Economics",
        description:
          "Another of my biggest passions. Overseeing my reality from Austrian School of Economics perspective",
      },
      {
        name: "Blockchain",
        description:
          "I started to study Bitcoin from monetary theory and then I learnt to code to understand its technology. Now I'm a Web3 Developer and crypto investment advisor",
      },
    ],
  });
  console.log(`Categories Created ${categories.count}`);

  const companiesList = [
    "Domitai",
    "Hashger",
    "Platzi",
    "Cointelegraph",
    "Inst Mises Mexico",
    "Xpectre Labs",
    "Bolsa para principiantes",
  ].map((name) => ({
    name,
    slug: name.toLowerCase().replace(" ", "-"),
  }));

  const companies = await db.company.createMany({
    data: companiesList,
  });
  console.log(`Companies Created ${companies.count}`);

  const cyphepunksAlbum = await db.album.create({
    data: {
      slug: "cypherpunks-audio-course",
      ContentInfo: {
        create: {
          name: "History of Cypherpunks - Audio Course",
          description: `Discover how in the 90s, a group of hackers who fought against the government using cryptography to defend your right to privacy would lead to the creation of Bitcoin and the Blockchain Revolution.
          A fascinating audio course, exclusive to Platzi, written by me and narrated by Angela Ocando, one of the most influential voices in the crypto community in Latin America.`,

          createdAt: new Date("2022-02-24"),
          imgUrl:
            "https://utfs.io/f/BCMCAtcvwXHD4ERFJqMzOMpEvYhUeSFxBwyR4H7qLDod9mI5",
          url: "https://platzi.com/cursos/audiocurso-cypherpunks/",
        },
      },
      Categories: {
        connect: {
          id: 3,
        },
      },
      Company: {
        connect: {
          id: 3,
        },
      },
    },
  });
  console.log(`Cypherpunks Album Created ${cyphepunksAlbum.id}`);

  type SongData = { id: number } & Omit<Song, "id" | "contentInfoId"> & {
      ContentInfo: Omit<ContentInfo, "id">;
    } & { Categories?: number[] };

  const createSong = async ({
    ContentInfo,
    Categories,
    ...songData
  }: SongData) => {
    const contentInfoItem = await db.contentInfo.create({
      data: {
        ...ContentInfo,
      },
    });

    const categoriesToConnect = Categories
      ? {
          Categories: {
            connect: Categories.map((id) => ({ id })),
          },
        }
      : {};

    const song = await db.song.create({
      data: {
        ...songData,
        ...categoriesToConnect,
        contentInfoId: contentInfoItem.id,
      },
    });
    return {
      ...song,
    };
  };

  const cypherpunksSongsDynamicContent = [
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47048-intro/",
      name: "Introduction: What you will find here is not what you expect",
      description:
        "Welcome! This course delves into the hidden history of cypherpunks—the programmers who fought for privacy against government control. If you're ready to explore the foundations of blockchain and cryptography and the battles for digital freedom, join us for stories of hackers, privacy advocates, and groundbreaking technology",
      slug: "intro",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47049-criptografia-a-traves-de-enigma/",
      name: "Cryptography and Project Enigma",
      description:
        "Cryptography has a rich history, from ancient ciphers to WWII's Enigma. In this class, we’ll uncover its evolution and power—from secret writing to a tool for freedom.",
      slug: "enigma",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47050-david-chaum-y-el-paper-que-dio-origen-a-los-cypher/",
      name: "David Chaum and the paper that gave rise to the Cypherpunks",
      description:
        "David Chaum, the grandfather of cypherpunks, revolutionized cryptography with ideas on privacy, digital identity, and anonymous transactions that laid the foundation for blockchain.",
      slug: "chaum",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47051-tim-may-y-la-fundacion-de-los-cypherpunks/",
      name: "Tim May and the founding of the Cypherpunks",
      description:
        "The cypherpunk movement, inspired by Tim May, transformed cryptography from a privacy shield into a tool of resistance, advocating free speech and anonymous commerce.",
      slug: "cypherpunks-foundation",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47052-phil-zimmerman-y-pgp/",
      name: "Zimmerman and Pretty Good Privacy",
      description:
        "Phil Zimmerman's creation of PGP, a secure email tool, empowered global privacy and freedom. But its success drew government scrutiny, sparking the “crypto wars.",
      slug: "pgp",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47053-crypto-wars-parte-1-itar/",
      name: "Crypto Wars I: ITAR",
      description:
        "Phil Zimmerman faced prosecution for exporting PGP due to U.S. arms regulations, but cypherpunks’ public support and creative legal strategies helped him secure freedom",
      slug: "crypto-wars-itar",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47059-cryptowards-parte-2-clipper-chip/",
      name: "Crypto Wars II: Clipper Chip",
      description:
        "A historical overview of the Cypherpunks’ battle against the Clipper Chip, a U.S. government plan to monitor communication via embedded surveillance technology",
      slug: "crypto-wars-clipper-chip",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47058-la-criptografia-un-arma-contra-la-tirania/",
      name: "Cryptography: A Weapon Against Tyranny",
      description:
        "The Cypherpunks used cryptography to expose and counter government control, inspiring Wikileaks' global impact on transparency and privacy.",
      slug: "wikileaks",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47057-criptomonedas-de-los-cypherpunks/",
      name: "Cypherpunks' Cryptocurrencies",
      description:
        "Bitcoin, the largest monetary experiment, has roots in cypherpunk ideology, aiming for anonymous and decentralized digital money",
      slug: "cryptocurrencies",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47056-silk-road/",
      name: "Silk Road",
      description:
        "The chronicles the rise and fall of Silk Road, an anonymous online marketplace for illegal goods, and its creator Ross Ulbricht.",
      slug: "silk-road",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47055-cypher-en-la-actualidad/",
      name: " Cypherpunks today",
      description:
        "The fate of the cypherpunk mailing list and its members, many of whom went on to lead successful projects in the blockchain industry, continuing the fight for privacy and decentralization.",
      slug: "cypherpunks-today",
    },
    {
      url: "https://platzi.com/home/clases/2836-audiocurso-cypherpunks/47054-ending/",
      name: " Ending",
      description: " The end of the course",
      slug: "ending",
    },
  ];

  const cypherpunkSongs = await Promise.all(
    cypherpunksSongsDynamicContent.map(({ slug, ...song }, id) =>
      createSong({
        id: id + 1,
        typeContent: "VIDEO",
        difficulty: "LOW",
        slug: "cypherpunks-audio-" + slug,
        ContentInfo: {
          ...song,
          createdAt: new Date("2022-02-24"),
          imgUrl: null,
        },
        Categories: [3],
        companyId: 3,
        albumId: 1,
      }),
    ),
  );

  console.log("Cypherpunks Songs Created", cypherpunkSongs);
}

console.log("Seeding...");

main().catch((e) => {
  console.log(e);
});
