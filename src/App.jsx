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
      state.options,
      state.width,
      state.height,
      0.1,
    );

  const defaultState = {
    options: [
      model.heightmapOption(3, 0.05, 0.05, 1, 1),
      model.heightmapOption(1, 0.1, 0.1, 1, 1),
      model.heightmapOption(1, 0.4, 0.4, 1, 1),
      model.heightmapOption(0.5, 1, 1, 1, 1),
    ],
    width: 100,
    height: 100,
  };

  const [state, setState] = React.useState({
    ...defaultState,
    terrain: generateTerrain(defaultState),
  });

  const addOctave = () =>
    setState(state => {
      const newState = {
        ...state,
        options: [...state.options, model.heightmapOption(3, 0.05, 0.05, 1, 1)],
      };
      return {...newState, terrain: generateTerrain(newState)};
    });

  const removeOctave = i =>
    setState(state => {
      const newState = {
        ...state,
        options: state.options.filter((_, index) => i !== index),
      };
      return {...newState, terrain: generateTerrain(newState)};
    });

  const updateOctave = (i, prop, value) =>
    setState(state => {
      const newState = {
        ...state,
        options: R.adjust(
          i,
          option => ({...option, [prop]: value}),
          state.options,
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
        <Canvas
          camera={{
            fov: 50,
            position: [state.width / 2, state.height / 4, 60],
            near: 0.1,
            far: 1000,
          }}
        >
          <Terrain {...props} />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
