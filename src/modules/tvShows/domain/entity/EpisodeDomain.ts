import { Entity } from "src/shared/domain/Entity";
import { BasePropsInterface } from "src/shared/domain/entity/BaseProps.interface";
import { TvShowDomain } from "./TvShowDomain";

export interface EpisodeProps extends BasePropsInterface {
  name: string;
  number: number;
  description: string;
  time: number;
  season: number;
  showId?: string;
}

export class EpisodeDomain extends Entity<EpisodeProps> {
  private constructor(props: EpisodeProps, id?: string) {
    super(props, id);
  }

  static create(props: EpisodeProps, id?: string) {
    const account = new EpisodeDomain(props, id);
    return account;
  }

  get name(): string {
    return this.props.name;
  }

  get number(): number {
    return this.props.number;
  }

  get description(): string {
    return this.props.description;
  }

  get time(): number {
    return this.props.time;
  }

  get season(): number {
    return this.props.season;
  }

  get showId(): string | undefined {
    return this.props.showId;
  }
}
