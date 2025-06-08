import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon, PokemonDocument } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,

    private readonly http: AxiosAdapter,

  ) { }

  async executeSedd() {

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    // const insertPromisesArray: Promise<PokemonDocument>[] = [];

    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      //   const pokemon = await this.pokemonModel.create({name, no});
      // console.log({name, no})

      pokemonToInsert.push({ name, no });

    });
    this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Execute';
  }

}
