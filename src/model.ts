import zufall from '@tstelzer/zufall';
import * as R from 'ramda';
import * as Three from 'three';

const rng = zufall('VYIBVOS');

type OctaveParams = {
  factor: number;
  freqX: number;
  freqY: number;
};

/**
 * Generates a heightmap by applying a list of noise functions in sequence.
 * The third dimension of the resulting array holds the sum `z` value in the
 * head, and the summands in the rest, i.e.
 * [x => [y => [zSum, z1, z2, ..., zN]]]
 */
export const heightmap = (
  octaves: Array<(x: number, y: number, z: number) => number>,
  power: number,
  width: number,
  height: number,
  t: number,
) => {
  const result: number[][][] = [];
  const sum = R.reduce<number, number>(R.add, 0);
  const redistribute = (e: number) => Math.pow(e, 2);

  for (let x = 0; x < width; x++) {
    if (!result[x]) {
      result.push([]);
    }

    for (let y = 0; y < height; y++) {
      const zs = octaves.reduce(
        (xs: number[], f) => (xs.push(f(x, y, t)), xs),
        [],
      );
      result[x][y] = [redistribute(sum(zs))].concat(zs);
    }
  }

  return result;
};

export const makeOctave = ({factor, freqX, freqY}: OctaveParams) => (
  x: number,
  y: number,
  t: number,
) => factor * rng.noise3D(freqX * x, freqY * y, t);

export const octaveParams = (
  factor: number,
  freqX: number,
  freqY: number,
): OctaveParams => ({factor, freqX, freqY});
