import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AppError from "src/shared/core/errors/AppError";

export interface IEpisodateTvShow {
  id: number;
  name: string;
  permalink: string;
  start_date: string;
  end_date?: string;
  country: string;
  network: string;
  status: string;
  image_thumbnail_path: string;
}

export interface IEpisodateEpisode {
  season: number;
  episode: number;
  name: string;
  air_date: string;
}

export interface IEpisodateTvShowDetails {
  id: number;
  name: string;
  permalink: string;
  url: string;
  description: string;
  description_source: string;
  start_date: string;
  end_date?: string;
  country: string;
  status: string;
  runtime: number;
  network: string;
  youtube_link?: string;
  image_path: string;
  image_thumbnail_path: string;
  rating: string;
  rating_count: string;
  countdown?: string;
  genres: string[];
  pictures: string;
  episodes: IEpisodateEpisode[];
}

@Injectable()
export class EpisodateProvider {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  public async mostPopular(page: number): Promise<IEpisodateTvShow[]> {
    const requestConfig = {
      url: `https://www.episodate.com/api/most-popular?page=${page}`,
      method: "GET",
      timeout: 120000,
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        return result?.data?.tv_shows;
      })
      .catch((error) => {
        throw new AppError("Erro ao criar usuário", 400);
      });
  }

  public async details(id: number): Promise<IEpisodateTvShowDetails> {
    const requestConfig = {
      url: `https://www.episodate.com/api/show-details?q=${id}`,
      method: "GET",
      timeout: 120000,
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        return result?.data?.tvShow;
      })
      .catch((error) => {
        throw new AppError("Erro ao criar usuário", 400);
      });
  }
}
