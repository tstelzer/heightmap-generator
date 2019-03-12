import * as React from 'react';
import * as R from 'ramda';
import {Canvas} from 'react-three-fiber';
import {Terrain} from './Terrain';
import {Heightmaps} from './Heightmaps';
import * as model from './model';
import './styles.css';

const App = () => {
  const generateTerrain = state =>
    model.heightmap(
      state.octaves.map(model.makeOctave),
      1,
      state.width,
      state.height,
      0.1,
    );

  const defaultState = {
    octaves: [
      model.octaveParams(3, 0.05, 0.05),
      model.octaveParams(1, 0.1, 0.1),
      model.octaveParams(1, 0.4, 0.4),
      model.octaveParams(0.5, 1, 1),
    ],
    width: 100,
    height: 100,
  };

  const [state, setState] = React.useState({
    ...defaultState,
    terrain: generateTerrain(defaultState),
  });

  const camera = {
    fov: 90,
    position: [state.width / 2, state.height / 4, 60],
    near: 0.1,
    far: 1000,
  };

  const addOctave = () =>
    setState(state => {
      const newState = {
        ...state,
        octaves: [...state.octaves, model.octaveParams(3, 0.05, 0.05)],
      };
      return {...newState, terrain: generateTerrain(newState)};
    });

  const removeOctave = i =>
    setState(state => {
      const newState = {
        ...state,
        octaves: state.octaves.filter((_, index) => i !== index),
      };
      return {...newState, terrain: generateTerrain(newState)};
    });

  const updateOctave = (i, prop, value) =>
    setState(state => {
      const newState = {
        ...state,
        octaves: R.adjust(
          i,
          octave => ({...octave, [prop]: value}),
          state.octaves,
        ),
      };
      return {...newState, terrain: generateTerrain(newState)};
    });

  const props = {
    ...state,
    addOctave,
    removeOctave,
    updateOctave,
  };

  return (
    <div className="container">
      <Heightmaps {...props} />
      <div className="terrain">
        <Canvas camera={camera}>
          <Terrain {...props} />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
