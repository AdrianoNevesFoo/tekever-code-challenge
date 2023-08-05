import { Entity } from "src/shared/domain/Entity";
import { BasePropsInterface } from "src/shared/domain/entity/BaseProps.interface";
import { ActorDomain } from "./ActorDomain";
import { EpisodeDomain } from "./EpisodeDomain";

export interface TvShowProps extends BasePropsInterface {
  name: string;
  releaseDate: string;
  endDate: string;
  productionCompany: string;
  country: string;
  genre: string;
  seasons: number;
  actors?: string[];
  episodes?: EpisodeDomain[];
}

export class TvShowDomain extends Entity<TvShowProps> {
  private constructor(props: TvShowProps, id?: string) {
    super(props, id);
  }

  static create(props: TvShowProps, id?: string) {
    const account = new TvShowDomain(props, id);
    return account;
  }

  get name(): string {
    return this.props.name;
  }

  get releaseDate(): string {
    return this.props.releaseDate;
  }

  get endDate(): string {
    return this.props.endDate;
  }

  get country(): string {
    return this.props.country;
  }

  get productionCompany(): string {
    return this.props.productionCompany;
  }

  get seasons(): number {
    return this.props.seasons;
  }

  get genre(): string {
    return this.props.genre;
  }

  get actors(): string[] | undefined {
    return this.props.actors;
  }

  get episodes(): EpisodeDomain[] | undefined {
    return this.props.episodes;
  }

  addEpisode(episode: EpisodeDomain) {
    if (!this.props.episodes) this.props.episodes = [];

    if (this.props.episodes.includes(episode)) return;
    this.props.episodes.push(episode);
  }
}
