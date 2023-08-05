import { faker } from "@faker-js/faker";

export const createtvShowMock = {
  name: faker.person.fullName(),
  releaseDate: faker.date.birthdate().toDateString(),
  endDate: faker.date.birthdate().toDateString(),
  productionCompany: faker.company.name(),
  country: "United States",
  genre: faker.lorem.word(),
  seasons: 4,
  actors: [faker.person.fullName()],
  episodes: [
    {
      name: faker.lorem.sentence(),
      number: 4,
      description: faker.lorem.sentence(),
      time: 3.4,
      season: 7,
    },
  ],
};

export const tvShowProps = {
  name: faker.person.fullName(),
  releaseDate: faker.date.birthdate().toDateString(),
  endDate: faker.date.birthdate().toDateString(),
  productionCompany: faker.company.name(),
  country: "United States",
  genre: faker.lorem.word(),
  seasons: 4,
  actors: [faker.person.fullName()],
};

export const tvShowSavedMock = {
  id: faker.seed().toString(),
  name: faker.person.fullName(),
  releaseDate: faker.date.birthdate().toDateString(),
  endDate: faker.date.birthdate().toDateString(),
  productionCompany: faker.company.name(),
  country: "United States",
  genre: faker.lorem.word(),
  seasons: 4,
  active: true,
  createdAt: faker.date.birthdate(),
  updatedAt: faker.date.birthdate(),
};

export const mostPopularMock = [
  {
    id: 35624,
    name: "The Flash",
    permalink: "the-flash",
    start_date: "2014-10-07",
    end_date: null,
    country: "US",
    network: "The CW",
    status: "Ended",
    image_thumbnail_path:
      "https://static.episodate.com/images/tv-show/thumbnail/35624.jpg",
  },
  {
    id: 23455,
    name: "Game of Thrones",
    permalink: "game-of-thrones",
    start_date: "2011-04-17",
    end_date: null,
    country: "US",
    network: "HBO",
    status: "Ended",
    image_thumbnail_path:
      "https://static.episodate.com/images/tv-show/thumbnail/23455.jpg",
  },
];

export const tvShowDetails = {
  id: 35624,
  name: "The Flash",
  permalink: "the-flash",
  url: "https://www.episodate.com/tv-show/the-flash",
  description:
    "Barry Allen is a Central City police forensic scientist with a reasonably happy life, despite the childhood trauma of a mysterious red and yellow being killing his mother and framing his father. All that changes when a massive particle accelerator accident leads to Barry being struck by lightning in his lab. Coming out of coma nine months later, Barry and his new friends at STAR labs find that he now has the ability to move at superhuman speed. <br>Furthermore, Barry learns that he is but one of many affected by that event, most of whom are using their powers for evil. Determined to make a difference, Barry dedicates his life to fighting such threats, as The Flash. While he gains allies he never expected, there are also secret forces determined to aid and manipulate him for their own agenda.",
  description_source:
    "http://www.imdb.com/title/tt3107288/plotsummary?ref_=tt_stry_pl",
  start_date: "2014-10-07",
  end_date: null,
  country: "US",
  status: "Ended",
  runtime: 60,
  network: "The CW",
  youtube_link: null,
  image_path: "https://static.episodate.com/images/tv-show/full/35624.jpg",
  image_thumbnail_path:
    "https://static.episodate.com/images/tv-show/thumbnail/35624.jpg",
  rating: "9.3139",
  rating_count: "1612",
  countdown: null,
  genres: ["Drama", "Action", "Science-Fiction"],
  pictures: [
    "https://static.episodate.com/images/episode/35624-559.jpg",
    "https://static.episodate.com/images/episode/35624-973.jpg",
  ],
  episodes: [
    {
      season: 1,
      episode: 1,
      name: "Pilot",
      air_date: "2014-10-08 00:00:00",
    },
    {
      season: 1,
      episode: 2,
      name: "Fastest Man Alive",
      air_date: "2014-10-15 00:00:00",
    },
  ],
};

export const tvShowDetailsWithoutEpisodes = {
  id: 35624,
  name: "The Flash",
  permalink: "the-flash",
  url: "https://www.episodate.com/tv-show/the-flash",
  description:
    "Barry Allen is a Central City police forensic scientist with a reasonably happy life, despite the childhood trauma of a mysterious red and yellow being killing his mother and framing his father. All that changes when a massive particle accelerator accident leads to Barry being struck by lightning in his lab. Coming out of coma nine months later, Barry and his new friends at STAR labs find that he now has the ability to move at superhuman speed. <br>Furthermore, Barry learns that he is but one of many affected by that event, most of whom are using their powers for evil. Determined to make a difference, Barry dedicates his life to fighting such threats, as The Flash. While he gains allies he never expected, there are also secret forces determined to aid and manipulate him for their own agenda.",
  description_source:
    "http://www.imdb.com/title/tt3107288/plotsummary?ref_=tt_stry_pl",
  start_date: "2014-10-07",
  end_date: null,
  country: "US",
  status: "Ended",
  runtime: 60,
  network: "The CW",
  youtube_link: null,
  image_path: "https://static.episodate.com/images/tv-show/full/35624.jpg",
  image_thumbnail_path:
    "https://static.episodate.com/images/tv-show/thumbnail/35624.jpg",
  rating: "9.3139",
  rating_count: "1612",
  countdown: null,
  genres: ["Drama", "Action", "Science-Fiction"],
  pictures: [
    "https://static.episodate.com/images/episode/35624-559.jpg",
    "https://static.episodate.com/images/episode/35624-973.jpg",
  ],
};
