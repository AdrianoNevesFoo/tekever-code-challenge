export interface ITvShowEpisodes {
  name: string;
  number: number;
  description: string;
  time: number;
  season: number;
}

export class ICreateTvShow {
  name: string;
  releaseDate: string;
  endDate: string;
  productionCompany: string;
  country: string;
  seasons: number;
  genre: string;
  actors: string[];
  episodes: ITvShowEpisodes[];
}
