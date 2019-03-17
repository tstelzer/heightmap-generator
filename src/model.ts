import zufall from '@tstelzer/zufall';
import * as R from 'ramda';
import * as Three from 'three';

const rng = zufall('VYIBVOS');

type HeightmapOption = {
  factor: number;
  freqX: number;
  freqY: number;
  power: number;
  t: number;
};

const makeOctave = ({factor, freqX, freqY}: HeightmapOption) => (
  x: number,
  y: number,
  t: number,
) => factor * rng.noise3D(freqX * x, freqY * y, t);

const makeRedistribute = ({power}: HeightmapOption) =>
  power === 1
    ? R.identity
    : (e: number) => (e > 0 ? Math.pow(e, power) : -Math.pow(-e, power));

/**
 * Generates a heightmap by applying a list of noise functions in sequence.
 * The third dimension of the resulting array holds the sum `z` value in the
 * head, and the summands in the rest, i.e.
 * [x => [y => [zSum, z1, z2, ..., zN]]]
 */
export const heightmap = (
  options: HeightmapOption[],
  width: number,
  height: number,
) => {
  const result: number[][][] = [];
  const sum = R.reduce<number, number>(R.add, 0);

  for (let x = 0; x < width; x++) {
    if (!result[x]) {
      result.push([]);
    }

    for (let y = 0; y < height; y++) {
      const zs = options.reduce((xs: number[], option) => {
        const octave = makeOctave(option);
        const redistribute = makeRedistribute(option);
        xs.push(redistribute(octave(x, y, option.t)));
        return xs;
      }, []);
      result[x][y] = [sum(zs)].concat(zs);
    }
  }

  return result;
};

export const heightmapOption = (
  factor: number,
  freqX: number,
  freqY: number,
  power: number,
  t: number,
): HeightmapOption => ({factor, freqX, freqY, power, t});
