import { Entity } from "src/shared/domain/Entity";
import { BasePropsInterface } from "src/shared/domain/entity/BaseProps.interface";
import { TvShowDomain } from "./TvShowDomain";

export interface ActorProps extends BasePropsInterface {
  name: string;
  age: number;
  birthDate: string;
  country: string;
  tvShows?: TvShowDomain[];
}

export class ActorDomain extends Entity<ActorProps> {
  private constructor(props: ActorProps, id?: string) {
    super(props, id);
  }

  static create(props: ActorProps, id?: string) {
    const account = new ActorDomain(props, id);
    return account;
  }

  get name(): string {
    return this.props.name;
  }

  get age(): number {
    return this.props.age;
  }

  get birthDate(): string {
    return this.props.birthDate;
  }

  get country(): string {
    return this.props.country;
  }

  get tvShows(): TvShowDomain[] | undefined {
    return this.props.tvShows;
  }

  addTvShow(tvShow: TvShowDomain) {
    if (!this.props.tvShows) this.props.tvShows = [];

    if (this.props.tvShows.includes(tvShow)) return;
    this.props.tvShows.push(tvShow);
  }
}
