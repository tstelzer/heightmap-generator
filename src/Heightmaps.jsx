import * as React from 'react';
import * as PropTypes from 'prop-types';

const formatFloat = n => parseFloat(Math.round(n * 100) / 100).toFixed(2);

const Canvas = props => {
  const {width, height, terrain, index, ...rest} = props;
  const canvas = React.useRef();

  React.useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    let imageData = ctx.createImageData(width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let i = (x + y * width) * 4;
        let v = (terrain[x][y][index] + 1) * 128;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  });

  return <canvas {...rest} height={props.height} width={props.width} ref={canvas} />;
};

const Heightmap = props => {
  const {
    width,
    height,
    removeOctave,
    updateOctave,
    index,
    options,
    terrain,
  } = props;
  const option = options[index];

  return (
    <div className="heightmap">
      <Canvas
        width={width}
        height={height}
        terrain={terrain}
        onClick={() => removeOctave(index)}
        index={index + 1}
      />
      <div className="heightmap-option">
        <span>factor</span>
        <input
          onChange={e =>
            updateOctave(index, 'factor', parseFloat(e.target.value))
          }
          min="0.05"
          max="3"
          step="0.05"
          value={option.factor}
          type="range"
        />
        <span>{formatFloat(parseFloat(option.factor))}</span>
      </div>
      <div className="heightmap-option">
        <span>freqX</span>
        <input
          onChange={e =>
            updateOctave(index, 'freqX', parseFloat(e.target.value))
          }
          min="0.05"
          max="1"
          step="0.05"
          type="range"
          value={option.freqX}
        />
        <span>{formatFloat(option.freqX)}</span>
      </div>
      <div className="heightmap-option">
        <span>freqY</span>
        <input
          onChange={e =>
            updateOctave(index, 'freqY', parseFloat(e.target.value))
          }
          min="0.05"
          max="1"
          step="0.05"
          value={option.freqY}
          type="range"
        />
        <span>{formatFloat(option.freqY)}</span>
      </div>
      <div className="heightmap-option">
        <span>power</span>
        <input
          onChange={e =>
            updateOctave(index, 'power', parseFloat(e.target.value))
          }
          min="1"
          max="6"
          step="0.1"
          value={option.power}
          type="range"
        />
        <span>{formatFloat(option.power)}</span>
      </div>
      <div className="heightmap-option">
        <span>t</span>
        <input
          onChange={e =>
            updateOctave(index, 't', parseFloat(e.target.value))
          }
          min="0.01"
          max="1"
          step="0.01"
          value={option.t}
          type="range"
        />
        <span>{formatFloat(option.t)}</span>
      </div>
    </div>
  );
};

export const Heightmaps = props => {
  const heightmaps = props.options.map((_, i) => (
    <Heightmap key={i} {...props} index={i} />
  ));
  const {
    width,
    height,
    removeOctave,
    updateOctave,
    index,
    options,
    terrain,
  } = props;

  const canvasProps = {width, height, terrain};

  return (
    <div className="heightmaps">
      {heightmaps}
      <button className="add-heightmap" onClick={props.addOctave}>
        +
      </button>
      <div className="heightmap">
        <Canvas {...canvasProps} index={0} />
        <div className="heightmap-sum-info">sum of all heightmaps</div>
      </div>
    </div>
  );
};
